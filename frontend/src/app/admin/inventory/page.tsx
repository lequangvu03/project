import React from 'react'
import { Button } from '~/components/ui/button'
import { Form, FormField } from '~/components/ui/form'
import Filter from './filter'
import ProductList from './products'
import SheetInventory from './sheet-inventory'

function InventoryPage() {
  return (
    <div className='mx-auto w-full max-w-7xl'>
      <header className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-base font-medium text-white'>150</span>
          <span className='text-[#ABBBC2]'>total products</span>
        </div>
        <SheetInventory>
          <Button className='h-auto bg-[#FAC1D9] px-12 py-3 text-base text-black transition-all hover:bg-[#FAC1D9] hover:shadow-md hover:shadow-[#FAC1D9]'>
            Add New Inventory
          </Button>
        </SheetInventory>
      </header>
      <div className='flex w-full gap-10'>
        <Filter />
        <ProductList />
      </div>
    </div>
  )
}

export default InventoryPage
