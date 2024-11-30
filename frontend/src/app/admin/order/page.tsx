'use client'

import { useState } from 'react'
import { PaginationOrder } from '~/components/pagination-order'
import Table from '~/components/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Order } from '~/definitions/types'
import { useGetOrdersQuery } from '~/hooks/data/orders.data'

export default function OrderPage() {
  const [page, setPage] = useState<number>(1)
  const { data: orders } = useGetOrdersQuery({ page: page })
  if (orders?.result) {
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
        <PaginationOrder page={page} setPage={setPage} totalPage={Math.ceil(orders?.result?.total / 6)} />
      </main>
    )
  }
}
