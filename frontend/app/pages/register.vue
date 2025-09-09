<script setup lang="ts">
import RegisterForm from '~/components/forms/RegisterForm.vue';
import type { TRegisterForm } from '~/types/formTypes/loginRegister.types';
import { ApiService, ApiError } from '~/utils/api';

const { showError, showSuccess } = useToaster();

const submit = async (data: TRegisterForm) => {
  delete (data as any).passwordComparission;

  const registrationData = {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone || '',
  };

  try {
    await ApiService.createUser(registrationData);

    showSuccess('You are now registered, YAY! ');
  } catch (error) {
    console.error(error);
    if (error instanceof ApiError) {
      switch (error.code) {
        case 'CONFLICT':
          showError(
            'This email is already registered. Please use a different email or try logging in.'
          );
          break;
        default:
          showError('An unexpected error occurred. Please try again.');
      }
    }
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen xs:mx-2">
    <RegisterForm @submit="submit" />
  </div>
</template>

<style scoped>
:deep(.shadcn-input) {
  color: #ffd700;
}
</style>
