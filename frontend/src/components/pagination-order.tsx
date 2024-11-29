'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'

type Props = {
  page: number
  totalPage: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export function PaginationOrder({ page, setPage, totalPage }: Props) {
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPage) {
      setPage(newPage)
    }
  }

  const renderPageLinks = () => {
    const pages = []
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href='#'
            isActive={i === page}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return pages
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(page - 1)
            }}
            aria-disabled={page === 1}
          />
        </PaginationItem>
        {renderPageLinks()}
        {totalPage > 5 && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(page + 1)
            }}
            aria-disabled={page === totalPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
