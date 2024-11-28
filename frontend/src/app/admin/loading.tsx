import React from 'react'
import { Skeleton } from '~/components/ui/skeleton'

function Loading() {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Skeleton className='h-10 w-full bg-[var(--secondary-color)]' />
      <Skeleton className='h-10 w-full bg-[var(--secondary-color)]' />
      <Skeleton className='h-10 w-full bg-[var(--secondary-color)]' />
      <Skeleton className='h-10 w-full bg-[var(--secondary-color)]' />
    </div>
  )
}

export default Loading
