import Notification from '~/components/notification'
import { Button } from '~/components/ui/button'
import { notifications } from '~/data/notification'

export default function Page() {
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
        {notifications.map(function (notification, index: number) {
          return <Notification />
        })}
      </section>
    </main>
  )
}
