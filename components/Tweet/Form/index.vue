<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>

    <div v-else>
      <TweetFormInput :user="$props.user" @on-submit="handleFormSubmit" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TweetFormData } from '~/composables/useTweets';

defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const { postTweet } = useTweets();
const loading = ref(false);

async function handleFormSubmit(data: TweetFormData) {
  loading.value = true;
  try {
    await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
    // const response = await postTweet({
    //   text: data.text,
    //   mediaFiles: data.mediaFiles,
    // });

    // console.log(response);
  }
  catch (error) {
    console.error(error);
  }
  finally {
    loading.value = false;
  }
}
</script>
