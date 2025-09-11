import { defineStore } from 'pinia';
/* import { ApiService } from '~/utils/api'; */

import { ref } from 'vue';
import { authApi, type TCreateUserDto, type TSignInDto } from '~/utils/apis/auth';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref<boolean>(false);

    async function checkAuthStatus() {
      try {
        const {$apiCall} = useNuxtApp()
        await $apiCall('/auth/status')
        isAuthenticated.value = true;
        return true;
      } catch (error) {
        isAuthenticated.value = false;
        return false;
      }
    }
    async function logout() {
      try {
        return authApi.logout()
      } catch (error) {
        console.error('Logout error:', error);
        isAuthenticated.value = false
      } finally {
        isAuthenticated.value = false;
      }
    }

      function registerUser(data: TCreateUserDto){
        return authApi.createUser(data);
      }


    async function login(data: TSignInDto){
      try{
        await authApi.login(data);
        isAuthenticated.value = true;
      } catch(e: unknown){
        console.log('login failed');
      }
    }


    return { login, logout, registerUser, checkAuthStatus, isAuthenticated }
})