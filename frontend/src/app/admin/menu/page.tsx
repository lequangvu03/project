'use client'

import { Image, X } from 'lucide-react'
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
import TableDishes from './data-table'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '~/components/ui/command'

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
    stock: string
    image: File | null
    tag: number[]
    ingredients: { _id: string; quantity: number }[]
  }>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      category_id: '',
      stock: '',
      image: null,
      tag: [],
      ingredients: []
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
      formData.append('stock', data.stock)
      formData.append('image', data.image as any)
      formData.append('tag', data.tag.toString())
      formData.append('ingredients', data.ingredients.toString())
      const response = await addMenuItemMutation.mutateAsync(formData)

      toast(response?.message)
    } catch (error) {
      console.log(error)
    }
  })

  const openFileDialog = () => {
    ref.current?.click()
  }

  const handleAddIngregients = (ingredient: { _id: string; quantity: number }) => {
    const ingredients = menuItemForm.getValues('ingredients')

    menuItemForm.setValue('ingredients')
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
            isConfirmationRequired
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
                  <Form {...menuItemForm}>
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
                      render={({ field }) => <CustomInput label='Price' field={field} />}
                    />
                    <div>
                      <Label className='mb-2 block'>Category</Label>
                      <Select
                        onValueChange={(id) => {
                          console.log(id)
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
                      <ScrollArea className='relative h-[80px] w-full rounded-md bg-[var(--bg-input)]'>
                        <div className='ingredients absolute left-0 right-0 top-full z-10 w-full'>
                          <Command className='w-full rounded-lg border bg-[var(--bg-input)] text-white shadow-md'>
                            <CommandInput placeholder='Search...' />
                            <CommandList>
                              <CommandEmpty>No results found.</CommandEmpty>
                              <ScrollArea className='h-[200px] w-full rounded-md'>
                                <CommandGroup>
                                  {(getIngredientsQuery.data?.result as Ingredient[])?.map((ingre) => {
                                    return (
                                      <CommandItem
                                        key={ingre._id}
                                        className='flex h-auto items-center justify-between py-3 data-[selected="true"]:bg-[var(--secondary-color)]'
                                      >
                                        <span>{ingre.name}</span>
                                        {/* <span className='block rounded-full bg-[var(--bg-input)] p-1'>
                                        <X className='h-4 w-4' />
                                      </span> */}
                                      </CommandItem>
                                    )
                                  })}
                                </CommandGroup>
                              </ScrollArea>
                            </CommandList>
                          </Command>
                        </div>
                      </ScrollArea>
                    </div>
                    <FormField
                      control={menuItemForm.control}
                      name='stock'
                      render={({ field }) => <CustomInput label='Stock' field={field} />}
                    />

                    <div className='!mt-9 flex items-center justify-end gap-5'>
                      <Button
                        disabled={!menuItemForm.formState.isDirty}
                        onClick={handleAddMenuItem}
                        className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                      >
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </div>
              </>
            }
          >
            <Button
              onClick={handleAddMenuItem}
              className='bg-[#EA7C69] text-white transition-all hover:bg-[#EA7C69] hover:opacity-90'
            >
              New item
            </Button>
          </CustomSheet>
        </div>
        <TableDishes />
      </section>
    </main>
  )
}
