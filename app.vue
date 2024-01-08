<template>
  <div :class="{ dark: isDark }">
    <div class="bg-white dark:bg-gray-900">
      <LoadingPage v-if="isAuthLoading" />

      <!-- App -->
      <div v-else-if="user.id" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left Sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft />
            </div>
          </div>
          <!-- Main Content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <RouterView />
          </main>

          <!-- Right Sidebar -->
          <div class="hidden col-span-12 md:block md:col-span-3 xl:col-span-4">
            <div class="sticky top-0">
              <SidebarRight />
            </div>
          </div>
        </div>
      </div>

      <AuthPage v-else />

      <button
        class="fixed bottom-4 right-4 p-2 rounded-full bg-blue-500 text-white dark:bg-blue-900 dark:text-white"
        @click="isDark = !isDark"
      >
        Toggle Dark Mode
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDark = ref(false);
const { useAuthUser, initAuth, useAuthLoading } = useAuth();
const isAuthLoading = useAuthLoading();
const user = useAuthUser();

// The user object wrapped in a proxy always return true
// even if the user is not logged in

// Note: onBeforeMount doesn't work here
// Does not work for SSR
onMounted(async () => {
  await initAuth();
});
</script>
