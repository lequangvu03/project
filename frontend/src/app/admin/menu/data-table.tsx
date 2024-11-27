'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ArrowUpDown, Pencil, Trash } from 'lucide-react'
import { useMemo, useState } from 'react'
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

import Image from 'next/image'
import { toast } from 'sonner'
import CustomSheet from '~/components/custom-sheet'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteDishQuery, useGetDishesQuery } from '~/hooks/data/menu.data'
import useQueryParams from '~/hooks/useQueryParams'
import { IMenuItem } from '~/models/menu.model'
import Loading from '~/components/loading'

export default function TableDishes() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const { categoryId, tag } = useQueryParams()

  const { data: dishesData, isPending } = useGetDishesQuery({
    categoryId: categoryId,
    tag: tag === 'ALL' ? '' : tag
  })

  const deleteDishMutation = useDeleteDishQuery()

  const dishes = useMemo(() => {
    const dishes = dishesData?.result?.menus as IMenuItem[]
    return dishes || []
  }, [dishesData])

  const columns: ColumnDef<IMenuItem>[] = [
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => {
        return (
          <>
            <div className='flex items-center gap-4'>
              <Image
                width={100}
                height={100}
                className='h-[80px] w-[80px] rounded-[10px] object-cover'
                src={row.getValue('image')}
                alt='avatar'
              />
              <div className='shrink-0 capitalize'>{row.getValue('name')}</div>
            </div>
          </>
        )
      }
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => {
        return (
          <Button
            className='flex w-full gap-2 text-center'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            In stock
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className='text-center'>{row.getValue('stock')}</div>
    },
    {
      accessorKey: 'category_name',
      header: () => <div>Category Name</div>,
      cell: ({ row }) => {
        return <div className='font-medium'>{row.getValue('category_name')}</div>
      }
    },
    {
      accessorKey: 'price',
      header: () => <div>Price</div>,
      cell: ({ row }) => {
        return <div className='font-medium'>{row.getValue('price')}</div>
      }
    },
    {
      accessorKey: 'image',
      cell: () => {},
      header: () => null
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original

        return (
          <div className='flex w-full items-center gap-4'>
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
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(item._id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: dishes,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteDishMutation.mutateAsync([id])
      toast.success('Delete menu item successfully')
    } catch (_) {
      toast.error('Failed to delete menu item')
    }
  }

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='-mx-8'>
        {isPending ? (
          <div role='status' className='flex min-h-[400px] w-full items-center justify-center'>
            <Loading />
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          <Table className='rounded-none'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
