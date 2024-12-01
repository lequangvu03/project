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

import { toast } from 'sonner'
import CustomSheet from '~/components/custom-sheet'
import Loading from '~/components/loading'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { useDeleteIngredientQuery, useGetIngredientsQuery } from '~/hooks/data/ingredients.data'
import { PaginationOrder } from '~/components/pagination-order'

export type Ingredient = {
  _id: string
  name: string
  stock: number
  unit: string
  price: number
  created_at: number
  updated_at: number
}

export default function IngredientTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [page, setPage] = useState<number>(1)
  const { data: ingredientsData, isPending } = useGetIngredientsQuery({ page })
  const deleteIngredientMutation = useDeleteIngredientQuery()
  const totalPage = Math.ceil((ingredientsData?.result?.total || 0) / 6)
  const ingredients = useMemo(() => {
    return (ingredientsData?.result?.ingredients as Ingredient[]) || []
  }, [ingredientsData])

  const columns: ColumnDef<Ingredient>[] = [
    {
      accessorKey: 'name',
      header: 'Ingredient Name',
      cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
    },
    {
      accessorKey: 'stock',
      header: ({ column }) => (
        <Button
          className='flex w-full gap-2 text-center'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stock
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div className='text-center'>{row.getValue('stock')}</div>
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
      cell: ({ row }) => <div>{row.getValue('unit')}</div>
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <div>{row.getValue('price')}</div>
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original

        return (
          <div className='flex w-full items-center gap-4'>
            {/* <CustomSheet title='Edit Ingredient'>
              <Pencil />
            </CustomSheet> */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash className='cursor-pointer hover:opacity-60 active:opacity-60' />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the ingredient.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(item._id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      }
    }
  ]

  const table = useReactTable({
    data: ingredients,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection
  })

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteIngredientMutation.mutateAsync(id)
      toast.success(response?.message)
    } catch {
      toast.error('Failed to delete ingredient')
    }
  }

  return (
    <div className='w-full'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter by name...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
      </div>
      <div className='-mx-8'>
        {isPending ? (
          <div className='flex items-center justify-center'>
            <Loading />
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <PaginationOrder page={page} setPage={setPage} totalPage={totalPage} />
      </div>
    </div>
  )
}
