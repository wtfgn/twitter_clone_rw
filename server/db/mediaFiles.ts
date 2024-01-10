import { prisma } from '.';
import type { PromiseType } from '~/types/utility';

export interface BaseMediaFileData {
  url: string
  providerPublicId: string
  userId: string
  tweetId: string
}

export type CreatedMediaFileData = PromiseType<ReturnType<typeof createMediaFile>>;

export async function createMediaFile(mediaFileData: BaseMediaFileData) {
  const mediaFile = await prisma.mediaFile.create({
    data: mediaFileData,
  });

  return mediaFile;
}
