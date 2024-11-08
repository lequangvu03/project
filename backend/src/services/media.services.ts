import cloudinary from '~/utils/cloudinary'

class MediaService {
  async uploadImage(file: any) {
    try {
      const result = await cloudinary.uploader.upload(file.filepath)
      return result.secure_url
    } catch (err) {
      throw new Error(`Upload failed`)
    }
  }
}
const mediaService = new MediaService()
export default mediaService
