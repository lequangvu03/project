import React, { useState } from 'react'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { ControllerRenderProps } from 'react-hook-form'
import { cn } from '~/lib/utils'

type Props = {
  className?: string
  placeholder?: string
  label?: string
  field: any
  type?: 'text' | 'password'
}

function CustomInput({ className, placeholder, field, label, type = 'text' }: Props) {
  const [visible, setVisible] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className='relative'>
          <Input
            type={type === 'password' ? (visible ? 'text' : 'password') : 'text'}
            className={
              'h-auto border-none bg-[#3D4142] px-6 py-4 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
            }
            placeholder={placeholder}
            {...field}
          />
          {type === 'password' && (
            <button
              type='button'
              className='absolute right-6 top-1/2 size-5 -translate-y-1/2'
              onClick={togglePasswordVisibility}
            >
              {visible ? <EyeOff /> : <Eye />}
            </button>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default CustomInput
