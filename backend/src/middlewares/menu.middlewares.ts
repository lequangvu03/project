import formidable from 'formidable'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'
import { NextFunction, Request, Response } from 'express'
import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { MENU_MESSAGES } from '~/constants/messages'
import categoryService from '~/services/category.services'
import menuService from '~/services/menu.services'

export const handleRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const form = formidable({
      maxFiles: 1,
      keepExtensions: true,
      maxFileSize: 3000 * 1024, // 300KB
      filter: function ({ name, originalFilename, mimetype }) {
        const valid = name === 'image' && Boolean(mimetype?.startsWith('image/'))
        if (!valid) {
          form.emit('error' as any, new Error('File type is not valid') as any)
        }
        return valid
      }
    })
    const result = await new Promise<any>((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          return reject(err)
        }
        req.files = files
        resolve({ files, fields })
      })
    })
    const processedFields: Record<string, string> = {}
    for (const [key, value] of Object.entries(result.fields)) {
      processedFields[key] = Array.isArray(value) ? value[0] : (value as string)
    }
    req.body = processedFields
    next()
  } catch (error) {
    next(error)
  }
}
export const addMenuItemValidator = validate(
  checkSchema(
    {
      name: {
        isString: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_NAME_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(MENU_MESSAGES.MENU_ITEM_NAME_IS_REQUIRED)
            }
            const isExistCategory = await menuService.checkNameExists(value)
            if (isExistCategory) {
              throw new Error(MENU_MESSAGES.MENU_ITEM_NAME_IS_EXIST)
            }
            return true
          }
        }
      },
      description: {
        isString: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_DESCRIPTION_MUST_BE_A_STRING
        }
      },
      price: {
        isNumeric: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_PRICE_MUST_BE_A_NUMBER
        },
        custom: {
          options: (value) => {
            if (value < 0) {
              throw new Error(MENU_MESSAGES.MENU_ITEM_PRICE_MUST_BE_GREATER_THAN_ZERO)
            }
            return true
          }
        }
      },
      category_id: {
        isString: {
          errorMessage: MENU_MESSAGES.CATEGORY_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (!value) {
              throw new Error(MENU_MESSAGES.CATEGORY_ID_IS_REQUIRED)
            }
            const isExistCategory = await categoryService.checkCategoryExist(value)
            if (!isExistCategory) {
              throw new Error(MENU_MESSAGES.CATEGORY_NOT_EXIST)
            }
            return true
          }
        }
      },
      availability: {
        isBoolean: {
          errorMessage: MENU_MESSAGES.AVAILABILITY_MUST_BE_A_BOOLEAN
        }
      },
      stock: {
        isNumeric: {
          errorMessage: MENU_MESSAGES.STOCK_MUST_BE_A_NUMBER
        },
        notEmpty: {
          errorMessage: MENU_MESSAGES.STOCK_IS_REQUIRED
        }
      }
    },
    ['body']
  )
)
export const updateMenuItemValidator = validate(
  checkSchema(
    {
      name: {
        isString: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_NAME_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (value) {
              // Chỉ kiểm tra khi có giá trị
              const isExistCategory = await menuService.checkNameExists(value)
              if (isExistCategory) {
                throw new Error(MENU_MESSAGES.MENU_ITEM_NAME_IS_EXIST)
              }
            }
            return true
          }
        },
        optional: { options: { nullable: true } }
      },
      description: {
        isString: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_DESCRIPTION_MUST_BE_A_STRING
        },
        optional: { options: { nullable: true } }
      },
      price: {
        isNumeric: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_PRICE_MUST_BE_A_NUMBER
        },
        custom: {
          options: (value) => {
            if (value && value < 0) {
              // Kiểm tra khi có giá trị
              throw new Error(MENU_MESSAGES.MENU_ITEM_PRICE_MUST_BE_GREATER_THAN_ZERO)
            }
            return true
          }
        },
        optional: { options: { nullable: true } } // Cho phép không có giá trị
      },
      category_id: {
        isString: {
          errorMessage: MENU_MESSAGES.CATEGORY_ID_MUST_BE_A_STRING
        },
        custom: {
          options: async (value) => {
            if (value) {
              // Chỉ kiểm tra khi có giá trị
              const isExistCategory = await categoryService.checkCategoryExist(value)
              if (!isExistCategory) {
                throw new Error(MENU_MESSAGES.CATEGORY_NOT_EXIST)
              }
            }
            return true
          }
        },
        optional: { options: { nullable: true } } // Cho phép không có giá trị
      },
      availability: {
        isBoolean: {
          errorMessage: MENU_MESSAGES.AVAILABILITY_MUST_BE_A_BOOLEAN
        },
        optional: { options: { nullable: true } } // Cho phép không có giá trị
      },
      stock: {
        isNumeric: {
          errorMessage: MENU_MESSAGES.STOCK_MUST_BE_A_NUMBER
        },
        optional: { options: { nullable: true } } // Cho phép không có giá trị
      }
    },
    ['body']
  )
)
