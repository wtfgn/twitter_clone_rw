import formidable from 'formidable';
import type { Fields, Files } from 'formidable';
import { createTweet } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformers/tweet';

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response: { fields: Fields<string>, files: Files<string> } = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err)
        reject(err);
      resolve({ fields, files });
    });
  });

  const { fields, files } = response;
  const userId: string = event.context?.auth?.user?.id;

  const tweetData = {
    text: fields.text ? fields.text.toString() : '',
    authorId: userId,
  };

  const tweet = await createTweet(tweetData);

  return {
    tweet: tweetTransformer(tweet),
  };
});
