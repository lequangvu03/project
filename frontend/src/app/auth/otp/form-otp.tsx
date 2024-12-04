'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import {
  cn,
  getAuthFromCS,
  getRememberMeFromCS,
  handleErrorAPI,
  removeAuthToCS,
  removeRememberMeToCS,
  setAuthToCS,
  setRememberMeToCS
} from '~/lib/utils'
import { AuthSchema, TLoginForm } from '~/schemaValidations/auth.schema'
import CustomInput from '../../../components/custom-input'
import { Checkbox } from '../../../components/ui/checkbox'
import { Form, FormField } from '../../../components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '~/components/ui/input-otp'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '~/hooks/useQueryParams'
import { useresetPasswordMutation, usesendVerifyOTPMutation } from '~/hooks/data/auth.data'
import { toast } from 'sonner'

type Props = {
  className?: string
}

export default function FormOTP({ className, ...props }: Props) {
  const router = useRouter()
  const { otp_id ,email} = useQueryParams()
  const [otp, setOtp] = useState<string>('')
  const { mutateAsync: sendVerifyOTP } = usesendVerifyOTPMutation()
  const { mutateAsync: resetPassword } = useresetPasswordMutation()
  const [isVerified, setIsVerified] = useState<boolean>(false)
  const form = useForm({
    defaultValues: {
      password: '',
      confirm_password: ''
    },
    resolver: zodResolver(AuthSchema)
  })
  const handleOtpChange = (value: string) => {
    setOtp(value)
    if (value.length === 6) {
      // Gọi API khi OTP đủ 6 ký tự
      sendVerifyOTP(
        { otp_id, otp: value },
        {
          onSuccess: () => {
            setIsVerified(true)
          },
          onError: (error: any) => {
            handleErrorAPI({ error })
          }
        }
      )
    }
  }
  const handleResetPassword = async (data: { password: string; confirm_password: string }) => {
    try {
      await resetPassword({
        otp_id,
        email: email,
        ...data
      })
      toast.success('Reset password successfully')
      router.replace('/auth/login')
    } catch (error: any) {
      handleErrorAPI({ error }) // Xử lý lỗi nếu có
    }
  }

  return (
    <Card
      className={cn(
        'w-full max-w-[756px] rounded-2xl border-none bg-[var(--secondary-color)] text-white md:rounded-[50px] md:p-[50px]',
        className
      )}
      {...props}
    >
      <CardHeader className='flex items-center justify-center'>
        <CardTitle className='text-4xl'>OTP</CardTitle>
        <CardDescription className='text-center'>Please enter your credentials below to continue</CardDescription>
      </CardHeader>
      <CardContent className='flex items-center justify-center'>
        <InputOTP onChange={handleOtpChange} maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </CardContent>
      {isVerified && (
        <Form {...form}>
          <form className='mb-10 space-y-8'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => <CustomInput label='Password' field={field} />}
            />
            <FormField
              control={form.control}
              name='confirm_password'
              render={({ field }) => <CustomInput label='Confirm Password' type='password' field={field} />}
            />
          </form>
          <Button
            onClick={() => {
              handleResetPassword(form.getValues())
            }}
            className='h-auto w-full bg-[var(--primary-color)] py-3 text-xl transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
          >
            Reset Password
          </Button>
        </Form>
      )}
    </Card>
  )
}
