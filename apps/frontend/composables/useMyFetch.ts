export const useMyFetch = (url: string, options?: any): Promise<any> => {
  const config = useRuntimeConfig();

  return $fetch(url, {
    baseURL: config.public.apiBase,
    ...options,
  });
};
