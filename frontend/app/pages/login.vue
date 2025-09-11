<script setup lang="ts">
import LoginForm from '~/components/forms/LoginForm.vue';
import { useAuthStore } from '~~/stores/auth/authStore';
import type { TSignInDto } from '~/utils/apis/auth';

const { showError, showSuccess } = useToaster();
const authStore = useAuthStore();

const loginUser = async (data: TSignInDto) => {
  try {
    await authStore.login(data);
    showSuccess('You are now logged in, YAY! ');
    await navigateTo('/settings');
  } catch (error) {
    if (data.email === '' && data.password === '') {
      showError('wtf?! you should fill the form with your email and password');
    } else if (data.email === '') {
      showError('Huh? your email is missing');
    } else if (data.password === '') {
      showError('Huh? your password is missing');
    } else if (error instanceof ApiError) {
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
  <div class="flex flex-col items-center justify-center h-screen my-auto">
    <LoginForm @submit="loginUser" />
  </div>
</template>

<style scoped></style>
