'use client'

import Image, { StaticImageData } from 'next/image'

type Props = {
  icon: StaticImageData | string
  name: string
  amount: string
}

export default function Food({ icon, name, amount }: Props) {
  return (
    <main className='rounded-xl bg-[#292C2D] px-3 py-4 shadow-2xl'>
      <section className='flex w-full items-center justify-end'>
        <Image src={icon} alt='Food Icon' />
      </section>
      <section>
        <h2 className='text-[16px] font-medium leading-[24px] text-gray-300'>{name}</h2>
        <p className='text-[16px] font-light leading-[24px] text-gray-500'>{amount + ' items'}</p>
      </section>
    </main>
  )
}
