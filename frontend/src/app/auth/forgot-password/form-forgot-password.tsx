'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { cn, handleErrorAPI } from '~/lib/utils'
import { AuthForgotSchema, TForgotForm } from '~/schemaValidations/auth.schema'
import CustomInput from '../../../components/custom-input'
import { Form, FormField } from '../../../components/ui/form'
import { useSendOtpMutation } from '~/hooks/data/auth.data'
import Loading from '~/components/loading'

type Props = {
  className?: string
}

export default function FormForgotPassword({ className, ...props }: Props) {
  const router = useRouter()
  const form = useForm<TForgotForm>({
    defaultValues: {
      email: ''
    },
    resolver: zodResolver(AuthForgotSchema)
  })

  const { mutate: sendOtp, isPending } = useSendOtpMutation()
  const onSubmit = async function (body: TForgotForm) {
    try {
      sendOtp(
        { email: body.email },
        {
          onSuccess: (response: { message: string; result: string }) => {
            const otpId = response.result
            router.replace(`/auth/otp?email=${body.email}&otp_id=${otpId}`)
          },
          onError: (error: any) => {
            handleErrorAPI({
              error: error,
              setError: form.setError
            })
          }
        }
      )
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
        <CardTitle className='text-4xl'>Forgot</CardTitle>
        <CardDescription className='text-center'>Please enter your credentials below to continue</CardDescription>
      </CardHeader>
      <CardContent className='mt-6 grid gap-4'>
        <Form {...form}>
          <form method='POST' onSubmit={form.handleSubmit(onSubmit, console.log)} className='space-y-8'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => <CustomInput label='Email' field={field} />}
            />

            <Button className='h-auto w-full bg-[var(--primary-color)] py-3 text-xl transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'>
              Send OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
