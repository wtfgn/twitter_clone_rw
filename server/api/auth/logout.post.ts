import { removeRefreshToken } from '~/server/db/refreshTokens';

export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);
    const refreshToken = cookies.refresh_token;
    await removeRefreshToken(refreshToken);
  }
  catch (error) {
    console.error(error);
  }

  sendRefreshToken(event, '');

  return {
    message: 'Logged out',
  };
});
