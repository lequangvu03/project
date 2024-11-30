'use client'

import { useState } from 'react'
import Notification from '~/components/notification'
import { PaginationOrder } from '~/components/pagination-order'
import { Button } from '~/components/ui/button'
import { NotificationType } from '~/definitions/types'
import { useGetNotificationAllQuery } from '~/hooks/data/notifications.data'

export default function Page() {
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<number>(1)
  const { data: notifications } = useGetNotificationAllQuery({ page: page, limit: 12, status })

  if (notifications?.result) {
    return (
      <main className='bg-[var(--secondary-color)]'>
        <section className='flex items-center justify-between rounded-sm p-4'>
          <div className='flex items-center gap-2'>
            <Button className='bg-[#EA7C69]'>All</Button>
            <Button className='bg-transparent text-gray-400'>Read</Button>
            <Button className='bg-transparent text-gray-400'>Unread</Button>
          </div>
          <div>
            <Button className='bg-[#EA7C69]'>Mark all as read</Button>
          </div>
        </section>
        <section>
          {notifications?.result?.notifications?.map(function (notification: NotificationType, index: number) {
            return <Notification notification={notification} key={index} />
          })}
        </section>
        <section>
          <PaginationOrder page={page} setPage={setPage} totalPage={Math.ceil(notifications?.results?.total)} />
        </section>
      </main>
    )
  }
}
