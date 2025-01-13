// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['/assets/css/main.css'],
  vite: {
    server: {
      proxy: {
        '/api': {
          target: process.env['NUXT_PUBLIC_BASE_URL'],
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/v1/, '/api'),
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env['NUXT_PUBLIC_BASE_URL'],
    },
  },
});
