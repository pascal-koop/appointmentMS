import { useRequestHeaders } from '#app';

export default defineNuxtPlugin(() => ({
  provide: {
    apiCall: async <T>(url: string, options: any = {}): Promise<T> => {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined;
      const API_BASE_URL = 'http://localhost:3001';

      const doFetch = () =>
        $fetch<T>(`${API_BASE_URL}${url}`, {
          ...options,
          headers,
          credentials: 'include',
        });

      try {
        return await doFetch();
      } catch (error: any) {
        if (error?.status === 401) {
          await $fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers,
            credentials: 'include',
          });
          return await doFetch();
        }
        throw error;
      }
    },
  },
}));