'use client'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { orderIcon } from '~/assets/images'
import useQueryParams from '~/hooks/useQueryParams'
import { cn } from '~/lib/utils'

type Props = {
  _id?: string
  name: string
  amount: number
  icon?: StaticImport | string
}

export default function Category({ _id, icon = orderIcon.burger, name, amount }: Props) {
  const searchParams = useQueryParams()
  console.log(_id)
  return (
    <Link
      href={`/admin/menu/?categoryId=${_id}`}
      className={cn(
        'block cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl',
        {
          'border-[var(--primary-color)]': searchParams?.categoryId === _id
        }
      )}
    >
      <section className='flex w-full items-center justify-end'>
        <Image src={icon} alt='Food Icon' />
      </section>
      <section>
        <h2 className='text-[16px] font-medium leading-[24px] text-gray-300'>{name}</h2>
        <p className='text-[16px] font-light leading-[24px] text-gray-500'>{amount + ' items'}</p>
      </section>
    </Link>
  )
}
