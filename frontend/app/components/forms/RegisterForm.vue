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

const passwordToCompareWith = ref<string>('');
const submit = (event: FormSubmitEvent<TSchema>) => {
  emits('submit', event.data);
};

const showPasswordCompareMessage = computed(() => {
  return passwordToCompareWith.value !== registerForm.value.password ? true : false;
});
</script>

<template>
  <UCard variant="solid" class="w-80 mx-auto">
    <template #header>
      <h1>Register to never miss an appointment</h1>
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
        <PasswordInput v-model="registerForm.password" :required="true" />
        <UFormField
          label="Confirm Password"
          name="password"
          class="pb-1"
          :required="true"
        >
          <UInput v-model="passwordToCompareWith" type="password" class="w-full" />
          <p
            v-if="showPasswordCompareMessage"
            class="text-error pt-2 pb-0 font-light text-xs"
          >
            Passwords do not match
          </p>
        </UFormField>
        <p class="text-xs text-gray-500 pb-4">
          <span class="text-red-500">*</span> Required fields
        </p>
        <UButton variant="solid" type="submit" class="cursor-pointer text-black"
          >Register</UButton
        >
      </UForm>
    </div>
    <template #footer>
      Do you have an Account?
      <NuxtLink to="/login" class="text-amber-300 pl-2 cursor-pointer">Login</NuxtLink>
    </template>
  </UCard>
</template>

<style scoped></style>
