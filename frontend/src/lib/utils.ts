import { type ClassValue, clsx } from 'clsx'
import { UseFormSetError } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { EntityError } from '~/api/http'
import { toast } from '~/hooks/use-toast'

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
  if (error instanceof EntityError && setError) {
    const errors = error.payload.errors
    for (const field in errors) {
      setError(field, {
        type: 'Server Error',
        message: errors[field].msg
      })
    }
  } else {
    toast({
      title: 'Lỗi!',
      variant: 'destructive',
      description: error?.payload?.message ?? 'Lỗi không xác định!',
      duration: duration || 3000
    })
  }
}

export const normalizePath = (path: string): string => (path.startsWith('/') ? path : `/${path}`)
