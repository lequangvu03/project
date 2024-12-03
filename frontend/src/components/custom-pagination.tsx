'use client'

import { type ReactNode, useCallback } from 'react'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '~/lib/utils'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from './ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export interface PaginationWithLinksProps {
  pageSizeSelectOptions?: {
    pageSizeSearchParam?: string
    pageSizeOptions: number[]
  }
  totalCount: number
  pageSize: number
  page: number
  pageSearchParam?: string
}

/**
 * Navigate with Nextjs links (need to update your own `pagination.tsx` to use Nextjs Link)
 * 
 * @example
 * ```
 * <PaginationWithLinks
    page={1}
    pageSize={20}
    totalCount={500}
  />
 * ```
 */
export function PaginationWithLinks({
  pageSizeSelectOptions,
  pageSize,
  totalCount,
  page,
  pageSearchParam
}: PaginationWithLinksProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const totalPageCount = Math.ceil(totalCount / pageSize)
  const buildLink = useCallback(
    (newPage: number) => {
      const key = pageSearchParam || 'page'
      if (!searchParams) return `${pathname}?${key}=${newPage}`
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.set(key, String(newPage))
      return `${pathname}?${newSearchParams.toString()}`
    },
    [searchParams, pathname]
  )

  const navToPageSize = useCallback(
    (newPageSize: number) => {
      const key = pageSizeSelectOptions?.pageSizeSearchParam || 'pageSize'
      const newSearchParams = new URLSearchParams(searchParams || undefined)
      newSearchParams.set(key, String(newPageSize))
      router.push(`${pathname}?${newSearchParams.toString()}`)
    },
    [searchParams, pathname]
  )

  const renderPageNumbers = () => {
    const items: ReactNode[] = []
    const maxVisiblePages = 5

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <Link
              href={buildLink(i)}
              className={cn('inline-block rounded-sm bg-[var(--bg-input)] px-4 py-1', {
                'bg-[var(--primary-color)]': page === i
              })}
            >
              {i}
            </Link>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <Link
            href={buildLink(1)}
            className={cn('inline-block rounded-sm bg-[var(--bg-input)] px-4 py-1', {
              'bg-[var(--bg-input)]': page === 1
            })}
          >
            1
          </Link>
        </PaginationItem>
      )

      if (page > 3) {
        items.push(
          <PaginationItem key='ellipsis-start'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const start = Math.max(2, page - 1)
      const end = Math.min(totalPageCount - 1, page + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <Link
              href={buildLink(i)}
              className={cn('inline-block rounded-sm bg-[var(--bg-input)] px-4 py-1', {
                'bg-[var(--bg-input)]': page === i
              })}
            >
              {i}
            </Link>
          </PaginationItem>
        )
      }

      if (page < totalPageCount - 2) {
        items.push(
          <PaginationItem key='ellipsis-end'>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <Link
            href={buildLink(totalPageCount)}
            className={cn('inline-block rounded-sm bg-[var(--bg-input)] px-4 py-1', {
              'bg-[var(--bg-input)]': page === totalPageCount
            })}
          >
            {totalPageCount}
          </Link>
        </PaginationItem>
      )
    }

    return items
  }

  return (
    <div className='flex w-full flex-col items-center gap-3 md:flex-row'>
      {pageSizeSelectOptions && (
        <div className='flex flex-1 flex-col gap-4'>
          <SelectRowsPerPage
            options={pageSizeSelectOptions.pageSizeOptions}
            setPageSize={navToPageSize}
            pageSize={pageSize}
          />
        </div>
      )}
      <Pagination className={cn({ 'md:justify-end': pageSizeSelectOptions })}>
        <PaginationContent className='gap-1'>
          <PaginationItem>
            <Link
              href={buildLink(Math.max(page - 1, 1))}
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={page === 1 ? 'pointer-events-none cursor-not-allowed opacity-50' : undefined}
            >
              Previous
            </Link>
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <Link
              href={buildLink(Math.min(page + 1, totalPageCount))}
              tabIndex={page === totalPageCount ? -1 : undefined}
              className={page === totalPageCount ? 'pointer-events-none cursor-not-allowed opacity-50' : undefined}
            >
              Next
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}

function SelectRowsPerPage({
  options,
  setPageSize,
  pageSize
}: {
  options: number[]
  setPageSize: (newSize: number) => void
  pageSize: number
}) {
  return (
    <div className='flex items-center gap-4'>
      <span className='whitespace-nowrap text-sm'>Rows per page</span>

      <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
        <SelectTrigger>
          <SelectValue placeholder='Select page size'>{String(pageSize)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={String(option)}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
