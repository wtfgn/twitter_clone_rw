<template>
  <div>
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <title>Home / Twitter</title>
      </Head>

      <TweetDetails v-if="tweet" :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';

const { getTweetById } = useTweets();
const { useAuthUser } = useAuth();
const loading = ref(false);
const tweet = ref<TransformedTweetData | null>(null);
const user = useAuthUser();

function getTweetIdFromRoute() {
  return useRoute().params.id;
}

async function getTweet() {
  loading.value = true;
  try {
    const tweetId = getTweetIdFromRoute();
    if (typeof tweetId === 'string') {
      const { tweet } = await getTweetById(tweetId) ?? {};
      return tweet;
    }
  }
  catch (error) {
    console.error(error);
  }
  finally {
    loading.value = false;
  }
}

onMounted(async () => {
  tweet.value = await getTweet() ?? null;
});
</script>
