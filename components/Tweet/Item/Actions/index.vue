<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue" :size="size" @click="$emit('commentClick')">
      <template #icon="{ classes }">
        <ChatBubbleOvalLeftEllipsisIcon :class="classes" />
      </template>

      <template v-if="showStats" #default>
        {{ $props.tweet?.repliesCount }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template #icon="{ classes }">
        <ArrowPathIcon :class="classes" />
      </template>

      <template v-if="showStats" #default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="red" :size="size">
      <template #icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template v-if="showStats" #default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue" :size="size">
      <template #icon="{ classes }">
        <ArrowUpTrayIcon :class="classes" />
      </template>

      <template v-if="showStats" #default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowPathIcon,
  ArrowUpTrayIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from '@heroicons/vue/24/outline';
import type { TransformedTweetData } from '~/server/transformers/tweet';

const props = defineProps({
  tweet: {
    type: Object as PropType<TransformedTweetData | null>,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['commentClick']);

const showStats = computed(() => props.compact);
const size = computed(() => props.compact ? 5 : 8);

function generateRandomNumber() {
  return Math.floor(Math.random() * 100);
}
</script>
