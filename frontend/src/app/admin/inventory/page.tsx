'use client'

import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { useGetINboundOrdersQuery } from '~/hooks/data/inbound-order.data'
import Table from '~/components/table'
import CustomPagination from '~/components/custom-pagination'
import { InboundOrderType, Ingredient } from '~/definitions/types'
import InboundTable from '~/components/tableInbound'
import { useAddIngredientMutation, useGetIngredientsQuery } from '~/hooks/data/ingredients.data'
import IngredientTable from '~/components/ingredient'
import CustomSheet from '~/components/custom-sheet'
import { Form, FormField } from '~/components/ui/form'
import CustomInput from '~/components/custom-input'
import Loading from '~/components/loading'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

function InventoryPage() {
  const [showIngredients, setShowIngredients] = useState<boolean>(false)

  // const { data: ingredients } = useGetIngredientsQuery( { page })

  const toggleTable = () => {
    setShowIngredients(true)
  }

  const toggleInbound = () => {
    setShowIngredients(false)
  }
  const addMenuItemMutation = useAddIngredientMutation()
  const menuItemForm = useForm<{
    name: string
    unit: string
    price: number
    stock: number
  }>({
    defaultValues: {
      name: '',
      price: 0,
      stock: 0,
      unit: ''
    }
  })
  const handleAddMenuItem = menuItemForm.handleSubmit(async (data) => {
    try {
      data.price = Number(data.price)
      data.stock = Number(data.stock)
      const response = await addMenuItemMutation.mutateAsync(data)
      menuItemForm.reset()
      toast(response?.message)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <div className='mx-auto w-full'>
      <header className='flex items-center justify-between'>
        <div>
          <Button
            onClick={toggleInbound}
            className={`bg-[#EA7C69] text-white ${!showIngredients ? '' : 'bg-transparent'}`}
          >
            Inbound Order
          </Button>
          <Button
            onClick={toggleTable}
            className={`bg-[#EA7C69] text-white ${showIngredients ? '' : 'bg-transparent'}`}
          >
            Ingredient
          </Button>
        </div>
        <div>
          {showIngredients ? (
            <CustomSheet
              onConfirm={() => {
                menuItemForm.reset()
              }}
              isConfirmationRequired={menuItemForm.formState.isDirty}
              title='Add New Ingredient'
              render={
                <div>
                  <div className='flex w-full justify-center'></div>
                  <div className='space-y-5'>
                    <Form {...menuItemForm} key={'form-update-menu'}>
                      <FormField
                        control={menuItemForm.control}
                        name='name'
                        render={({ field }) => <CustomInput field={field} label='Name' />}
                      />
                      <FormField
                        control={menuItemForm.control}
                        name='stock'
                        render={({ field }) => <CustomInput label='Stock' type='number' min={0} field={field} />}
                      />
                      <FormField
                        control={menuItemForm.control}
                        name='unit'
                        render={({ field }) => <CustomInput label='unit' field={field} />}
                      />
                      <FormField
                        control={menuItemForm.control}
                        name='price'
                        render={({ field }) => <CustomInput label='Price' type='number' min={0} field={field} />}
                      />

                      <div className='!mt-9 flex items-center justify-end gap-5'>
                        <Button
                          type='button'
                          disabled={!menuItemForm.formState.isDirty || addMenuItemMutation.isPending}
                          onClick={handleAddMenuItem}
                          className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                        >
                          Add
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              }
            >
              <Button className='bg-[#EA7C69]'>Add New Ingredient</Button>
            </CustomSheet>
          ) : (
            <Button className='bg-[#EA7C69]'>
              <Link href='/admin/inventory/add'>Add New Inbound Order</Link>
            </Button>
          )}
        </div>
      </header>
      <section>{showIngredients ? <IngredientTable /> : <InboundTable />}</section>
    </div>
  )
}

export default InventoryPage
