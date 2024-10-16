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

function ProductList() {
  const handleDelete = (id: string) => {
    console.log(`Delete product ${id}`)
  }
  return (
    <Table className='overflow-hidden rounded-[10px] bg-[#1F1D2B] text-white'>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableBody className='[&>tr]:border-none'>
        <TableRow className='w-fit'>
          <TableCell className='font-medium'>
            <div className='flex items-center gap-4'>
              <Image
                width={100}
                height={100}
                className='h-[80px] w-[80px] rounded-[10px] object-cover'
                src='https://github.com/shadcn.png'
                alt='avatar'
              />
              <div className='shrink-0'>
                <span className='whitespace-nowrap'>Chicken Parmesan</span>
                <p className='whitespace-nowrap'>
                  <span>Stocked Prodcts: </span>
                  <span>10 In Stock</span>
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
              <span>$250.00</span>
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
                <AlertDialogContent className='bg-[#1F1D2B]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
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
      </TableBody>
    </Table>
  )
}

export default ProductList
