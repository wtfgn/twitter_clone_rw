import type { CreatedMediaFileData } from '../db/mediaFiles';

export type TransformedMedoaFileData = ReturnType<typeof mediaFileTransformer>;

export function mediaFileTransformer(mediaFile: CreatedMediaFileData) {
  return {
    id: mediaFile.id,
    url: mediaFile.url,
  };
}
