// src/config/cloudinaryConfig.ts
import { v2 as cloudinary } from 'cloudinary'
import { envConfig } from '~/constants/config' // Đảm bảo bạn có envConfig với các biến môi trường

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: envConfig.cloudinaryName,
  api_key: envConfig.cloudinaryApiKey,
  api_secret: envConfig.cloudinaryApiSecret
})

export default cloudinary
