import cloudinary from '~/utils/cloudinary'

class AdminService {
  async uploadImage(file: any) {
    try {
      const result = await cloudinary.uploader.upload(file.filepath)
      return result.secure_url
    } catch (err) {
      throw new Error(`Upload failed`)
    }
  }
}
const adminService = new AdminService()
export default adminService
