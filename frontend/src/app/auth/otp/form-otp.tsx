'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
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

type Props = {
  className?: string
}

export default function FormOTP({ className, ...props }: Props) {
  const router = useRouter()
  const form = useForm<TLoginForm>({
    defaultValues: {
      email: '',
      password: '',
      remember: false
    },
    resolver: zodResolver(AuthSchema)
  })

  useEffect(() => {
    const remember = getRememberMeFromCS()
    if (remember) {
      form.setValue('remember', remember)
      const account = getAuthFromCS()

      if (account) {
        const { email, password } = account
        form.setValue('email', email)
        form.setValue('password', password)
      }
    }
  }, [])

  const onSubmit = async function (body: TLoginForm) {
    try {
      const response = await signIn('credentials', {
        ...body,
        redirect: false
      })

      if (response?.error) {
        throw JSON.parse(response?.error)
      }
      const { email, password, remember } = body
      if (remember) {
        setRememberMeToCS(remember)
        setAuthToCS({
          email,
          password
        })
      } else {
        removeRememberMeToCS()
        removeAuthToCS()
      }
      router.replace('/admin/menu')
    } catch (error: any) {
      handleErrorAPI({
        error: error,
        setError: form.setError
      })
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
        <InputOTP maxLength={6}>
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
      <Button className='h-auto w-full bg-[var(--primary-color)] py-3 text-xl transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'>
        Reset Password
      </Button>
    </Card>
  )
}
