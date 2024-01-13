import type { CreatedTweetData } from '../db/tweets';
import type { CreatedMediaFileData } from '../db/mediaFiles';
import type { CreatedUserData } from '../db/users';
import { human } from '../utils/date';
import { mediaFileTransformer } from './mediaFiles';
import { userTransformer } from './user';

export interface TransformedTweetData {
  id: string
  text: string
  mediaFiles: ReturnType<typeof mediaFileTransformer>[]
  author: ReturnType<typeof userTransformer> | null
  replies: TransformedTweetData[]
  replyTo: TransformedTweetData | null
  repliesCount: number
  postedAtHuman: string
}

export type ExtendedTweetData = CreatedTweetData & {
  author?: CreatedUserData
  mediaFiles?: CreatedMediaFileData[]
  replies?: CreatedTweetData[]
  replyTo?: CreatedTweetData
};

export function tweetTransformer(tweet: ExtendedTweetData): TransformedTweetData {
  return {
    id: tweet.id,
    text: tweet.text,
    mediaFiles: tweet.mediaFiles ? tweet.mediaFiles.map(mediaFileTransformer) : [],
    author: tweet.author ? userTransformer(tweet.author) : null,
    replies: tweet.replies ? tweet.replies.map(tweetTransformer) : [],
    replyTo: tweet.replyTo ? tweetTransformer(tweet.replyTo) : null,
    repliesCount: tweet.replies ? tweet.replies.length : 0,
    postedAtHuman: human(tweet.createdAt),
  };
}
