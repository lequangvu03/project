'use client'

import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { cn } from '~/lib/utils'
import { Checkbox } from './ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

type Props = {
  className?: string
}

export default function FormLogin({ className, ...props }: Props) {
  const [visible, setVisible] = useState<boolean>(false)
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = form.handleSubmit((data) => {
    console.log(data)
  })

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev)
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
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className='h-auto border-none bg-[var(--bg-input)] px-6 py-4 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={visible ? 'text' : 'password'}
                      className='h-auto border-none bg-[var(--bg-input)] px-6 py-4 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
                      placeholder='Enter your password'
                      {...field}
                    />
                    <button
                      type='button'
                      className='absolute right-6 top-1/2 size-5 -translate-y-1/2'
                      onClick={togglePasswordVisibility}
                    >
                      {visible ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2'>
              <Checkbox
                className='border-[var(--primary-color)] data-[state=checked]:text-[var(--primary-color)]'
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
        </Form>
        <Button
          className='h-auto w-full bg-[var(--primary-color)] py-3 text-xl transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
          onClick={handleLogin}
          disabled={false}
        >
          Login
        </Button>
      </CardContent>
    </Card>
  )
}
