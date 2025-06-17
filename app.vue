<script setup lang="ts">
import { zh_cn } from "@nuxt/ui/locale";
import type { Cask, Formula } from "./type/brew";

interface SearchResult {
  list: Array<Cask | Formula>;
  total: number;
  page: number;
  limit: number;
}

const colorMode = useColorMode();
colorMode.preference = "dark";

const page = ref(1);
const limit = ref(16);
const type = ref("");
const keyword = ref("wechat");

const { data: searchResult, refresh } = await useFetch<SearchResult>(
  () => `/api/brew/search/${keyword.value}`,
  {
    query: { type, page, limit },
    // immediate: false,
    watch: false,
  }
);
</script>

<template>
  <UApp :locale="zh_cn">
    <div class="p-8">
      <div class="flex items-center mb-8 space-x-4">
        <UInput
          v-model="keyword"
          class="w-60"
          size="xl"
          icon="heroicons-solid:search"
          @keydown.enter="refresh()"
        />
        <UButton size="xl" @click="refresh()">搜索</UButton>
      </div>
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-4">
        <template v-for="(item, index) in searchResult?.list" :key="index">
          <CoreItem
            v-if="item.tap === 'homebrew/core'"
            :item="item as Formula"
          />
          <CaskItem v-if="item.tap === 'homebrew/cask'" :item="item as Cask" />
        </template>
      </div>
      <UPagination
        v-if="searchResult"
        v-model:page="page"
        class="mt-8"
        :items-per-page="searchResult.limit"
        :total="searchResult.total"
        @update:page="refresh()"
      />
    </div>
  </UApp>
</template>

<style scoped></style>
