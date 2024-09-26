import formidable from 'formidable'
import { UPLOAD_IMAGE_TEMP_DIR } from '~/constants/dir'
import { NextFunction, Request, Response } from 'express'
import { validate } from '~/utils/validation'
import { checkSchema } from 'express-validator'
import { MENU_MESSAGES } from '~/constants/messages'
import categoryService from '~/services/category.services'
import variantService from '~/services/variant.services'

export const handleRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const form = formidable({
      uploadDir: UPLOAD_IMAGE_TEMP_DIR,
      maxFiles: 1,
      keepExtensions: true,
      maxFileSize: 3000 * 1024 // 300KB
      // filter: function ({ name, originalFilename, mimetype }) {
      //   const valid = name === 'image' && Boolean(mimetype?.startsWith('image/'))
      //   if (!valid) {
      //     form.emit('error' as any, new Error('File type is not valid') as any)
      //   }
      //   return valid
      // }
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
        }
      },
      description: {
        isString: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_DESCRIPTION_MUST_BE_A_STRING
        }
      },
      base_price: {
        isNumeric: {
          errorMessage: MENU_MESSAGES.MENU_ITEM_PRICE_MUST_BE_A_NUMBER
        }
      },
      category_id: {
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
      variant_ids: {
        isArray: {
          errorMessage: MENU_MESSAGES.VARIANT_IDS_MUST_BE_AN_ARRAY
        },
        custom: {
          options: (value) => {
            if (value.length > 0) {
              for (const variantId of value) {
                if (!variantId) {
                  throw new Error(MENU_MESSAGES.VARIANT_IDS_MUST_BE_AN_ARRAY)
                }
                const isExistVariant = variantService.checkVariantExist(variantId)
              }
            }
          }
        }
      }
    },
    ['body']
  )
)
