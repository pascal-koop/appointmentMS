import { defineStore } from 'pinia';
import { ApiService } from '~/utils/api';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref<boolean>(false);

    async function checkAuthStatus() {
        try {
           await ApiService.apiCall('/auth/status');
          isAuthenticated.value = true;
          return true;
        } catch (error) {
          isAuthenticated.value = false;
          return false;
        }
      }
    async function logout() {
        try {
          await ApiService.logout();
        } catch (error) {
          console.error('Logout error:', error);
          isAuthenticated.value = false
        } finally {
          isAuthenticated.value = false;
        }
      }


    return { logout, checkAuthStatus, isAuthenticated }
})