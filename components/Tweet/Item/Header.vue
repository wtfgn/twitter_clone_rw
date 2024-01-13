<template>
  <div class="flex p-4">
    <!-- Avatar -->
    <div>
      <img
        :src="author?.profileImage ?? ''" alt=""
        class="w-10 h-10 rounded-full"
      >
    </div>

    <div class="ml-3">
      <!-- User Name -->
      <span class="font-medium text-gray-800 dark:text-white">{{ author?.name }}</span>

      <!-- Handle & Time -->
      <span class="ml-3 text-sm font-medium text-gray-400">
        <NuxtLink to="#">
          {{ author?.handle }}
        </NuxtLink>
        {{ props.tweet?.postedAtHuman }}
      </span>

      <!-- Reply To -->
      <p v-if="$props.tweet?.replyTo" class="text-sm">
        <span class="text-gray-500">
          Replying to
        </span>

        <NuxtLink :to="replyToTweetUrl" class="text-blue-400">
          {{ $props.tweet?.replyTo.author?.handle }}
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';

const props = defineProps({
  tweet: {
    type: Object as PropType<TransformedTweetData | null>,
    required: true,
  },
});

const author = props.tweet?.author;
const replyToTweetUrl = computed(() => {
  return `/status/${props.tweet?.replyTo?.id}`;
});
</script>
