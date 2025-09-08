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
  <UCard variant="solid" class="w-72 mx-auto">
    <template #header>
      <h1>login</h1>
    </template>
    <div class="flex flex-col items-center justify-center gap-4">
      <UForm :state="form" @submit.prevent="submit">
        <UFormField label="Email" name="email" class="pb-4">
          <UInput autocomplete="off" v-model="form.email" type="email" class="w-full" />
        </UFormField>
        <PasswordInput autocomplete="off" v-model:password="form.password" />
        <UButton type="submit" class="cursor-pointer">Login</UButton>
      </UForm>
    </div>
    <template #footer>
      No account?
      <NuxtLink to="/register" class="cursor-pointer text-amber-300 pl-2"> Go to Registration </NuxtLink>
    </template>
  </UCard>
</template>

<style scoped></style>
