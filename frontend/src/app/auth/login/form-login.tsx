'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { useLoginMutation } from '~/hooks/data/auth'
import { cn, handleErrorAPI } from '~/lib/utils'
import { AuthSchema, TLoginForm } from '~/schemaValidations/auth.schema'
import CustomInput from '../../../components/custom-input'
import { Checkbox } from '../../../components/ui/checkbox'
import { Form, FormField } from '../../../components/ui/form'
import { signIn } from 'next-auth/react'

type Props = {
  className?: string
}

export default function FormLogin({ className, ...props }: Props) {
  const loginMutation = useLoginMutation()

  const router = useRouter()
  const form = useForm<TLoginForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(AuthSchema)
  })

  const onSubmit = async function (body: TLoginForm) {
    if (loginMutation.isPending) return
    try {
      const response = await signIn('credentials', {
        ...body,
        redirect: false
      })

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
        'w-full max-w-[756px] rounded-2xl border-none bg-[#292C2D] text-white md:rounded-[50px] md:p-[50px]',
        className
      )}
      {...props}
    >
      <CardHeader className='flex items-center justify-center'>
        <CardTitle className='text-4xl'>Login</CardTitle>
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
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => <CustomInput label='Password' type='password' field={field} />}
            />
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  className='border-[var(--primary-color)] data-[state=checked]:bg-[#292C2D] data-[state=checked]:text-[var(--primary-color)]'
                  id='remember'
                />
                <label
                  htmlFor='remember'
                  className='text-sm font-medium leading-none text-[var(--primary-color)] peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Remember me
                </label>
              </div>
              <div>
                <Link href={'/'} className='text-[var(--primary-color)] underline'>
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button
              className='h-auto w-full bg-[var(--primary-color)] py-3 text-xl transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
              disabled={loginMutation.isPending}
            >
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
