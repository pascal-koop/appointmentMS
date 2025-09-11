# Centralized API calls via Nuxt plugin `$apiCall`

This document explains how we centralize HTTP calls through a Nuxt plugin that provides `$apiCall`. It also shows how to access it with `const { $apiCall } = useNuxtApp()` and how to use it in domain APIs and Pinia stores.

- **Goal**: One place to handle credentials, SSR cookies, and refresh-token retries.
- **Behavior**: On 401, it calls `/auth/refresh` (httpOnly cookie-based), then retries the original request. If refresh fails, the caller can handle logout.

## 1) Nuxt plugin that provides `$apiCall`

Create `app/plugins/api.ts`:

```ts
import { useRequestHeaders } from '#app'

export default defineNuxtPlugin(() => ({
  provide: {
    apiCall: async <T>(url: string, options: any = {}): Promise<T> => {
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
      const API_BASE_URL = 'http://localhost:3001'

      const doFetch = () =>
        $fetch<T>(`${API_BASE_URL}${url}`, {
          ...options,
          headers,
          credentials: 'include',
        })

      try {
        return await doFetch()
      } catch (error: any) {
        if (error?.status === 401) {
          await $fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers,
            credentials: 'include',
          })
          return await doFetch()
        }
        throw error
      }
    },
  },
}))
```

Notes:
- `credentials: 'include'` ensures cookies are sent (access/refresh tokens are httpOnly cookies).
- On SSR, `useRequestHeaders(['cookie'])` forwards incoming request cookies to the backend.

## 2) Access `$apiCall` with `useNuxtApp()`

Always access the plugin inside setup-context code (components, composables, stores, middleware, plugins). Example:

```ts
const { $apiCall } = useNuxtApp()
await $apiCall('/health', { method: 'GET' })
```

Do not call `useNuxtApp()` at module top-level. Call it inside functions/actions.

## 3) Domain API modules using `$apiCall`

Example `app/utils/apis/auth.ts`:

```ts
export type TSignInDto = { email: string; password: string }

export const authApi = {
  async login(data: TSignInDto) {
    const { $apiCall } = useNuxtApp()
    return $apiCall('/auth', { method: 'POST', body: data })
  },
  async logout() {
    const { $apiCall } = useNuxtApp()
    return $apiCall('/auth/logout', { method: 'POST' })
  },
  async status() {
    const { $apiCall } = useNuxtApp()
    return $apiCall('/auth/status', { method: 'GET' })
  },
}
```

Example `app/utils/apis/user.ts`:

```ts
export type TUser = {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string
}

export type TUpdateUserDto = {
  email?: string
  first_name?: string
  last_name?: string
  phone?: string
  password?: string
}

export const userApi = {
  async get(): Promise<TUser> {
    const { $apiCall } = useNuxtApp()
    return $apiCall<TUser>('/user/profile', { method: 'GET' })
  },
  async update(data: TUpdateUserDto): Promise<TUser> {
    const { $apiCall } = useNuxtApp()
    return $apiCall<TUser>('/user/update', { method: 'POST', body: data })
  },
}
```

## 4) Using in Pinia stores

Use domain APIs inside store actions. Do not call `useNuxtApp()` at the top level of the module.

```ts
// stores/user/userStore.ts
import { defineStore } from 'pinia'
import { userApi, type TUser, type TUpdateUserDto } from '~/utils/apis/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<TUser | null>(null)

  async function getUser() {
    const profile = await userApi.get()
    user.value = profile
    return profile
  }

  async function updateUser(data: TUpdateUserDto) {
    const profile = await userApi.update(data)
    user.value = profile
    return profile
  }

  return { user, getUser, updateUser }
})
```

## 5) Why a plugin and not direct `$fetch` everywhere?

- Single place to handle refresh-token retries and credentials.
- SSR cookie forwarding handled centrally.
- Cleaner domain APIs and store actions.