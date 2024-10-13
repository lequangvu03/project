'use client'

import { Button } from './ui/button'

type Props = {
  title: string
  path: string
  price: string
  amount: string
}

export default function Kichen({ title, path, price, amount }: Props) {
  return (
    <main className='rounded-xl bg-[#292C2D] px-3 py-4 shadow-2xl'>
      <div className='text-[14px] font-light leading-[21px] text-gray-500'>{path}</div>
      <div className='mt-2 text-[16px] font-semibold leading-[21px] text-gray-300'>{title}</div>
      <div className='mt-1 text-[15px] font-normal leading-[21px] text-gray-500'>{price}</div>

      <div className='mt-6 flex justify-end gap-2'>
        <Button className='flex h-6 w-6 items-center justify-center rounded-full p-1'>
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
        <span className='text-[15px] font-light leading-[21px] text-gray-400'>{amount}</span>
        <Button className='flex h-6 w-6 items-center justify-center rounded-full p-1'>
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
    </main>
  )
}
