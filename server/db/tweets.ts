import type { Prisma } from '@prisma/client';
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

export async function getTweets(params: Prisma.TweetFindManyArgs) {
  return await prisma.tweet.findMany({
    ...params,
  });
}

export async function getTweetById(tweetId: string, params?: Omit<Prisma.TweetFindUniqueArgs, 'where'>) {
  return await prisma.tweet.findUnique({
    ...params,
    where: {
      id: tweetId,
    },
  });
}
