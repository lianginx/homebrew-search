// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint"],
  nitro: {
    storage: {
      kv: {
        driver: "cloudflare-kv-binding",
        binding: "HOMEBREW-KV",
      },
    },
    devStorage: {
      kv: {
        driver: "fs",
        base: "./.nuxt/.data/kv",
      },
    },
  },
});
