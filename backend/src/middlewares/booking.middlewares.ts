import { table } from 'console'
import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { TableStatus } from '~/constants/enums'
import { BOOKING_MESSAGE, TABLE_MESSAGES } from '~/constants/messages'
import bookingService from '~/services/booking.services'
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
        notEmpty: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_NAME_IS_REQUIRED
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
        notEmpty: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_PHONE_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.CUSTOMER_PHONE_IS_REQUIRED)
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
            if (!value) {
              throw new Error(BOOKING_MESSAGE.TABLE_NUMBER_IS_REQUIRED)
            }
            const table = await tableService.checkTableExist(value)
            if (!table) {
              throw new Error(BOOKING_MESSAGE.TABLE_IS_NOT_FOUND)
            }

            return true
          }
        }
      },
      booking_time: {
        isNumeric: {
          errorMessage: BOOKING_MESSAGE.BOOKING_TIME_MUST_BE_NUMBER
        },
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.BOOKING_TIME_IS_REQUIRED)
            }

            const bookingTime = parseInt(value, 10) // Chuyển thành số nguyên timestamp
            const duration = 2 * 60 * 60 * 1000 // Thời lượng booking là 2 giờ
            const endTime = bookingTime + duration

            // Kiểm tra xem có booking nào trùng thời gian hay không
            const overlappingBooking = await bookingService.checkBookingOverlap(
              req.body.table_number,
              bookingTime,
              endTime
            )
            if (overlappingBooking) {
              throw new Error(BOOKING_MESSAGE.BOOKING_TIME_CONFLICT)
            }

            return true
          }
        },
        optional: true
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
            return true
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
        },
        optional: true
      },
      customer_phone: {
        isString: {
          errorMessage: BOOKING_MESSAGE.CUSTOMER_PHONE_MUST_BE_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.CUSTOMER_PHONE_IS_REQUIRED)
            }
            return true
          }
        },
        optional: true
      },
      table_number: {
        isNumeric: {
          errorMessage: BOOKING_MESSAGE.TABLE_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.TABLE_NUMBER_IS_REQUIRED)
            }
            const table = await tableService.checkTableExist(value)
            if (!table) {
              throw new Error(BOOKING_MESSAGE.TABLE_IS_NOT_FOUND)
            }
            return true
          }
        },
        optional: true
      },
      booking_time: {
        isNumeric: {
          errorMessage: BOOKING_MESSAGE.BOOKING_TIME_MUST_BE_NUMBER
        },
        custom: {
          options: async (value, { req }) => {
            if (!value) {
              throw new Error(BOOKING_MESSAGE.BOOKING_TIME_IS_REQUIRED)
            }
            const bookingTime = parseInt(value, 10)
            const duration = 2 * 60 * 60 * 1000
            const endTime = bookingTime + duration
            const overlappingBooking = await bookingService.checkBookingOverlap(
              req.body.table_number,
              bookingTime,
              endTime
            )
            if (overlappingBooking) {
              throw new Error(BOOKING_MESSAGE.BOOKING_TIME_CONFLICT)
            }
            return true
          }
        },
        optional: true
      }
    },
    ['body', 'params']
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
