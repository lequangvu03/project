'use client'

import dayjs from 'dayjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLayoutEffect } from 'react'
import { RoleType } from '~/definitions/constant/types.constant'
import { useGetMyProfileQuery } from '~/hooks/data/profiles.data'
import { routes } from '~/routers'
import useAuthStore from '~/stores/auth.store'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'
import { IoIosNotifications } from 'react-icons/io'
import { useGetCountNotificationCountQuery } from '~/hooks/data/notifications.data'

export const dynamic = 'force-dynamic'

export default function Header() {
  const pathname = usePathname()
  const exactRoute = routes.find((route) => route.redirect.includes(pathname))
  const myProfileData = useGetMyProfileQuery()
  const authStore = useAuthStore()
  const count = useGetCountNotificationCountQuery()

  useLayoutEffect(() => {
    if (myProfileData.data?.result) {
      const { role, permissions, avatar_url, email, name } = myProfileData.data.result

      authStore.updateAuthStore({
        role: role,
        permissions: permissions,
        avatar: avatar_url,
        email,
        name: name
      })
    }
  }, [myProfileData.data])

  return (
    <header className='sticky top-8 z-10 flex h-[100px] items-center justify-between rounded-2xl bg-[var(--secondary-color)] px-4 shadow-sm shadow-border'>
      <section className='flex flex-col'>
        <h2 className='text-[26px] font-semibold leading-8 text-gray-200'>{exactRoute?.name}</h2>
        <h4 className='text-[13px] font-medium leading-7 text-gray-500' suppressHydrationWarning>
          {dayjs(new Date()).format('dddd, MMMM D, YYYY')}
        </h4>
      </section>

      <section className='flex items-center justify-end gap-[2px]'>
        <Link href={'/admin/notification'} className='relative animate-pulse'>
          <IoIosNotifications className='text-[30px]' />
          <div className='absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#EA7C69] text-[14px]'>
            <span>{count?.data?.result?.count ?? ''}</span>
          </div>
        </Link>
        {myProfileData.isPending ? (
          <Skeleton className='h-[58px] w-[264px] rounded-full bg-[var(--bg-input)]' />
        ) : (
          <Link
            href='/admin/profile'
            className='flex items-center justify-between gap-1 rounded-full bg-[var(--bg-input)] px-3 py-2 transition-all hover:opacity-80'
          >
            <Avatar className='h-10 w-10'>
              <AvatarImage className='h-full w-full' src={authStore.avatar} alt='avatar' />
              <AvatarFallback className='bg-white uppercase text-black'>{authStore.email?.[0]}</AvatarFallback>
            </Avatar>
            <div className='gap flex flex-col overflow-hidden px-2'>
              <h2 className='max-w-[180px] truncate text-[16px] font-semibold text-gray-400'>{authStore.email}</h2>
              <p className='text-[12px] font-normal text-gray-400'>
                {authStore.role === RoleType.Admin ? 'Admin' : 'Employee'}
              </p>
            </div>
          </Link>
        )}
      </section>
    </header>
  )
}
