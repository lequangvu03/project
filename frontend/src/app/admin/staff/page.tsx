import TableStaff from '~/components/staff'
import { Button } from '~/components/ui/button'

export default function Page() {
  return (
    <div className='flex flex-col gap-8'>
      <header className='flex items-center justify-between'>
        <h3>Staff (22)</h3>
        <div>
          <Button>Add Staff</Button>
        </div>
      </header>
      <aside className='flex items-center gap-2'>
        <Button className='bg-[#EA7C69]'>Staff Management</Button>
        <Button className='bg-transparent text-white'>Attendance</Button>
      </aside>
      <main>
        <section className='space-y-4'>
          <TableStaff />
        </section>
      </main>
    </div>
  )
}
