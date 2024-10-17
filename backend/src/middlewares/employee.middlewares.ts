import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { CATEGORY_MESSAGES, EMPLOYEE_MESSAGE } from '~/constants/messages'
import categoryService from '~/services/category.services'
import databaseService from '~/services/database.services'
import { validate } from '~/utils/validation'

export const addEmployeeValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_IS_REQUIRED
        },
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.EMPLOYEE_NAME_MUST_BE_A_STRING
        }
      },
      position: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_IS_REQUIRED
        },
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.POSITION_MUST_BE_A_STRING
        }
      },
      salary: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: EMPLOYEE_MESSAGE.SALARY_MUST_BE_NUMBER
        }
      },
      contact_info: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_IS_REQUIRED
        },
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_MUST_BE_STRING
        }
      }
    },
    ['body']
  )
)

export const updateEmployeeValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.EMPPLOYEE_ID_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            const employee = await databaseService.employees.findOne({ _id: new ObjectId(value as string) })
            if (!employee) {
              throw new Error(EMPLOYEE_MESSAGE.EMPLOYEE_NOT_FOUND)
            }
          }
        }
      },
      name: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.EMPLOYEE_NAME_IS_REQUIRED
        },
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.EMPLOYEE_NAME_MUST_BE_A_STRING
        }
      },
      position: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.POSITION_IS_REQUIRED
        },
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.POSITION_MUST_BE_A_STRING
        }
      },
      salary: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.SALARY_IS_REQUIRED
        },
        isNumeric: {
          errorMessage: EMPLOYEE_MESSAGE.SALARY_MUST_BE_NUMBER
        }
      },
      contact_info: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_IS_REQUIRED
        },
        isString: {
          errorMessage: EMPLOYEE_MESSAGE.CONTACT_INFO_MUST_BE_STRING
        }
      }
    },
    ['body', 'params']
  )
)
export const deleteEmployeeValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: {
          errorMessage: EMPLOYEE_MESSAGE.EMPPLOYEE_ID_IS_REQUIRED
        },
        custom: {
          options: async (value) => {
            const employee = await databaseService.employees.findOne({ _id: new ObjectId(value as string) })
            if (!employee) {
              throw new Error(EMPLOYEE_MESSAGE.EMPLOYEE_NOT_FOUND)
            }
          }
        }
      }
    },
    ['params']
  )
)
