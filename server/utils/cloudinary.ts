import type { UploadApiResponse } from 'cloudinary';
import { v2 as _cloudinary } from 'cloudinary';

function cloudinary() {
  const config = useRuntimeConfig();

  _cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  return _cloudinary;
};

export async function uploadToCloudinary(image: string) {
  try {
    const res = await cloudinary().uploader.upload(image);
    return res;
  }
  catch (err) {
    console.error(err);
  }
}
