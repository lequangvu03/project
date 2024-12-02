'use client'

import React from 'react'
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
    const pages: any = []

    // Hiển thị logic rút gọn: 2 trang đầu, 2 trang cuối, và xung quanh trang hiện tại
    const startPages = [1, 2]
    const endPages = [totalPage - 1, totalPage]
    const siblingPages = [page - 1, page, page + 1].filter((p) => p > 2 && p < totalPage - 1)

    const uniquePages = Array.from(new Set([...startPages, ...siblingPages, ...endPages])).sort((a, b) => a - b)

    uniquePages.forEach((currentPage, index) => {
      const prevPage = uniquePages[index - 1]

      // Chèn dấu ... giữa các cụm trang
      if (prevPage && currentPage > prevPage + 1) {
        pages.push(
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      pages.push(
        <PaginationItem key={currentPage}>
          <PaginationLink
            href='#'
            isActive={currentPage === page}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(currentPage)
            }}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      )
    })

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
