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
async function handlePull() {
  try {
    disabledPull.value = true;
    await Promise.all([
      $fetch("/api/brew/cask/pull", { method: "POST" }),
      $fetch("/api/brew/formula/pull", { method: "POST" }),
    ]);
    alert("已更新软件源");
  } finally {
    disabledPull.value = false;
  }
}
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
