import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { ORDER_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import Order from '~/models/schemas/orders.schema'
import databaseService from '~/services/database.services'
import tableService from '~/services/table.services'
import { validate } from '~/utils/validation'

/**
 * Validator cho thêm đơn hàng (Create Order)
 */
export const addOrderValidator = validate(
  checkSchema(
    {
      table_number: {
        isNumeric: {
          errorMessage: ORDER_MESSAGE.TABLE_NUMBER_MUST_BE_A_NUMBER
        },
        notEmpty: {
          errorMessage: ORDER_MESSAGE.TABLE_NUMBER_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            const tableExists = await tableService.checkTableExist(value)
            if (!tableExists) {
              throw new Error(TABLE_MESSAGES.TABLE_IS_NOT_FOUND)
            }
            return true
          }
        }
      },
      order_items: {
        isArray: {
          errorMessage: ORDER_MESSAGE.ORDER_ITEMS_MUST_BE_AN_ARRAY
        },
        custom: {
          options: (value) => {
            if (value.length === 0) {
              throw new Error(ORDER_MESSAGE.ORDER_ITEMS_CANNOT_BE_EMPTY)
            }
            for (const item of value) {
              if (!item.item_id || !item.quantity || !item.price_per_item) {
                throw new Error(ORDER_MESSAGE.ORDER_ITEM_FIELDS_MUST_BE_PRESENT)
              }
            }
            return true
          }
        }
      },
      total_price: {
        isNumeric: {
          errorMessage: ORDER_MESSAGE.TOTAL_PRICE_MUST_BE_A_NUMBER
        },
        notEmpty: {
          errorMessage: ORDER_MESSAGE.TOTAL_PRICE_IS_REQUIRED
        }
      }
    },
    ['body']
  )
)

/**
 * Validator cho cập nhật đơn hàng (Update Order)
 * Các trường không cần thiết có thể bỏ qua trong request.
 */
export const updateOrderValidator = validate(
  checkSchema(
    {
      table_number: {
        isNumeric: {
          errorMessage: ORDER_MESSAGE.TABLE_NUMBER_MUST_BE_A_NUMBER
        },
        custom: {
          options: async (value) => {
            const tableExists = await tableService.checkTableExist(value)
            if (!tableExists) {
              throw new Error(TABLE_MESSAGES.TABLE_IS_NOT_FOUND)
            }
            return true
          }
        },
        optional: true
      },
      order_items: {
        isArray: {
          errorMessage: ORDER_MESSAGE.ORDER_ITEMS_MUST_BE_AN_ARRAY
        },
        custom: {
          options: (value) => {
            if (value.length === 0) {
              throw new Error(ORDER_MESSAGE.ORDER_ITEMS_CANNOT_BE_EMPTY)
            }
            for (const item of value) {
              if (!item.item_id || !item.quantity || !item.price_per_item) {
                throw new Error(ORDER_MESSAGE.ORDER_ITEM_FIELDS_MUST_BE_PRESENT)
              }
            }
            return true
          }
        },
        optional: true
      },
      total_price: {
        isNumeric: {
          errorMessage: ORDER_MESSAGE.TOTAL_PRICE_MUST_BE_A_NUMBER
        },
        optional: true
      },
      payment_status: {
        isNumeric: {
          errorMessage: ORDER_MESSAGE.PAYMENT_STATUS_MUST_BE_A_NUMBER
        },
        isIn: {
          options: [[0, 1]],
          errorMessage: ORDER_MESSAGE.PAYMENT_STATUS_MUST_BE_VALID
        },
        optional: true
      },
      order_status: {
        isNumeric: {
          errorMessage: ORDER_MESSAGE.ORDER_STATUS_MUST_BE_A_NUMBER
        },
        isIn: {
          options: [[0, 1, 2]],
          errorMessage: ORDER_MESSAGE.ORDER_STATUS_MUST_BE_VALID
        },
        optional: true
      }
    },
    ['body']
  )
)
export const deleteOrderValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const order = await databaseService.orders.findOne({ _id: new ObjectId(value as string) })
            if (!order) {
              throw new Error(ORDER_MESSAGE.ORDER_IS_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)