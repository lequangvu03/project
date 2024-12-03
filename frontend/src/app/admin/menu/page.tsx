'use client'

import Tippy from '@tippyjs/react/headless'
import { Image, Minus, Plus, X } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import CustomInput from '~/components/custom-input'
import CustomSheet from '~/components/custom-sheet'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Form, FormField } from '~/components/ui/form'
import { Skeleton } from '~/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TagType } from '~/definitions/constant/types.constant'
import { useAddCategoryMutation, useGetCategoriesQuery } from '~/hooks/data/categories.data'
import { useAddMenuItemMutation } from '~/hooks/data/menu.data'
import useQueryParams from '~/hooks/useQueryParams'
const TableDishes = dynamic(() => import('./data-table'))

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command'

import { omit, omitBy } from 'lodash'
import { Input } from '~/components/ui/input'
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
import { useGetAllIngredientsQuery } from '~/hooks/data/ingredients.data'

const Categories = dynamic(() => import('~/components/categories'), {
  loading: () => (
    <div className='flex gap-4'>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className='h-32 min-w-32 bg-[var(--secondary-color)]' />
        ))}
    </div>
  ),
  ssr: false
})

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { tag } = useQueryParams()
  const ref = useRef<HTMLInputElement | null>(null)
  const getCategoriesQuery = useGetCategoriesQuery()
  const addCategoryMutation = useAddCategoryMutation()
  const addMenuItemMutation = useAddMenuItemMutation()
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
  const categoryForm = useForm<{
    name: string
    description: string
  }>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const menuItemForm = useForm<{
    name: string
    description: string
    price: string
    category_id: string
    image: File | null
    tag: number[]
  }>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category_id: '',
      image: null,
      tag: [TagType.New, TagType.Normal]
    }
  })

  const image = menuItemForm.watch('image')

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image)
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [image])

  const handleActiveTag = (_tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tag', _tag)
    router.push(`/admin/menu/?${params.toString()}`)
  }

  const handleAddCategory = categoryForm.handleSubmit(async (data) => {
    try {
      const response = await addCategoryMutation.mutateAsync(data)
      toast(response?.message)
      categoryForm.reset()
    } catch (error: any) {
      console.log(error?.response?.m)
    }
  })

  const handleAddMenuItem = menuItemForm.handleSubmit(async (data) => {
    try {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('description', data.description)
      formData.append('price', data.price)
      formData.append('category_id', data.category_id)
      if (data.image) {
        formData.append('image', data.image as any)
      }
      formData.append('tag', JSON.stringify(data.tag))
      const formatIngredients = Object.entries(ingredients).map(([_id, { name, quantity, unit }]) => ({
        _id,
        quantity,
        unit,
        name
      }))
      formData.append('ingredients', JSON.stringify(formatIngredients))
      const response = await addMenuItemMutation.mutateAsync(formData)
      menuItemForm.reset()
      setIngredients({})
      toast(response?.message)
    } catch (error) {
      console.log(error)
    }
  })

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

  return (
    <main className='flex flex-col gap-4'>
      <div className='h-[1px] w-full bg-slate-700 leading-[0px]' />
      <section className='flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>Categories</h2>
        <CustomSheet
          isConfirmationRequired={categoryForm.formState.isDirty}
          title='New category'
          render={
            <div className='h-full space-y-5 py-9'>
              <Form {...categoryForm}>
                <FormField
                  control={categoryForm.control}
                  name='name'
                  render={({ field }) => <CustomInput required field={field} label='Name' />}
                />

                <FormField
                  control={categoryForm.control}
                  name='description'
                  render={({ field }) => <CustomInput label='Description' field={field} />}
                />
                <div className='!mt-9 flex items-center justify-end gap-5'>
                  <Button
                    onClick={handleAddCategory}
                    className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </div>
          }
        >
          <Button className='bg-[#EA7C69] text-white transition-all hover:bg-[#EA7C69] hover:opacity-90'>
            New category
          </Button>
        </CustomSheet>
      </section>
      <Categories />
      <h2 className='mt-4 text-[20px] font-medium text-white'>Special menu all items</h2>
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Tabs value={tag || 'ALL'} onValueChange={handleActiveTag}>
              <TabsList className='h-auto bg-[var(--secondary-color)] p-2 text-2xl'>
                <TabsTrigger className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]' value='ALL'>
                  All
                </TabsTrigger>
                <TabsTrigger
                  className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]'
                  value={`${TagType.Normal}`}
                >
                  Normal menu
                </TabsTrigger>
                <TabsTrigger
                  className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]'
                  value={`${TagType.Special}`}
                >
                  Special deals
                </TabsTrigger>
                <TabsTrigger
                  className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]'
                  value={`${TagType.New}`}
                >
                  NEW
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <CustomSheet
            onConfirm={() => {
              menuItemForm.reset()
            }}
            isConfirmationRequired={menuItemForm.formState.isDirty}
            title='New category'
            render={
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
                      <Image className='size-5' />
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
                  <Form {...menuItemForm} key={'form-add-menu'}>
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
                      render={({ field }) => <CustomInput label='Price' type='number' min={0} field={field} />}
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
                              <SelectLabel className='flex items-center gap-2'>Category</SelectLabel>
                              {(getCategoriesQuery.data?.result?.categories as TCategory[])?.map((category) => {
                                return (
                                  <SelectItem
                                    key={category._id}
                                    className='h-auto py-3 focus:bg-[var(--secondary-color)]'
                                    value={category._id}
                                  >
                                    {category.name}
                                  </SelectItem>
                                )
                              })}
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
                                    {(getIngredientsQuery.data?.result as Ingredient[])?.map((ingre) => {
                                      const params = { _id: ingre._id, name: ingre.name, unit: ingre.unit }
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
                                    })}
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
                                    <span className='rounded-sm bg-[var(--primary-color)] px-2'>{quantity}</span>
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

                    <div className='!mt-9 flex items-center justify-end gap-5'>
                      <Button
                        disabled={!menuItemForm.formState.isDirty}
                        onClick={handleAddMenuItem}
                        className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                      >
                        Add
                      </Button>
                    </div>
                  </Form>
                </div>
              </>
            }
          >
            <Button className='bg-[#EA7C69] text-white transition-all hover:bg-[#EA7C69] hover:opacity-90'>
              New item
            </Button>
          </CustomSheet>
        </div>
        <TableDishes />
      </section>
    </main>
  )
}
