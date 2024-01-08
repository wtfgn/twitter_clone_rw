import { prisma } from '.';
import type { PromiseType } from '~/types/utility';

export type CreatedTweetData = PromiseType<ReturnType<typeof createTweet>>;

export async function createTweet(tweetData: {
  text: string
  authorId: string
}) {
  const tweet = await prisma.tweet.create({
    data: tweetData,
  });

  return tweet;
}
