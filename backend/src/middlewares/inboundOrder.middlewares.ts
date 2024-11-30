import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { INBOUND_ORDER_MESSAGE } from '~/constants/messages'

import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'

export const addInboundOrdersValidator = validate(
  checkSchema(
    {
      total_price: {
        isNumeric: {
          errorMessage: INBOUND_ORDER_MESSAGE.TOTAL_PRICE_MUST_BE_A_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.TOTAL_PRICE_IS_REQUIRED)
            }
            if (value <= 0) throw new Error(INBOUND_ORDER_MESSAGE.TOTAL_PRICE_IS_GREATER_THAN_ZERO)

            return true
          }
        }
      },
      inbound_order_items: {
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_IS_REQUIRED)
            }
            for (let i = 0; i < value.length; i++) {
              if (!value[i].quantity) {
                throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_IS_REQUIRED_IN_INBOUND_ORDER + ` in ${i} item`)
              }
              if (typeof value[i].quantity !== 'number') {
                throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_MUST_BE_A_NUMBER + ` in ${i} item`)
              }
              if (value[i].quantity <= 0) {
                throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_MUST_BE_GREATER_THAN_ZERO + ` in ${i} item`)
              }
              if (!value[i].item_id) {
                throw new Error(INBOUND_ORDER_MESSAGE.ITEM_ID_IS_REQUIRED + ` in ${i} item`)
              }
              if (!ObjectId.isValid(value[i].item_id)) {
                throw new Error(INBOUND_ORDER_MESSAGE.ITEM_ID_IS_OBJECT_ID + ` in ${i} item`)
              }
            }
            return true
          }
        },
        isArray: {
          errorMessage: INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_MUST_BE_AN_ARRAY
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
      total_price: {
        isNumeric: {
          errorMessage: INBOUND_ORDER_MESSAGE.TOTAL_PRICE_MUST_BE_A_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.TOTAL_PRICE_IS_REQUIRED)
            }
            if (value <= 0) throw new Error(INBOUND_ORDER_MESSAGE.TOTAL_PRICE_IS_GREATER_THAN_ZERO)

            return true
          }
        }
      },
      inbound_order_items: {
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_IS_REQUIRED)
            }
            for (let i = 0; i < value.length; i++) {
              if (!value[i].quantity) {
                throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_IS_REQUIRED_IN_INBOUND_ORDER + ` in ${i} item`)
              }
              if (typeof value[i].quantity !== 'number') {
                throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_MUST_BE_A_NUMBER + ` in ${i} item`)
              }
              if (value[i].quantity <= 0) {
                throw new Error(INBOUND_ORDER_MESSAGE.QUANTITY_MUST_BE_GREATER_THAN_ZERO + ` in ${i} item`)
              }
              if (!value[i].item_id) {
                throw new Error(INBOUND_ORDER_MESSAGE.ITEM_ID_IS_REQUIRED + ` in ${i} item`)
              }
              if (!ObjectId.isValid(value[i].item_id)) {
                throw new Error(INBOUND_ORDER_MESSAGE.ITEM_ID_IS_OBJECT_ID + ` in ${i} item`)
              }
            }
            return true
          }
        },
        isArray: {
          errorMessage: INBOUND_ORDER_MESSAGE.INBOUND_ORDERS_MUST_BE_AN_ARRAY
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
