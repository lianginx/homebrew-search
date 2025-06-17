<script setup lang="ts">
import type { Cask, Formula } from "./type/brew";

const keyword = ref("");

const { data: searchResult, refresh } = useFetch<Cask[] | Formula[]>(
  () => `/api/brew/search/${keyword.value}`,
  {
    immediate: false,
  }
);

const disabledPull = ref(false);
const pullSuccess = ref(false);
async function handlePull() {
  try {
    disabledPull.value = true;
    await Promise.all([
      $fetch("/api/brew/cask/pull", { method: "POST" }),
      $fetch("/api/brew/formula/pull", { method: "POST" }),
    ]);
    pullSuccess.value = true;
    setTimeout(() => (pullSuccess.value = false), 1000);
  } finally {
    disabledPull.value = false;
  }
}

await handlePull();
</script>

<template>
  <div>
    <div style="display: flex; align-items: center">
      <input
        v-model="keyword"
        style="width: 240px; height: 32px; padding: 0 16px"
      />
      <button
        style="height: 36px; margin-left: 8px; padding: 0 24px"
        @click="refresh()"
      >
        搜索
      </button>
      <button
        style="height: 36px; margin-left: 16px; padding: 0 24px"
        :disabled="disabledPull"
        @click="handlePull"
      >
        更新源
      </button>
      <div v-if="pullSuccess" style="margin-left: 8px; color: #999">
        软件源更新成功
      </div>
    </div>
    <div>
      <div
        v-for="(item, index) in searchResult"
        :key="index"
        style="margin-top: 32px"
      >
        <CoreItem v-if="item.tap === 'homebrew/core'" :item="item as Formula" />
        <CaskItem v-if="item.tap === 'homebrew/cask'" :item="item as Cask" />
      </div>
    </div>
  </div>
</template>
