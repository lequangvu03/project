'use client'

import { Button } from '~/components/ui/button'
import Filter from './filter'
import ProductList from './products'
import SheetInventory from './sheet-inventory'
import { useGetProductsQuery } from '~/hooks/data/products.data'
import { useState } from 'react'

function InventoryPage() {
  const [page, setPage] = useState<number>(1)
  const { data: product } = useGetProductsQuery({ page: page, limit: 6 })
  console.log(product)
  return (
    <div className='mx-auto w-full max-w-7xl'>
      <header className='mb-5 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-base font-medium text-white'>{product && product.result.total}</span>
          <span className='text-[#ABBBC2]'>Total products</span>
        </div>
        <SheetInventory>
          <Button className='h-auto bg-[#FAC1D9] px-12 py-3 text-base text-black transition-all hover:bg-[#FAC1D9] hover:shadow-md hover:shadow-[#FAC1D9]'>
            Add New Inventory
          </Button>
        </SheetInventory>
      </header>
      <div className='flex w-full gap-10'>
        <Filter />
        <ProductList products={product?.result?.menus || []} page={page} setPage={setPage} totalPage={2} />
      </div>
    </div>
  )
}

export default InventoryPage
