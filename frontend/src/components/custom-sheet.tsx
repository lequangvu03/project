'use client'

import { ReactNode } from 'react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'

import { X } from 'lucide-react'

type Props = {
  title?: string
  children: ReactNode
  trigger: ReactNode
}

function CustomSheet({ children, trigger, title }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        hasCloseIcon={false}
        className='w-full !max-w-[640px] overflow-y-auto rounded-bl-[30px] rounded-tl-[30px] bg-[var(--secondary-color)] pt-[60px]'
      >
        <SheetHeader className='flex flex-row items-center justify-between border-b border-slate-500 pb-6'>
          <SheetTitle>{title}</SheetTitle>
          <SheetClose asChild className='cursor-pointer hover:opacity-70'>
            <X />
          </SheetClose>
        </SheetHeader>
        <div>{children}</div>
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet
