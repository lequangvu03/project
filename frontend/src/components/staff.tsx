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
import { useGetStaffsByIdQuery, useGetStaffsQuery, useUpdateStaffMutation } from '~/hooks/data/staffs.data'
import { cn } from '~/lib/utils'
import CustomSheet from './custom-sheet'
import { Checkbox } from './ui/checkbox'
import { formatRole } from '~/utils/format-role'
import { TProfile } from '~/definitions/types'
import { Button } from './ui/button'
import CustomInput from './custom-input'
import { Form, FormField, FormItem, FormLabel } from './ui/form'
import { useEffect, useState } from 'react'
import { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { TagType } from '~/definitions/constant/types.constant'
import useQueryParams from '~/hooks/useQueryParams'
import Loading from '~/components/loading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'

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
  const [id, setId] = useState<string>('')
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
  const updateStaffMutation = useUpdateStaffMutation()
  const updateStaffQuery = useGetStaffsByIdQuery({
    id: id,
    enabled: !!id
  })
  useEffect(() => {
    const item = updateStaffQuery.data?.result?.employees?.[0]
    if (item) {
      menuItemForm.setValue('name', item.name)
      menuItemForm.setValue('contact_info', item.contact_info)
      menuItemForm.setValue('position', item.position)
      menuItemForm.setValue('salary', item.salary)
      menuItemForm.setValue('age', item.age)
      menuItemForm.setValue('timing', item.timing)
    }
  }, [updateStaffQuery.data])
  const menuItemForm = useForm<{
    name: string
    contact_info: string
    position: number
    salary: number
    timing: string
    age: number
  }>({
    defaultValues: {
      name: '',
      contact_info: '',
      position: 0,
      salary: 0,
      age: 0,
      timing: ''
    }
  })
  const { categoryId, tag } = useQueryParams()

  const { data: dishesData, isPending } = useGetDishesQuery({
    categoryId: categoryId,
    tag: tag === 'ALL' ? '' : tag
  })
  const handleUpdateStaff = menuItemForm.handleSubmit(async (data) => {
    try {
      const response = await updateStaffMutation.mutateAsync({
        id: id,
        body: data
      })
      menuItemForm.reset()
      toast(response?.message)
    } catch (error) {
      console.log(error)
    }
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
                        onConfirm={() => {
                          menuItemForm.reset()
                        }}
                        isConfirmationRequired={menuItemForm.formState.isDirty}
                        title='New category'
                        render={
                          <div>
                            {updateStaffQuery.isPending ? (
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
                                      name='age'
                                      render={({ field }) => (
                                        <CustomInput label='Age' type='number' min={0} field={field} />
                                      )}
                                    />
                                    <FormField
                                      control={menuItemForm.control}
                                      name='contact_info'
                                      render={({ field }) => <CustomInput label='Phone' field={field} />}
                                    />
                                    <FormField
                                      control={menuItemForm.control}
                                      name='position'
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Position</FormLabel>
                                          <Select
                                            value={String(field.value)}
                                            onValueChange={(value) => field.onChange(Number(value))}
                                          >
                                            <SelectTrigger className='min-h-[56px] bg-[var(--bg-input)]'>
                                              <SelectValue placeholder='Position' />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {Object.entries(PositionEmployeeType)
                                                .filter(([key, value]) => typeof value === 'number')
                                                .map(([key, value]) => (
                                                  <SelectItem key={value} value={String(value)}>
                                                    {key}
                                                  </SelectItem>
                                                ))}
                                            </SelectContent>
                                          </Select>
                                        </FormItem>
                                      )}
                                    />

                                    <FormField
                                      control={menuItemForm.control}
                                      name='salary'
                                      render={({ field }) => <CustomInput type='number' label='Salary' field={field} />}
                                    />
                                    <FormField
                                      control={menuItemForm.control}
                                      name='timing'
                                      render={({ field }) => <CustomInput label='Timing' field={field} />}
                                    />

                                    <div className='!mt-9 flex items-center justify-end gap-5'>
                                      <Button
                                        type='button'
                                        disabled={!menuItemForm.formState.isDirty || updateStaffMutation.isPending}
                                        onClick={handleUpdateStaff}
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
                        <Pencil className='cursor-pointer' onClick={() => setId(user._id)} />
                      </CustomSheet>
                      <AlertDialog>
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
