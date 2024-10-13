import Table from '~/components/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function OrderPage() {
  return (
    <main className='flex flex-col gap-4'>
      <section className='h-[1px] w-full bg-slate-600' />
      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button>All</Button>
          <Button>Completed</Button>
          <Button>Cancelled</Button>
          <Button>In Progress</Button>
        </div>

        <div className='flex items-center gap-4'>
          <Button className=''>Add new order</Button>
          <Input className='' />
        </div>
      </section>

      <section className='grid grid-cols-3 gap-4'>
        {Array.from({ length: 8 }, (_, index) => (
          <Table key={index} />
        ))}
      </section>
    </main>
  )
}
