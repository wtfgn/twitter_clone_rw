<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">
        No tweets yet.
      </p>
    </div>

    <div
      v-for="tweet in $props.tweets ?? []" :key="tweet.id"
      class="pb-4 border-b hover:bg-gray-100 cursor-pointer dark:hover:bg-dim-300"
      :class="[twitterBorderColor, defaultTransition]"
      @click="redirect(tweet)"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';

const props = defineProps({
  tweets: {
    type: Array as PropType<TransformedTweetData[] | undefined>,
    required: true,
  },
});

const { twitterBorderColor, defaultTransition } = useTailwindConfig();

const isEmptyArray = computed(() => {
  return props.tweets?.length === 0;
});

function redirect(tweet: TransformedTweetData) {
  navigateTo({
    path: `/status/${tweet.id}`,
  });
}
</script>
