<template>
  <div>
    <TweetItem :tweet="$props.tweet" />

    <TweetForm
      placeholder="Tweet your reply" :user="$props.user" :reply-to="$props.tweet"
      @submit="handleFormSubmit"
    />

    <TweetListFeed :tweets="replies" />
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';
import type { TransformedUserData } from '~/server/transformers/user';

const props = defineProps({
  tweet: {
    type: Object as PropType<TransformedTweetData | null>,
    required: true,
  },
  user: {
    type: Object as PropType<TransformedUserData>,
    required: true,
  },
});

const replies = computed(() => {
  return props.tweet?.replies ?? [];
});

function handleFormSubmit(tweet: TransformedTweetData | Record<string, never>) {
  navigateTo({
    path: `/status/${tweet.id}`,
  });
}
</script>
