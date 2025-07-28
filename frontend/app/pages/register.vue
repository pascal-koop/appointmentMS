<script setup lang="ts">
import RegisterForm from '~/components/forms/RegisterForm.vue';
import type { TRegisterForm } from '~/types/formTypes/loginRegister.types';
import { ApiService } from '~/utils/api';
const { showError, showSuccess } = useToaster();
const submit = async (data: TRegisterForm) => {
  delete (data as any).passwordComparission;
  const registrationData = {
    ...data,
  };
  try {
    const response = await ApiService.createUser(registrationData);
    console.log(response);
    showSuccess('You are now registered, YAY! ');
  } catch (error) {
    showError();
    console.error(error);
  }
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <RegisterForm @submit="submit" />
  </div>
</template>

<style scoped></style>
