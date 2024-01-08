import { sendError } from '#imports';
import { type RegisteredUserData, createUser } from '~/server/db/users';
import { userTransformer } from '~/server/transformers/user';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  // User data validation
  const {
    username,
    email,
    password,
    repeatPassword,
    name,
  } = body as RegisteredUserData;

  if (!username || !email || !password || !repeatPassword || !name) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid params',
    }));
  }

  if (password !== repeatPassword) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Passwords do not match',
    }));
  }

  // Create user
  const userData = {
    username,
    email,
    password,
    name,
    profileImage: 'https://picsum.photos/200/200',
  };

  const user = await createUser(userData);

  return {
    body: userTransformer(user),
  };
});
