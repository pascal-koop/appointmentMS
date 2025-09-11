import { useRequestHeaders } from '#app';
import { ApiError } from '~/utils/api';
export default defineNuxtPlugin(() => ({
  provide: {
    apiCall: async <T>(url: string, options: any = {}): Promise<T> => {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined;
      const { public: { apiBase } } = useRuntimeConfig();
      const API_BASE_URL = apiBase;

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
          try {
            await $fetch(`${API_BASE_URL}/auth/refresh`, {
              method: 'POST',
              headers,
              credentials: 'include',
            });
            return await doFetch();
          } catch {
              throw new ApiError('Unauthorized', 401, 'UNAUTHORIZED');
            };
        };
        if (typeof error?.status === 'number') {
          throw new ApiError(error?.data?.message ?? 'Request failed', error.status);
        };
        throw error;
      };
    },
  },
}));