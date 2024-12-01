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
import { useDeleteDishQuery, useGetDishesQuery } from '~/hooks/data/menu.data'
import useQueryParams from '~/hooks/useQueryParams'
import { cn } from '~/lib/utils'
import { IMenuItem } from '~/models/menu.model'
import CustomSheet from './custom-sheet'
import { Checkbox } from './ui/checkbox'
import { useGetStaffsQuery } from '~/hooks/data/staffs.data'
import { User } from '~/definitions/types'
import { formatRole } from '~/utils/format-role'

function TableStaff() {
  const deleteDishMutation = useDeleteDishQuery()

  const { data: staffs } = useGetStaffsQuery()
  console.log(staffs?.result?.employees)
  const handleDelete = async (id: string) => {
    try {
      await deleteDishMutation.mutateAsync(id)
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
            <TableHead>Timings</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className='[&>tr]:border-none'>
          {staffs?.result?.employees &&
            staffs?.result?.employees.map((user: User, index: number) => {
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
                    <div className='flex flex-col'>{/* <span>{stock}</span> */}</div>
                  </TableCell>
                  <TableCell className='border-slate-400'>
                    <div className='flex flex-col'>
                      <span>Category</span>
                      <span>Chicken</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col border-l border-l-slate-500 p-4'>
                      {/* <span>{price} VND</span> */}
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
                            <AlertDialogAction onClick={() => handleDelete(user._id)}>Continue</AlertDialogAction>
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
