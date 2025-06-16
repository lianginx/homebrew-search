<script setup lang="ts">
import type { Formula } from "~/type/brew";

const props = defineProps<{
  item: Formula;
}>();

const installCommand = ref(`brew install --cask ${props.item.name}`);
</script>

<template>
  <div>
    <div style="display: flex; align-items: baseline">
      <div style="font-weight: bold">{{ item.name }}</div>
      <div
        style="
          font-size: small;
          margin-left: 16px;
          background: #eee;
          padding: 1px 8px;
          border-radius: 4px;
        "
      >
        {{ item.versions.stable }}
      </div>
    </div>
    <div
      style="
        margin-top: 8px;
        background: #eee;
        padding: 8px 16px;
        border-radius: 4px;
      "
    >
      {{ installCommand }}
    </div>
  </div>
</template>
