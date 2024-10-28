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
type Props = {
  className?: string
}

export default function FormLogin({ className, ...props }: Props) {
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
            <FormField
              control={form.control}
              name='remember'
              render={({ field }) => (
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      onCheckedChange={() => field.onChange(!field.value)}
                      checked={field.value}
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
              )}
            ></FormField>
            <Button className='h-auto w-full bg-[var(--primary-color)] py-3 text-xl transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
