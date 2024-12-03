'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PaginationOrder } from '~/components/pagination-order'
import Table from '~/components/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Order } from '~/definitions/types'
import { useGetOrdersQuery } from '~/hooks/data/orders.data'

export default function OrderPage() {
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<number>(-1)
  const routes = useRouter()
  const { data: orders } = useGetOrdersQuery({ page: page, status: status })
  if (orders?.result) {
    return (
      <main className='flex flex-col gap-4'>
        <section className='h-[1px] w-full bg-slate-600' />
        <section className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Button
              onClick={() => {
                setStatus(-1)
                setPage(1)
              }}
            >
              All
            </Button>
            <Button
              onClick={() => {
                setStatus(0)
                setPage(1)
              }}
            >
              In Progress
            </Button>
            <Button
              onClick={() => {
                setStatus(1)
                setPage(1)
              }}
            >
              Completed
            </Button>

            <Button
              onClick={() => {
                setStatus(2)
                setPage(1)
              }}
            >
              Cancelled
            </Button>
          </div>

          <div className='flex items-center gap-4'>
            <Input className='' />
            <Button onClick={()=>{
              routes.push('/admin/table')
            }} className=''>Add new order</Button>
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
