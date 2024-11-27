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
  type?: 'text' | 'password'
}

function CustomInput({ className, placeholder, field, label, classNameInput, type = 'text' }: Props) {
  const [visible, setVisible] = useState<boolean>(false)

  const togglePasswordVisibility = () => {
    setVisible((prev) => !prev)
  }

  return (
    <FormItem className={className}>
      <FormLabel className='truncate'>{label}</FormLabel>
      <FormControl>
        <div className='relative'>
          <Input
            type={type === 'password' ? (visible ? 'text' : 'password') : 'text'}
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
