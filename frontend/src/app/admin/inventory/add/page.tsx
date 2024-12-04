'use client'

import { X } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Inventory from '~/components/inventory'
import { Button } from '~/components/ui/button'
import { Ingredient } from '~/definitions/types'
import { useAddInboundOrderMutation } from '~/hooks/data/inbound-order.data'
import { useGetAllIngredientsQuery, useGetIngredientsQuery } from '~/hooks/data/ingredients.data'

export default function Page() {
  const { data: ingredients } = useGetAllIngredientsQuery()
  const [orderItems, setOrderItems] = useState<
    Record<string, { ingredient: Ingredient; quantity: number; order: number }>
  >({})
  const addInboundOrderMutation = useAddInboundOrderMutation()
  const handleSubmit = async () => {
    await addInboundOrderMutation.mutateAsync({
      inbound_order_items: Object.values(orderItems).map(({ ingredient, quantity }) => ({
        _id: ingredient._id,
        quantity
      })),
      total_price: Object.values(orderItems).reduce(
        (acc, { ingredient, quantity }) => acc + ingredient.price * quantity,
        0
      )
    })
    toast.success('Order submitted successfully!')
  }

  const handleAddItem = (ingredient: Ingredient) => {
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

  const handleRemoveItem = (ingredient: Ingredient) => {
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

  const handleDeleteItem = (ingredient: Ingredient) => {
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

  if (ingredients?.result) {
    return (
      <div className='flex h-full justify-between gap-8'>
        <div className='flex flex-[0.65] flex-col gap-8'>
          <div className='h-[1px] w-full bg-slate-600' />
          <div className='grid grid-cols-4 gap-8'>
            {ingredients?.result?.map((ingredient: Ingredient, index: number) => (
              <Inventory
                ingredient={ingredient}
                key={index}
                onAdd={() => handleAddItem(ingredient)}
                onRemove={() => handleRemoveItem(ingredient)}
              />
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
                  <div className='flex min-w-32 items-center gap-3'>
                    <div className='flex h-8 w-8 items-center justify-center rounded-full bg-[#EA7C69]'>
                      <span>{order}</span>
                    </div>
                    <div>{ingredient.name}</div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='opacity-70'>x{quantity}</span>
                  </div>
                  <div className='flex items-center'>
                    ${(ingredient.price * quantity).toFixed(2)}{' '}
                    <button
                      onClick={() => {
                        handleDeleteItem(ingredient)
                      }}
                      className='ml-2 text-red-500 hover:text-red-700'
                    >
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
      </div>
    )
  }
}
