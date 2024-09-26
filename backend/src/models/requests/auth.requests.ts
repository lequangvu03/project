import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'

export interface LoginReqBody {
  email: string
  password: string
  role: number
}

export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface logoutReqBody {
  refresh_token: string
}

export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface RefreshTokenReqBody {
  refresh_token: string
}
export interface ForgotPasswordReqBody {
  email: string
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
export interface requestOTPReqBody {
  email: string
}
export interface verifyOTPReqBody {
  otp_id: string
  otp: string
}
export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  otp_id: string
  email: string
}
