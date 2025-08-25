<script setup lang="ts">
import type { TUser } from '../types/formTypes/user/user.types';

const user = ref({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+491234567890',
});

const safeUser = (user: TUser) => {
  console.log(user);
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <SettingsCard :user="user" @safeUser="safeUser" />
  </div>
</template>

<style scoped></style>
