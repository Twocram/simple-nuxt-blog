export const useMyFetch = (url: string, options?: any) => {
  const config = useRuntimeConfig();

  return useFetch(url, {
    baseURL: config.public.apiBase,
    ...options,
  });
};
