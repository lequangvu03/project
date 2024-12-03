'use client'
import { X } from 'lucide-react'
import { useMemo, useState } from 'react'
import Food from '~/components/food-item'
import Kitchen from '~/components/kitchen'
import { Button } from '~/components/ui/button'
import { kitchens } from '~/data/kitchens'
import { Product } from '~/definitions/types'
import { useGetCategoriesQuery } from '~/hooks/data/categories.data'
import { useGetDishesQuery } from '~/hooks/data/menu.data'
import { cn } from '~/lib/utils'
import { ICategory } from '~/models/categories.module'

export default function Page() {
  const { data: categoriesData } = useGetCategoriesQuery()
  const categories = (categoriesData?.result?.categories as ICategory[]) || null

  const totalDishes = useMemo(() => {
    return categories?.reduce((total, category) => total + category.totalProducts, 0) || 0
  }, [categoriesData])

  const [activeTab, setActiveTab] = useState<string>('All')
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [orderItems, setOrderItems] = useState<
    Record<string, { ingredient: Product; quantity: number; order: number }>
  >({})
  const { data: dishesData } = useGetDishesQuery({ categoryId: categoryId || undefined })

  const handleTabClick = (id: string | null) => {
    setActiveTab(id || 'All')
    setCategoryId(id)
  }
  const handleSubmit = async () => {}
  const handleDeleteItem = (ingredient: Product) => {
    setOrderItems((prev) => {
      const { [ingredient._id]: _, ...rest } = prev
      const updatedOrderItems = Object.values(rest)
        .sort((a, b) => a.order - b.order)
        .reduce(
          (acc, item, index) => {
            acc[item.ingredient._id] = { ...item, order: index + 1 }
            return acc
          },
          {} as typeof prev
        )
      return updatedOrderItems
    })
  }
  const handleAddItem = (ingredient: Product) => {
    setOrderItems((prev) => {
      const currentItem = prev[ingredient._id]
      if (currentItem) {
        return {
          ...prev,
          [ingredient._id]: { ...currentItem, quantity: currentItem.quantity + 1 }
        }
      }
      const newOrder = Object.keys(prev).length + 1
      return {
        ...prev,
        [ingredient._id]: { ingredient, quantity: 1, order: newOrder }
      }
    })
  }

  const handleRemoveItem = (ingredient: Product) => {
    setOrderItems((prev) => {
      const currentItem = prev[ingredient._id]

      if (!currentItem) return prev

      if (currentItem.quantity === 1) {
        const { [ingredient._id]: _, ...rest } = prev
        const updatedOrderItems = Object.values(rest)
          .sort((a, b) => a.order - b.order)
          .reduce(
            (acc, item, index) => {
              acc[item.ingredient._id] = { ...item, order: index + 1 }
              return acc
            },
            {} as typeof prev
          )

        return updatedOrderItems
      }
      return {
        ...prev,
        [ingredient._id]: { ...currentItem, quantity: currentItem.quantity - 1 }
      }
    })
  }

  return (
    <main className=''>
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
                    'block min-w-[150px] cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl transition-all hover:border-[var(--primary-color)]',
                    activeTab === category._id ? 'bg-[var(--primary-color)]' : ''
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
            {dishesData?.result?.menus?.map((dish: any, index: any) => (
              <Kitchen
                key={index}
                name={dish.name}
                image={dish.image}
                price={dish.price}
                onAdd={() => handleAddItem(dish)}
                onRemove={() => handleRemoveItem(dish)}
              />
            ))}
          </div>
        </section>
        <div className='flex flex-[0.3] flex-col gap-4 rounded-xl bg-[#292C2D] p-4'>
          <header className='flex flex-col gap-1'>
            <h3 className='text-[22px]'>Order #111</h3>
            <p className='flex items-center justify-between'>
              <span>Wednesday, 28, 2024</span>
              <span>4 : 48 PM</span>
            </p>
          </header>
          <div className='flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden'>
            {Object.values(orderItems)
              .sort((a, b) => a.order - b.order)
              .map(({ ingredient, quantity, order }) => (
                <div
                  key={ingredient._id}
                  className='flex items-center justify-between rounded-sm bg-[#3D414266] px-2 py-3'
                >
                  <div className='flex flex-1 items-center gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                      <span>{order}</span>
                    </div>
                    <div className='truncate'>{ingredient.name}</div>
                  </div>
                  <div className='flex w-16 items-center justify-center'>
                    <span className='opacity-70'>x{quantity}</span>
                  </div>
                  <div className='flex w-28 items-center justify-between'>
                    <div className='flex-1 text-right'>${ingredient.price * quantity}</div>
                    <button onClick={()=>{
                      handleDeleteItem(ingredient)
                    }} className='ml-2 text-red-500 hover:text-red-700'>
                      <X />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className='flex flex-col gap-3 rounded-md bg-[#3D414266] p-4'>
            <section className='flex items-center justify-between'>
              <div>Total</div>
              <div>
                $
                {Object.values(orderItems)
                  .reduce((acc, { ingredient, quantity }) => acc + ingredient.price * quantity, 0)
                  .toFixed(2)}
              </div>
            </section>
            <Button
              onClick={handleSubmit}
              className='bg-[#EA7C69] text-[16px] font-medium text-white'
              disabled={Object.keys(orderItems).length === 0}
            >
              Complete
            </Button>
          </div>
        </div>
      </aside>
    </main>
  )
}
