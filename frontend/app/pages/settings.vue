<script setup lang="ts">
import type { TUser } from '../types/formTypes/user/user.types';
import { useAuthStore } from '../../stores/auth/authStore';
import { useUserStore } from '../../stores/user/userStore';
import type { UserProfile } from '../../app/utils/api';
const authStore = useAuthStore();
const userStore = useUserStore();
const { showError, showSuccess } = useToaster();

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
const logout = async () => {
  try {
    await authStore.logout();
    showSuccess('You successful logged out of the application');
    navigateTo('/login');
  } catch (e: unknown) {
    showError("seems you can't logout, please try again in 5 min. or contact the support");
    throw new Error('something went wrong, in logout');
  }
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
    <SettingsCard :loading="loading" :user="user" @safeUser="saveUser" @logout="logout" />
  </div>
</template>

<style scoped></style>
