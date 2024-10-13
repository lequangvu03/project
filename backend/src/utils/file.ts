import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { Request } from 'express'
import { File } from 'formidable'
import fs from 'fs'
import streamifier from 'streamifier'
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'
export const initFolder = () => {
  if (!fs.existsSync(UPLOAD_IMAGE_TEMP_DIR)) {
    fs.mkdirSync(UPLOAD_IMAGE_TEMP_DIR, {
      recursive: true // mục đích là để tạo folder nested
    })
  }
  if (!fs.existsSync(UPLOAD_IMAGE_DIR)) {
    fs.mkdirSync(UPLOAD_IMAGE_DIR, {
      recursive: true // mục đích là để tạo folder nested
    })
  }
}
export const handleUploadImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 3000 * 1024 // 300KB
    // filter: function ({ name, originalFilename, mimetype }) {
    //   const valid = name === 'image' && Boolean(mimetype?.startsWith('image/'))
    //   if (!valid) {
    //     form.emit('error' as any, new Error('File type is not valid') as any)
    //   }
    //   return valid
    // }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      req.body = fields // Lưu dữ liệu từ form vào req.body
      req.files = files // Lưu tệp từ form vào req.files
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve((files.image as File[])[0])
    })
  })
}
export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}
export const processFields = (input: Record<string, any>) => {
  const processedFields: Record<string, string> = {}
  for (const [key, value] of Object.entries(input)) {
    processedFields[key] = Array.isArray(value) ? value[0] : (value as string)
  }
  return processedFields
}

const uploadToCloudinary = (file: any) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error: any, result: any) => {
      if (result) {
        resolve(result)
      } else {
        console.log('err')
        reject(error)
      }
    })

    streamifier.createReadStream(file.filepath).pipe(stream)
  })
}

export default uploadToCloudinary
