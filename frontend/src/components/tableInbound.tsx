'use client'
import { InboundOrderItem, InboundOrderType, Order, OrderItem } from '~/definitions/types'
import { Button } from './ui/button'
import { formatDateTime, formatTime } from '~/utils/format-datetime'
import { OrderStatus } from '~/definitions/constant/types.constant'
import { useDeleteOrderMutation } from '~/hooks/data/orders.data'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { useGetINboundOrdersQuery } from '~/hooks/data/inbound-order.data'
import { useState } from 'react'
import { PaginationOrder } from '~/components/pagination-order'

type Props = {
  order: InboundOrderType
}

export default function InboundTable() {
  const [page, setPage] = useState<number>(1)
  const { data } = useGetINboundOrdersQuery({ page })
  const orders = data?.result?.inboundOrders
  const totalPage = Math.ceil((data?.result?.total || 0) / 6)
  const deleteOrderMutation: any = useDeleteOrderMutation()
  const handleDelete = async (id: string) => {
    try {
      console.log(id)
      await deleteOrderMutation.mutateAsync(id)
      toast.success('Delete menu item successfully')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
    <section className='grid grid-cols-4 gap-8'>
      {orders?.map((order: InboundOrderType) => (
        <div key={order._id} className={'mt-4 flex max-w-[400px] flex-col gap-4 rounded-xl bg-[#292C2D] p-4 shadow-sm'}>
          <section className='flex flex-col gap-4'>
            <div className='flex items-center justify-between text-[15px] font-light'>
              <h3>{formatDateTime(order.created_at ?? 0)}</h3>
              <h3>{formatTime(order.created_at ?? 0)}</h3>
            </div>
          </section>
          <div className={'h-[0.5px] w-full bg-slate-500'} />
          <section className='flex w-full flex-col gap-2'>
            <header className='flex w-full items-center justify-between gap-4 text-[14px] text-gray-400'>
              <div className='overflow-hidden text-ellipsis whitespace-nowrap'>Quantity</div>
              <div className='flex-1 overflow-hidden text-ellipsis whitespace-nowrap'>Items</div>
              <div>Price</div>
            </header>
            <aside className='flex max-h-[100px] min-h-[100px] flex-col gap-2 overflow-auto'>
              {order.inbound_order_items.map((orderItem: InboundOrderItem, index: number) => (
                <div
                  key={index}
                  className='flex items-center justify-between gap-4 text-[14px] font-light text-gray-200'
                >
                  <div>{orderItem.quantity}</div>
                  <div className='ml-8 flex-1'>{orderItem.item_name}</div>
                  <div>$ {orderItem.item_price}</div>
                </div>
              ))}
            </aside>
          </section>
          <div className={'h-[0.5px] w-full bg-slate-500'} />
          <section className={'flex flex-col gap-4'}>
            <header className='flex items-center justify-between'>
              <h2 className='text-[16px] font-light leading-[24px] text-white'>SubTotal</h2>
              <p className='text-[16px] font-light leading-[24px] text-white'>
                $
                {order.inbound_order_items.reduce(
                  (total: number, amount: InboundOrderItem) => total + amount.quantity,
                  0
                )}
              </p>
            </header>
            <footer className='flex items-center gap-2'>
              <Button className='flex flex-[0.25] items-center justify-center border-[1px] border-solid border-[#EA7C69] bg-transparent'>
                <svg width='18' height='18' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M3.5 17.4321V21.1821H7.25L18.31 10.1221L14.56 6.37213L3.5 17.4321ZM21.21 7.22213C21.3027 7.12962 21.3762 7.01973 21.4264 6.89876C21.4766 6.77778 21.5024 6.6481 21.5024 6.51713C21.5024 6.38616 21.4766 6.25648 21.4264 6.13551C21.3762 6.01453 21.3027 5.90465 21.21 5.81213L18.87 3.47213C18.7775 3.37943 18.6676 3.30588 18.5466 3.2557C18.4257 3.20552 18.296 3.17969 18.165 3.17969C18.034 3.17969 17.9043 3.20552 17.7834 3.2557C17.6624 3.30588 17.5525 3.37943 17.46 3.47213L15.63 5.30213L19.38 9.05213L21.21 7.22213Z'
                    fill='#EA7C69'
                  />
                </svg>
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className='flex flex-[0.25] items-center justify-center border-[1px] border-solid border-[#EA7C69] bg-transparent'>
                    <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='...' fill='#EA7C69' />
                    </svg>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-[var(--secondary-color)]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => order._id && handleDelete(order._id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </footer>
          </section>
        </div>
      ))}
    </section>
    <PaginationOrder page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  )
}
