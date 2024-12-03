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
import { useGetAllIngredientsQuery } from '~/hooks/data/ingredients.data'
import {
  useDeleteDishQuery,
  useGetDishesQuery,
  useGetMenuItemDetailQuery,
  useUpdateMenuItemMutation
} from '~/hooks/data/menu.data'
import { IMenuItem } from '~/models/menu.model'

export default function TableDishes() {
  const [page, setPage] = useState<number>(1)
  const [id, setId] = useState<string>('')
  const ref = useRef<HTMLInputElement | null>(null)
  const getCategoriesQuery = useGetCategoriesQuery()

  const { categoryId, tag } = useQueryParams()

  const { data: dishesData, isPending } = useGetDishesQuery({
    categoryId: categoryId,
    tag: tag === 'ALL' ? '' : tag,
    page: page
  })
  const totalPage = Math.ceil((dishesData?.result?.total || 0) / 10)
  const updateMenuItemQuery = useGetMenuItemDetailQuery({
    id: id,
    enabled: !!id
  })

  const deleteDishMutation = useDeleteDishQuery()
  const updateMenuItemMutation = useUpdateMenuItemMutation()
  const getIngredientsQuery = useGetAllIngredientsQuery()
  const [preview, setPreview] = useState<string | null>(null)
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
    description: string
    price: string
    category_id: string
    stock: string
    image: File | null
    tag: TagType[]
  }>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category_id: '',
      stock: '',
      image: null,
      tag: [TagType.New, TagType.Normal]
    }
  })

  const image = menuItemForm.watch('image')

  const dishes = useMemo(() => {
    const dishes = dishesData?.result?.menus as IMenuItem[]
    return dishes || []
  }, [dishesData])

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image)
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [image])

  useEffect(() => {
    const item = updateMenuItemQuery.data?.result?.menus?.[0] as IMenuItem
    if (item) {
      menuItemForm.setValue('name', item.name)
      menuItemForm.setValue('description', item.description)
      menuItemForm.setValue('price', item.price.toString())
      menuItemForm.setValue('stock', item.stock.toString())
      menuItemForm.setValue('tag', item.tag)
      menuItemForm.setValue('category_id', item.category_id)
      setPreview(item.image)
    }
  }, [updateMenuItemQuery.data])

  useEffect(() => {
    const item = updateMenuItemQuery.data?.result?.menus?.[0] as IMenuItem
    if (item) {
      const ingredients = item.ingredients?.map((i) => [
        i._id,
        {
          unit: i.unit,
          quantity: i.quantity,
          name: i.name
        }
      ])

      setIngredients(Object.fromEntries(ingredients))
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

  const modifyIngregients =
    (ingredient: { _id: string; unit: string; name: string }, mode: 'SUBTRACT' | 'ADD' | 'MANUAL' | 'REMOVE') =>
    (e: any) => {
      setIngredients((prev) => {
        switch (mode) {
          case 'MANUAL':
            return {
              ...prev,
              [ingredient._id]: {
                quantity: +e?.target?.value,
                unit: ingredient.unit,
                name: ingredient.name
              }
            }
          case 'ADD':
            return {
              ...prev,
              [ingredient._id]: {
                quantity: prev?.[ingredient._id] ? ++prev[ingredient._id].quantity : 1,
                unit: ingredient.unit,
                name: ingredient.name
              }
            }
          case 'SUBTRACT':
            return omitBy(
              {
                ...prev,
                [ingredient._id]: {
                  quantity:
                    prev?.[ingredient._id] && prev[ingredient._id].quantity >= 1 ? --prev[ingredient._id].quantity : 0,
                  unit: ingredient.unit,
                  name: ingredient.name
                }
              },
              (v) => v.quantity === 0
            )
          case 'REMOVE':
            return omit(prev, [ingredient._id])
          default:
            return prev
        }
      })
    }

  const handleUpdateMenuItem = menuItemForm.handleSubmit(async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('category_id', data.category_id)
      formData.append('stock', data.stock)
      if (data.image) {
        formData.append('image', data.image as any)
      }
      formData.append('tag', JSON.stringify(data.tag))
      const formatIngredients = Object.entries(ingredients).map(([_id, { quantity }]) => ({
        _id,
        quantity
      }))
      formData.append('ingredients', JSON.stringify(formatIngredients))
      const response = await updateMenuItemMutation.mutateAsync({
        id: id,
        body: formData
      })
      menuItemForm.reset()
      setIngredients({})
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
                  <TableHead>Product Name</TableHead>
                  <TableHead>In stock</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dishes.map((dish) => {
                  return (
                    <TableRow key={dish._id}>
                      <TableCell>
                        <div className='flex items-center gap-4'>
                          <Image
                            width={100}
                            height={100}
                            className='h-[80px] w-[80px] rounded-[10px] object-cover'
                            src={dish.image}
                            alt='avatar'
                          />
                          <div className='shrink-0 capitalize'>{dish.name}</div>
                        </div>
                      </TableCell>
                      <TableCell>{dish.stock}</TableCell>
                      <TableCell>{dish.category_name}</TableCell>
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
                                    <div className='flex w-full justify-center'>
                                      <div
                                        className='relative mt-8 h-fit w-fit rounded-lg transition-all hover:opacity-85'
                                        onClick={openFileDialog}
                                      >
                                        <Avatar className='relative h-[140px] w-[140px]'>
                                          <AvatarImage src={preview as any} alt='avatar' />
                                          <AvatarFallback className='uppercase text-black'>{'A'}</AvatarFallback>
                                        </Avatar>
                                        <button className='absolute bottom-0 right-5 z-10'>
                                          <IconImage className='size-5' />
                                          <input
                                            onChange={(e) => {
                                              const file = e.target.files?.[0]
                                              if (file) {
                                                menuItemForm.setValue('image', file, {
                                                  shouldDirty: true
                                                })
                                              }
                                            }}
                                            ref={ref}
                                            type='file'
                                            accept='image/*'
                                            hidden
                                          />
                                        </button>
                                      </div>
                                    </div>
                                    <div className='space-y-5'>
                                      <Form {...menuItemForm} key={'form-update-menu'}>
                                        <FormField
                                          control={menuItemForm.control}
                                          name='name'
                                          render={({ field }) => <CustomInput field={field} label='Name' />}
                                        />
                                        <FormField
                                          control={menuItemForm.control}
                                          name='description'
                                          render={({ field }) => <CustomInput label='Description' field={field} />}
                                        />
                                        <FormField
                                          control={menuItemForm.control}
                                          name='price'
                                          render={({ field }) => (
                                            <CustomInput label='Price' type='number' min={0} field={field} />
                                          )}
                                        />
                                        <div>
                                          <Label className='mb-2 block'>Category</Label>
                                          <Select
                                            value={menuItemForm.watch('category_id')}
                                            onValueChange={(id) => {
                                              menuItemForm.setValue('category_id', id, {
                                                shouldDirty: true
                                              })
                                            }}
                                          >
                                            <SelectTrigger className='h-auto w-full bg-[var(--bg-input)] py-4 focus:ring-0 focus:ring-offset-0'>
                                              <SelectValue placeholder='Category' />
                                            </SelectTrigger>
                                            <SelectContent className='bg-[var(--bg-input)]'>
                                              <ScrollArea className='h-[200px] w-full rounded-md'>
                                                <SelectGroup>
                                                  <SelectLabel className='flex items-center gap-2'>
                                                    Category
                                                  </SelectLabel>
                                                  {(getCategoriesQuery.data?.result?.categories as TCategory[])?.map(
                                                    (category) => {
                                                      return (
                                                        <SelectItem
                                                          key={category._id}
                                                          className='h-auto py-3 focus:bg-[var(--secondary-color)]'
                                                          value={category._id}
                                                        >
                                                          {category.name}
                                                        </SelectItem>
                                                      )
                                                    }
                                                  )}
                                                </SelectGroup>
                                              </ScrollArea>
                                            </SelectContent>
                                          </Select>
                                        </div>

                                        <div>
                                          <Label className='mb-2 block'>Ingredients</Label>
                                          <Tippy
                                            hideOnClick={false}
                                            offset={[0, 0]}
                                            interactive
                                            placement='bottom-start'
                                            render={(attrs) => (
                                              <div className='w-[340px]' tabIndex={-1} {...attrs}>
                                                <Command className='w-full rounded-lg border bg-[var(--bg-input)] text-white shadow-md'>
                                                  <CommandInput placeholder='Search...' />
                                                  <CommandList>
                                                    <CommandEmpty>No results found.</CommandEmpty>
                                                    <ScrollArea className='h-[160px] w-full rounded-md bg-[var(--bg-input)]'>
                                                      <CommandGroup>
                                                        {(getIngredientsQuery.data?.result as Ingredient[])?.map(
                                                          (ingre) => {
                                                            const params = {
                                                              _id: ingre._id,
                                                              name: ingre.name,
                                                              unit: ingre.unit
                                                            }
                                                            return (
                                                              <CommandItem
                                                                onClick={() => console.log(ingre)}
                                                                key={ingre._id}
                                                                className='group flex h-auto w-full items-center justify-between py-3 data-[selected=true]:bg-[var(--secondary-color)]'
                                                              >
                                                                <span>
                                                                  {ingre.name} ({ingre.unit})
                                                                </span>
                                                                <div className='flex items-center gap-1'>
                                                                  <span
                                                                    className='block rounded-full bg-[var(--bg-input)] p-1 transition-all hover:opacity-80 active:opacity-80'
                                                                    onClick={modifyIngregients(params, 'SUBTRACT')}
                                                                  >
                                                                    <Minus className='h-4 w-4' />
                                                                  </span>
                                                                  <Input
                                                                    onChange={modifyIngregients(params, 'MANUAL')}
                                                                    value={ingredients[ingre._id]?.quantity || 0}
                                                                    min={0}
                                                                    type='number'
                                                                    max={100}
                                                                    className='min-w-[40px] bg-[var(--secondary-color)] text-center ring-0 ring-offset-0 group-data-[selected=true]:bg-[var(--bg-input)]'
                                                                  />
                                                                  <span
                                                                    className='block rounded-full bg-[var(--bg-input)] p-1 transition-all hover:opacity-80 active:opacity-80'
                                                                    onClick={modifyIngregients(params, 'ADD')}
                                                                  >
                                                                    <Plus className='h-4 w-4' />
                                                                  </span>
                                                                </div>
                                                              </CommandItem>
                                                            )
                                                          }
                                                        )}
                                                      </CommandGroup>
                                                    </ScrollArea>
                                                  </CommandList>
                                                </Command>
                                              </div>
                                            )}
                                          >
                                            <ScrollArea className='h-[120px] min-h-[54px] w-full rounded-md bg-[var(--bg-input)] p-4'>
                                              <div className='flex flex-wrap gap-2'>
                                                {Object.entries(ingredients).map(([_id, { name, quantity, unit }]) => {
                                                  return (
                                                    <div
                                                      key={_id}
                                                      className='flex w-fit items-center gap-4 rounded-md bg-[var(--secondary-color)] px-4 py-2'
                                                    >
                                                      <div className='flex items-center gap-1'>
                                                        <span className='max-w-[120px] truncate'>{name}</span>
                                                        <span className='rounded-sm bg-[var(--primary-color)] px-2'>
                                                          {quantity}
                                                        </span>
                                                        <span>{unit}</span>
                                                      </div>
                                                      <span
                                                        className='block rounded-full bg-[var(--bg-input)] p-1 transition-all hover:opacity-80 active:opacity-80'
                                                        onClick={modifyIngregients({ _id, name, unit }, 'REMOVE')}
                                                      >
                                                        <X className='h-4 w-4' />
                                                      </span>
                                                    </div>
                                                  )
                                                })}
                                              </div>
                                            </ScrollArea>
                                          </Tippy>
                                        </div>
                                        <FormField
                                          control={menuItemForm.control}
                                          name='stock'
                                          render={({ field }) => (
                                            <CustomInput type='number' label='Stock' field={field} />
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
