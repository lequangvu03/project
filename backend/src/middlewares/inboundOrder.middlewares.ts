import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { INBOUND_ORDER_MESSAGE, MENU_MESSAGES } from '~/constants/messages'

import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'

export const addInboundOrdersValidator = validate(
  checkSchema(
    {
      quantiy: {
        isNumeric: {
          errorMessage: INBOUND_ORDER_MESSAGE.QUANTITY_MUST_BE_A_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_IS_REQUIRED)
            }
            if (value <= 0) throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_IS_GREATER_THAN_ZERO)

            return true
          }
        }
      },
      inbound_order_items: {
        isArray: {
          errorMessage: INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_MUST_BE_AN_ARRAY
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_IS_REQUIRED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const updateInboundOrdersValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value, req) => {
            const check = await databaseService.inboundOrders.findOne({ _id: new ObjectId(value as string) })
            if (!check) {
              throw new Error(INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_NOT_FOUND)
            }
            return true
          }
        }
      },
      quantiy: {
        isNumeric: {
          errorMessage: INBOUND_ORDER_MESSAGE.QUANTITY_MUST_BE_A_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_IS_REQUIRED)
            }
            if (value <= 0) throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_IS_GREATER_THAN_ZERO)

            return true
          }
        }
      },
      inbound_order_items: {
        isArray: {
          errorMessage: INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_MUST_BE_AN_ARRAY
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_IS_REQUIRED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const deleteInboundOrdersValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value, req) => {
            const check = await databaseService.inboundOrders.findOne({ _id: new ObjectId(value as string) })
            if (!check) {
              throw new Error(INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_NOT_FOUND)
            }
            return true
          }
        }
      }
    },
    ['params']
  )
)
