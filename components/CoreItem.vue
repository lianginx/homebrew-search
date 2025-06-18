<script setup lang="ts">
import type { Formula } from "~/type/brew";

const props = defineProps<{
  item: Formula;
}>();

const toast = useToast();

const type = computed(() => {
  const typeMap: Record<string, string> = {
    "homebrew/core": "Formula",
    "homebrew/cask": "Cask",
  };
  const key = props.item.tap;
  return typeMap[key] ?? "";
});

const installCommand = computed(() => `brew install ${props.item.name}`);
async function handleCopyInstallCommand() {
  await navigator.clipboard.writeText(installCommand.value);
  toast.add({
    title: "已复制安装命令到剪贴板，请到终端中执行！",
    duration: 1500,
  });
}
</script>

<template>
  <UCard class="group hover:shadow-2xl/8 shadow-primary">
    <template #header>
      <div class="flex justify-between items-center space-x-2">
        <div>
          <div class="font-bold line-clamp-1">{{ item.name }}</div>
          <ULink
            class="text-xs text-neutral-600 mt-0.5 line-clamp-1 break-all"
            :href="item.homepage"
            target="_blank"
          >
            {{ item.homepage }}
          </ULink>
        </div>
        <UBadge variant="subtle">{{ type }}</UBadge>
      </div>
    </template>

    <div class="flex flex-wrap line-clamp-2 h-10 text-sm text-neutral-500">
      {{ item.desc }}
    </div>

    <template #footer>
      <div class="text-sm flex justify-between items-center space-x-2">
        <div class="flex-1">
          <div class="text-xs text-neutral-600 break-all line-clamp-1">
            {{ item.versions.stable }}
          </div>
        </div>
        <div class="space-x-4">
          <UButton
            class="sm:invisible group-hover:visible"
            size="sm"
            variant="soft"
            @click="handleCopyInstallCommand"
          >
            复制命令
          </UButton>
        </div>
      </div>
    </template>
  </UCard>
</template>
