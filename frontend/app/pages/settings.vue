<script setup lang="ts">
import type { TUser } from '../types/formTypes/user/user.types';
import { useAuthStore } from '../../stores/auth/authStore';
const authStore = useAuthStore();
const user = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
});

const safeUser = (user: TUser) => {
  console.log(user);
};

onMounted(async () => {
  try {
    // Token laden
    const token = await authStore.loadTokenFromLocalStorage();

    if (!token) {
      await navigateTo('/login');
      return;
    }

    // Profil laden
    const profile = await ApiService.getProfile(token);
    console.log(profile);
    if (profile) {
      user.value = { ...profile };
    }
  } catch (error) {
    console.error('Error loading profile:', error);
    // Bei Fehler zur Login-Seite weiterleiten
    await navigateTo('/login');
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <SettingsCard :user="user" @safeUser="safeUser" />
  </div>
</template>

<style scoped></style>
