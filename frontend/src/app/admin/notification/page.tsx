'use client'

import { useCallback, useState } from 'react'
import Notification from '~/components/notification'
import { PaginationWithLinks } from '~/components/custom-pagination'
import { Button } from '~/components/ui/button'
import { NotificationType } from '~/definitions/types'
import { useGetNotificationAllQuery, useMarkAllAsReadMutation } from '~/hooks/data/notifications.data'
import useSocket from '~/hooks/useSocket'
import usePaginationParams from '~/hooks/usePaginationParams'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function Page() {
  const [status, setStatus] = useState<number>(-1)
  const markAllAsReadMutation = useMarkAllAsReadMutation()
  const { limit, page } = usePaginationParams()
  const { data: notifications } = useGetNotificationAllQuery({
    page: +page,
    limit: +limit,
    status: status
  })
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildLink = useCallback(
    (newPage: number) => {
      const key = 'page'
      if (!searchParams) return `${pathname}?${key}=${newPage}`
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, String(newPage))
      return `${pathname}?${newSearchParams.toString()}`
    },
    [searchParams, pathname]
  )
  const handleMarkAllAsRead = async () => {
    const ids = notifications?.result.notifications.map((notification: NotificationType) => notification._id as string)
    await markAllAsReadMutation.mutateAsync(ids)
  }

  const totalPage = (notifications?.result?.total || 0) as number
  const handleSelectStatus = (status: number) => {
    setStatus(status)
    router.push(buildLink(1))
  }
  const newOrderData: NotificationType = useSocket('new_noti')

  if (notifications?.result) {
    return (
      <main className='bg-[var(--secondary-color)]'>
        <section className='flex items-center justify-between rounded-sm p-4'>
          <div className='flex items-center gap-2'>
            <Button
              className={`${status === -1 ? 'bg-[#EA7C69] text-white' : 'bg-transparent text-gray-400'}`}
              onClick={() => {
                handleSelectStatus(-1)
              }}
            >
              All
            </Button>
            <Button
              className={`${status === 1 ? 'bg-[#EA7C69] text-white' : 'bg-transparent text-gray-400'}`}
              onClick={() => {
                handleSelectStatus(1)
              }}
            >
              Read
            </Button>
            <Button
              className={`${status === 0 ? 'bg-[#EA7C69] text-white' : 'bg-transparent text-gray-400'}`}
              onClick={() => {
                handleSelectStatus(0)
              }}
            >
              Unread
            </Button>
          </div>
          <div>
            <Button onClick={handleMarkAllAsRead} className='bg-[#EA7C69]'>
              Mark all as read
            </Button>
          </div>
        </section>
        {newOrderData && newOrderData?._id ? (
          <section>
            <Notification notification={newOrderData} />
          </section>
        ) : null}
        <section>
          {notifications?.result?.notifications?.map(function (notification: NotificationType, index: number) {
            return <Notification notification={notification} key={index} />
          })}
        </section>
        <section>
          <PaginationWithLinks page={+page} pageSize={+limit} totalCount={totalPage} />
        </section>
      </main>
    )
  }
}
