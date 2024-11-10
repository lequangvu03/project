'use client'

import { CheckedState } from '@radix-ui/react-checkbox'
import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'
import SheetInventory from '~/app/admin/inventory/sheet-inventory'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteDishQuery, useGetDishesQuery } from '~/hooks/data/menu.data'
import { cn } from '~/lib/utils'
import { IMenuItem } from '~/models/menu.model'
import { Checkbox } from './ui/checkbox'

function TableDishes() {
  const [dishesExpandStatus, setExpandDishes] = useState<(IMenuItem & { checked: boolean })[]>([])
  const { data: dishesData } = useGetDishesQuery({})
  const deleteDishMutation = useDeleteDishQuery()
  const dishes = (dishesData?.result?.menus as IMenuItem[]) || null

  const handleDelete = async (id: string) => {
    try {
      await deleteDishMutation.mutateAsync(id)
      toast.success('Delete menu item successfully')
    } catch (error) {
      toast.error('Failed to delete menu item')
    }
  }

  const handleChoose = (id: string) => (checked: CheckedState) => {
    console.log(id, checked)
  }

  return (
    <div className='-mx-8'>
      <Table className='overflow-hidden rounded-none bg-[var(--secondary-color)] text-white'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>
              <Checkbox />
            </TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>In stock</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&>tr]:border-none'>
          {dishes &&
            dishes.map(({ _id, image, price, name, stock }, index) => {
              return (
                <TableRow
                  className={cn('w-fit bg-[var(--secondary-color)]', {
                    'bg-[#3D414266]': index % 2 === 0
                  })}
                  key={_id}
                >
                  <TableCell className='text-center'>
                    <Checkbox onCheckedChange={handleChoose(_id)} />
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='flex items-center gap-4'>
                      <Image
                        width={100}
                        height={100}
                        className='h-[80px] w-[80px] rounded-[10px] object-cover'
                        src={image}
                        alt='avatar'
                      />
                      <div className='shrink-0'>
                        <span className='whitespace-nowrap'>{name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span>{stock}</span>
                    </div>
                  </TableCell>
                  <TableCell className='border-slate-400'>
                    <div className='flex flex-col'>
                      <span>Category</span>
                      <span>Chicken</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col border-l border-l-slate-500 p-4'>
                      <span>{price} VND</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center gap-4'>
                      <SheetInventory>
                        <div className='cursor-pointer hover:opacity-60 active:opacity-60'>
                          <Pencil />
                        </div>
                      </SheetInventory>
                      <AlertDialog>
                        <AlertDialogTrigger asChild className='cursor-pointer hover:opacity-60 active:opacity-60'>
                          <Trash />
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-[var(--secondary-color)]'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(_id)}>Continue</AlertDialogAction>
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
    </div>
  )
}

export default TableDishes
