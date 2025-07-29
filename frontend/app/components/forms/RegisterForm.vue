<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { TRegisterForm } from '~/types/formTypes/loginRegister.types';
import PasswordInput from '~/components/PasswordInput.vue';
const emits = defineEmits({
  submit: (data: TRegisterForm) => data,
});
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must at least 8 characters'),
  firstName: z.string().min(2, 'Must at least 2 characters'),
  lastName: z.string(),
  phone: z.string().min(10, 'Must at least 10 characters'),
  passwordComparission: z.string(),
});
type TSchema = z.output<typeof schema>;

const registerForm = ref<Partial<TSchema> & TRegisterForm>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  passwordComparission: '',
});
const isDisabled = computed(() => {
  return (
    registerForm.value.firstName === '' ||
    registerForm.value.lastName === '' ||
    registerForm.value.email === '' ||
    registerForm.value.password === '' ||
    registerForm.value.passwordComparission === '' ||
    registerForm.value.password !== registerForm.value.passwordComparission
  );
});
const passwordToCompareWith = ref<string>('');
const submit = (event: FormSubmitEvent<TSchema>) => {
  emits('submit', event.data);
};

const showPasswordCompareMessage = computed(() => {
  return passwordToCompareWith.value !== registerForm.value.password ? true : false;
});
</script>

<template>
  <UCard variant="subtle" class="w-72 mx-4">
    <template #header>
      <h1>Register</h1>
    </template>
    <div class="flex flex-col items-center justify-center gap-4">
      <UForm :schema="schema" :state="registerForm" @submit.prevent="submit">
        <UFormField label="First Name" name="firstName" class="pb-4">
          <UInput v-model="registerForm.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Last Name" name="lastName" class="pb-4">
          <UInput v-model="registerForm.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Phone" name="phone" class="pb-4">
          <UInput v-model="registerForm.phone" class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email" class="pb-4">
          <UInput v-model="registerForm.email" class="w-full" />
        </UFormField>
        <PasswordInput v-model="registerForm.password" />
        <UFormField label="Confirm Password" name="password" class="pb-4">
          <UInput v-model="passwordToCompareWith" type="password" class="w-full" />
          <p
            v-if="showPasswordCompareMessage"
            class="text-error pt-2 pb-0 font-light text-xs"
          >
            Passwords do not match
          </p>
        </UFormField>
        <UButton :disabled="isDisabled" type="submit" class="cursor-pointer"
          >Register</UButton
        >
      </UForm>
      <p>
        Do you have an Account?
        <NuxtLink to="/login" class="cursor-pointer text-primary">Login</NuxtLink>
      </p>
    </div>
  </UCard>
</template>

<style scoped></style>
