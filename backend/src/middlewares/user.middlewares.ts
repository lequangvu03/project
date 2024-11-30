import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { permission } from 'process'
import { permissionType } from '~/constants/enums'
import { AUTH_MESSAGES, EMPLOYEE_MESSAGE, USER_MESSAGES } from '~/constants/messages'
import { confirmPasswordSchema, passwordSchema } from '~/middlewares/auth.middlewares'
import authService from '~/services/auth.services'
import databaseService from '~/services/database.services'
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
export const addProfileValidator = validate(
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
      email: {
        isEmail: {
          errorMessage: AUTH_MESSAGES.EMAIL_IS_INVALID
        },
        trim: true,
        custom: {
          options: async (value) => {
            const isExistEmail = await authService.checkEmailExist(value)
            if (isExistEmail) {
              throw new Error(AUTH_MESSAGES.EMAIL_ALREADY_EXISTS)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const updateProfileValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const employee = await databaseService.users.findOne({ _id: new ObjectId(value as string) })
            if (!employee) {
              throw new Error(USER_MESSAGES.USER_NOT_FOUND)
            }
          }
        }
      },
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
            if (typeof value === 'string') {
              value = JSON.parse(value)
            }
            const validPermissions = Object.values(permissionType).filter(
              (permission) => typeof permission === 'number'
            )
            const isValid = value.every((permission: number) => validPermissions.includes(permission))

            if (!isValid) {
              throw new Error(`Invalid permissions. Valid values are: ${validPermissions.join(', ')}`)
            }
            return value
          }
        },
        optional: true
      },
      position: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.POSITION_IS_REQUIRED
        },
        optional: true
      },
      salary: {
        isNumeric: {
          errorMessage: EMPLOYEE_MESSAGE.SALARY_MUST_BE_NUMBER
        },
        optional: true
      },
      contact_info: {
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_MUST_BE_STRING
        },
        optional: true
      }
    },
    ['body', 'params']
  )
)
export const updateMyProfileValidator = validate(
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
            if (typeof value === 'string') {
              value = JSON.parse(value)
            }
            const validPermissions = Object.values(permissionType).filter(
              (permission) => typeof permission === 'number'
            )
            const isValid = value.every((permission: number) => validPermissions.includes(permission))

            if (!isValid) {
              throw new Error(`Invalid permissions. Valid values are: ${validPermissions.join(', ')}`)
            }
            return value
          }
        },
        optional: true
      },
      position: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.POSITION_IS_REQUIRED
        },
        optional: true
      },
      salary: {
        isNumeric: {
          errorMessage: EMPLOYEE_MESSAGE.SALARY_MUST_BE_NUMBER
        },
        optional: true
      },
      contact_info: {
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_MUST_BE_STRING
        },
        optional: true
      }
    },
    ['body']
  )
)
export const deleteProfileValidator = validate(checkSchema({}, ['body']))
