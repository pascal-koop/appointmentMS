<script setup lang="ts">
import LoginForm from '~/components/forms/LoginForm.vue';
import type { TLoginForm } from '~/types/formTypes/loginRegister.types';
import { ApiService } from '~/utils/api';
import { useAuthStore } from '~~/stores/auth/authStore';
const { showError, showSuccess } = useToaster();

const authStore = useAuthStore();
const loginUser = async (data: TLoginForm) => {
  try {
    await ApiService.signIn(data);
    authStore.isAuthenticated = true;
    showSuccess('You are now logged in, YAY! ');
    await navigateTo('/settings');
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
    <LoginForm @submit="loginUser" />
  </div>
</template>

<style scoped></style>
