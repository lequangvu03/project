import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { INVENTORY_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const addInventoryItemValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.INVENTORY_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.INVENTORY_NAME_MUST_BE_STRING
        }
      },
      category_id: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.CATEGORY_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.CATEGORY_NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isExistCategory = databaseService.categories.findOne({ _id: new ObjectId(value) })
            if (!isExistCategory) throw new Error(INVENTORY_MESSAGE.CATEGORY_NAME_NOT_EXIST)
          }
        }
      },
      quantity: {
        isNumeric: {
          errorMessage: INVENTORY_MESSAGE.QUANTITY_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (value < 1) throw new Error(INVENTORY_MESSAGE.QUANTITY_MUST_BE_VALID)
          }
        }
      },
      stock: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.STOCK_MUST_BE_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.STOCK_MUST_BE_STRING
        }
      },
      unit_price: {
        isNumeric: {
          errorMessage: INVENTORY_MESSAGE.QUANTITY_MUST_BE_NUMBER
        }
      },
      status: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.STATUS_MUST_BE_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.STATUS_MUST_BE_STRING
        }
      },
      perishable: {
        isIn: {
          options: [['0', '1']], // 0: không dễ vỡ, 1: dễ vỡ
          errorMessage: INVENTORY_MESSAGE.PERISHABLE_MUST_BE_0_OR_1
        }
      }
    },
    ['body']
  )
)

export const updateInventoryItemValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const table = await databaseService.inventoryItems.findOne({ _id: new ObjectId(value as string) })
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
        }
      },
      category_id: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.CATEGORY_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.CATEGORY_NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            const isExistCategory = databaseService.categories.findOne({ _id: new ObjectId(value) })
            if (!isExistCategory) throw new Error(INVENTORY_MESSAGE.CATEGORY_NAME_NOT_EXIST)
          }
        }
      },
      quantity: {
        isNumeric: {
          errorMessage: INVENTORY_MESSAGE.QUANTITY_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (value < 1) throw new Error(INVENTORY_MESSAGE.QUANTITY_MUST_BE_VALID)
          }
        }
      },
      stock: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.STOCK_MUST_BE_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.STOCK_MUST_BE_STRING
        }
      },
      unit_price: {
        isNumeric: {
          errorMessage: INVENTORY_MESSAGE.QUANTITY_MUST_BE_NUMBER
        }
      },
      status: {
        notEmpty: {
          errorMessage: INVENTORY_MESSAGE.STATUS_MUST_BE_REQUIRED
        },
        isString: {
          errorMessage: INVENTORY_MESSAGE.STATUS_MUST_BE_STRING
        }
      },
      perishable: {
        isIn: {
          options: [['0', '1']], // 0: không dễ vỡ, 1: dễ vỡ
          errorMessage: INVENTORY_MESSAGE.PERISHABLE_MUST_BE_0_OR_1
        }
      }
    },
    ['body', 'params']
  )
)

export const deleteInventoryItemValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const inventoryItem = await databaseService.inventoryItems.findOne({ _id: new ObjectId(value) })
            if (!inventoryItem) {
              throw new Error(INVENTORY_MESSAGE.INVENTORY_ITEM_IS_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)
