import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { UserProfile } from '../../app/utils/api';
import { ApiService } from '../../app/utils/api';  // ← ApiService Import
export const useUserStore = defineStore('user', ()=> {
    const user = ref<UserProfile| null>(null);

    async function getUser(){
    try {


        const profile = await ApiService.getProfile();
        if (profile) {
          user.value  = { ...profile };
          return user.value
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        await navigateTo('/login')
      }
    }
    return {getUser, user}
})