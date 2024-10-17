import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import { decrypt, encrypt } from './crypto'
import Cookies from 'js-cookie'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function handleErrorAPI({
  error,
  setError,
  duration
}: {
  duration?: number
  setError?: UseFormSetError<any>
  error: any
}) {
  if (error?.status === 422 && setError) {
    const errors = error.payload.errors
    for (const field in errors) {
      setError(field, {
        type: 'Server Error',
        message: errors[field].msg
      })
    }
  } else {
    toast('Lỗi không xác định!', {
      duration: duration || 3000,
      position: 'top-right'
    })
  }
}

export const normalizePath = (path: string): string => (path.startsWith('/') ? path : `/${path}`)

export const setRememberMeToCS = (value: boolean) => {
  Cookies.set('remember', JSON.stringify(value), {
    expires: 30
  })
}

export const getRememberMeFromCS = () => {
  const remember = Cookies.get('remember')
  return remember ? JSON.parse(remember) : false
}

export const removeRememberMeToCS = () => {
  Cookies.remove('remember')
}

type Auth = {
  email: string
  password: string
}

export const setAuthToCS = ({ email, password }: Auth) => {
  Cookies.set('email', encrypt(email), {
    expires: 30
  })
  Cookies.set('password', encrypt(password), {
    expires: 30
  })
}

export const getAuthFromCS = () => {
  const email = Cookies.get('email')
  const password = Cookies.get('password')

  return email && password
    ? {
        email: decrypt(email),
        password: decrypt(password)
      }
    : null
}

export const removeAuthToCS = () => {
  Cookies.remove('email')
  Cookies.remove('password')
}
