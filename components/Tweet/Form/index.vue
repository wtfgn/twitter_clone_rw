<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>

    <div v-else>
      <TweetItem v-if="props.replyTo && props.showReply" :tweet="props.replyTo" hide-actions />
      <TweetFormInput :user="$props.user" :placeholder="$props.placeholder" @on-submit="handleFormSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TweetFormData } from '~/composables/useTweets';
import type { TransformedTweetData } from '~/server/transformers/tweet';
import type { TransformedUserData } from '~/server/transformers/user';

const props = defineProps({
  user: {
    type: Object as PropType<TransformedUserData | null>,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'What\'s happening?',
  },
  replyTo: {
    type: Object as PropType<TransformedTweetData | null>,
    default: null,
  },
  showReply: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits({
  submit: (_: TransformedTweetData | Record<string, never>) => true,
});

const { postTweet } = useTweets();
const loading = ref(false);

async function handleFormSubmit(data: TweetFormData) {
  loading.value = true;
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: props.replyTo?.id,
    });
    emit('submit', response.data.value?.tweet ?? {});
  }
  catch (error) {
    console.error(error);
  }
  finally {
    loading.value = false;
  }
}
</script>
