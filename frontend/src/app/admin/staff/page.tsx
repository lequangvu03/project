import TableStaff from '~/components/staff'
import { Button } from '~/components/ui/button'

export default function Page() {
  return (
    <div className='flex flex-col gap-8'>
      <aside className='flex items-center gap-2'>
        <h3 className='text-[16px]'>Staff Management</h3>
      </aside>
      <main>
        <section className='space-y-4 px-8'>
          <TableStaff />
        </section>
      </main>
    </div>
  )
}
