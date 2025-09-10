# idea to encapsulate and centralize the api calls for specific domains
The Idea ist that we call one function in the `utils/api` directory that takes 2 parameters url and options({method: 'GET'})
The function creates a refresh token httpOnly cookie or if the access_token is expired or both are invalid loggs the user out of the application.

- create domain specific api calls for example:
    - Domäne „Appointments”:
        appointmentsApi.list() → gets all appointments
        appointmentsApi.get(id) → gets one appointment
        appointmentsApi.create(payload) →  creates a appointment
        appointmentsApi.update(id, payload) → change one appointment
        appointmentsApi.delete(id) →  delete one appointment

## The `apiCall()` function:
```TS
    static async apiCall<T>(url: string, options: any = {}): Promise<T> {
        try {
        return await $fetch<T>(`${API_BASE_URL}${url}`, {
            ...options,
            credentials: 'include',
        });
        } catch (error: any) {
        // If 401 (Token expired), try refresh
        if (error.status === 401) {
            try {
            await this.refreshToken();
            // Retry with new Token
            return await $fetch<T>(`${API_BASE_URL}${url}`, {
                ...options,
                credentials: 'include',
            });
            } catch (refreshError) {
            // Refresh failed, log user out
            const authStore = useAuthStore();
            authStore.logout();
            throw refreshError;
            }
        }
        throw error;
        }
    }
```
## A practical code Example:

``` TS
    /app/utils/apis/appointments.ts
    import { ApiService } from '~/app/utils/api'

    export const appointmentsApi = {
        list() {
            return ApiService.apiCall('/appointments', { method: 'GET' })
        },
        get(id: string) {
            return ApiService.apiCall(`/appointments/${id}`, { method: 'GET' })
        },
        create(payload: { title: string; at: string }) {
            return ApiService.apiCall('/appointments', { method: 'POST', body: payload })
        },
        update(id: string, payload: any) {
            return ApiService.apiCall(`/appointments/${id}`, { method: 'PUT', body: payload })
        },
        delete(id: string) {
            return ApiService.apiCall(`/appointments/${id}`, { method: 'DELETE' })
        },
    }
```

The API calls are then called up in the corresponding stores. Like `appointmentStore`
```TS
    // stores/appointments/appointmentsStore.ts
    import { defineStore } from 'pinia'
    import { appointmentsApi } from '~/app/apis/appointments'

    export const useAppointmentsStore = defineStore('appointments', () => {
        const items = ref<any[]>([])

        async function load() {
            items.value = await appointmentsApi.list()
        }

        return { items, load }
    })
```