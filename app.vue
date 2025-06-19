<script setup lang="ts">
import { zh_cn } from "@nuxt/ui/locale";
import type { Cask, Formula } from "~/type/brew";

interface SearchResult {
  list: Array<Cask | Formula>;
  total: number;
  page: number;
  limit: number;
}

const route = useRoute();

const first = ref(!route.query.q);
const page = ref(1);
const limit = ref(16);
const type = ref();
const keyword = ref((route.query.q as string) ?? "");

const { data, status, error, refresh, clear } = await useFetch<SearchResult>(
  () => `/api/brew/search/${keyword.value}`,
  {
    query: {
      // 为了解决 UTabs 组件的 Bug
      // 当选项 value 为 undfined 或 '' 时，modelValue 会被赋值为 0
      type: computed(() => (type.value == 0 ? undefined : type.value)),
      page,
      limit,
    },
    immediate: !!keyword.value,
    watch: false,
  }
);

watch(error, () => {
  useToast().add({ title: error.value?.statusMessage, color: "error" });
});

async function handleSearch() {
  if (!keyword.value) return;
  page.value = 1;
  first.value = false;
  await refresh();
}

async function handleRestore() {
  page.value = 1;
  keyword.value = "";
  first.value = true;
  clear();
}

// 亮/暗主题
const colorMode = useColorMode();
const colorModeIcon = computed(() => {
  return colorMode.value === "dark" ? "i-lucide:moon" : "i-lucide:sun";
});
function handleSwitchColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

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
</script>

<template>
  <UApp :locale="zh_cn">
    <div>
      <!-- 顶栏 -->
      <div
        class="fixed top-0 w-full flex justify-between items-center p-4 sm:p-8 bg-gradient-to-b from-(--ui-bg)/80 to-transparent"
      >
        <div>
          <div
            v-show="!first"
            class="mr-8 cursor-pointer hidden sm:flex items-center"
            @click="handleRestore"
          >
            <UIcon name="devicon:homebrew" variant="outline" size="44" />
            <span class="ml-2 font-black text-primary text-2xl leading-none">
              <div>Homebrew</div>
              <div>Search</div>
            </span>
          </div>
        </div>
        <div
          class="flex-1 sm:flex-none space-x-2 flex items-center justify-end"
        >
          <UInput
            v-if="!first"
            ref="search-input"
            v-model="keyword"
            class="w-full sm:w-80"
            size="xl"
            icon="heroicons-solid:search"
            placeholder="搜索名称..."
            :loading="status === 'pending'"
            @keydown.enter="handleSearch"
          />
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
                @click="handleSwitchColorMode"
              />
            </UTooltip>
          </ClientOnly>
        </div>
      </div>

      <!-- 首屏搜索 -->
      <div
        v-show="first"
        class="flex flex-col items-center h-screen text-center pt-36 sm:pt-50"
      >
        <div class="flex flex-col sm:flex-row items-center">
          <UIcon
            class="text-7xl sm:text-8xl mb-4 sm:mb-0"
            name="devicon:homebrew"
          />
          <div
            class="text-primary text-4xl sm:text-5xl font-black text-center sm:text-start leading-none"
          >
            <div>Homebrew</div>
            <div>Search</div>
          </div>
        </div>
        <div class="mt-4 sm:mt-8 mb-8 sm:mb-12">
          最好用的 Homebrew 软件源搜索工具
        </div>
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
      <UContainer v-show="!first" class="my-20 sm:mt-28">
        <UTabs
          v-model="type"
          class="mb-6"
          size="xl"
          variant="link"
          :items="[
            { label: 'All', value: undefined },
            { label: 'Formula', value: 'formula' },
            { label: 'Cask', value: 'cask' },
          ]"
          @update:model-value="handleSearch"
        />
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <template v-for="(item, index) in data?.list" :key="index">
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
          v-if="data?.total"
          v-model:page="page"
          class="mt-8"
          size="lg"
          :items-per-page="data.limit"
          :total="data.total"
          @update:page="refresh()"
        />
      </UContainer>
    </div>
  </UApp>
</template>

<style scoped></style>
