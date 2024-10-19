'use client'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { orderIcon } from '~/assets/images'

type Props = {
  _id?: string
  name: string
  amount: number
  icon?: StaticImport | string
}

export default function Category({ icon = orderIcon.burger, name, amount }: Props) {
  return (
    <main className='rounded-xl bg-[#1F1D2B] px-3 py-4 shadow-2xl'>
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
