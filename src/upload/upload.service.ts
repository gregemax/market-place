import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';
import multer from 'multer';
@Injectable()
export class UploadService {
    constructor(){
        v2.config({
            cloud_name: 'dmkicbywv',
            api_key: '415935595172263',
            api_secret: 'kouLe01iZU5vVK2f0OGUjPHVBvo',
          });
    }

    async uploadImage(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve, reject) => {
          
          console.log('Received file for upload:', file);
          console.log('File buffer length:', file.buffer.length);
    
          const uploadStream = v2.uploader.upload_stream(
            { folder: 'greg' },
            (error, result) => {
              if (error) {
                console.error('Error uploading image:', error);
                return reject(error);
              }
    
             
              console.log('Upload result:', result);
    
              if (result && result.secure_url) {
                return resolve(result.secure_url); 
              } else {
                return reject(new Error('No URL returned from Cloudinary'));
              }
            },
          );
    
          
          uploadStream.end(file.buffer);
        });
      }
    
}
