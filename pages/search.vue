<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <title>Search</title>
      </Head>

      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';

const { getTweets } = useTweets();
const loading = ref(false);
const searchTweets = ref<TransformedTweetData[]>([]);
const searchQuery = useRoute().query.q;

watch(() => useRoute().fullPath, async () => {
  loading.value = true;
  const { tweets } = await getTweets({
    query: searchQuery,
  }) ?? {};
  searchTweets.value = tweets ?? [];
  loading.value = false;
});

onMounted(async () => {
  loading.value = true;
  const { tweets } = await getTweets({
    query: searchQuery,
  }) ?? {};
  searchTweets.value = tweets ?? [];
  loading.value = false;
});
</script>
