<script setup lang="ts">
import {
  today,
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from '@internationalized/date';
import type { DropdownMenuItem } from '@nuxt/ui';
import { EBtnActive } from './scheduler.types';

const emit = defineEmits<{
  (e: 'schedulerView', view: EBtnActive): void;
}>();

const activeButton = ref<EBtnActive>(EBtnActive.DAY);
const setActiveBtn = (buttonName: EBtnActive) => {
  emit('schedulerView', buttonName);
  activeButton.value = buttonName;
};

const df = new DateFormatter('de', {
  dateStyle: 'medium',
});

const dateModel = defineModel<CalendarDate>('dateModel');
const todaysDate = today('Europe/Berlin');
if (!dateModel.value) {
  dateModel.value = new CalendarDate(
    todaysDate.year,
    todaysDate.month,
    todaysDate.day
  );
}

const changeDay = (change: string) => {
  if (!dateModel.value) return;
  if (change === 'decrease') {
    return (dateModel.value = dateModel.value.subtract({ days: 1 }));
  }
  if (change === 'increase')
    return (dateModel.value = dateModel.value.add({ days: 1 }));
};

const dropdownItems = computed<DropdownMenuItem[]>(() => [
  {
    label: 'Day',
    onSelect(e: Event) {
      setActiveBtn(EBtnActive.DAY);
    },
    class: `text-black font-medium bg-amber-300 ${
      activeButton.value === EBtnActive.DAY ? 'active' : ''
    }`,
  },
  {
    label: 'Week',
    onSelect(e: Event) {
      setActiveBtn(EBtnActive.WEEK);
    },
    class: `text-black font-medium bg-amber-300 ${
      activeButton.value === EBtnActive.WEEK ? 'active' : ''
    }`,
  },
  {
    label: 'Month',
    onSelect(e: Event) {
      console.log(e);
      setActiveBtn(EBtnActive.MONTH);
    },
    class: `text-black font-medium bg-amber-300 ${
      activeButton.value === EBtnActive.MONTH ? 'active' : ''
    }`,
  },
]);
</script>

<template>
  <nav
    class="flex items-center-safe justify-between border-b-2 bg-blue-200 min-h-16 px-3"
  >
    <div class="">
      <UButton
        class="mr-4 hidden md:inline-flex"
        icon="ic:baseline-arrow-back-ios-new"
        @click="changeDay('decrease')"
      />
      <UButton
        class="mr-5 hidden md:inline-flex"
        icon="ic:baseline-arrow-forward-ios"
        @click="changeDay('increase')"
      />

      <UPopover>
        <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
          {{
            dateModel
              ? df.format(dateModel.toDate(getLocalTimeZone()))
              : 'Select a date'
          }}
        </UButton>

        <template #content>
          <UCalendar v-model="dateModel" class="p-2" />
        </template>
      </UPopover>
    </div>
    <div class="hidden md:flex gap-4 items-center">
      <UButton
        class="text-black font-medium bg-amber-300"
        :class="{ active: activeButton === EBtnActive.DAY }"
        @click="setActiveBtn(EBtnActive.DAY)"
        label="Day"
      />
      <UButton
        class="text-black font-medium bg-amber-300"
        :class="{ active: activeButton === EBtnActive.WEEK }"
        @click="setActiveBtn(EBtnActive.WEEK)"
        label="Week"
      />
      <UButton
        class="text-black font-medium bg-amber-300"
        :class="{ active: activeButton === EBtnActive.MONTH }"
        @click="setActiveBtn(EBtnActive.MONTH)"
        label="Month"
      />
    </div>
    <div class="md:hidden flex gap-4 items-center">
      <UDropdownMenu :items="dropdownItems">
        <UButton icon="i-lucide-menu" color="neutral" label="Views" />
      </UDropdownMenu>
    </div>
  </nav>
  <main>
    <slot name="schedulerView"></slot>
  </main>
</template>

<style>
@reference "tailwindcss";
.active {
  @apply bg-[#ff60b4] text-white font-bold  border-3 rounded-none border-black  drop-shadow-[4px_6px_0px_#000000];
}
</style>
