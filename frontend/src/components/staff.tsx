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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteDishQuery } from '~/hooks/data/menu.data'
import { useGetStaffsQuery } from '~/hooks/data/staffs.data'
import { cn } from '~/lib/utils'
import CustomSheet from './custom-sheet'
import { Checkbox } from './ui/checkbox'
import { formatRole } from '~/utils/format-role'
import { TProfile } from '~/definitions/types'

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
  return PositionEmployeeType[position] || 'Unknown';
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
                    <div className='flex flex-col'><span>{user.email}</span></div>
                  </TableCell>
                  <TableCell className='border-slate-400'>
                    <div className='flex flex-col'>
                      <span>{user.contact_info|| 'Unknow'}</span>
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
                      <CustomSheet isConfirmationRequired render={<div>Form</div>} title='Edit dish'>
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
