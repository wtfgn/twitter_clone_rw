<template>
  <div>
    <MainSection title="Home" :loading="loading">
      <Head>
        <title>Home / Twitter</title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @submit="handleFormSubmit" />
      </div>

      <TweetListFeed :tweets="homeTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';

const { useAuthUser } = useAuth();
const { getTweets } = useTweets();
const { twitterBorderColor } = useTailwindConfig();
const user = useAuthUser();

const loading = ref(false);
const homeTweets = ref<TransformedTweetData[]>([]);

function handleFormSubmit(tweet: TransformedTweetData | Record<string, never>) {
  navigateTo({
    path: `/status/${tweet.id}`,
  });
}

onMounted(async () => {
  loading.value = true;
  const { tweets } = await getTweets() ?? {};
  homeTweets.value = tweets ?? [];
  loading.value = false;
});
</script>
