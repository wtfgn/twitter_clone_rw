<template>
  <div :class="{ dark: isDark }">
    <div class="bg-white dark:bg-gray-900">
      <!-- Loading -->
      <LoadingPage v-if="isAuthLoading" />

      <!-- App -->
      <div v-else-if="isLoggedIn" class="min-h-full">
        <div class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5">
          <!-- Left Sidebar -->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <SidebarLeft
                :user="user"
                @tweet="handleOpenTweetModal"
                @logout="handleUserLogout"
              />
            </div>
          </div>
          <!-- Main Content -->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
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

      <UIModal :is-open="postTweetModal" @close="handleModalClose">
        <TweetForm :user="user" :reply-to="replyTweet" show-reply @submit="handleFormSubmit" />
      </UIModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from './server/transformers/tweet';

const isDark = ref(false);
const { useAuthUser, initAuth, useAuthLoading, logout } = useAuth();
const { closePostTweetModal, openPostTweetModal, usePostTweetModal, useReplyTweet } = useTweets();
const isAuthLoading = useAuthLoading();
const user = useAuthUser();

const postTweetModal = usePostTweetModal();
const emitter = useEmitter();
const replyTweet = useReplyTweet();

emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet as TransformedTweetData);
});

emitter.$on('toggleDarkMode', () => {
  isDark.value = !isDark.value;
});

const isLoggedIn = computed(() => {
  return user.value?.id !== undefined;
});

function handleFormSubmit(tweet: TransformedTweetData | Record<string, never>) {
  closePostTweetModal();
  navigateTo({
    path: `/status/${tweet.id}`,
  });
}

function handleModalClose() {
  closePostTweetModal();
}

function handleOpenTweetModal() {
  openPostTweetModal(null);
}

function handleUserLogout() {
  logout();
}

// The user object wrapped in a proxy always return true
// even if the user is not logged in

// Note: onBeforeMount doesn't work here
// Does not work for SSR
onMounted(async () => {
  await initAuth();
});
</script>
