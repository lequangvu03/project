'use client'

import Inventory from '~/components/inventory'
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
        <div className='h-full flex-[0.35] rounded-sm bg-[#1F1D2B]'>
          <header className='flex flex-col gap-1 p-4'>
            <h3 className='text-[22px]'>Order #111</h3>
            <p className='flex items-center justify-between'>
              <p>Wednesday, 28, 2024</p>
              <p>4 : 48 PM</p>
            </p>
          </header>
        </div>
      </div>
    )
  }
}
