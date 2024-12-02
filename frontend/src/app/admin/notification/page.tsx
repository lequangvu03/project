'use client'

import { useState } from 'react'
import Notification from '~/components/notification'
import { PaginationOrder } from '~/components/pagination-order'
import { Button } from '~/components/ui/button'
import { NotificationType } from '~/definitions/types'
import { useGetNotificationAllQuery, useMarkAllAsReadMutation } from '~/hooks/data/notifications.data'
import useSocket from '~/hooks/useSocket'

export default function Page() {
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<number>(-1)
  const markAllAsReadMutation = useMarkAllAsReadMutation()
  const { data: notifications } = useGetNotificationAllQuery({
    page: page,
    limit: 12,
    status: status
  })
  const handleMarkAllAsRead = async () => {
    const ids = notifications?.result.notifications.map((notification: NotificationType) => notification._id as string)
    await markAllAsReadMutation.mutateAsync(ids)
  }
  const totalPage = Math.ceil((notifications?.result?.total || 0) / 12)
  const newOrderData: NotificationType = useSocket('new_noti')
  console.log('newOrderData', newOrderData)
  if (notifications?.result) {
    return (
      <main className='bg-[var(--secondary-color)]'>
        <section className='flex items-center justify-between rounded-sm p-4'>
          <div className='flex items-center gap-2'>
            <Button
              className={`${status === -1 ? 'bg-[#EA7C69] text-white' : 'bg-transparent text-gray-400'}`}
              onClick={() => {
                setStatus(-1)
                setPage(1)
              }}
            >
              All
            </Button>
            <Button
              className={`${status === 1 ? 'bg-[#EA7C69] text-white' : 'bg-transparent text-gray-400'}`}
              onClick={() => {
                setStatus(1)
                setPage(1)
              }}
            >
              Read
            </Button>
            <Button
              className={`${status === 0 ? 'bg-[#EA7C69] text-white' : 'bg-transparent text-gray-400'}`}
              onClick={() => {
                setStatus(0)
                setPage(1)
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
        {newOrderData._id ? (
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
        <PaginationOrder page={page} setPage={setPage} totalPage={totalPage} />
        </section>
      </main>
    )
  }
}
