/* eslint-disable no-unused-vars */
'use client'

import { Check, Image, LogOut, Settings, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import ButtonLogout from '~/components/button-logout'
import CustomInput from '~/components/custom-input'
import Loading from '~/components/loading'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion'
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
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Form, FormField } from '~/components/ui/form'
import { Switch } from '~/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { PermissionType, RoleType } from '~/definitions/constant/types.constant'
import { TProfile } from '~/definitions/types'
import {
  useAddEmployeeAccount,
  useGetMyProfileQuery,
  useGetProfilesQuery,
  useUpdateEmployeeAccountMutation,
  useUpdateMyProfileMutation
} from '~/hooks/data/profiles.data'
import useQueryParams from '~/hooks/useQueryParams'
import { cn } from '~/lib/utils'
import useAuthStore from '~/stores/auth.store'

enum Tab {
  Profile = 'PROFILE',
  Access = 'ACCESS'
}

function ActionTabs() {
  const searchParams = useQueryParams()
  const router = useRouter()
  const { tab = Tab.Profile } = searchParams
  const authStore = useAuthStore()
  const addEmployeeAccount = useAddEmployeeAccount()
  const form = useForm<{ name: string; email: string; role?: RoleType; password: string; confirmPassword: string }>({
    defaultValues: {
      name: '',
      email: '',
      role: RoleType.Employee,
      password: '',
      confirmPassword: ''
    }
  })

  const tabs = useMemo(() => {
    const _tabs = [
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

    return authStore.permissions.includes(PermissionType.Settings) ? _tabs : [_tabs[0]]
  }, [authStore])

  const handleActiveTab = (tab: Tab) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', tab)
    router.push(`?${params.toString()}`)
  }

  const handleAddEmployeeAccount = form.handleSubmit(async (body) => {
    try {
      const response = await addEmployeeAccount.mutateAsync(body)
      toast(response?.message)
      form.reset()
    } catch (_) {
      toast('Failed to add employee account')
    }
  })

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
            <h3 className='mb-6 w-full text-left text-2xl font-medium'>New employee account</h3>
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
                <Button
                  disabled={!form.formState.isDirty}
                  onClick={handleAddEmployeeAccount}
                  className='h-auto w-full bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                >
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
  const authStore = useAuthStore()
  const form = useForm<{ name?: string; email?: string; image?: File | null }>({
    defaultValues: {
      name: '',
      email: '',
      image: null
    }
  })
  const updateMyProfileMutation = useUpdateMyProfileMutation()
  const [preview, setPreview] = useState<string | null>(null)
  const myProfileQuery = useGetMyProfileQuery()
  const profile = myProfileQuery.data?.result
  const avatar = form.watch('image')

  useEffect(() => {
    if (profile) {
      const profile = myProfileQuery.data?.result
      form.setValue('name', profile?.name)
      form.setValue('email', profile?.email)
    }
  }, [profile])

  const openFileDialog = () => {
    ref.current?.click()
  }

  useEffect(() => {
    if (avatar instanceof File) {
      const url = URL.createObjectURL(avatar)
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [avatar])

  const handleUpdateProfile = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData()
      formData.append('image', data?.image || '')
      formData.append('name', data?.name || '')
      formData.append('email', data?.email || '')
      const response = await updateMyProfileMutation.mutateAsync(formData)
      toast(response?.message)
    } catch (_) {
      toast('Failed to update profile')
    }
  })

  const discardChanges = () => {
    const profile = myProfileQuery.data?.result
    if (profile) {
      setPreview(null)

      form.reset({
        name: profile?.name,
        email: profile?.email,
        image: null
      })
    }
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
            <AvatarImage src={preview || authStore.avatar} alt='avatar' />
            <AvatarFallback className='uppercase text-black'>{profile?.email?.[0]}</AvatarFallback>
          </Avatar>
          <button className='absolute bottom-0 right-5 z-10'>
            <Image className='size-5' />
            <input
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  form.setValue('image', file, {
                    shouldDirty: true
                  })
                }
              }}
              ref={ref}
              type='file'
              accept='image/*'
              hidden
            />
          </button>
        </div>
        <div>
          <p className='text-2xl font-medium'>{profile?.name || profile?.email}</p>
          <span className='text-white'>
            {profile?.role === RoleType.Admin && 'Admin'}
            {profile?.role === RoleType.Employee && 'Employee'}
          </span>
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

          <div className='!mt-9 flex items-center justify-end gap-5'>
            <AlertDialog>
              <AlertDialogTrigger asChild className='cursor-pointer hover:opacity-60 active:opacity-60'>
                <Button
                  disabled={!form.formState.isDirty}
                  className='h-auto bg-transparent px-12 py-3 text-base text-white underline transition-all hover:bg-transparent hover:text-[var(--primary-color)]'
                >
                  Discard Changes
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className='bg-[var(--secondary-color)]'>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={discardChanges}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button
              disabled={!form.formState.isDirty}
              onClick={handleUpdateProfile}
              className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
            >
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
    key: PermissionType.Dashboard
  },
  {
    label: 'Staff',
    key: PermissionType.Staff
  },
  {
    label: 'Inventory',
    key: PermissionType.Inventory
  },
  {
    label: 'Order',
    key: PermissionType.Order
  },
  {
    label: 'Menu',
    key: PermissionType.Menu
  },
  {
    label: 'Settings',
    key: PermissionType.Settings
  }
]

