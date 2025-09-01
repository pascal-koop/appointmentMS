<script setup lang="ts">
import LoginForm from '~/components/forms/LoginForm.vue';
import type { TLoginForm } from '~/types/formTypes/loginRegister.types';
import { ApiService } from '~/utils/api';
import { useAuthStore } from '../../stores/auth/authStore';
const authStore = useAuthStore();
const { showError, showSuccess } = useToaster();
const submit = async (data: TLoginForm) => {
  try {
    const response = await ApiService.signIn(data);
    if (response?.access_token) {
      authStore.setToken(response.access_token);
      showSuccess('You are now logged in, YAY! ');
      await navigateTo('/settings');
    }
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.code) {
        case 'UNAUTHORIZED':
          showError('Invalid email or password');
          break;
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <LoginForm @submit="submit" />
  </div>
</template>

<style scoped></style>
