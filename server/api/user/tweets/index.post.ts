import formidable from 'formidable';
import type { Fields, Files } from 'formidable';
import { createMediaFile } from '~/server/db/mediaFiles';
import { createTweet } from '~/server/db/tweets';
import { tweetTransformer } from '~/server/transformers/tweet';
import { uploadToCloudinary } from '~/server/utils/cloudinary';

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
    replyToId: null as string | null,
  };

  const replyTo = fields.replyTo ? fields.replyTo.toString() : '';
  if (replyTo && replyTo !== 'null' && replyTo !== 'undefined')
    tweetData.replyToId = replyTo;

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    const keyFiles = files[key];
    const firstKeyFile = keyFiles?.[0];
    const path = firstKeyFile?.filepath || '';

    const cloudinaryResponse = await uploadToCloudinary(path);

    return createMediaFile({
      url: cloudinaryResponse?.secure_url || '',
      providerPublicId: cloudinaryResponse?.public_id || '',
      userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    tweet: tweetTransformer(tweet),
  };
});
