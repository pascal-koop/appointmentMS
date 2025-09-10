<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import type { TRegisterForm } from '~/types/formTypes/loginRegister.types';
import PasswordInput from '~/components/PasswordInput.vue';

const emits = defineEmits({
  submit: (data: TRegisterForm) => data,
});

const schema = z
  .object({
    email: z.string().email('Invalid email'),
    firstName: z.string().min(2, 'Must at least 2 characters'),
    lastName: z.string().min(1, 'Last name is required'),
    phone: z.string().optional(),
    password: z.string().min(8, 'Must at least 8 characters'),
    passwordComparission: z.string().min(8, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordComparission, {
    message: "Passwords don't match",
    path: ['passwordComparission'],
  });

type TSchema = z.output<typeof schema>;

const registerForm = ref<Partial<TSchema> & TRegisterForm>({
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  password: '',
  passwordComparission: '',
});

const submit = (event: FormSubmitEvent<TSchema>) => {
  emits('submit', event.data);
};
</script>

<template>
  <UCard variant="solid" class="w-80 mx-auto">
    <template #header>
      <h1>Register and never miss an appointment</h1>
    </template>
    <div class="flex flex-col items-center justify-center gap-4">
      <UForm :schema="schema" :state="registerForm" @submit.prevent="submit">
        <UFormField label="First Name" name="firstName" class="pb-4" :required="true">
          <UInput v-model="registerForm.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Last Name" name="lastName" class="pb-4" :required="true">
          <UInput v-model="registerForm.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Phone" name="phone" class="pb-4">
          <UInput v-model="registerForm.phone" class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email" class="pb-4" :required="true">
          <UInput v-model="registerForm.email" class="w-full" />
        </UFormField>
        <PasswordInput
          v-model:password="registerForm.password"
          v-model:passwordComparission="registerForm.passwordComparission"
          :required="true"
          :showPasswordConfirmation="true"
        />
        <!-- <UFormField
          label="Confirm Password"
          name="passwordComparission"
          class="pb-1"
          :required="true"
        >
          <UInput
            v-model="registerForm.passwordComparission"
            type="password"
            class="w-full"
          />
        </UFormField> -->
        <p class="text-xs text-black pb-4 font-bold"><span class="text-red-500">*</span> Required fields</p>
        <UButton variant="solid" type="submit" class="cursor-pointer text-black">Register</UButton>
      </UForm>
    </div>
    <template #footer>
      Do you have an Account?
      <NuxtLink to="/login" class="text-amber-300 pl-2 cursor-pointer">Login</NuxtLink>
    </template>
  </UCard>
</template>

<style scoped></style>
