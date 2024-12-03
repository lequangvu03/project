'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { PaginationWithLinks } from '~/components/custom-pagination'
import Loading from '~/components/loading'
import Table from '~/components/table'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Order } from '~/definitions/types'
import { useGetOrdersQuery } from '~/hooks/data/orders.data'
import usePaginationParams from '~/hooks/usePaginationParams'
import { cn } from '~/lib/utils'

export default function OrderPage() {
  const [status, setStatus] = useState<number>(-1)
  const { page, limit } = usePaginationParams()
  const { data: orders, isPending } = useGetOrdersQuery({ page: +page, limit: +limit, status: status })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildLink = useCallback(
    (newPage: number) => {
      const key = 'page'
      if (!searchParams) return `${pathname}?${key}=${newPage}`
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, String(newPage))
      return `${pathname}?${newSearchParams.toString()}`
    },
    [searchParams, pathname]
  )

  const handleSelectStatus = (status: number) => {
    setStatus(status)
    router.push(buildLink(1))
  }

  return (
    <main className='flex flex-col gap-4'>
      <section className='h-[1px] w-full bg-slate-600' />
      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Button
            className={cn('bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)]', {
              'bg-[var(--primary-color)]': status === -1
            })}
            onClick={() => {
              handleSelectStatus(-1)
            }}
          >
            All
          </Button>
          <Button
            className={cn('bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)]', {
              'bg-[var(--primary-color)]': status === 0
            })}
            onClick={() => {
              handleSelectStatus(0)
            }}
          >
            In Progress
          </Button>
          <Button
            className={cn('bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)]', {
              'bg-[var(--primary-color)]': status === 1
            })}
            onClick={() => {
              handleSelectStatus(1)
            }}
          >
            Completed
          </Button>

          <Button
            className={cn('bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)]', {
              'bg-[var(--primary-color)]': status === 2
            })}
            onClick={() => {
              handleSelectStatus(2)
            }}
          >
            Cancelled
          </Button>
        </div>

        <div className='flex items-center gap-4'>
          <Input className='' />
          <Button
            onClick={() => {
              router.push('/admin/table')
            }}
            className=''
          >
            Add new order
          </Button>
        </div>
      </section>
      {isPending ? (
        <div className='flex min-h-[200px] w-full items-center justify-center'>
          <Loading />
        </div>
      ) : (
        <>
          <section className='grid grid-cols-3 gap-8'>
            {orders?.result?.orders?.map(function (order: Order, index: number) {
              return <Table order={order} key={index} />
            })}
          </section>
          {orders?.result?.orders?.length > 0 ? (
            <PaginationWithLinks page={+page} pageSize={+limit} totalCount={(orders?.result?.total || 0) as number} />
          ) : (
            <div className='min-h-60 w-full'>No result</div>
          )}
        </>
      )}
    </main>
  )
}
