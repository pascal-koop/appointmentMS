<script setup lang="ts">
import LoginForm from '~/components/forms/LoginForm.vue';
import type { TLoginForm } from '~/types/formTypes/loginRegister.types';

const submit = (data: TLoginForm) => {
  console.log(data);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <LoginForm @submit="submit" />
  </div>
</template>

<style scoped></style>
