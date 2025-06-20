<script setup lang="ts">
import type { Cask, Formula } from "~/type/brew";

const props = defineProps<{
  item: Cask | Formula;
}>();

const toast = useToast();

const isCask = computed(() => props.item.tap === "homebrew/cask");

const type = computed(() => (isCask.value ? "Cask" : "Formula"));

const title = computed(() =>
  isCask.value ? (props.item as Cask).token : (props.item as Formula).name
);

const version = computed(() =>
  isCask.value
    ? (props.item as Cask).version
    : (props.item as Formula).versions.stable
);

const desc = computed(() =>
  showDst.value ? (dst.value as string) : props.item.desc
);

const installCommand = computed(() =>
  isCask.value
    ? `brew install --cask ${(props.item as Cask).token}`
    : `brew install ${(props.item as Formula).name}`
);

// 复制标题
async function handleCopyTitle() {
  await navigator.clipboard.writeText(title.value);
  toast.add({
    title: "已复制软件包名称到剪贴板！",
    duration: 1500,
  });
}

// 复制安装命令
async function handleCopyInstallCommand() {
  await navigator.clipboard.writeText(installCommand.value);
  toast.add({
    title: "已复制安装命令到剪贴板，请到终端中执行！",
    duration: 1500,
  });
}

// 翻译描述
const showDst = ref(false);
const dst = ref("");
const inTranslation = ref(false);
function handleTranslate() {
  if (inTranslation.value) return;

  showDst.value = !showDst.value;

  if (!props.item.desc || dst.value) return;

  inTranslation.value = true;
  $fetch<string>("/api/translate", {
    method: "POST",
    body: { q: props.item.desc },
  })
    .then((data) => {
      dst.value = data;
      inTranslation.value = false;
    })
    .catch(() => {
      showDst.value = false;
    })
    .finally(() => {
      inTranslation.value = false;
    });
}
</script>

<template>
  <UCard
    class="group hover:shadow-2xl/8 shadow-primary text-sm text-neutral-500"
  >
    <template #header>
      <div class="flex justify-between items-center space-x-4">
        <div>
          <!-- 主标题 -->
          <UTooltip :text="title">
            <div
              class="font-bold text-base text-default line-clamp-1 hover:text-primary cursor-default"
              @click="handleCopyTitle"
            >
              {{ title }}
            </div>
          </UTooltip>
          <!-- 副标题 -->
          <ULink
            class="mt-0.5 line-clamp-1 break-all"
            :href="item.homepage"
            target="_blank"
          >
            {{ item.homepage }}
          </ULink>
        </div>
        <UBadge
          class="cursor-default"
          variant="subtle"
          :color="item.disabled || item.deprecated ? 'neutral' : 'primary'"
        >
          {{ type }}
        </UBadge>
      </div>
    </template>

    <UTooltip :text="desc">
      <div class="flex flex-wrap line-clamp-2 h-10" @click="handleTranslate">
        <div v-if="inTranslation" class="flex items-center space-x-1">
          <UIcon
            class="animate-spin text-current"
            name="i-lucide:loader-circle"
            size="16"
          />
          <div>翻译中…</div>
        </div>
        <div v-else>{{ desc }}</div>
      </div>
    </UTooltip>

    <template #footer>
      <div class="flex justify-between items-center space-x-2">
        <div class="flex-1 break-all line-clamp-1">
          {{ version }}
        </div>
        <UTooltip
          :text="
            item.disabled
              ? `已于 ${item.disable_date} 禁用，原因：${item.disable_reason}`
              : item.deprecated
              ? `已于 ${item.deprecation_date} 弃用，原因：${item.deprecation_reason}`
              : ''
          "
          :disabled="!item.disabled && !item.deprecated"
          :delay-duration="0"
        >
          <UButton
            v-if="!item.disabled"
            class="sm:invisible group-hover:visible cursor-pointer"
            size="sm"
            variant="soft"
            :color="item.deprecated ? 'neutral' : 'primary'"
            @click="handleCopyInstallCommand"
          >
            复制命令
          </UButton>
          <div v-else class="cursor-no-drop">已禁用</div>
        </UTooltip>
      </div>
    </template>
  </UCard>
</template>
