import { ref } from 'vue';
import { defineStore } from 'pinia';
import { userApi, type TUser, type TUpdateUserDto } from '~/utils/apis/user';

export const useUserStore = defineStore('user', ()=> {
    const user = ref<TUser| null>(null);

    async function getUser(){
    try {
        const profile = await userApi.get();

        if (profile) {
          user.value  = { ...profile };
          return user.value
        }
      } catch (error) {
        console.error('Error loading profile:', error);

      }
    }

    async function updateUser(data: TUpdateUserDto) {
      try {
        const profile = await userApi.update(data);
        if (profile && profile.id) {
          user.value = {...profile, id: profile.id}
        }
      } catch (error) {

      }
    }

    return {getUser, updateUser, user}
})