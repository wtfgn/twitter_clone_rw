import type { UseFetchOptions } from 'nuxt/app';

export async function useFetchAPI<T>(url: string | (() => string), options: UseFetchOptions<T> = {}) {
  const { useAuthToken } = useAuth();

  return await useFetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${useAuthToken().value}`,
    },
  });
}
