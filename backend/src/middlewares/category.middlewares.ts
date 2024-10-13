import { checkSchema } from 'express-validator'
import { CATEGORY_MESSAGES } from '~/constants/messages'
import categoryService from '~/services/category.services'
import { validate } from '~/utils/validation'

export const addCategoryValidator = validate(
  checkSchema(
    {
      name: {
        isString: {
          errorMessage: CATEGORY_MESSAGES.NAME_MUST_BE_STRING
        },
        notEmpty: {
          errorMessage: CATEGORY_MESSAGES.NAME_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            const isExistCategory = await categoryService.checkCategoryNameExist(value)
            if (isExistCategory) {
              throw new Error(CATEGORY_MESSAGES.NAME_IS_EXIST)
            }
            return true
          }
        }
      },
      description: {
        isString: {
          errorMessage: CATEGORY_MESSAGES.DESCRIPTION_MUST_BE_STRING
        },
        optional: true
      }
    },
    ['body']
  )
)

export const updateCategoryValidator = validate(
  checkSchema(
    {
      name: {
        isString: {
          errorMessage: CATEGORY_MESSAGES.NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isExistCategory = await categoryService.checkCategoryNameExist(value)
            if (isExistCategory) {
              throw new Error(CATEGORY_MESSAGES.NAME_IS_EXIST)
            }
            return true
          }
        },
        optional: true
      },
      description: {
        isString: {
          errorMessage: CATEGORY_MESSAGES.DESCRIPTION_MUST_BE_STRING
        },
        optional: true
      }
    },
    ['body']
  )
)
