'use client'
import { useMemo, useState } from 'react'
import Food from '~/components/food-item'
import Kitchen from '~/components/kitchen'
import { kitchens } from '~/data/kitchens'
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

  const { data: dishesData } = useGetDishesQuery({ categoryId: categoryId || undefined })

  const handleTabClick = (id: string | null) => {
    setActiveTab(id || 'All')
    setCategoryId(id)
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
              <Kitchen key={index} name={dish.name} image={dish.image} price={dish.price} />
            ))}
          </div>
        </section>
        <div className='flex flex-[0.3] flex-col gap-4 rounded-xl bg-[#292C2D] p-4'>
          <header className='flex items-start justify-between'>
            <section className='flex flex-col text-gray-400'>
              <h2 className='text-[20px] font-medium'>Table 01</h2>
              <p className='text-[12px]'>Le Quang Vu</p>
            </section>
            <section>
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M3.66406 15.7736V17.8755C3.66406 17.9971 3.71235 18.1136 3.79831 18.1996C3.88426 18.2856 4.00084 18.3338 4.1224 18.3338H6.2289C6.35022 18.3338 6.46658 18.2857 6.55248 18.2L15.2131 9.53935L12.4631 6.78935L3.79881 15.45C3.7128 15.5358 3.66433 15.6521 3.66406 15.7736ZM13.598 5.6536L16.348 8.4036L17.6863 7.06526C17.8582 6.89336 17.9547 6.66025 17.9547 6.41718C17.9547 6.17411 17.8582 5.941 17.6863 5.7691L16.2334 4.31526C16.0615 4.14341 15.8284 4.04687 15.5853 4.04688C15.3422 4.04687 15.1091 4.14341 14.9372 4.31526L13.598 5.6536Z'
                  fill='white'
                />
              </svg>
            </section>
          </header>

          <aside className='flex h-[400px] flex-col items-center gap-3 overflow-x-auto overflow-y-auto'>
            <Food />
          </aside>
          <footer className='flex flex-col items-center justify-between gap-4 rounded-xl bg-[#3D4142] p-4'>
            <section className='flex w-full flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <p>Subtotal</p>
                <p>$116.5</p>
              </div>
              <div className='flex items-center justify-between'>
                <p>Tax 5%</p>
                <p>$116.5</p>
              </div>
              <div className='border-dash w-full border-[1px] border-gray-500' />
              <footer className='flex items-center justify-between'>
                <p>Total</p>
                <p>$116.5</p>
              </footer>
            </section>

            <div className='flex w-full flex-col items-center justify-center'>
              {/* <div className='flex flex-col gap-4'>
                <section>Payment Method</section>
                <section className='flex items-center justify-center rounded-lg border-[1px] border-solid border-gray-300 p-4'>
                  <svg width='94' height='94' viewBox='0 0 94 94' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <rect x='0.304688' y='0.304688' width='92.9302' height='92.9302' fill='white' />
                  </svg>
                </section>
                <section>Scan QR Code</section>
              </div> */}
              <button className='mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-slate-700 text-center text-white'>
                Send To Token
              </button>
            </div>
          </footer>
          </div>
      </aside>
    </main>
  )
}
