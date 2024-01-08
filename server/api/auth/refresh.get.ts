import { ref } from 'vue';
import { getRefreshTokenByToken } from '~/server/db/refreshTokens';
import { getUserById } from '~/server/db/users';
import { decodeRefreshToken, generateTokens } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);

  // Check if refresh token exists in cookies
  const refreshToken = cookies.refresh_token;
  if (!refreshToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Refresh token not found in cookies',
    }));
  }

  // Check if refresh token exists in db
  const rToken = await getRefreshTokenByToken(refreshToken);
  if (!rToken) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Refresh token not found in database',
    }));
  }

  // Check if refresh token is valid
  const token = decodeRefreshToken(refreshToken);
  if (!token) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Invalid refresh token',
    }));
  }

  try {
    const user = await getUserById(token.userId);

    if (!user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'User not found',
      }));
    }

    const { accessToken } = generateTokens(user);
    return { access_token: accessToken };
  }
  catch (error) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong',
    }));
  }
});
