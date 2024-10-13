'use client'

import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Form, FormField } from '~/components/ui/form'
import CustomInput from '~/components/custom-input'
import { Button } from '~/components/ui/button'

function Filter() {
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
    <div className='flex w-full min-w-[360px] max-w-[360px] items-center gap-5 rounded-[10px] bg-[#1F1D2B] px-4 py-5'>
      <div className='w-full text-white'>
        <div>
          <h3 className='mb-4'>Product Status</h3>
          <ul className='grid grid-cols-2 gap-[10px]'>
            <li>
              <Link
                href={'/admin/inventory'}
                className='flex items-center justify-between rounded-[10px] border border-slate-500 bg-[#2D303E] px-4 py-3'
              >
                <span>All</span>
                <span className='rounded-sm bg-[var(--primary-color)] px-2'>160</span>
              </Link>
            </li>
            <li>
              <Link
                href={'/admin/inventory'}
                className='flex items-center justify-between rounded-[10px] bg-[#2D303E] px-4 py-3'
              >
                <span>Active</span>
                <span>120</span>
              </Link>
            </li>
            <li>
              <Link
                href={'/admin/inventory'}
                className='flex items-center justify-between rounded-[10px] bg-[#2D303E] px-4 py-3'
              >
                <span>Inactive</span>
                <span>30</span>
              </Link>
            </li>
            <li>
              <Link
                href={'/admin/inventory'}
                className='flex items-center justify-between rounded-[10px] bg-[#2D303E] px-4 py-3'
              >
                <span>Draft</span>
                <span>10</span>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className='my-4'>Product Status</h3>
          <Select>
            <SelectTrigger className='h-auto w-full bg-[#2D303E] px-4 py-3'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent className='bg-[#2D303E] text-white'>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='my-4'>Product Status</h3>
          <Select>
            <SelectTrigger className='h-auto w-full bg-[#2D303E] px-4 py-3'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent className='bg-[#2D303E] text-white'>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='my-4'>Product Status</h3>
          <Select>
            <SelectTrigger className='h-auto w-full bg-[#2D303E] px-4 py-3'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent className='bg-[#2D303E] text-white'>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <h3 className='my-4'>Product Status</h3>
          <div className='flex w-full items-center gap-5'>
            <Form {...form}>
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
            </Form>
          </div>
        </div>
        <Button className='mt-6 h-auto w-full bg-[#FAC1D9] px-12 py-3 text-base text-black transition-all hover:bg-[#FAC1D9] hover:shadow-md hover:shadow-[#FAC1D9]'>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}

export default Filter
