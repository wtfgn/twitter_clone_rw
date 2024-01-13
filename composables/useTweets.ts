import type { Prisma } from '@prisma/client';
import type { TransformedTweetData } from '~/server/transformers/tweet';

export interface TweetFormData {
  text: string
  mediaFiles?: File[]
  replyTo?: string
}

export function useTweets() {
  const usePostTweetModal = () => useState('post_tweet_modal', () => false);
  const useReplyTweet = () => useState<TransformedTweetData | null>('reply_tweet', () => null);
  const closePostTweetModal = () => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = false;
  };

  const setReplyTo = (tweet: TransformedTweetData | null) => {
    const replyTweet = useReplyTweet();
    replyTweet.value = tweet;
  };

  const openPostTweetModal = (tweet: TransformedTweetData | null = null) => {
    const postTweetModal = usePostTweetModal();
    postTweetModal.value = true;
    setReplyTo(tweet);
  };

  const postTweet = async (formData: TweetFormData) => {
    const form = new FormData();

    form.append('text', formData.text);
    form.append('replyTo', formData.replyTo ?? '');

    formData.mediaFiles?.forEach((mediaFile, index) => {
      form.append(`media_file_${index}`, mediaFile);
    });
    return await useFetchAPI<{ tweet: TransformedTweetData }>('/api/user/tweets', {
      method: 'POST',
      body: form,
    });
  };

  const getTweets = async (params = {}) => {
    try {
      const { data } = await useFetchAPI<{ tweets: TransformedTweetData[] }>('/api/tweets', {
        method: 'GET',
        params,
      });
      return data.value;
    }
    catch (error) {
      console.error(error);
    }
  };

  const getTweetById = async (tweetId: string) => {
    try {
      const { data } = await useFetchAPI<{ tweet: TransformedTweetData }>(`/api/tweets/${tweetId}`, {
        method: 'GET',
      });
      return data.value;
    }
    catch (error) {
      console.error(error);
    }
  };

  return {
    usePostTweetModal,
    closePostTweetModal,
    openPostTweetModal,
    postTweet,
    getTweets,
    getTweetById,
    useReplyTweet,
  };
}
