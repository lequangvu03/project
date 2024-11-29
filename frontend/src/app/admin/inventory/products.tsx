'use client'

import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '~/components/ui/alert-dialog'
import { Table, TableBody, TableCaption, TableCell, TableRow } from '~/components/ui/table'
import SheetInventory from './sheet-inventory'
import { Product } from '~/definitions/types'
import { PaginationOrder } from '~/components/pagination-order'

type Props = {
  page: number
  totalPage: number
  products: Product[]
  setPage: React.Dispatch<React.SetStateAction<number>>
}
function ProductList({ products, page, setPage, totalPage }: Props) {
  const handleDelete = (id: string) => {
    console.log(`Delete product ${id}`)
  }
  return (
    <Table className='overflow-hidden rounded-[10px] bg-[var(--secondary-color)] text-white'>
      <TableCaption>
        <PaginationOrder page={page} totalPage={totalPage} setPage={setPage} />
      </TableCaption>
      <TableBody className='[&>tr]:border-none'>
        {products.map(function (product: Product, index: number) {
          return (
            <TableRow key={index} className='w-fit'>
              <TableCell className='font-medium'>
                <div className='flex items-center gap-4'>
                  <Image
                    width={100}
                    height={100}
                    className='h-[80px] w-[80px] rounded-[10px] object-cover'
                    src={product.image}
                    alt='avatar'
                  />
                  <div className='shrink-0'>
                    <span className='whitespace-nowrap'>{product.name}</span>
                    <p className='whitespace-nowrap'>
                      <span>Stocked: </span>
                      <span>{product.stock}</span>
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col'>
                  <span>Status</span>
                  <span>Active</span>
                </div>
              </TableCell>
              <TableCell className='border-slate-400'>
                <div className='flex flex-col p-4'>
                  <span>Category</span>
                  <span>Chicken</span>
                </div>
              </TableCell>
              <TableCell>
                <div className='flex flex-col border-l border-l-slate-500 p-4'>
                  <span>Retail Price</span>
                  <span>$ {product.price}</span>
                </div>
              </TableCell>
              <TableCell className='text-right'>
                <div className='flex items-center gap-4'>
                  <SheetInventory>
                    <Pencil />
                  </SheetInventory>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Trash />
                    </AlertDialogTrigger>
                    <AlertDialogContent className='bg-[var(--secondary-color)]'>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data
                          from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete('id')}>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default ProductList
