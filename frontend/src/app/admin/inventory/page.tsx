'use client'

import { Button } from '~/components/ui/button'

import Link from 'next/link'
import { useState } from 'react'
import { useGetINboundOrdersQuery } from '~/hooks/data/inbound-order.data'
import Table from '~/components/table'
import { PaginationOrder } from '~/components/pagination-order'
import { InboundOrderType, Order } from '~/definitions/types'
import InboundTable from '~/components/tableInbound'

function InventoryPage() {
  const [page, setPage] = useState<number>(1)
  const [showIngredients, setShowIngredients] = useState<boolean>(false)
  const { data: orders } = useGetINboundOrdersQuery({ page: page })
  const toggleTable = () => {
    setShowIngredients(true)
  }
  const toggleInbound = () => {
    setShowIngredients(false)
  }
  if (orders?.result) {
    return (
      <div className='mx-auto w-full'>
        <header className='flex items-center justify-between'>
          <div>
            <Button onClick={toggleInbound} className='bg-[#EA7C69]'>
              Inbound Order
            </Button>
            <Button onClick={toggleTable} className='bg-transparent text-white'>
              Ingredient
            </Button>
          </div>
          <div>
            <Button className='bg-[#EA7C69]'>
              <Link href='/admin/inventory/add'>Add New Inbound Order</Link>
            </Button>
          </div>
        </header>
        <section>
  
          {showIngredients ? (
             <section className='grid grid-cols-4 gap-8'>
             {orders?.result?.inboundOrders?.map(function (order: InboundOrderType, index: number) {
               return <InboundTable order={order} key={index} />
             })}
           </section>
          ) : (
            <section className='grid grid-cols-4 gap-8'>
              {orders?.result?.inboundOrders?.map(function (order: InboundOrderType, index: number) {
                return <InboundTable order={order} key={index} />
              })}
            </section>
          )}
        </section>
        <PaginationOrder page={page} setPage={setPage} totalPage={Math.ceil(orders?.result?.total / 6)} />
        <div></div>
      </div>
    )
  }
}

export default InventoryPage
