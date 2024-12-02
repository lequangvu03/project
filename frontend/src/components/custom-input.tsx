import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '~/lib/utils'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

type Props = {
  className?: string
  classNameInput?: string
  placeholder?: string
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any
  type?: 'text' | 'password' | 'number'
  required?: boolean
  min?: number
  max?: number
}

function CustomInput({
  className,
  required,
  placeholder,
  field,
  label,
  classNameInput,
  type = 'text',
  max,
  min
}: Props) {
  const [visible, setVisible] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <FormItem className={className}>
      <FormLabel className='flex items-center gap-2 truncate'>
        {label} {required && <span className='text-xl text-red-600'>*</span>}
      </FormLabel>
      <FormControl>
        <div className='relative'>
          <Input
            min={min}
            max={max}
            type={type === 'password' ? (visible ? 'text' : 'password') : type}
            className={cn(
              'h-auto border-none bg-[var(--bg-input)] px-6 py-4 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
              classNameInput
            )}
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
