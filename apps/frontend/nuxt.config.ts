// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['/assets/css/main.css'],
  runtimeConfig: {
    public: {
      apiBase: process.env['NUXT_PUBLIC_BASE_URL'],
    },
  },
});
