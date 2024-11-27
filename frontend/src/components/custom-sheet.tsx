'use client'

import { X } from 'lucide-react'
import { ReactNode, useState } from 'react'
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'

type Props = {
  title?: string
  children: ReactNode
  render: ReactNode
  isConfirmationRequired?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

function CustomSheet({ children, render, title, isConfirmationRequired = false, onCancel, onConfirm }: Props) {
  const [openSheet, setOpenSheet] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const onCloseSheet = () => {
    if (isConfirmationRequired) {
      setOpenDialog(true)
    } else {
      setOpenSheet(false)
    }
  }

  return (
    <>
      <Sheet open={openSheet}>
        <SheetTrigger
          onClick={() => {
            setOpenSheet(true)
          }}
          asChild
        >
          {children}
        </SheetTrigger>
        <SheetContent
          onInteractOutside={onCloseSheet}
          hasCloseIcon={false}
          className='w-full !max-w-[640px] overflow-y-auto rounded-bl-[30px] rounded-tl-[30px] bg-[var(--secondary-color)] pt-[60px]'
        >
          <SheetHeader className='sticky top-0 flex flex-row items-center justify-between border-b border-slate-500 pb-6'>
            <SheetTitle className='text-white'>{title}</SheetTitle>
            <div onClick={onCloseSheet} className='cursor-pointer hover:opacity-70'>
              <X />
            </div>
          </SheetHeader>
          <div>{render}</div>
        </SheetContent>
      </Sheet>
      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger asChild className='cursor-pointer hover:opacity-60 active:opacity-60' />
        <AlertDialogContent className='bg-[var(--secondary-color)]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to close this?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone, and any unsaved data will be permanently lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className='bg-primary text-black hover:bg-primary/90 hover:text-black'
              onClick={() => setOpenSheet(false)}
            >
              Confirm
            </AlertDialogCancel>
            <AlertDialogAction className='bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)] hover:opacity-90'>
              Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default CustomSheet
