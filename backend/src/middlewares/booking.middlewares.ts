import { table } from 'console'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import { BOOKING_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
import tableService from '~/services/table.services'
import { validate } from '~/utils/validation'

export const addBookingValidator = validate(
  checkSchema(
    {
      customer_name: {
        isString: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.CUSTOMER_NAME_IS_REQUIRED)
            }
            return true
          }
        }
      },
      customer_phone: {
        isString: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_PHONE_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.CUSTOMER_NAME_IS_REQUIRED)
            }
            return true
          }
        }
      },
      table_number: {
        isNumeric: {
          errorMessage: BOOKING_MESSAGE.TABLE_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) throw new Error(BOOKING_MESSAGE.TABLE_NUMBER_IS_REQUIRED)
            const table = await tableService.checkTableExist(value)
            if (table?.status === TableStatus.Busy) throw new Error(BOOKING_MESSAGE.TABLE_IS_BUSY)
            return true
          }
        }
      },
      booking_time: {
        isDate: {
          errorMessage: BOOKING_MESSAGE.BOOKING_TIME_MUST_BE_VALID_DATE
        },
        custom: {
          options: async (value) => {
            if (!value) throw new Error(BOOKING_MESSAGE.BOOKING_TIME_IS_REQUIRED)
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const updateBookingValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const booking = await databaseService.bookings.findOne({ _id: new ObjectId(value as string) })
            if (!booking) {
              throw new Error(BOOKING_MESSAGE.BOOKING_IS_NOT_FOUND)
            }
          }
        }
      },
      customer_name: {
        isString: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_NAME_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.CUSTOMER_NAME_IS_REQUIRED)
            }
            return true
          }
        }
      },
      customer_phone: {
        isString: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_PHONE_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.CUSTOMER_NAME_IS_REQUIRED)
            }
            return true
          }
        }
      },
      table_number: {
        isNumeric: {
          errorMessage: BOOKING_MESSAGE.TABLE_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) throw new Error(BOOKING_MESSAGE.TABLE_NUMBER_IS_REQUIRED)
            const table = await tableService.checkTableExist(value)
            if (table?.status === TableStatus.Busy) throw new Error(BOOKING_MESSAGE.TABLE_IS_BUSY)
            return true
          }
        }
      },
      booking_time: {
        isDate: {
          errorMessage: BOOKING_MESSAGE.BOOKING_TIME_MUST_BE_VALID_DATE
        },
        custom: {
          options: async (value) => {
            if (!value) throw new Error(BOOKING_MESSAGE.BOOKING_TIME_IS_REQUIRED)
            return true
          }
        }
      }
    },
    ['body']
  )
)
export const deleteBookingValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const booking = await databaseService.bookings.findOne({ _id: new ObjectId(value as string) })
            if (!booking) {
              throw new Error(BOOKING_MESSAGE.BOOKING_IS_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)
