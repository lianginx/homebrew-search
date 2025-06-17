<script setup lang="ts">
import type { Cask } from "~/type/brew";

const props = defineProps<{
  item: Cask;
}>();

const toast = useToast();

const installCommand = ref(`brew install --cask ${props.item.full_token}`);
async function handleCopyInstallCommand() {
  await navigator.clipboard.writeText(installCommand.value);
  toast.add({ title: "已复制安装命令到剪贴板，请到终端中执行！" });
}
</script>

<template>
  <UCard class="group">
    <template #header>
      <div class="flex justify-between items-center">
        <div>
          <div class="font-bold line-clamp-1">{{ item.name[0] }}</div>
          <div class="text-xs text-neutral-600 mt-0.5">{{ item.version }}</div>
        </div>
        <UBadge variant="subtle">
          {{
            { "homebrew/core": "Formula", "homebrew/cask": "Cask" }[item.tap]
          }}
        </UBadge>
      </div>
    </template>

    <div class="flex flex-wrap line-clamp-2 h-10 text-sm text-neutral-400">
      {{ item.desc }}
    </div>

    <template #footer>
      <div class="text-sm flex justify-between items-center">
        <ULink :href="item.homepage" target="_blank">官网</ULink>
        <UButton
          class="sm:invisible group-hover:visible"
          size="sm"
          @click="handleCopyInstallCommand"
        >
          复制命令
        </UButton>
      </div>
    </template>
  </UCard>
</template>
