import { Router } from 'express'
import {
  addUserController,
  deleteProfileController,
  getAllProfileController,
  getMeProfileController,
  getProfileByIdController,
  updatedProfileController,
  updateProfileMeController
} from '~/controllers/user.contollers'
import { accessTokenValidator, isAdmin } from '~/middlewares/auth.middlewares'
import { handleRequest } from '~/middlewares/menu.middlewares'
import { addProfileValidator, getProfileByIdValidator, updateMyProfileValidator, updateProfileValidator } from '~/middlewares/user.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

export const userRouter = Router()

/**
 * path: api/profile/
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all profiles
 * response: {message: string, result: {profiles: profileType[], total: number}}
 */
userRouter.get('/', accessTokenValidator, wrapRequestHandler(getAllProfileController))

userRouter.post('/', accessTokenValidator, addProfileValidator, wrapRequestHandler(addUserController))
/**
 * path: api/profile/me
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get all profiles
 * response: {message: string, result: {profiles: profileType[], total: number}}
 */
userRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeProfileController))

userRouter.put(
  '/me',
  accessTokenValidator,
  handleRequest,
  updateMyProfileValidator,
  wrapRequestHandler(updateProfileMeController)
)

/**
 * path: api/profile/:id
 * method: GET
 * header: {Authorization: Bearer <access_token>}
 * description: Get profile by id
 * response: {message: string, result: profileType}
 */
userRouter.get('/:id', accessTokenValidator, getProfileByIdValidator, wrapRequestHandler(getProfileByIdController))

/**
 * path: api/profile/:id
 * method: PUT
 * header: {Authorization: Bearer <access_token>}
 * description: Update profile by id
 * body: {name?: string, email?: string, ...other fields}
 * response: {message: string, result: profileType}
 */
userRouter.put(
  '/:id',
  accessTokenValidator,
  handleRequest,
  updateProfileValidator,
  wrapRequestHandler(updatedProfileController)
)

/**
 * path: api/profile/:id
 * method: DELETE
 * header: {Authorization: Bearer <access_token>}
 * description: Delete profile by id
 * response: {message: string}
 */
userRouter.delete('/:id', accessTokenValidator, isAdmin, wrapRequestHandler(deleteProfileController))
