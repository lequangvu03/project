'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TagType } from '~/definitions/constant/types.constant'
import useQueryParams from '~/hooks/useQueryParams'

import { Input } from '~/components/ui/input'

import Tippy from '@tippyjs/react/headless'
import { omit, omitBy } from 'lodash'
import { Image as IconImage, Minus, Pencil, Plus, Trash, X } from 'lucide-react'
import Image from 'next/image'
import CustomInput from '~/components/custom-input'
import CustomPagination from '~/components/custom-pagination'
import CustomSheet from '~/components/custom-sheet'
import Loading from '~/components/loading'
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
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command'
import { Form, FormField } from '~/components/ui/form'
import { Label } from '~/components/ui/label'
import { ScrollArea } from '~/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '~/components/ui/select'
import { Ingredient, TCategory } from '~/definitions/types'
import { useGetCategoriesQuery } from '~/hooks/data/categories.data'
import {
  useDeleteIngredientQuery,
  useGetAllIngredientsQuery,
  useGetIngredientsDetailQuery,
  useGetIngredientsQuery,
  useUpdateIngredientMutation
} from '~/hooks/data/ingredients.data'
import {
  useDeleteDishQuery,
  useGetDishesQuery,
  useGetMenuItemDetailQuery,
  useUpdateMenuItemMutation
} from '~/hooks/data/menu.data'
import { IMenuItem } from '~/models/menu.model'

export default function IngredientTable() {
  const [page, setPage] = useState<number>(1)
  const [id, setId] = useState<string>('')
  const ref = useRef<HTMLInputElement | null>(null)

  const { data: dishesData, isPending } = useGetIngredientsQuery({ page })
  const totalPage = Math.ceil((dishesData?.result?.total || 0) / 10)
  const updateMenuItemQuery = useGetIngredientsDetailQuery({
    id: id,
    enabled: !!id
  })

  const deleteDishMutation = useDeleteIngredientQuery()
  const updateMenuItemMutation = useUpdateIngredientMutation()
  const [ingredients, setIngredients] = useState<
    Record<
      string,
      {
        unit: string
        quantity: number
        name: string
      }
    >
  >({})

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

  const dishes = useMemo(() => {
    const dishes = dishesData?.result?.ingredients
    return dishes || []
  }, [dishesData])

  useEffect(() => {
    const item = updateMenuItemQuery.data?.result?.ingredients?.[0]
    if (item) {
      menuItemForm.setValue('name', item.name)
      menuItemForm.setValue('price', item.price.toString())
      menuItemForm.setValue('stock', item.stock.toString())
      menuItemForm.setValue('unit', item.unit.toString())
    }
  }, [updateMenuItemQuery.data])

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteDishMutation.mutateAsync(id)
      toast.success(response?.message)
    } catch (_) {
      toast.error('Failed to delete menu item')
    }
  }

  const openFileDialog = () => {
    ref.current?.click()
  }

  const handleUpdateMenuItem = menuItemForm.handleSubmit(async (data) => {
    try {
      const response = await updateMenuItemMutation.mutateAsync({
        id: id,
        body: data
      })
      menuItemForm.reset()
      toast(response?.message)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <div className='w-full'>
      {/* <div className='flex items-center py-4'>
        <Input placeholder='Filter name...' value={''} onChange={(event) => null} className='max-w-sm' />
      </div> */}
      <div className='-mx-8'>
        {isPending ? (
          <div role='status' className='flex min-h-[400px] w-full items-center justify-center'>
            <Loading />
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient Name</TableHead>
                  <TableHead>stock</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dishes.map((dish: any) => {
                  return (
                    <TableRow key={dish._id}>
                      <TableCell>
                        <div className='flex items-center gap-4'>
                          <div className='shrink-0 capitalize'>{dish.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{dish.stock}</TableCell>
                      <TableCell>{dish.unit}</TableCell>
                      <TableCell>{dish.price}</TableCell>
                      <TableCell>
                        <div className='flex w-full items-center gap-4'>
                          <CustomSheet
                            onConfirm={() => {
                              menuItemForm.reset()
                            }}
                            isConfirmationRequired={menuItemForm.formState.isDirty}
                            title='New category'
                            render={
                              <div>
                                {updateMenuItemQuery.isPending ? (
                                  <div className='flex h-full w-full items-center justify-center'>
                                    <Loading />
                                  </div>
                                ) : (
                                  <>
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
                                          render={({ field }) => (
                                            <CustomInput label='Stock' type='number' min={0} field={field} />
                                          )}
                                        />
                                        <FormField
                                          control={menuItemForm.control}
                                          name='unit'
                                          render={({ field }) => <CustomInput label='unit' field={field} />}
                                        />
                                        <FormField
                                          control={menuItemForm.control}
                                          name='price'
                                          render={({ field }) => (
                                            <CustomInput label='Price' type='number' min={0} field={field} />
                                          )}
                                        />


                                        <div className='!mt-9 flex items-center justify-end gap-5'>
                                          <Button
                                            type='button'
                                            disabled={
                                              !menuItemForm.formState.isDirty || updateMenuItemMutation.isPending
                                            }
                                            onClick={handleUpdateMenuItem}
                                            className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                                          >
                                            Update
                                          </Button>
                                        </div>
                                      </Form>
                                    </div>
                                  </>
                                )}
                              </div>
                            }
                          >
                            <Pencil className='cursor-pointer' onClick={() => setId(dish._id)} />
                          </CustomSheet>

                          <AlertDialog>
                            <AlertDialogTrigger asChild className='cursor-pointer hover:opacity-60 active:opacity-60'>
                              <Trash />
                            </AlertDialogTrigger>
                            <AlertDialogContent className='bg-[var(--secondary-color)]'>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account and remove
                                  your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(dish._id)}>Continue</AlertDialogAction>
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
            {dishes?.length > 0 && <CustomPagination page={page} setPage={setPage} totalPage={totalPage} />}
          </>
        )}
      </div>
    </div>
  )
}
