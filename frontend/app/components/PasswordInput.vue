<script setup lang="ts">
const password = defineModel<string>('password', { required: true });
const passwordComparission = defineModel<string>('passwordComparission');
const showPassword = ref(false);

const props = withDefaults(
  defineProps<{
    showPasswordConfirmation?: boolean;
    passwordLabel?: string;
  }>(),
  {
    showPasswordConfirmation: false,
    passwordLabel: 'Password',
  }
);
</script>

<template>
  <div>
    <UFormField :label="passwordLabel" name="password" class="pb-4">
      <UInput
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showPassword ? 'i-mingcute-eye-close-fill' : 'i-mingcute-eye-fill'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            aria-controls="password"
            @click="showPassword = !showPassword"
            class="text-black"
          />
        </template>
      </UInput>
    </UFormField>
    <UFormField
      v-if="props.showPasswordConfirmation"
      label="Confirm Password"
      name="passwordConfirmation"
      class="pb-4"
    >
      <UInput type="password" v-model="passwordComparission" />
    </UFormField>
  </div>
</template>

<style scoped></style>
