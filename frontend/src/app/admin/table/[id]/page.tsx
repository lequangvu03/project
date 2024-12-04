'use client'
import { omit, omitBy } from 'lodash'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import DateTime from '~/components/date-time'
import Kitchen from '~/components/kitchen'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { ScrollArea } from '~/components/ui/scroll-area'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { TableStatus } from '~/definitions/constant/types.constant'
import { Order, Product, TTable } from '~/definitions/types'
import { useGetCategoriesQuery } from '~/hooks/data/categories.data'
import { useGetDishesQuery } from '~/hooks/data/menu.data'
import { useAddOrderMutation, useGetOrdersByIdQuery, useUpdateOrderMutation } from '~/hooks/data/orders.data'
import { useGetTablesQuery, useUpdateTableQuery } from '~/hooks/data/tables.data'
import { cn } from '~/lib/utils'
import { ICategory } from '~/models/categories.module'
import { IMenuItem } from '~/models/menu.model'

type Props = {
  params: {
    id: string
  }
}

export default function Page({ params: { id } }: Props) {
  const { data: categoriesData } = useGetCategoriesQuery()
  const getOrderByIdQuery = useGetOrdersByIdQuery(id)
  const updateOrderMutation = useUpdateOrderMutation()
  const [tableNumber, setTableNumber] = useState<string>('')
  const router = useRouter()
  const categories = (categoriesData?.result?.categories as ICategory[]) || null
  const totalDishes = useMemo(() => {
    return categories?.reduce((total, category) => total + category.totalProducts, 0) || 0
  }, [categoriesData])

  const [activeTab, setActiveTab] = useState<string>('All')
  const [categoryId, setCategoryId] = useState<string | null>(null)

  const [orderItems, setOrderItems] = useState<
    Record<
      string,
      {
        quantity: number
        item_name: string
        item_price: number
      }
    >
  >({})

  const getTablesQuery = useGetTablesQuery()
  const { data: dishesData } = useGetDishesQuery({ categoryId: categoryId || undefined })

  const price = useMemo(() => {
    return Object.entries(orderItems).reduce((acc, [_, { item_price, quantity }]) => acc + item_price * quantity, 0)
  }, [orderItems])

  useEffect(() => {
    const order = getOrderByIdQuery.data?.result?.orders?.[0] as Order
    if (order) {
      setTableNumber(order.table_number.toString())
      const items = order.order_items.map((i) => [
        i.item_id,
        {
          quantity: i.quantity,
          item_name: i.item_name,
          item_price: i.item_price
        }
      ])

      if (items) {
        setOrderItems(Object.fromEntries(items))
      }
    }
  }, [getOrderByIdQuery.data])

  const handleTabClick = (id: string | null) => {
    setActiveTab(id || 'All')
    setCategoryId(id)
  }

  const handleSubmit = async () => {
    try {
      const items = Object.entries(orderItems)?.map(([item_id, { quantity }]) => {
        return {
          item_id,
          quantity
        }
      })
      const body = {
        table_number: +tableNumber,
        total_price: price,
        order_items: items
      }

      if (!body.table_number || items.length === 0) {
        toast('Please select table and get dishes!')
        return
      }
      const response = await updateOrderMutation.mutateAsync({
        id: id,
        body
      })
      toast(response?.message)
      setTableNumber('')
      setOrderItems({})
      router.push('/admin/order')
    } catch (error) {
      toast('Failed to update order')
    }
  }

  const handleDeleteItem = (item_id: string) => {
    setOrderItems((prev) => {
      return omit(prev, [item_id])
    })
  }

  const handleAddItem = (item: IMenuItem) => {
    setOrderItems((prev) => {
      return {
        ...prev,
        [item._id]: {
          quantity: prev[item._id] ? ++prev[item._id].quantity : 1,
          item_price: item.price,
          item_name: item.name
        }
      }
    })
  }

  const handleSubtractItem = (item_id: string) => {
    setOrderItems((prev) => {
      if (!prev?.[item_id]) return prev

      return omitBy(
        {
          ...prev,
          [item_id]: {
            ...prev?.[item_id],
            quantity: prev?.[item_id] && prev[item_id].quantity >= 1 ? --prev[item_id].quantity : 0
          }
        },
        (v) => v.quantity === 0
      )
    })
  }

  return (
    <main>
      <aside className='flex gap-4'>
        <section className='flex flex-[0.7] flex-col gap-4'>
          <div className='flex flex-wrap gap-4'>
            <div
              onClick={() => handleTabClick(null)}
              className={cn(
                'block min-h-[124px] min-w-[150px] cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl transition-all hover:border-[var(--primary-color)]',
                activeTab === 'All' ? 'bg-[var(--primary-color)]' : ''
              )}
            >
              <section>
                <h2
                  className={cn(
                    'text-[16px] font-medium leading-[24px] text-gray-300 transition-all',
                    activeTab === 'All' ? 'text-secondary' : ''
                  )}
                >
                  All
                </h2>
                <p className='text-[16px] font-light leading-[24px] text-gray-500'>{totalDishes + ' items'}</p>
              </section>
            </div>
            {categories &&
              categories.map((category) => (
                <div
                  key={category._id}
                  onClick={() => handleTabClick(category._id)}
                  className={cn(
                    'block min-h-[124px] min-w-[150px] cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl transition-all hover:border-[var(--primary-color)]',
                    {
                      'bg-[var(--primary-color)]': activeTab === category._id
                    }
                  )}
                >
                  <section>
                    <h2
                      className={cn(
                        'text-[16px] font-medium leading-[24px] text-gray-300 transition-all',
                        activeTab === category._id ? 'text-secondary' : ''
                      )}
                    >
                      {category.name}
                    </h2>
                    <p className='text-[16px] font-light leading-[24px] text-gray-500'>
                      {category.totalProducts + ' items'}
                    </p>
                  </section>
                </div>
              ))}
          </div>
          <div className='h-[1px] bg-slate-500 leading-[0px]' />
          <div className='grid grid-cols-4 gap-3'>
            {dishesData?.result?.menus?.map((dish: IMenuItem, index: any) => (
              <Kitchen
                key={index}
                name={dish.name}
                image={dish.image}
                price={dish.price.toString()}
                onAdd={() => handleAddItem(dish)}
                onRemove={() => handleSubtractItem(dish._id)}
              />
            ))}
          </div>
        </section>
        <div className='flex h-fit flex-[0.3] flex-col gap-4 rounded-xl bg-[#292C2D] p-4'>
          <header className='flex flex-col gap-1'>
            <h3 className='text-2xl font-bold'>Order</h3>
            <DateTime />
          </header>
          <div>
            <Label className='mb-2 block'>Table</Label>
            <Select
              value={tableNumber}
              onValueChange={(table) => {
                setTableNumber(table)
              }}
            >
              <SelectTrigger className='h-auto w-full bg-[var(--bg-input)] py-4 focus:ring-0 focus:ring-offset-0'>
                <SelectValue placeholder='Table' />
              </SelectTrigger>
              <SelectContent className='bg-[var(--bg-input)]'>
                <ScrollArea className='h-[200px] w-full rounded-md'>
                  <SelectGroup>
                    {(getTablesQuery.data?.result?.tables as TTable[])?.map((table) => {
                      return table.status === TableStatus.Empty ||
                        getOrderByIdQuery.data?.result?.orders[0]?.table_number === table.table_number ? (
                        <SelectItem
                          key={table._id}
                          className='h-auto py-3 focus:bg-[var(--secondary-color)]'
                          value={table.table_number.toString()}
                        >
                          Table {table.table_number}
                        </SelectItem>
                      ) : null
                    })}
                  </SelectGroup>
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <ScrollArea className='h-96'>
            {Object.values(orderItems).length === 0 && (
              <div className='flex h-full items-center justify-center'>Add dishes now!</div>
            )}
            <div className='space-y-2 overflow-x-hidden px-4'>
              {Object.entries(orderItems).map(([_id, { item_name, item_price, quantity }], index) => (
                <div key={_id} className='flex items-center justify-between rounded-md bg-[#3D414266] px-4 py-3'>
                  <div className='flex flex-1 items-center gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                      <span>{index}</span>
                    </div>
                    <div className='truncate'>{item_name}</div>
                  </div>
                  <div className='flex w-16 items-center justify-center'>
                    <span className='opacity-70'>x{quantity}</span>
                  </div>
                  <div className='flex w-28 items-center justify-between'>
                    <div className='flex-1 text-right'>{item_price * quantity}</div>
                    <button
                      onClick={() => {
                        handleDeleteItem(_id)
                      }}
                      className='ml-2 text-red-500 hover:text-red-700'
                    >
                      <X />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className='flex flex-col gap-3 rounded-md bg-[#3D414266] p-4'>
            <section className='flex items-center justify-between'>
              <div>Total</div>
              <div className='text-xl font-bold'>
                {price}
                VND
              </div>
            </section>
            <Button
              onClick={handleSubmit}
              className='bg-[#EA7C69] text-[16px] font-medium text-white'
              disabled={Object.keys(orderItems).length === 0 || !tableNumber}
            >
              Complete
            </Button>
          </div>
        </div>
      </aside>
    </main>
  )
}
