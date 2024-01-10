import bcrypt from 'bcrypt';
import { createRefreshToken } from '~/server/db/refreshTokens';
import { getUserByUsername } from '~/server/db/users';
import { userTransformer } from '~/server/transformers/user';
import { generateTokens, sendRefreshToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid params, missing username or password',
    }));
  }

  // Check if user exists
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(event, createError({
      statusCode: 404,
      statusMessage: 'User not found',
    }));
  }

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: 'Invalid password or username',
    }));
  }

  // Create session(generate token)
  // Access token
  // Refresh token
  const { accessToken, refreshToken } = generateTokens(user);

  // Save refresh token in db
  await createRefreshToken(refreshToken, user.id);

  // Add refresh token to cookie
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
