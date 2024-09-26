import { Router } from 'express'
import {
  forgotPasswordController,
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  verifyEmailController
} from '~/controllers/auth.controllers'
import {
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  sendOtpForgotPasswordValidator,
  verifyOtpForgotPasswordValidator
} from '~/middlewares/auth.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
export const authRouter = Router()

/**
 * path: /auth/refresh-token
 * method: GET
 * body: {refresh_token: string}
 */

authRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))
/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
authRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. user login
 * Path: /login
 * Method: POST
 * Body: {email: string, password: string,access_token: string}
 */
authRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Verify email when user clinet click on the link in email
 * Path: /verify-email
 * Method: POST
 * body: { email_verify_token: string }
 */
authRouter.get('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description.submid email to reset password, sen email to user
 * Path: /send-otp-forgot-password
 * Method: POST
 * body: {email: string}
 */
authRouter.post(
  '/send-otp-forgot-password',
  sendOtpForgotPasswordValidator,
  wrapRequestHandler(forgotPasswordController.requestOTP)
)

/**
 * Description.submid email to reset password, sen email to user
 * Path: /verify-otp-forgot-password
 * Method: POST
 * body: {email: string}
 */
authRouter.post(
  '/verify-otp-forgot-password',
  verifyOtpForgotPasswordValidator,
  wrapRequestHandler(forgotPasswordController.verifyOTP)
)

/**
 * Description.submid email to reset password, sen email to user
 * Path: /reset-password
 * Method: POST
 * body: {email: string}
 */
authRouter.put('/reset-password', resetPasswordValidator, wrapRequestHandler(forgotPasswordController.resetPassword))

/**
 * Description.logout user
 * Path: /logout
 * Method: POST
 * body: {refresh_token: string}
 */
authRouter.delete('/logout', wrapRequestHandler(logoutController))
