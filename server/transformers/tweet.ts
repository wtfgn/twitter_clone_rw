import type { CreatedTweetData } from '../db/tweets';

export type TransformedTweetData = ReturnType<typeof tweetTransformer>;

export function tweetTransformer(tweet: CreatedTweetData) {
  return {
    id: tweet.id,
    text: tweet.text,
  };
}
