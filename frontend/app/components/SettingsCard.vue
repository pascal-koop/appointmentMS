<script setup lang="ts">
import type { TUser } from '../types/formTypes/user/user.types';
import Switch from './toggles/Switch.vue';
import { z } from 'zod';
const props = defineProps<{
  user: Omit<TUser, 'password'>;
}>();

const emits = defineEmits({
  safeUser: (data: TUser) => data,
  saveNotificationSettings: (data: typeof notificationSettings.value) => data,
});
type TSchema = z.output<typeof baseSchema>;
const user = ref<TSchema & TUser>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
});

const notificationSettings = ref({
  email: true,
  sms: false,
});

const saveNotificationSettings = () => {
  notificationSettingsChanged.value = false;
  emits('saveNotificationSettings', notificationSettings.value);
};

const notificationSettingsChanged = ref(false);

const showNotificationSaveBtn = () => {
  notificationSettingsChanged.value = true;
  nextTick(() => {
    const saveBtn = document.querySelector('#notification-save-btn');
    if (saveBtn) {
      saveBtn.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    } else {
      window.scrollBy({ top: 300, behavior: 'smooth' });
    }
  });
};

const changeData = ref(false);

const baseSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
});

const safeUser = () => {
  if (baseSchema.safeParse(user.value).success) {
    emits('safeUser', user.value);
  }
  return;
};
</script>

<template>
  <UCard variant="solid" class="mx-auto bg-[#ffd700] flex flex-row flex-wrap gap-20 overflow-y-auto">
    <template #header>
      <div class="flex flex-col items-start justify-around mt-12">
        <h3 class="text-4xl font-bold mb-7">Settings</h3>
        <UButton variant="solid" class="bg-[#ff60b4] text-black mt-4">Logout</UButton>
      </div>
    </template>
    <div class="flex flex-row flex-wrap gap-20">
      <UForm :schema="baseSchema" :state="user" @submit.prevent="safeUser">
        <div class="flex flex-col items-start gap-4">
          <h3 class="text-3xl font-bold text-black mb-4">User</h3>
          <div>
            <p class="text-black text-lg font-semibold">First Name: {{ props.user.first_name }}</p>
            <UInput class="mb-2" v-if="changeData" type="text" v-model="user.first_name" />
          </div>
          <div>
            <p class="text-black text-lg font-semibold">Last Name: {{ props.user.last_name }}</p>
            <UInput class="mb-2" v-if="changeData" type="text" v-model="user.last_name" />
          </div>
          <div>
            <p class="text-black text-lg font-semibold">Phone: {{ props.user.phone }}</p>
            <UInput class="mb-2" v-if="changeData" type="text" v-model="user.phone" />
          </div>
          <div>
            <p class="text-black text-lg font-semibold">Email: {{ props.user.email }}</p>
            <UInput class="mb-2" v-if="changeData" type="text" v-model="user.email" />
          </div>
          <div>
            <p class="text-black text-lg font-semibold">Password: *********</p>
            <PasswordInput
              v-model:password="user.password"
              passwordLabel="New Password"
              class="mb-2"
              v-if="changeData"
            />
          </div>
          <div class="flex gap-4">
            <UButton
              variant="solid"
              class="bg-[#ff60b4] text-black mt-4 cursor-pointer"
              @click="changeData = !changeData"
            >
              {{ changeData ? 'Abort' : 'Change Data' }}
            </UButton>
            <UButton type="submit" v-if="changeData" variant="solid" class="bg-[#ff60b4] text-black mt-4 cursor-pointer"
              >Save</UButton
            >
          </div>
        </div>
      </UForm>
      <div class="flex flex-col items-start gap-8">
        <UForm :state="notificationSettings" @submit.prevent="saveNotificationSettings">
          <h3 class="text-3xl font-bold text-black mb-4">Notifications</h3>
          <Switch v-model="notificationSettings.email" label="Email" class="mb-5" @click="showNotificationSaveBtn" />
          <Switch v-model="notificationSettings.sms" label="SMS" class="mb-5" @click="showNotificationSaveBtn" />
          <UButton
            type="submit"
            v-if="notificationSettingsChanged"
            variant="solid"
            id="notification-save-btn"
            class="bg-[#ff60b4] text-black mt-4 cursor-pointer"
            >Save</UButton
          >
        </UForm>
      </div>
    </div>
  </UCard>
</template>

<style scoped></style>
