import { checkSchema } from 'express-validator'
import { permission } from 'process'
import { AUTH_MESSAGES, USER_MESSAGES } from '~/constants/messages'
import { confirmPasswordSchema, passwordSchema } from '~/middlewares/auth.middlewares'
import authService from '~/services/auth.services'
import userService from '~/services/user.services'
import { validate } from '~/utils/validation'
export const getProfileByIdValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const user = await userService.checkExistUserById(value)
            if (!user) {
              throw new Error(USER_MESSAGES.USER_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)
export const updateProfileValidator = validate(
  checkSchema(
    {
      password: { ...passwordSchema, optional: true },
      confirm_password: { ...confirmPasswordSchema, optional: true },
      name: {
        isString: {
          errorMessage: USER_MESSAGES.NAME_MUST_BE_A_STRING
        },
        trim: true,
        optional: true
      },
      permissions: {
        custom: {
          options: async (value) => {
            return value
          }
        },
        optional: true
      }
    },
    ['body']
  )
)
export const deleteProfileValidator = validate(checkSchema({}, ['body']))
