// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      title: "Homebrew Search",
      meta: [
        {
          name: "description",
          content:
            "可能是最易用的 Homebrew Cask/Formula 在线搜索工具，提供简洁美观的界面与快速精准的搜索体验。",
        },
      ],
    },
  },
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      // 每 10 分钟抓取一次最新数据
      "*/10 * * * *": ["brew:pull"],
    },
  },
  runtimeConfig: {
    baiduAppId: "",
    baiduSecretKey: "",
  },
});
