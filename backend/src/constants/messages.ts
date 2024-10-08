export const AUTH_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_NOT_FOUND: 'Email not found',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  EMAIL_VERIFY_TOKEN_EXPIRED: 'Email verify token expired',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be from 6 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Confirm password length must be from 6 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  LOGIN_SUCCESS: 'Login success',
  REGISTER_SUCCESS: 'Please check your email to verify your account.',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  ACCESS_TOKEN_INVALID: 'Access token invalid',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  REFRESH_TOKEN_NOT_EXIST: 'Refresh token not exist',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  LOGOUT_SUCCESS: 'Logout success',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verify success',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend verify email success',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required',
  PASSWORD_RESET_SUCCESS: 'Password reset success',
  OTP_INVALID_OR_EXPIRED: 'OTP invalid or expired',
  OTP_IS_REQUIRED: 'OTP is required',
  OTP_IS_WRONG: 'OTP is wrong',
  OTP_IS_NOT_NUMBER: 'OTP is not number',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_ME_SUCCESS: 'Get my profile success',
  USER_NOT_VERIFIED: 'User not verified',
  PERMISSION_DENIED: 'Permission denied'
} as const

export const TABLE_MESSAGES = {
  TABLE_NUMBER_MUST_BE_NUMBER: 'Table number must be number',
  TABLE_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100: 'Table number length must be from 1 to 100',
  TABLE_NUMBER_IS_EXIST: 'Table number is exist',
  SEAT_NUMBER_MUST_BE_NUMBER: 'Seat number must be number',
  SEAT_NUMBER_LENGHT_MUST_BE_FROM_1_TO_100: 'Seat number length must be from 1 to 10',
  GET_ALL_TABLE_SUCCESS: 'Get all table success',
  ADD_TABLE_SUCCESS: 'Add table success',
  UPDATE_TABLE_SUCCESS: 'Update table success',
  DELETE_TABLE_SUCCESS: 'Delete table success'
} as const
export const MENU_MESSAGES = {
  GET_ALL_MENU_ITEM_SUCCESS: 'Get menu success',
  ADD_MENU_ITEM_SUCCESS: 'Add menu item success',
  UPDATE_MENU_ITEM_SUCCESS: 'Update menu item success',
  DELETE_MENU_ITEM_SUCCESS: 'Delete menu item success',
  MENU_ITEM_NAME_MUST_BE_A_STRING: 'Menu item name must be a string',
  MENU_ITEM_PRICE_MUST_BE_A_NUMBER: 'Menu item price must be a number',
  MENU_ITEM_DESCRIPTION_MUST_BE_A_STRING: 'Menu item description must be a string',
  CATEGORY_ID_IS_REQUIRED: 'Category id is required',
  CATEGORY_NOT_EXIST: 'Category not exist',
  VARIANT_IDS_MUST_BE_AN_ARRAY: 'Variant ids must be an array'
} as const
export const CATEGORY_MESSAGES = {
  NAME_MUST_BE_STRING: 'Category name must be a string.',
  NAME_IS_REQUIRED: 'Category name is required.',
  NAME_IS_EXIST: 'Category name already exists.',
  DESCRIPTION_MUST_BE_STRING: 'Description must be a string.',
  INVALID_ID: 'Invalid category ID.',
  GET_ALL_CATEGORIES_SUCCESS: 'Get all categories successfully.',
  ADD_CATEGORY_SUCCESS: 'Category added successfully.',
  UPDATE_CATEGORY_SUCCESS: 'Category updated successfully.',
  DELETE_CATEGORY_SUCCESS: 'Category deleted successfully.'
}

export const VARIANT_MESSAGES = {
  MENU_ITEM_ID_INVALID: 'Menu item ID must be a valid Mongo ID.',
  MENU_ITEM_ID_REQUIRED: 'Menu item ID is required.',
  NAME_MUST_BE_STRING: 'Variant name must be a string.',
  NAME_IS_REQUIRED: 'Variant name is required.',
  OPTION_NAME_MUST_BE_STRING: 'Option name must be a string.',
  OPTION_NAME_IS_REQUIRED: 'Option name is required.',
  PRICE_ADJUSTMENT_MUST_BE_NUMBER: 'Price adjustment must be a number.',
  PRICE_ADJUSTMENT_IS_REQUIRED: 'Price adjustment is required.',
  INVALID_ID: 'Invalid variant ID.',
  GET_ALL_VARIANTS_SUCCESS: 'Get all variants successfully.',
  ADD_VARIANT_SUCCESS: 'Variant added successfully.',
  UPDATE_VARIANT_SUCCESS: 'Variant updated successfully.',
  DELETE_VARIANT_SUCCESS: 'Variant deleted successfully.',
  COUNT_MUST_BE_NUMBER: 'Count must be a number'
}

export const ORDER_MESSAGE = {
  GET_ALL_ORDERS_SUCCESS: 'Get all orders success',
  ADD_MENU_ITEM_SUCCESS: 'Add new order success'
}
