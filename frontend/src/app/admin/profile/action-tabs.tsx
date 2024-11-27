/* eslint-disable no-unused-vars */
'use client'

import { Image, LogOut, Settings, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useRef } from 'react'
import { useForm } from 'react-hook-form'
import ButtonLogout from '~/components/button-logout'
import CustomInput from '~/components/custom-input'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Form, FormField } from '~/components/ui/form'
import { Switch } from '~/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import useQueryParams from '~/hooks/useQueryParams'
import { cn } from '~/lib/utils'

enum Tab {
  Profile = 'PROFILE',
  Access = 'ACCESS'
}

const tabs = [
  {
    key: Tab.Profile,
    label: 'My Profile',
    icon: <User />
  },
  {
    key: Tab.Access,
    label: 'Manage Access',
    icon: <Settings />
  }
]

function ActionTabs() {
  const searchParams = useQueryParams()
  const router = useRouter()
  const { tab = Tab.Profile } = searchParams

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      password: '',
      confirmPassword: ''
    }
  })

  const handleActiveTab = (tab: Tab) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', tab)
    router.push(`?${params.toString()}`)
  }

  return (
    <Tabs defaultValue={tab} className='flex gap-10'>
      <div className='flex flex-col gap-8'>
        <TabsList className='flex h-[fit] w-[360px] max-w-[360px] flex-col rounded-[10px] bg-[var(--secondary-color)] px-5 py-[30px] text-white'>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.key}
              className='w-full justify-start gap-4 px-10 py-[14px] text-base data-[state=active]:bg-[var(--primary-color)]'
              value={tab.key}
              onClick={() => handleActiveTab(tab.key)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
          <ButtonLogout className='flex h-auto w-full items-center justify-start gap-4 rounded-sm border border-transparent bg-transparent px-10 py-[14px] text-white active:bg-[var(--primary-color)]'>
            <LogOut />
            <span>Logout</span>
          </ButtonLogout>
        </TabsList>
        {tab === Tab.Access && (
          <TabsList className='flex h-fit w-[360px] max-w-[360px] flex-col rounded-[10px] bg-[var(--secondary-color)] px-5 py-[30px] text-white'>
            <h3 className='mb-6 w-full text-left text-2xl font-medium'>Add new sub account</h3>
            <div className='w-full space-y-5'>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => <CustomInput className='w-full' field={field} placeholder='Email' />}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => <CustomInput className='w-full' placeholder='Name' field={field} />}
                />
                <FormField
                  control={form.control}
                  name='role'
                  render={({ field }) => <CustomInput className='w-full' placeholder='Role' field={field} />}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <CustomInput className='w-full' placeholder='Password' type='password' field={field} />
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <CustomInput className='w-full' placeholder='Confirm Password' type='password' field={field} />
                  )}
                />

                <Button className='h-auto w-full bg-[var(--primary-color)] px-12 py-3 text-base text-black transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'>
                  Add
                </Button>
              </Form>
            </div>
          </TabsList>
        )}
      </div>
      <LayoutTabContent tab={Tab.Profile}>
        <Profile />
      </LayoutTabContent>
      <LayoutTabContent tab={Tab.Access}>
        <ManageAccess />
      </LayoutTabContent>
    </Tabs>
  )
}

function LayoutTabContent({ children, className, tab }: { children: ReactNode; className?: string; tab: Tab }) {
  return (
    <TabsContent
      value={tab}
      className={cn('mt-0 w-full rounded-[10px] bg-[var(--secondary-color)] px-10 pb-20 pt-10 text-white', className)}
    >
      {children}
    </TabsContent>
  )
}

function Profile() {
  const ref = useRef<HTMLInputElement | null>(null)
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      address: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const openFileDialog = () => {
    ref.current?.click()
  }

  return (
    <div>
      <h3 className='text-xl'>Personal Information</h3>
      <div className='mb-8 flex items-center gap-6'>
        <div
          className='relative mt-8 h-fit w-fit rounded-full transition-all hover:opacity-85'
          onClick={openFileDialog}
        >
          <Avatar className='relative h-[140px] w-[140px]'>
            <AvatarImage src='https://github.com/shadcn.png' alt='avatar' />
            <AvatarFallback className='text-black'>LQV</AvatarFallback>
          </Avatar>
          <button className='absolute bottom-0 right-5 z-10'>
            <Image className='size-5' />
            <input ref={ref} type='file' accept='image/*' hidden />
          </button>
        </div>
        <div>
          <p className='text-2xl font-medium'>John Doe</p>
          <span className='text-[var(--primary-color)]'>Manager</span>
        </div>
      </div>
      <div className='space-y-5'>
        <Form {...form}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => <CustomInput field={field} label='Email' />}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => <CustomInput label='Name' field={field} />}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => <CustomInput label='Address' field={field} />}
          />
          <div className='flex w-full items-center gap-5'>
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <CustomInput className='flex-grow' label='New Password' type='password' field={field} />
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <CustomInput className='flex-grow' label='Confirm Password' type='password' field={field} />
              )}
            />
          </div>
          <div className='!mt-9 flex items-center justify-end gap-5'>
            <Button className='h-auto bg-transparent px-12 py-3 text-base text-white underline transition-all hover:bg-transparent hover:text-[var(--primary-color)]'>
              Discard Changes
            </Button>
            <Button className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-black transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'>
              Save Changes
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

const permissions = [
  {
    label: 'Dashboard',
    key: 'dashboard'
  },
  {
    label: 'Reports',
    key: 'reports'
  },
  {
    label: 'Inventory',
    key: 'inventory'
  },
  {
    label: 'Orders',
    key: 'orders'
  },
  {
    label: 'Customers',
    key: 'customers'
  },
  {
    label: 'Settings',
    key: 'settings'
  }
]

function ManageAccess() {
  return (
    <div>
      <div className='border-b border-b-slate-500'>
        <div className='flex items-start gap-8'>
          <div>
            <h3 className='text-xl font-medium'>LOUIS</h3>
            <span className='text-[var(--primary-color)]'>louis@gmail.com</span>
          </div>
          <span className='inline-block rounded-sm bg-[var(--primary-color)] px-5 py-1 text-black'>Admin</span>
        </div>
        <ul className='my-8 flex flex-wrap items-center gap-10'>
          {permissions.map(({ key, label }) => (
            <li className='flex flex-grow flex-col justify-center gap-4' key={key}>
              <span>{label}</span>
              <Switch
                checked
                disabled
                className='data-[state=checked]:bg-[var(--primary-color)] data-[state=unchecked]:bg-[#3D4142]'
              />
            </li>
          ))}
        </ul>
      </div>
      <div className='border-b border-b-slate-500'>
        <div className='mt-6 flex items-start gap-8'>
          <div>
            <h3 className='text-xl font-medium'>Le Vu</h3>
            <span className='text-[var(--primary-color)]'>levu@gmail.com</span>
          </div>
          <span className='inline-block rounded-sm bg-[var(--primary-color)] px-5 py-1 text-black'>Admin</span>
        </div>
        <ul className='my-8 flex flex-wrap items-center gap-10'>
          {permissions.map(({ key, label }) => (
            <li className='flex flex-grow flex-col justify-center gap-4' key={key}>
              <span>{label}</span>
              <Switch className='data-[state=checked]:bg-[var(--primary-color)] data-[state=unchecked]:bg-[#3D4142]' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ActionTabs
