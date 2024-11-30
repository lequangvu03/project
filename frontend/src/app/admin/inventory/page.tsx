'use client'

import { Button } from '~/components/ui/button'
import Filter from './filter'
import ProductList from './products'
import SheetInventory from './sheet-inventory'

import { useState } from 'react'
import Link from 'next/link'

function InventoryPage() {
  return (
    <div className='mx-auto w-full '>
      <header className='flex items-center justify-between'>
        <div>
          <Button className='bg-[#EA7C69]'>Inbound Order</Button>
          <Button className='bg-transparent text-white'>Ingredient</Button>
        </div>
        <div>
          <Button className='bg-[#EA7C69]'>
            <Link href='/inventory/add'>Add New Inbound Order</Link>
          </Button>
        </div>
      </header>

      <div>
        
      </div>
    </div>
  )
}

export default InventoryPage
