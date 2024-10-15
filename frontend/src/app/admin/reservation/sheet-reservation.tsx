'use client'

import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '~/components/ui/form'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '~/components/ui/sheet'

import { X } from 'lucide-react'
import Image from 'next/image'
import PlaceholderImage from '~/assets/images/inventory-placeholder.png'
import CustomInput from '~/components/custom-input'
import { Button } from '~/components/ui/button'

type Props = {
  children: ReactNode
}

function SheetReservation({ children }: Props) {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      newPassword: '',
      confirmPassword: ''
    }
  })
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        hasCloseIcon={false}
        className='w-full !max-w-[640px] overflow-y-auto rounded-bl-[30px] rounded-tl-[30px] bg-[#1F1D2B] pt-[60px]'
      >
        <SheetHeader className='flex flex-row items-center justify-between border-b border-slate-500 pb-6'>
          <SheetTitle>Add New Inventory</SheetTitle>
          <SheetClose asChild className='hover:opacity-70'>
            <X />
          </SheetClose>
        </SheetHeader>
        <div className='mt-6 flex flex-col items-center justify-center gap-4'>
          <Image
            src={PlaceholderImage}
            alt='placeholder image'
            className='max-w-[240px] overflow-hidden rounded-[10px] bg-[#2D303E]'
          />
          <p className='text-[var(--primary-color)] underline'>Change inventory image</p>
        </div>
        <Form {...form}>
          <div className='mt-8 space-y-6'>
            <div className='flex w-full items-center gap-5'>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <CustomInput className='flex-grow' classNameInput='bg-[#2D303E]' label='New Password' field={field} />
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <CustomInput
                    className='flex-grow'
                    classNameInput='bg-[#2D303E]'
                    label='Confirm Password'
                    field={field}
                  />
                )}
              />
            </div>
            <div className='flex w-full items-center gap-5'>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <CustomInput className='flex-grow' classNameInput='bg-[#2D303E]' label='New Password' field={field} />
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <CustomInput
                    className='flex-grow'
                    classNameInput='bg-[#2D303E]'
                    label='Confirm Password'
                    field={field}
                  />
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <CustomInput
                  className='flex-grow'
                  classNameInput='bg-[#2D303E]'
                  label='Confirm Password'
                  field={field}
                />
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <CustomInput
                  className='flex-grow'
                  classNameInput='bg-[#2D303E]'
                  label='Confirm Password'
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
      </SheetContent>
    </Sheet>
  )
}

export default SheetReservation
