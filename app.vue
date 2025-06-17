<script setup lang="ts">
import { zh_cn } from "@nuxt/ui/locale";
import type { Cask, Formula } from "~/type/brew";

const first = ref(true);

const colorMode = useColorMode();

const colorModeIcon = computed(() => {
  return colorMode.value === "dark" ? "i-lucide:moon" : "i-lucide:sun";
});

function handleSwitchColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

interface SearchResult {
  list: Array<Cask | Formula>;
  total: number;
  page: number;
  limit: number;
}

const page = ref(1);
const limit = ref(16);
const type = ref("");
const keyword = ref("");
const { data: searchResult, refresh } = await useFetch<SearchResult>(
  () => `/api/brew/search/${keyword.value}`,
  {
    query: { type, page, limit },
    immediate: false,
    watch: false,
  }
);

async function handleSearch() {
  if (!keyword.value.trim()) return;
  page.value = 1;
  first.value = false;
  refresh();
}
</script>

<template>
  <UApp :locale="zh_cn">
    <div>
      <!-- 顶栏 -->
      <div class="fixed top-0 w-full flex justify-between items-center p-8">
        <div class="flex items-center space-x-4">
          <template v-if="!first">
            <UInput
              v-model="keyword"
              class="w-60"
              size="xl"
              icon="heroicons-solid:search"
              @keydown.enter="handleSearch"
            />
            <UButton size="xl" @click="handleSearch"> 搜索 </UButton>
          </template>
        </div>
        <div>
          <ClientOnly>
            <UButton
              :icon="colorModeIcon"
              variant="outline"
              color="neutral"
              @click="handleSwitchColorMode"
            />
          </ClientOnly>
        </div>
      </div>

      <!-- 首屏搜索 -->
      <div
        v-if="first"
        class="flex flex-col justify-center items-center h-screen"
      >
        <div class="text-primary text-5xl font-bold mb-4">Homebrew Search</div>
        <div class="mb-12">最好用的 Homebrew 软件源搜索工具</div>
        <div class="flex items-center space-x-4">
          <UInput
            v-model="keyword"
            class="w-80"
            size="xl"
            icon="heroicons-solid:search"
            @keydown.enter="handleSearch"
          />
          <UButton size="xl" @click="handleSearch"> 搜索 </UButton>
        </div>
      </div>

      <!-- 列表 -->
      <div v-else class="m-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-4 mt-26">
          <template v-for="(item, index) in searchResult?.list" :key="index">
            <CoreItem
              v-if="item.tap === 'homebrew/core'"
              :item="item as Formula"
            />
            <CaskItem
              v-if="item.tap === 'homebrew/cask'"
              :item="item as Cask"
            />
          </template>
        </div>
        <UPagination
          v-if="searchResult?.total"
          v-model:page="page"
          class="mt-8"
          :items-per-page="searchResult.limit"
          :total="searchResult.total"
          @update:page="refresh()"
        />
      </div>
    </div>
  </UApp>
</template>

<style scoped></style>
