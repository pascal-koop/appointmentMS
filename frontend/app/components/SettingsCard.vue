<script setup lang="ts">
import Switch from './toggles/Switch.vue';
import type { TUser } from '~/utils/apis/user';
import { z } from 'zod';
const props = withDefaults(
  defineProps<{
    user: Omit<TUser, 'password'>;
    loading: boolean;
  }>(),
  {
    loading: true,
  }
);
type TUserExtended = Omit<TUser, 'id'> & { password: string };
const emit = defineEmits<{
  (e: 'saveUserData', data: TUserExtended): void;
  (e: 'saveNotificationSettings', data: typeof notificationSettings.value): void;
  (e: 'logout'): void;
}>();

type TSchema = z.output<typeof baseSchema>;
const user = ref<TSchema & TUserExtended>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
});
watch(
  () => props.user,
  (newUser) => {
    if (!newUser) return;
    user.value = {
      first_name: newUser.first_name ?? '',
      last_name: newUser.last_name ?? '',
      email: newUser.email ?? '',
      phone: newUser.phone ?? '',
      password: '',
    };
  },
  { immediate: true }
);
const notificationSettings = ref({
  email: true,
  sms: false,
});

const saveNotificationSettings = () => {
  notificationSettingsChanged.value = false;
  emit('saveNotificationSettings', notificationSettings.value);
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
  first_name: z.string().min(1).optional(),
  last_name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8, 'Password must be at least 8 characters').optional().or(z.literal('')),
});

const saveUser = () => {
  console.log('save1');
  if (baseSchema.safeParse(user.value).success) {
    emit('saveUserData', user.value);
    changeData.value = false;
  }
  return;
};

const logout = () => {
  emit('logout');
};
</script>

<template>
  <UCard variant="solid" class="mx-auto bg-[#ffd700] flex flex-row flex-wrap gap-20 overflow-y-auto">
    <template #header>
      <div class="flex flex-col items-start justify-around mt-12">
        <h3 class="text-4xl font-bold mb-7">Settings</h3>
        <UButton variant="solid" class="bg-[#ff60b4] text-black mt-4" @click="logout">Logout</UButton>
      </div>
    </template>
    <div v-if="props.loading" class="flex flex-col gap-4">
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
      <USkeleton class="h-4 w-[250px]" />
    </div>
    <div v-else class="flex flex-row flex-wrap gap-20">
      <UForm :schema="baseSchema" :state="user" @submit.once="saveUser">
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
            <UButton
              @click="saveUser"
              type="submit"
              v-if="changeData"
              variant="solid"
              class="bg-[#ff60b4] text-black mt-4 cursor-pointer"
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
