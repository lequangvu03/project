'use client'

import Category from '~/components/category'
import { Button } from '~/components/ui/button'
import { useGetCategoriesQuery } from '~/hooks/data/categories.data'
import { ICategory } from '~/models/categories.module'
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
import SheetInventory from '../inventory/sheet-inventory'
import { useGetDishesQuery } from '~/hooks/data/menu.data'
import { IMenuItem } from '~/models/menu.model'

export default function MenuPage() {
  const { data: categoriesDate } = useGetCategoriesQuery()
  const { data: dishesData } = useGetDishesQuery({})
  const categories = (categoriesDate?.result?.categories as ICategory[]) || null
  const dishies = (dishesData?.result?.menus as IMenuItem[]) || null
  console.log(dishies)
  const handleDelete = (id: string) => {
    console.log(`Delete product ${id}`)
  }
  return (
    <main className='flex flex-col gap-4'>
      <div className='h-[1px] w-full bg-slate-700 leading-[0px]' />

      <section className='flex items-center justify-between'>
        <h2 className='text-[20px] text-white'>Categories</h2>

        <Button className='bg-[#EA7C69]'>Add new category</Button>
      </section>

      <section className='grid grid-cols-7 gap-4'>
        {categories &&
          categories.map(function (category, index: number) {
            return <Category amount={+category.totalProducts} key={index} name={category.name} />
          })}
      </section>

      <h2 className='mt-4 text-[20px] font-medium text-white'>Special menu all items</h2>

      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Button className='bg-[#EA7C69] text-white'>Normal menu</Button>
          <Button className='bg-transparent text-white'>Special deals</Button>
          <Button className='bg-transparent text-white'>New year special</Button>
          <Button className='bg-transparent text-white'>Deserts and drinks</Button>
        </div>

        <Button className='bg-[#EA7C69] text-white'>Add new menu item</Button>
      </section>
      <div>
        <Table className='overflow-hidden rounded-[10px] bg-[#1F1D2B] text-white'>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableBody className='[&>tr]:border-none'>
            {dishies &&
              dishies.map(({ _id, image, price, name, stock }) => {
                return (
                  <TableRow className='w-fit' key={_id}>
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
                          <p className='whitespace-nowrap'>
                            <span>Stocked Prodcts: </span>
                            <span>{stock} In Stock</span>
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
                        <span>${price}</span>
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
    </main>
  )
}
