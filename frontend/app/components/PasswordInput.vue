<script setup lang="ts">
const model = defineModel<string>({ required: true });
const showPassword = ref(false);
</script>

<template>
  <UFormField label="Password" name="password" class="pb-4">
    <UInput
      v-model="model"
      :type="showPassword ? 'text' : 'password'"
      :ui="{ trailing: 'pe-1' }"
      placeholder="Enter your password"
    >
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          :aria-pressed="showPassword"
          aria-controls="password"
          @click="showPassword = !showPassword"
        />
      </template>
    </UInput>
  </UFormField>
</template>

<style scoped></style>
