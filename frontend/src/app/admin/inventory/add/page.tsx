'use client'

import Inventory from '~/components/inventory'
import { Button } from '~/components/ui/button'
import { Ingredient } from '~/definitions/types'
import { useGetIngredientsQuery } from '~/hooks/data/ingredients.data'
export default function Page() {
  const { data: ingredients } = useGetIngredientsQuery()

  if (ingredients?.result) {
    return (
      <div className='flex h-full justify-between gap-8'>
        <div className='flex flex-[0.65] flex-col gap-8'>
          <div className='h-[1px] w-full bg-slate-600' />
          <div className='grid grid-cols-4 gap-8'>
            {ingredients?.result?.ingredients?.map((ingredient: Ingredient, index: number) => (
              <Inventory ingredient={ingredient} key={index} />
            ))}
            <div className='flex flex-col items-center justify-center gap-3 rounded-lg bg-[#1F1D2B] px-2 py-6'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#EA7C69] text-center'>
                <span className='text-[24px]'>+</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex h-full flex-[0.35] flex-col gap-3 rounded-sm bg-[#1F1D2B] p-4'>
          <header className='flex flex-col gap-1'>
            <h3 className='text-[22px]'>Order #111</h3>
            <p className='flex items-center justify-between'>
              <p>Wednesday, 28, 2024</p>
              <p>4 : 48 PM</p>
            </p>
          </header>
          <div className='flex flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden'>
            <div className='flex items-center justify-between rounded-sm bg-[#3D414266] px-2 py-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                  <span>01</span>
                </div>
                <div>Powder</div>
              </div>
              <div>
                <div className='opacity-70'>x2</div>
              </div>
              <div>
                <div>$55.00</div>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-sm bg-[#3D414266] px-2 py-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                  <span>01</span>
                </div>
                <div>Powder</div>
              </div>
              <div>
                <div className='opacity-70'>x2</div>
              </div>
              <div>
                <div>$55.00</div>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-sm bg-[#3D414266] px-2 py-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                  <span>01</span>
                </div>
                <div>Powder</div>
              </div>
              <div>
                <div className='opacity-70'>x2</div>
              </div>
              <div>
                <div>$55.00</div>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-sm bg-[#3D414266] px-2 py-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                  <span>01</span>
                </div>
                <div>Powder</div>
              </div>
              <div>
                <div className='opacity-70'>x2</div>
              </div>
              <div>
                <div>$55.00</div>
              </div>
            </div>
            <div className='flex items-center justify-between rounded-sm bg-[#3D414266] px-2 py-3'>
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                  <span>01</span>
                </div>
                <div>Powder</div>
              </div>
              <div>
                <div className='opacity-70'>x2</div>
              </div>
              <div>
                <div>$55.00</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-3 rounded-md bg-[#3D414266] p-4'>
            <section className='flex items-center justify-between'>
              <div>Subtotal</div>
              <div>$110.000</div>
            </section>
            <section className='flex items-center justify-between'>
              <div>Tax (5%)</div>
              <div>$110.000</div>
            </section>
            <section className='h-[1px] w-full bg-slate-400' />
            <section className='flex items-center justify-between'>
              <div>Total</div>
              <div>$110.000</div>
            </section>
            <Button className='bg-[#EA7C69] text-[16px] font-medium text-white'>Complete</Button>
          </div>
        </div>
      </div>
    )
  }
}
