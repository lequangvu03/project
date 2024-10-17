import { APISuccessResponse } from '.'

export type TLoginResponse = APISuccessResponse<{
  access_token: string
  refresh_token: string
  role: number
}>
