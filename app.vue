<script setup lang="ts">
import { zh_cn } from "@nuxt/ui/locale";
import type { Cask, Formula } from "~/type/brew";

const route = useRoute();

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

const first = ref(!route.query.q);

const page = ref(1);
const limit = ref(16);
const type = ref("");
const keyword = ref((route.query.q as string) ?? "");

const {
  data: searchResult,
  status,
  refresh,
} = await useFetch<SearchResult>(() => `/api/brew/search/${keyword.value}`, {
  query: { type, page, limit },
  immediate: !!keyword.value,
  watch: false,
});

// 搜索快捷键 meta + k
const searchInputRef = useTemplateRef("search-input");
defineShortcuts({
  meta_k: () => {
    if (searchInputRef.value?.inputRef) {
      searchInputRef.value.inputRef.setSelectionRange(0, keyword.value.length);
      searchInputRef.value.inputRef.focus();
    }
  },
});

async function handleSearch() {
  if (!keyword.value) return;
  page.value = 1;
  first.value = false;
  refresh();
}
</script>

<template>
  <UApp :locale="zh_cn">
    <div>
      <!-- 顶栏 -->
      <div
        class="fixed top-0 w-full flex justify-between items-center p-4 sm:p-8"
      >
        <div class="flex items-center">
          <template v-if="!first">
            <UInput
            ref="search-input"
              v-model="keyword"
              class="w-full sm:w-80"
              size="xl"
              icon="heroicons-solid:search"
              @keydown.enter="handleSearch"
            />
            <UButton
              class="ml-4 hidden sm:flex"
              size="xl"
              :loading="status === 'pending'"
              @click="handleSearch"
            >
              搜索
            </UButton>
          </template>
        </div>
        <div class="space-x-2">
          <UTooltip text="在 GitHub 上打开">
            <UButton
              icon="lucide:github"
              variant="outline"
              color="neutral"
              size="xl"
              href="https://github.com/lianginx/homebrew-search"
              target="_blank"
            />
          </UTooltip>
          <ClientOnly>
            <UTooltip text="切换主题">
              <UButton
                :icon="colorModeIcon"
                variant="outline"
                color="neutral"
                size="xl"
                :loading="status === 'pending'"
                @click="handleSwitchColorMode"
              />
            </UTooltip>
          </ClientOnly>
        </div>
      </div>

      <!-- 首屏搜索 -->
      <div
        v-if="first"
        class="flex flex-col justify-center items-center h-screen text-center"
      >
        <div class="text-primary text-5xl font-black mb-4">Homebrew Search</div>
        <div class="mb-12">最好用的 Homebrew 软件源搜索工具</div>
        <div class="flex flex-col sm:flex-row items-center">
          <UInput
            v-model="keyword"
            class="w-80"
            size="xl"
            icon="heroicons-solid:search"
            enterkeyhint="search"
            placeholder="搜索名称..."
            @keydown.enter="handleSearch"
          />
          <UButton
            class="ml-4 hidden sm:flex"
            size="xl"
            :loading="status === 'pending'"
            @click="handleSearch"
          >
            搜索
          </UButton>
        </div>
      </div>

      <!-- 列表 -->
      <div v-else class="m-4 sm:m-8">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-4 mt-22 sm:mt-26">
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
