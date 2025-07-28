<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import type { TLoginForm } from '../../types/formTypes/loginRegister.types';
import PasswordInput from '@/components/PasswordInput.vue';
const emits = defineEmits({
  submit: (data: TLoginForm) => data,
});

const form = ref<TLoginForm>({
  email: '',
  password: '',
});

const submit = (event: FormSubmitEvent<TLoginForm>) => {
  emits('submit', event.data);
};
</script>

<template>
  <UCard variant="subtle" class="w-72">
    <template #header>
      <h1>login</h1>
    </template>
    <div class="flex flex-col items-center justify-center gap-4">
      <UForm :state="form" @submit.prevent="submit">
        <UFormField label="Email" name="email" class="pb-4">
          <UInput
            v-model="form.email"
            placeholder="Enter your email"
            type="email"
            class="w-full"
          />
        </UFormField>
        <PasswordInput v-model="form.password" />
        <UButton type="submit" class="cursor-pointer">Login</UButton>
      </UForm>
      <p>
        No account? Go to
        <NuxtLink to="/register" class="cursor-pointer text-primary"
          >Registration</NuxtLink
        >
      </p>
    </div>
  </UCard>
</template>

<style scoped></style>
