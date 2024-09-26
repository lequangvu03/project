import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'
import fs from 'fs'
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
