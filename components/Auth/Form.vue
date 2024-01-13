<template>
  <div class="w-full">
    <div class="flex justify-center">
      <div class="w-10 h-10">
        <LogoTwitter />
      </div>
    </div>

    <div class="pt-5 space-y-6">
      <UIInput v-model="data.username" label="Username" placeholder="@username" />

      <UIInput v-model="data.password" label="Password" placeholder="*********" type="password" />

      <div>
        <button
          type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent
           rounded-full shadow-sm text-sm font-medium text-white bg-blue-500
           hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          :disabled="isButtonDisabled"
          @click="handleLogin"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { login } = useAuth();

const data = ref({
  username: '',
  password: '',
  loading: false,
});

const isButtonDisabled = computed(() => {
  return !data.value.username || !data.value.password || data.value.loading;
});

async function handleLogin() {
  data.value.loading = true;
  try {
    await login({
      username: data.value.username,
      password: data.value.password,
    });
  }
  catch (error) {
    console.error(error);
  }
  finally {
    data.value.loading = false;
  }
}
</script>
