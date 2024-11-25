'use client'

import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { usePathname } from 'next/navigation'
import { routes } from '~/routers'
import dayjs from 'dayjs'

export const dynamic = 'force-dynamic'

export default function Header() {
  const pathname = usePathname()
  const exactRoute = routes.find((route) => route.redirect.includes(pathname))

  return (
    <header className='sticky top-8 z-10 flex h-[100px] items-center justify-between rounded-2xl bg-[var(--secondary-color)] px-4 shadow-sm shadow-border'>
      <section className='flex flex-col'>
        <h2 className='text-[26px] font-semibold leading-8 text-gray-200'>{exactRoute?.name}</h2>
        <h4 className='text-[13px] font-medium leading-7 text-gray-500' suppressHydrationWarning>
          {dayjs(new Date()).format('dddd, MMMM D, YYYY')}
        </h4>
      </section>

      <section className='flex items-center gap-[2px]'>
        <Link
          href='/admin/profile'
          className='flex items-center justify-between gap-1 rounded-full bg-[var(--bg-input)] px-3 py-2 transition-all hover:opacity-80'
        >
          <Avatar className='h-10 w-10'>
            <AvatarImage className='h-full w-full' src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback className='bg-white text-black'>K</AvatarFallback>
          </Avatar>
          <div className='gap flex flex-col px-2'>
            <h2 className='text-[16px] font-semibold text-gray-400'>Nguyen Duy Khanh</h2>
            <p className='text-[12px] font-normal text-gray-400'>Blockchain Engineer</p>
          </div>
        </Link>
      </section>
    </header>
  )
}
