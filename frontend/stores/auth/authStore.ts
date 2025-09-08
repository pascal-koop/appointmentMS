import { defineStore } from 'pinia';
import { ApiService } from '~/utils/api';


export const useAuthStore = defineStore('auth', ()=> {

    async function logout(){
        await ApiService.logout()
    }
    return {logout}
})