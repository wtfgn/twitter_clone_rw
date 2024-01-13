import { getTweetById } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string };
  const tweet = await getTweetById(id, {
    include: {
      author: true,
      mediaFiles: true,
      replyTo: {
        include: {
          author: true,
        },
      },
      replies: {
        include: {
          mediaFiles: true,
          author: true,
          replyTo: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  if (!tweet) {
    return sendError(event, createError({
      status: 404,
      message: 'Tweet not found',
    }));
  };

  return {
    tweet: tweetTransformer(tweet),
  };
});
