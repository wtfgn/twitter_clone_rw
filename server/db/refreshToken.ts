import { prisma } from '.';

export async function createRefreshToken(refreshToken: string, userId: string) {
  const refreshTokenData = await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId,
    },
  });

  return refreshTokenData;
}

export async function getRefreshTokenByToken(token: string) {
  const refreshToken = await prisma.refreshToken.findUnique({
    where: {
      token,
    },
  });

  return refreshToken;
}
