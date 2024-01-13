<template>
  <div>
    <!-- Header -->
    <TweetItemHeader :tweet="$props?.tweet" />

    <!-- Content -->
    <div :class="tweetBodyWrapper">
      <!-- Text -->
      <p
        class="flex-shrink font-medium text-gray-800 w-auto dark:text-white"
        :class="textSize"
      >
        {{ $props.tweet?.text }}
      </p>

      <!-- Image -->
      <div
        v-for="image in tweet?.mediaFiles" :key="image.id"
        class="flex my-3 mr-2 border-2 rounded-2xl"
        :class="twitterBorderColor"
      >
        <img :src="image.url" class="w-full rounded-2xl">
      </div>

      <!-- Actions Bar -->
      <div v-if="!$props.hideActions" class="mt-2">
        <TweetItemActions :tweet="$props.tweet" :compact="props.compact" @comment-click="handleCommentClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransformedTweetData } from '~/server/transformers/tweet';
import { useTailwindConfig } from '~/composables/useTailwindConfig';

const props = defineProps({
  tweet: {
    type: Object as PropType<TransformedTweetData | null>,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
  hideActions: {
    type: Boolean,
    default: false,
  },
});

const { twitterBorderColor } = useTailwindConfig();
const emitter = useEmitter();

const tweetBodyWrapper = computed(() => {
  return props.compact ? 'ml-16' : 'ml-2 mt-4';
});

const textSize = computed(() => {
  return props.compact ? 'text-base' : 'text-xl';
});

function handleCommentClick() {
  emitter.$emit('replyTweet', props.tweet);
}
</script>
