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
  className?: string
}

export default function Category({ _id, icon = orderIcon.burger, name, amount, className }: Props) {
  const searchParams = useQueryParams()
  const isActive = searchParams?.categoryId === _id
  return (
    <Link
      href={_id ? `/admin/menu/?categoryId=${_id}` : '/admin/menu'}
      className={cn(
        'block cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl transition-all hover:border-[var(--primary-color)]',
        {
          'bg-[var(--primary-color)]': isActive
        },
        className
      )}
    >
      <div className='flex w-full items-center justify-end'>
        <Image src={icon} alt='Food Icon' className='pointer-events-none select-none' />
      </div>
      <section>
        <h2
          className={cn('text-[16px] font-medium leading-[24px] text-gray-300 transition-all', {
            'text-secondary': isActive
          })}
        >
          {name}
        </h2>
        <p
          className={cn('text-[16px] font-light leading-[24px] text-gray-500 transition-all', {
            'text-secondary': isActive
          })}
        >
          {amount + ' items'}
        </p>
      </section>
    </Link>
  )
}
