<script setup lang="ts">
import { SchedulerDayView } from '#components';
import { CalendarDate } from '@internationalized/date';
import { EBtnActive } from '~/components/scheduler/scheduler.types';

const date = ref<CalendarDate>();

const schedulerType = ref<EBtnActive>(EBtnActive.DAY);
const handleSchedulerView = (view: EBtnActive) => {
  schedulerType.value = view;
};

const viewComponents = {
  [EBtnActive.DAY]: SchedulerDayView,
  [EBtnActive.WEEK]: null,
  [EBtnActive.MONTH]: null,
};
</script>

<template>
  <div class="">
    <SchedulerNav
      v-model:date-model="date"
      @scheduler-view="handleSchedulerView"
    >
      <template #schedulerView>
        <component :is="viewComponents[schedulerType]"></component>
      </template>
    </SchedulerNav>
  </div>
</template>

<style scoped></style>
