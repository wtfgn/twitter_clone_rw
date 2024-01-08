import jwt from 'jsonwebtoken';
import type { H3Event } from 'h3';
import type { CreatedUserData } from '@/server/db/users';

function generateAccessToken(user: CreatedUserData) {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtAccessTokenSecret, {
    expiresIn: '10m',
  });
};

function generateRefreshToken(user: CreatedUserData) {
  const config = useRuntimeConfig();

  return jwt.sign({ userId: user.id }, config.jwtRefreshTokenSecret, {
    expiresIn: '7d',
  });
};

export function decodeRefreshToken(refreshToken: string) {
  const config = useRuntimeConfig();

  try {
    return (<jwt.JwtPayload>jwt.verify(refreshToken, config.jwtRefreshTokenSecret));
  }
  catch (error) {
    return null;
  }
};

export function decodeAccessToken(accessToken: string) {
  const config = useRuntimeConfig();

  try {
    return (<jwt.JwtPayload>jwt.verify(accessToken, config.jwtAccessTokenSecret));
  }
  catch (error) {
    return null;
  }
};

export function generateTokens(user: CreatedUserData) {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
}

export function sendRefreshToken(event: H3Event, refreshToken: string) {
  setCookie(event, 'refresh_token', refreshToken, {
    httpOnly: true,
    sameSite: true,
  });
}
