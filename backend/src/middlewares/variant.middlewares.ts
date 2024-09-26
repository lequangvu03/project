import { checkSchema } from 'express-validator'
import { VARIANT_MESSAGES } from '~/constants/messages'
import variantService from '~/services/variant.services'
import { validate } from '~/utils/validation'

export const addVariantValidator = validate(
  checkSchema(
    {
      menu_item_id: {
        isMongoId: {
          errorMessage: VARIANT_MESSAGES.MENU_ITEM_ID_INVALID
        },
        notEmpty: {
          errorMessage: VARIANT_MESSAGES.MENU_ITEM_ID_REQUIRED
        }
      },
      name: {
        isString: {
          errorMessage: VARIANT_MESSAGES.NAME_MUST_BE_STRING
        },
        notEmpty: {
          errorMessage: VARIANT_MESSAGES.NAME_IS_REQUIRED
        }
      },
      count: {
        isNumeric: {
          errorMessage: VARIANT_MESSAGES.COUNT_MUST_BE_NUMBER
        }
      },
      option_name: {
        isString: {
          errorMessage: VARIANT_MESSAGES.OPTION_NAME_MUST_BE_STRING
        },
        notEmpty: {
          errorMessage: VARIANT_MESSAGES.OPTION_NAME_IS_REQUIRED
        }
      },
      price_adjustment: {
        isNumeric: {
          errorMessage: VARIANT_MESSAGES.PRICE_ADJUSTMENT_MUST_BE_NUMBER
        },
        notEmpty: {
          errorMessage: VARIANT_MESSAGES.PRICE_ADJUSTMENT_IS_REQUIRED
        }
      }
    },
    ['body']
  )
)

export const updateVariantValidator = validate(
  checkSchema(
    {
      id: {
        isMongoId: {
          errorMessage: VARIANT_MESSAGES.INVALID_ID
        }
      },
      name: {
        isString: {
          errorMessage: VARIANT_MESSAGES.NAME_MUST_BE_STRING
        },
        optional: true
      },
      option_name: {
        isString: {
          errorMessage: VARIANT_MESSAGES.OPTION_NAME_MUST_BE_STRING
        },
        optional: true
      },
      price_adjustment: {
        isNumeric: {
          errorMessage: VARIANT_MESSAGES.PRICE_ADJUSTMENT_MUST_BE_NUMBER
        },
        optional: true
      }
    },
    ['body']
  )
)

export const deleteVariantValidator = validate(
  checkSchema(
    {
      id: {
        isMongoId: {
          errorMessage: VARIANT_MESSAGES.INVALID_ID
        }
      }
    },
    ['body']
  )
)
