'use client'

import { useQueryClient } from '@tanstack/react-query'
import { EllipsisVertical, Pencil, Trash } from 'lucide-react'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { orderIcon } from '~/assets/images'
import CustomInput from '~/components/custom-input'
import CustomSheet from '~/components/custom-sheet'
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

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '~/components/ui/menubar'

import { Button } from '~/components/ui/button'
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '~/components/ui/context-menu'
import { Form, FormField } from '~/components/ui/form'
import {
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation
} from '~/hooks/data/categories.data'
import useQueryParams from '~/hooks/useQueryParams'
import { cn } from '~/lib/utils'

type Props = {
  _id?: string
  name: string
  amount: number
  icon?: StaticImport | string
  className?: string
}

export default function Category({ _id, icon = orderIcon.burger, name, amount, className }: Props) {
  const searchParams = useQueryParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const updateCategoryMutation = useUpdateCategoryMutation()
  const deleteCategoryMutation = useDeleteCategoryMutation()
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedMenuId, setSelectedMenuId] = useState<string>('')
  const getCategoryByIdQuery = useGetCategoryByIdQuery(selectedCategoryId as string, !!selectedCategoryId)
  const isActive = searchParams?.categoryId === _id
  const categoryForm = useForm<{ name: string; description: string }>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  useEffect(() => {
    if (getCategoryByIdQuery.data) {
      const category = getCategoryByIdQuery?.data?.result?.categories[0]
      categoryForm.setValue('name', category?.name)
      categoryForm.setValue('description', category?.description || '')
    }
  }, [getCategoryByIdQuery.data, selectedCategoryId])

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteCategoryMutation.mutateAsync(id)
      router.replace('/admin/menu')
      toast.success(response?.message)
    } catch (_) {
      toast.error('Failed to delete menu item')
    }
  }

  const handleEditCategory = categoryForm.handleSubmit(async (data) => {
    try {
      const response = await updateCategoryMutation.mutateAsync({
        id: selectedCategoryId,
        body: data
      })
      categoryForm.reset()
      setSelectedCategoryId('')
      toast(response?.message)
    } catch (error) {
      console.log(error)
    }
  })

  const handleSelectedCategoryId = () => {
    setSelectedCategoryId(_id as string)
    queryClient.invalidateQueries({
      queryKey: ['CATEGORIES_DETAILS', _id]
    })
  }

  return (
    <>
      {_id ? (
        <ContextMenu>
          <ContextMenuTrigger asChild onContextMenu={handleSelectedCategoryId}>
            <Link
              href={`/admin/menu/?categoryId=${_id}`}
              className={cn(
                'block min-w-[150px] cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl transition-all hover:border-[var(--primary-color)]',
                {
                  'bg-[var(--primary-color)]': isActive
                }
              )}
            >
              <div className='flex w-full items-center justify-end'>
                <Image src={icon} alt='Food Icon' className='pointer-events-none invisible select-none' />
              </div>
              <section>
                <h2
                  className={cn('text-[16px] font-medium leading-[24px] text-gray-300 transition-all', {
                    'text-secondary': isActive
                  })}
                >
                  {name}
                </h2>
                <p
                  className={cn('text-[16px] font-light leading-[24px] text-gray-500 transition-all', {
                    'text-secondary': isActive
                  })}
                >
                  {amount + ' items'}
                </p>
              </section>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem
              onClick={handleSelectedCategoryId}
              asChild
              className='cursor-pointer rounded-sm p-2 text-white hover:bg-[var(--secondary-color)]'
            >
              <CustomSheet
                onConfirm={() => {
                  categoryForm.reset()
                  setSelectedCategoryId('')
                }}
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
                          onClick={handleEditCategory}
                          className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                        >
                          {selectedCategoryId ? 'Update' : 'Add'}
                        </Button>
                      </div>
                    </Form>
                  </div>
                }
              >
                <div className='flex cursor-pointer items-center gap-2 rounded-sm p-2 text-white hover:bg-[var(--secondary-color)]'>
                  <Pencil />
                  Edit category
                </div>
              </CustomSheet>
            </ContextMenuItem>
            <ContextMenuItem asChild>
              <AlertDialog>
                <AlertDialogTrigger
                  asChild
                  className='cursor-pointer rounded-sm p-2 text-white hover:bg-[var(--secondary-color)]'
                >
                  <div className='flex items-center gap-2'>
                    <Trash />
                    Delete category
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent className='bg-[var(--secondary-color)]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account and remove your data from
                      our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(_id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ) : (
        <Link
          href='/admin/menu'
          className={cn(
            'block w-[150px] min-w-[150px] cursor-pointer rounded-xl border-2 border-transparent bg-[var(--secondary-color)] px-3 py-4 shadow-2xl transition-all hover:border-[var(--primary-color)]',
            {
              'bg-[var(--primary-color)]': isActive
            },
            className
          )}
        >
          <div className='flex w-full items-center justify-end'>
            <Image src={icon} alt='Food Icon' className='pointer-events-none invisible select-none' />
          </div>
          <section>
            <h2
              className={cn('text-[16px] font-medium leading-[24px] text-gray-300 transition-all', {
                'text-secondary': isActive
              })}
            >
              {name}
            </h2>
            <p
              className={cn('text-[16px] font-light leading-[24px] text-gray-500 transition-all', {
                'text-secondary': isActive
              })}
            >
              {amount + ' items'}
            </p>
          </section>
        </Link>
      )}
    </>
  )
}
