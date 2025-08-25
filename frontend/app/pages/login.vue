<script setup lang="ts">
import LoginForm from '~/components/forms/LoginForm.vue';
import type { TLoginForm } from '~/types/formTypes/loginRegister.types';
import { ApiService } from '~/utils/api';

const { showError, showSuccess } = useToaster();
const submit = async (data: TLoginForm) => {
  try {
    await ApiService.signIn(data);
    showSuccess('You are now logged in, YAY! ');
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
