import { table } from 'console'
import { checkSchema } from 'express-validator'
import { TABLE_MESSAGES } from '~/constants/messages'
import tableService from '~/services/table.services'
import { validate } from '~/utils/validation'

export const addTableValidator = validate(
  checkSchema(
    {
      table_number: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.TABLE_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (value < 1) {
              throw new Error(TABLE_MESSAGES.TABLE_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100)
            }
            const isExistTable = await tableService.checkTableExist(value)
            if (isExistTable) {
              throw new Error(TABLE_MESSAGES.TABLE_NUMBER_IS_EXIST)
            }
            return true
          }
        }
      },
      seat_number: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.SEAT_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: (value) => {
            if (value < 1) {
              throw new Error(TABLE_MESSAGES.SEAT_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100)
            }
          }
        }
      }
    },
    ['body']
  )
)
export const updateTableValidator = validate(
  checkSchema(
    {
      table_number: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.TABLE_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (value < 1) {
              throw new Error(TABLE_MESSAGES.TABLE_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100)
            }
          }
        }
      },
      seat_number: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.SEAT_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: (value) => {
            if (value < 1) {
              throw new Error(TABLE_MESSAGES.SEAT_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100)
            }
          }
        }
      }
    },
    ['body']
  )
)
export const deleteTableValidator = validate(
  checkSchema(
    {
      table_number: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.TABLE_NUMBER_MUST_BE_NUMBER
        },
        custom: {
          options: async (value) => {
            if (value < 1) {
              throw new Error(TABLE_MESSAGES.TABLE_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100)
            }
            const isExistTable = await tableService.checkTableExist(value)
            if (isExistTable) {
              throw new Error(TABLE_MESSAGES.TABLE_NUMBER_IS_EXIST)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
