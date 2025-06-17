// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  nitro: {
    experimental: {
      tasks: true,
    },
    scheduledTasks: {
      // 每 10 分钟抓取一次最新数据
      "*/10 * * * *": ["brew:pull"],
    },
  },
});
