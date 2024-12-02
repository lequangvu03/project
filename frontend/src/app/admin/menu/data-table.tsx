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
import Loading from '~/components/loading'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteDishQuery, useGetDishesQuery } from '~/hooks/data/menu.data'
import useQueryParams from '~/hooks/useQueryParams'
import { IMenuItem } from '~/models/menu.model'
import { Form, FormField } from '~/components/ui/form'
import CustomInput from '~/components/custom-input'
import { useForm } from 'react-hook-form'
import PlaceholderImage from '~/assets/images/inventory-placeholder.png'
import { TagType } from '~/definitions/constant/types.constant'
import { PaginationOrder } from '~/components/pagination-order'

export default function TableDishes() {
  const [page, setPage] = useState<number>(1)
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
    tag: tag === 'ALL' ? '' : tag,
    page: page
  })
  const totalPage = Math.ceil((dishesData?.result?.total || 0) / 10)
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
              title='Edit dish'
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
      const response = await deleteDishMutation.mutateAsync(id)
      toast.success(response?.message)
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
          <>
            <Table className='rounded-none'>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
            {table.getRowModel().rows?.length > 0 && (
              <PaginationOrder page={page} setPage={setPage} totalPage={totalPage} />
            )}
          </>
        )}
      </div>
    </div>
  )
}
