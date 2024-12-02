'use client'

import { CheckedState } from '@radix-ui/react-checkbox'
import { Pencil, Trash } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
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
import PlaceholderImage from '~/assets/images/inventory-placeholder.png'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteDishQuery, useGetDishesQuery } from '~/hooks/data/menu.data'
import { useGetStaffsQuery } from '~/hooks/data/staffs.data'
import { cn } from '~/lib/utils'
import CustomSheet from './custom-sheet'
import { Checkbox } from './ui/checkbox'
import { formatRole } from '~/utils/format-role'
import { TProfile } from '~/definitions/types'
import { Button } from './ui/button'
import CustomInput from './custom-input'
import { Form, FormField } from './ui/form'
import { useState } from 'react'
import { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { TagType } from '~/definitions/constant/types.constant'
import useQueryParams from '~/hooks/useQueryParams'

// Enum để ánh xạ vị trí
export enum PositionEmployeeType {
  Waiter = 0, // Nhân viên phục vụ
  Cashier, // Nhân viên thu ngân
  Chef, // Nhân viên bếp
  Cleaner, // Nhân viên dọn dẹp
  Manager, // Quản lý
  Security // Nhân viên bảo vệ
}

function getPositionLabel(position: number): string {
  return PositionEmployeeType[position] || 'Unknown'
}

function TableStaff() {
  const deleteStaffMutation = useDeleteDishQuery()

  const { data: staffs } = useGetStaffsQuery()
  console.log(staffs?.result?.employees)
  const handleDelete = async (id: string) => {
    try {
      await deleteStaffMutation.mutateAsync(id)
      toast.success('Delete menu item successfully')
    } catch (_) {
      toast.error('Failed to delete menu item')
    }
  }

  const handleChoose = (id: string) => (checked: CheckedState) => {
    console.log(id, checked)
  }

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const form = useForm<{
    name: string
    description: string
    price: string
    category_id: string
    stock: string
    image: File | string
    tag: TagType
  }>({
    defaultValues: {
      name: '',
      image: '',
      price: '',
      category_id: '',
      description: '',
      stock: '',
      tag: TagType.Normal
    }
  })
  const { categoryId, tag } = useQueryParams()

  const { data: dishesData, isPending } = useGetDishesQuery({
    categoryId: categoryId,
    tag: tag === 'ALL' ? '' : tag
  })

  const deleteDishMutation = useDeleteDishQuery()

  return (
    <div className='-mx-8'>
      <Table className='overflow-hidden rounded-none bg-[var(--secondary-color)] text-white'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>
              <Checkbox />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Position</TableHead> {/* Thêm cột Position */}
            <TableHead>Timings</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&>tr]:border-none'>
          {staffs?.result?.employees &&
            staffs?.result?.employees.map((user: TProfile, index: number) => {
              return (
                <TableRow
                  className={cn('w-fit bg-[var(--secondary-color)]', {
                    'bg-[#3D414266]': index % 2 === 0
                  })}
                  key={index}
                >
                  <TableCell className='text-center'>
                    <Checkbox onCheckedChange={handleChoose(user._id)} />
                  </TableCell>
                  <TableCell className='font-medium'>
                    <div className='flex items-center gap-4'>
                      <Image
                        width={100}
                        height={100}
                        className='h-[80px] w-[80px] rounded-[10px] object-cover'
                        src={user.avatar_url}
                        alt='avatar'
                      />
                      <div className='flex flex-col gap-1'>
                        <span className='whitespace-nowrap'>{user.name}</span>
                        <span className='whitespace-nowrap'>{formatRole(user.role)}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col'>
                      <span>{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className='border-slate-400'>
                    <div className='flex flex-col'>
                      <span>{user.contact_info || 'Unknow'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col border-l p-4'>
                      <span>{user.age || 'Unknow'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col border-l p-4'>
                      <span>{user.salary || 'Unknow'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col border-l p-4'>
                      <span>{getPositionLabel(user.position ?? -1)}</span> {/* Hiển thị Position */}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col border-l p-4'>
                      <span>{user.timing || 'Unknow'}</span>
                    </div>
                  </TableCell>
                  <TableCell className='text-right'>
                    <div className='flex items-center gap-4'>
                      <CustomSheet
                        isConfirmationRequired
                        render={
                          <div>
                            <div className='mt-6 flex flex-col items-center justify-center gap-4'>
                              <Image
                                src={PlaceholderImage}
                                alt='placeholder image'
                                className='max-w-[240px] overflow-hidden rounded-[10px] bg-[var(--bg-input)]'
                              />
                              <p className='text-[var(--primary-color)] underline'>Change inventory image</p>
                            </div>
                            <Form {...form}>
                              <div className='mt-8 space-y-6'>
                                <div className='flex w-full items-center gap-5'>
                                  <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                      <CustomInput
                                        className='flex-grow'
                                        classNameInput='bg-[var(--bg-input)]'
                                        label='Name'
                                        field={field}
                                      />
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                      <CustomInput
                                        className='flex-grow'
                                        classNameInput='bg-[var(--bg-input)]'
                                        label='Description'
                                        field={field}
                                      />
                                    )}
                                  />
                                </div>
                                <div className='flex w-full items-center gap-5'>
                                  <FormField
                                    control={form.control}
                                    name='price'
                                    render={({ field }) => (
                                      <CustomInput
                                        className='flex-grow'
                                        classNameInput='bg-[var(--bg-input)]'
                                        label='Price'
                                        field={field}
                                      />
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name='stock'
                                    render={({ field }) => (
                                      <CustomInput
                                        className='flex-grow'
                                        classNameInput='bg-[var(--bg-input)]'
                                        label='Stock'
                                        field={field}
                                      />
                                    )}
                                  />
                                </div>
                                <FormField
                                  control={form.control}
                                  name='tag'
                                  render={({ field }) => (
                                    <CustomInput
                                      className='flex-grow'
                                      classNameInput='bg-[var(--bg-input)]'
                                      label='Tag '
                                      field={field}
                                    />
                                  )}
                                />
                                <div className='!mt-9 flex items-center justify-end gap-5'>
                                  <Button className='h-auto bg-transparent px-12 py-3 text-base text-white underline transition-all hover:bg-transparent hover:text-[var(--primary-color)]'>
                                    Cancel
                                  </Button>
                                  <Button className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[#FAC1D9] hover:text-black hover:shadow-md hover:shadow-[#FAC1D9]'>
                                    Save
                                  </Button>
                                </div>
                              </div>
                            </Form>
                          </div>
                        }
                        title='Edit Staff'
                      >
                        <div className='cursor-pointer hover:opacity-60 active:opacity-60'>
                          <Pencil />
                        </div>
                      </CustomSheet>
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

export default TableStaff
