<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label?: string;
  }>(),
  {
    label: 'switch label',
  }
);
const model = defineModel<boolean>();
</script>

<template>
  <div class="flex items-start justify-between w-full">
    <p class="text-black text-lg font-semibold">{{ props.label }}</p>
    <USwitch
      size="xl"
      :ui="{
        base:
          'border-2 border-black cursor-pointer drop-shadow-[4px_6px_0px_#000000] data-[state=checked]:bg-green-300 data-[state=unchecked]:bg-amber-50 bg-amber-50 w-[50px] h-[25px] px-[5px]',
        thumb: 'bg-[#c9a5ff] border-2 border-black my-1 w-[18px] h-[18px]',
      }"
      v-model="model"
    />
  </div>
</template>

<style scoped></style>
