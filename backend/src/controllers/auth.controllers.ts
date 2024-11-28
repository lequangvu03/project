import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { AUTH_MESSAGES } from '~/constants/messages'
import {
  LoginReqBody,
  logoutReqBody,
  RegisterReqBody,
  requestOTPReqBody,
  ResetPasswordReqBody,
  TokenPayload,
  VerifyEmailReqBody,
  verifyOTPReqBody
} from '~/models/requests/auth.requests'
import User from '~/models/schemas/user.schema'
import databaseService from '~/services/database.services'
import authService from '~/services/auth.services'

export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  const user = req.user as User
  const result = await authService.login(user)
  const response = {
    ...result,
    role: user.role,
    permissions: user.permissions
  }
  return res.json({
    message: AUTH_MESSAGES.LOGIN_SUCCESS,
    result: response
  })
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    await authService.register(req.body)
    return res.json({
      message: AUTH_MESSAGES.REGISTER_SUCCESS
    })
  } catch (error) {
    next(error)
  }
}
export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, exp } = req.decoded_email_verify_token as TokenPayload
    console.log(user_id, exp)
    const user = await databaseService.users.findOne({
      _id: new ObjectId(user_id)
    })
    let message
    const redirectUrl = `http://localhost:3000/login`
    if (!user) {
      message = AUTH_MESSAGES.USER_NOT_FOUND
    } else {
      const currentTime = Math.floor(Date.now() / 1000)
      if (exp < currentTime) {
        // Token đã hết hạn
        await databaseService.users.deleteOne({
          _id: new ObjectId(user_id)
        })
        message = AUTH_MESSAGES.EMAIL_VERIFY_TOKEN_EXPIRED
      } else if (user.email_verify_token === '') {
        message = AUTH_MESSAGES.EMAIL_ALREADY_VERIFIED_BEFORE
      } else {
        await authService.verifyEmail(user_id)
        message = AUTH_MESSAGES.EMAIL_VERIFY_SUCCESS
      }
    }

    res.send(`
      <html>
        <body>
          <h2>${message}</h2>
          <script>
            setTimeout(() => {
              window.location.href = '${redirectUrl}';
            }, 3000); // Chuyển hướng sau 3 giây
          </script>
        </body>
      </html>
    `)
  } catch (error) {
    next(error)
  }
}
export const forgotPasswordController = {
  requestOTP: async (req: Request<ParamsDictionary, any, requestOTPReqBody>, res: Response, next: NextFunction) => {
    try {
      const email = req.body.email
      const result = await authService.forgotPasswordService(email)
      res.status(200).json({ message: 'OTP sent to your email.', result })
    } catch (error) {
      next(error)
    }
  },
  verifyOTP: async (req: Request<ParamsDictionary, any, verifyOTPReqBody>, res: Response, next: NextFunction) => {
    try {
      const otp_id = req.body.otp_id as string
      await authService.verifyOtp(otp_id)
      res.status(200).json({ message: 'verify OTP success' })
    } catch (error) {
      next(error)
    }
  },
  resetPassword: async (
    req: Request<ParamsDictionary, any, ResetPasswordReqBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, otp_id } = req.body
      const result = await authService.resetPassword({ email, password, otp_id })
      res.status(200).json({ message: AUTH_MESSAGES.RESET_PASSWORD_SUCCESS })
    } catch (error) {
      next(error)
    }
  }
}
export const logoutController = async (
  req: Request<ParamsDictionary, any, logoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.body
    await authService.logout(refresh_token)
    res.status(200).json({ message: AUTH_MESSAGES.LOGOUT_SUCCESS })
  } catch (error) {
    next(error)
  }
}
export const refreshTokenController = async (
  req: Request<ParamsDictionary, any, { refresh_token: string }>,
  res: Response
) => {
  const { user_id, verify } = req.decoded_refresh_token as TokenPayload
  const { refresh_token } = req.body
  const result = await authService.refreshToken({ refresh_token, user_id, verify })
  return res.json({
    message: 'Refresh token successfully',
    result: result
  })
}
