'use client'

import { Button } from '~/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { useGetINboundOrdersQuery } from '~/hooks/data/inbound-order.data'
import Table from '~/components/table'
import CustomPagination from '~/components/custom-pagination'
import { InboundOrderType, Ingredient } from '~/definitions/types'
import InboundTable from '~/components/tableInbound'
import { useGetIngredientsQuery } from '~/hooks/data/ingredients.data'
import IngredientTable from '~/components/ingredient'

function InventoryPage() {
  const [showIngredients, setShowIngredients] = useState<boolean>(false)

  // const { data: ingredients } = useGetIngredientsQuery( { page })

  const toggleTable = () => {
    setShowIngredients(true)
  }

  const toggleInbound = () => {
    setShowIngredients(false)
  }

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
          <Button className='bg-[#EA7C69]'>
            <Link href='/admin/inventory/add'>Add New Inbound Order</Link>
          </Button>
        </div>
      </header>
      <section>{showIngredients ? <IngredientTable /> : <InboundTable />}</section>
    </div>
  )
}

export default InventoryPage
