'use client'

import Table from '~/components/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Order } from '~/definitions/types'
import { useGetOrdersQuery } from '~/hooks/data/orders.data'

export default function OrderPage() {
  const { data: orders } = useGetOrdersQuery()
  console.log(orders)
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

      <section className='grid grid-cols-3 gap-8'>
        {orders?.result?.orders?.map(function (order: Order, index: number) {
          return <Table order={order} key={index} />
        })}
      </section>
    </main>
  )
}
