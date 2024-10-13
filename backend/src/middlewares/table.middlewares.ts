import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { TABLE_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'
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
      status: {
        isIn: {
          options: [['0', '1']], // Assuming 0 is "Unavailable" and 1 is "Available"
          errorMessage: TABLE_MESSAGES.TABLE_STATUS_MUST_BE_0_OR_1
        },
        optional: { options: { nullable: true } }
      },
      capacity: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.TABLE_CAPACITY_MUST_BE_NUMBER
        },
        custom: {
          options: (value) => {
            if (typeof value !== 'number' || value < 1) {
              throw new Error(TABLE_MESSAGES.TABLE_CAPACITY_MUST_BE_POSITIVE)
            }
            return true
          }
        }
      },
      location: {
        isString: {
          errorMessage: TABLE_MESSAGES.TABLE_LOCATION_MUST_BE_STRING
        },
        isLength: {
          options: { min: 1, max: 100 },
          errorMessage: TABLE_MESSAGES.TABLE_LOCATION_MUST_BE_BETWEEN_1_AND_100_CHARACTERS
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
            const isExistTable = await tableService.checkTableExist(value)
            if (isExistTable) {
              throw new Error(TABLE_MESSAGES.TABLE_NUMBER_IS_EXIST)
            }
            return true
          }
        },
        optional: { options: { nullable: true } }
      },
      status: {
        isIn: {
          options: [['0', '1']],
          errorMessage: TABLE_MESSAGES.TABLE_STATUS_MUST_BE_0_OR_1
        },
        optional: { options: { nullable: true } }
      },
      capacity: {
        isNumeric: {
          errorMessage: TABLE_MESSAGES.TABLE_CAPACITY_MUST_BE_NUMBER
        },
        custom: {
          options: (value) => {
            if (value < 1) {
              throw new Error(TABLE_MESSAGES.TABLE_CAPACITY_MUST_BE_POSITIVE)
            }
            return true
          }
        },
        optional: { options: { nullable: true } }
      },
      location: {
        isString: {
          errorMessage: TABLE_MESSAGES.TABLE_LOCATION_MUST_BE_STRING
        },
        isLength: {
          options: { min: 1, max: 100 },
          errorMessage: TABLE_MESSAGES.TABLE_LOCATION_MUST_BE_BETWEEN_1_AND_100_CHARACTERS
        },
        optional: { options: { nullable: true } }
      }
    },
    ['body']
  )
)

export const deleteTableValidator = validate(
  checkSchema(
    {
      id: {
        custom: {
          options: async (value) => {
            const table = await databaseService.tables.findOne({ _id: new ObjectId(value as string) })
            if (!table) {
              throw new Error(TABLE_MESSAGES.TABLE_IS_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)
