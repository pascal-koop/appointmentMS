import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserProfile } from '../../app/utils/api';


export const useAuthStore = defineStore('auth', ()=> {
    const jwtToken = ref<string | null>(null);
    const user = ref<UserProfile| null>(null);
    const isAuthenticated = ref<boolean>(false);
    function setToken(token: string) {
        jwtToken.value = token
        isAuthenticated.value = true
        localStorage.setItem('access_token', jwtToken.value)

      }
      function clearAuth() {
        jwtToken.value = null
        user.value = null
        isAuthenticated.value = false
        localStorage.removeItem('access_token')
      }

      async function loadTokenFromLocalStorage() {
        const token = localStorage.getItem('access_token')
        if (token) {
          setToken(token)
          return token
        }
        return null
      }

    return {
        jwtToken,
        user,
        isAuthenticated,
        setToken,
        clearAuth,
        loadTokenFromLocalStorage,
    }
})