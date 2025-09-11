<script setup lang="ts">
import { useAuthStore } from '../../stores/auth/authStore';
import { useUserStore } from '../../stores/user/userStore';
import type { TUser } from '~/utils/apis/user';
import { storeToRefs } from 'pinia';
import { tr } from '#ui/locale';
const authStore = useAuthStore();
const userStore = useUserStore();
const { showError, showSuccess } = useToaster();

const user = ref<TUser>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  id: '',
});
const { user: userRef } = storeToRefs(userStore);
const saveUser = async (data: Omit<TUser, 'id'> & { password: string }) => {
  console.log('save');
  try {
    const payload = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      password: '',
    };
    if (data.password) payload.password = data.password;
    await userStore.updateUser(payload);
    showSuccess('data successfully changed');
    user.value = userRef.value ?? user.value;
  } catch (error) {}
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

const deleteUser = async () => {
  try {
    await userStore.deleteUser();
    showSuccess('you deleted your account. See you soon when you need me again');
    navigateTo('/login');
  } catch (error) {}
};

const loading = ref(true);
onMounted(async () => {
  const profileData = await userStore.getUser();
  if (!profileData) {
    showError('Failed to load user profile.');
    loading.value = false;
    return;
  }
  user.value = {
    id: profileData.id ?? '',
    email: profileData.email ?? '',
    first_name: profileData.first_name ?? '',
    last_name: profileData.last_name ?? '',
    phone: profileData.phone ?? '',
  };
  loading.value = false;
});
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen mx-4 sm:mx-10">
    <SettingsCard
      :loading="loading"
      :user="user"
      @save-user-data="saveUser"
      @logout="logout"
      @delete-user="deleteUser"
    />
  </div>
</template>

<style scoped></style>