function ManageAccess() {
  const getProfilesQuery = useGetProfilesQuery()

  const profiles = useMemo(() => {
    const sortedProfiles = (getProfilesQuery.data?.result?.users as TProfile[])?.sort((p1, p2) => p1?.role - p2?.role)
    return sortedProfiles ? sortedProfiles : []
  }, [getProfilesQuery.data])

  return (
    <section>
      {getProfilesQuery.isPending ? (
        <div className='flex h-full w-full items-center justify-center'>
          <Loading />
        </div>
      ) : (
        (profiles as TProfile[]).map((profile) => {
          return <AccountProfile profile={profile} key={profile._id} />
        })
      )}
    </section>
  )
}

function AccountProfile({ profile }: { profile: TProfile }) {
  const [preview, setPreview] = useState<string | null>(null)
  const authStore = useAuthStore()
  const updateProfileAccountMutation = useUpdateEmployeeAccountMutation()
  const form = useForm<{
    name: string
    email: string
    image: File | null
    permissions: PermissionType[]
  }>({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      image: null,
      permissions: profile.permissions || []
    }
  })
  const image = form.watch('image')
  const ref = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image)
      setPreview(url)

      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [image])

  const openFileDialog = () => {
    ref.current?.click()
  }

  const discardChanges = () => {
    if (profile) {
      setPreview(null)

      form.reset({
        name: profile?.name || '',
        email: profile?.email,
        image: null,
        permissions: profile.permissions
      })
    }
  }

  const onChangePermissions = (permission: PermissionType, value: boolean) => {
    let newPermissions: PermissionType[] = form.getValues('permissions') || []

    if (value) {
      newPermissions.push(permission)
    } else {
      newPermissions = newPermissions.filter((p) => p !== permission)
    }

    form.setValue('permissions', [...new Set(newPermissions)], {
      shouldDirty: true
    })
  }

  const handleUpdateProfile = form.handleSubmit(async (data) => {
    try {
      const formData = new FormData()
      formData.append('image', data.image as any)
      formData.append('email', data.email)
      formData.append('name', data.name)
      formData.append('permissions', JSON.stringify(data.permissions))
      const response = await updateProfileAccountMutation.mutateAsync({
        id: profile?._id,
        body: formData
      })

      if (response?.result) {
        const updatedProfile = response?.result as TProfile
        form.reset({
          name: updatedProfile?.name || '',
          email: updatedProfile?.email,
          image: null,
          permissions: updatedProfile?.permissions
        })
      }
      toast(response?.message)
    } catch (_) {
      console.log('Failed to update profile')
    }
  })

  return (
    <Accordion key={profile?._id} type='single' collapsible className='w-full'>
      <AccordionItem value={profile?._id}>
        <AccordionTrigger>
          <div className='flex-1'>
            <div className='flex items-center justify-between gap-8'>
              <div className='flex items-center gap-x-4'>
                <Avatar className='relative h-[80px] w-[80px]'>
                  <AvatarImage src={profile?.avatar_url} alt='avatar' />
                  <AvatarFallback className='uppercase text-black'>
                    {(profile?.name || (profile?.email as string))[0]}
                  </AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-start justify-center'>
                  <h3 className='text-xl font-medium'>{profile?.name}</h3>
                  <span className='text-[var(--primary-color)]'>{profile?.email}</span>
                </div>
                {profile?.email === authStore.email && <Check className='h-10 w-10 text-green-500' />}
              </div>
              <span className='align-end mr-4 flex items-center justify-end rounded-sm bg-[var(--primary-color)] px-5 py-1 text-white'>
                {profile?.role === RoleType.Admin ? 'Admin' : 'Employee'}
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent asChild>
          <div>
            <ul className='my-8 flex flex-wrap items-center gap-10'>
              {permissions.map(({ key, label }) => (
                <li className='flex flex-grow flex-col justify-center gap-4' key={key}>
                  <span>{label}</span>
                  <Switch
                    checked={(form.watch('permissions') || []).includes(key)}
                    onCheckedChange={(e) => onChangePermissions(key, e)}
                    defaultChecked={profile?.permissions?.includes(key)}
                    disabled={profile?.role === RoleType.Admin}
                    className='data-[state=checked]:bg-[var(--primary-color)] data-[state=unchecked]:bg-[#3D4142]'
                  />
                </li>
              ))}
            </ul>
            <div className='flex items-start gap-8'>
              <div
                className='relative mt-8 h-fit w-fit rounded-full transition-all hover:opacity-85'
                onClick={openFileDialog}
              >
                <Avatar className='relative h-[120px] w-[120px]'>
                  <AvatarImage src={preview || profile?.avatar_url} alt='avatar' />
                  <AvatarFallback className='uppercase text-black'>{profile?.email?.[0]}</AvatarFallback>
                </Avatar>
                <button className='absolute bottom-0 right-5 z-10'>
                  <Image className='size-5' />
                  <input
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        form.setValue('image', file, {
                          shouldDirty: true
                        })
                      }
                    }}
                    ref={ref}
                    type='file'
                    accept='image/*'
                    hidden
                  />
                </button>
              </div>
              <div className='w-full space-y-5'>
                <Form {...form}>
                  <FormField
                    disabled={profile?.role === RoleType.Admin}
                    control={form.control}
                    name='email'
                    render={({ field }) => <CustomInput field={field} label='Email' />}
                  />
                  <FormField
                    disabled={profile?.role === RoleType.Admin}
                    control={form.control}
                    name='name'
                    render={({ field }) => <CustomInput label='Name' field={field} />}
                  />

                  {profile.role !== RoleType.Admin && (
                    <div className='!mt-9 flex items-center justify-end gap-5'>
                      <AlertDialog>
                        <AlertDialogTrigger asChild className='cursor-pointer hover:opacity-60 active:opacity-60'>
                          <Button
                            disabled={!form.formState.isDirty}
                            className='h-auto bg-transparent px-12 py-3 text-base text-white underline transition-all hover:bg-transparent hover:text-[var(--primary-color)]'
                          >
                            Discard Changes
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className='bg-[var(--secondary-color)]'>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => discardChanges()}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <Button
                        disabled={!form.formState.isDirty || updateProfileAccountMutation.isPending}
                        onClick={handleUpdateProfile}
                        className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                      >
                        Save Changes
                      </Button>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
export default ActionTabs
