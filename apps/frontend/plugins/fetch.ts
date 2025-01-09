export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.$fetch.defaults.baseURL = config.public.apiBase;
});
