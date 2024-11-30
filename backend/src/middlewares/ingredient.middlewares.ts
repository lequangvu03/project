import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { INVENTORY_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import ingredientsService from '~/services/ingredient.services'
import { validate } from '~/utils/validation'

export const addIngredientValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.INVENTORY_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.INVENTORY_NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const ingredient = await databaseService.ingredients.findOne({ name: value })
            if (ingredient) {
              throw new Error(INVENTORY_MESSAGE.INVENTORY_ITEM_IS_EXIST)
            }
          }
        }
      },
      unit: {
        isString: {
          errorMessage: INVENTORY_MESSAGE.UNIT_MUST_BE_STRING
        }
      }
    },
    ['body']
  )
)

export const updateIngredientValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const table = await databaseService.ingredients.findOne({ _id: new ObjectId(value as string) })
            if (!table) {
              throw new Error(INVENTORY_MESSAGE.INVENTORY_ITEM_IS_NOT_FOUND)
            }
          }
        }
      },
      name: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.INVENTORY_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.INVENTORY_NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value, { req }) => {
            const isExsitIngredient = await ingredientsService.checkIngredientNameExist(value, req?.params?.id ?? '')
            if (isExsitIngredient) {
              throw new Error(INVENTORY_MESSAGE.INVENTORY_ITEM_IS_EXIST)
            }
          }
        },
        optional: true
      },
      unit: {
        isString: {
          errorMessage: INVENTORY_MESSAGE.UNIT_MUST_BE_STRING
        },

        optional: true
      }
    },
    ['body', 'params']
  )
)

export const deleteIngredientValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const ingredient = await databaseService.ingredients.findOne({ _id: new ObjectId(value) })
            if (!ingredient) {
              throw new Error(INVENTORY_MESSAGE.INVENTORY_ITEM_IS_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)
