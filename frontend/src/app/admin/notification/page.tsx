import Notification from '~/components/notification'
import { Button } from '~/components/ui/button'
import { notifications } from '~/data/notification'

export default function Page() {
  return (
    <main className='bg-[#1F1D2B]'>
      <section className='flex items-center justify-between rounded-sm p-4'>
        <div className='flex items-center gap-2'>
          <Button className=''>ADD</Button>
          <Button>Read</Button>
          <Button>Unread</Button>
        </div>
        <div>
          <Button>Mark all as read</Button>
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
