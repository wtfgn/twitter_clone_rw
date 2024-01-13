import UrlPattern from 'url-pattern';
import { decodeAccessToken } from '../utils/jwt';
import { getUserById } from '../db/users';

export default defineEventHandler(async (event) => {
  const endpoints = [
    '/api/auth/user',
    '/api/user/tweets',
    '/api/tweets',
    '/api/tweets/:id',
  ];

  const isHandledByMiddleware = endpoints.some((endpoint) => {
    const pattern = new UrlPattern(endpoint);
    const match = pattern.match(event.node.req.url || '');

    return match;
  });

  if (!isHandledByMiddleware)
    return;

  // Get access token from headers
  const token = event.node.req.headers.authorization?.split(' ')[1] || '';

  const decoded = decodeAccessToken(token);

  if (!decoded) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: Access token not found',
    }));
  };

  try {
    const userId = decoded.userId;
    const user = await getUserById(userId);
    event.context.auth = { user };
  }
  catch (error) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }));
  }
});
