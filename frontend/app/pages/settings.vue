<script setup lang="ts">
import type { TUser } from '../types/formTypes/user/user.types';
import { useAuthStore } from '../../stores/auth/authStore';
import { useUserStore } from '../../stores/user/userStore';
const authStore = useAuthStore();
const userStore = useUserStore();
import type { UserProfile } from '../../app/utils/api';
const user = ref<UserProfile>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  id: '',
});

const saveUser = (user: TUser) => {
  console.log(user);
};
const loading = ref(true);
onMounted(async () => {
  const profileData = await userStore.getUser();
  if (profileData) {
    user.value = { ...profileData };
    loading.value = false;
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <SettingsCard :loading="loading" :user="user" @safeUser="saveUser" />
  </div>
</template>

<style scoped></style>
