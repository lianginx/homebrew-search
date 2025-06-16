<script setup lang="ts">
import type { Cask } from "~/type/brew";

const props = defineProps<{
  item: Cask;
}>();

const installCommand = ref(`brew install --cask ${props.item.token}`);
</script>

<template>
  <div>
    <div style="display: flex; align-items: baseline">
      <div style="font-weight: bold">{{ item.name[0] }}</div>
      <div
        style="
          font-size: small;
          margin-left: 16px;
          background: #eee;
          padding: 1px 8px;
          border-radius: 4px;
        "
      >
        {{ item.version }}
      </div>
    </div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        font-size: small;
        color: #999;
        margin-top: 8px;
      "
    >
      <div
        v-for="(name, index) in item.name.slice(1)"
        :key="name"
        style="margin-right: 16px"
      >
        {{ name }}
        {{ index === item.name.slice(1).length - 1 ? "" : "/" }}
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
