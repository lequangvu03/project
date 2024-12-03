'use client'

import Image from 'next/image'
import { Button } from './ui/button'

type Props = {
  image: string
  price: string
  name: string
  onAdd: () => void
  onRemove: () => void
}

export default function Kichen({ image, price, name, onAdd, onRemove }: Props) {
  return (
    <div className='flex gap-4 rounded-xl bg-[#292C2D] px-3 py-4 shadow-2xl'>
      <Image
        src={image}
        width={150}
        height={100}
        alt='Food Icon'
        className='max-h-[100px] max-w-[100px] rounded-[10px]'
      />
      <div>
        <div className='mt-2 min-w-[120px] max-w-[120px] truncate text-[16px] font-semibold leading-[21px] text-gray-300'>
          {name}
        </div>
        <div className='mt-1 text-[15px] font-normal leading-[21px] text-gray-500'>{price}</div>

        <div className='mt-6 flex justify-end gap-2'>
          <Button onClick={onRemove} className='flex h-6 w-6 items-center justify-center rounded-full p-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-minus'
            >
              <path d='M5 12h14' />
            </svg>
          </Button>
          <Button onClick={onAdd} className='flex h-6 w-6 items-center justify-center rounded-full p-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-plus'
            >
              <path d='M5 12h14' />
              <path d='M12 5v14' />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
