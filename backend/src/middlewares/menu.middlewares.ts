import formidable from 'formidable'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'
import { NextFunction, Request, Response } from 'express'
import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { MENU_MESSAGES } from '~/constants/messages'
import categoryService from '~/services/category.services'
import menuService from '~/services/menu.services'
import databaseService from '~/services/database.services'
import { ObjectId } from 'mongodb'

export const handleRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const form = formidable({
      maxFiles: 1,
      keepExtensions: true,
      maxFileSize: 3000 * 1024, // 300KB
      filter: function ({ name, mimetype }) {
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

    const processedFields: Record<string, any> = {}

    for (const [key, value] of Object.entries(result.fields)) {
      let fieldValue = Array.isArray(value) ? value[0] : value
      if (fieldValue === 'true' || fieldValue === 'false') {
        fieldValue = fieldValue === 'true'
      } else if (!isNaN(fieldValue as any) && fieldValue.trim() !== '') {
        fieldValue = +fieldValue
      }

      processedFields[key] = fieldValue
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
      stock: {
        isNumeric: {
          errorMessage: MENU_MESSAGES.STOCK_MUST_BE_A_NUMBER
        },
        notEmpty: {
          errorMessage: MENU_MESSAGES.STOCK_IS_REQUIRED
        },
        optional: { options: { nullable: true } }
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
export const deleteMenuItemValidator = validate(
  checkSchema(
    {
      ids: {
        custom: {
          options: async (value, req) => {
            // Kiểm tra mảng không rỗng
            if (value.length === 0) {
              throw new Error('Mảng ids không được rỗng')
            }

            // Kiểm tra tất cả ID có tồn tại trong DB không
            const objectIds = value.map((id: string) => new ObjectId(id))
            const existingItems = await databaseService.menuItems
              .find({
                _id: { $in: objectIds }
              })
              .toArray()
            if (existingItems.length !== value.length) {
              const foundIds = existingItems.map((item: any) => item._id.toString())
              const invalidIds = value.filter((id: string) => !foundIds.includes(id))

              // Throw lỗi nếu có ID không hợp lệ
              throw new Error(`Những ID không tồn tại trong cơ sở dữ liệu: ${invalidIds.join(', ')}`)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
