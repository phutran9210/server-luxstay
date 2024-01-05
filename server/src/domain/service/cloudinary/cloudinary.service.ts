import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadMultipleImages(
    files: Array<Express.Multer.File>,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            format: file.mimetype.split('/')[1],
          },
          (error, result) => {
            if (error) {
              reject(new Error(`Cloudinary upload error: ${error.message}`));
            } else {
              resolve(result.url);
            }
          },
        );

        uploadStream.end(file.buffer);
      });
    });

    try {
      const result = await Promise.all(uploadPromises);
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Err upload Cloudinary');
    }
  }
}
