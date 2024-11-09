import { NextFunction, Request, Response } from 'express'
import { USER_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/media.services'
import userService from '~/services/user.services'
export const getAllProfileController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await userService.getAllProfile()
  return res.status(200).json({ message: USER_MESSAGES.GET_ALL_Profile_SUCCESS, result })
}
export const getProfileByIdController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await userService.getProfileById(req.params.id)
  return res.status(200).json({ message: USER_MESSAGES.GET_PROFILE_BY_ID_SUCCESS, result })
}
export const updatedProfileController = async (req: Request, res: Response, error: NextFunction) => {
  if (Object.keys(req.files).length > 0) {
    req.body.avatar_url = await mediaService.uploadImage(req.files.image[0])
  }
  const result = await userService.updateProfile(req.params.id, req.body)
  return res.status(200).json({ message: USER_MESSAGES.UPDATE_PROFILE_SUCCESS, result })
}
export const deleteProfileController = async (req: Request, res: Response, error: NextFunction) => {
  const result = await userService.deleteProfile(req.params.id)
  return res.status(200).json({ message: USER_MESSAGES.DELETE_PROFILE_SUCCESS, result })
}
