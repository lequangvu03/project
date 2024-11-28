'use client'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import CustomInput from '~/components/custom-input'
import CustomSheet from '~/components/custom-sheet'
import { Button } from '~/components/ui/button'
import { Form, FormField } from '~/components/ui/form'
import { Skeleton } from '~/components/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { TagType } from '~/definitions/constant/types.constant'
import useQueryParams from '~/hooks/useQueryParams'
import TableDishes from './data-table'
import { useAddCategoryMutation } from '~/hooks/data/categories.data'
import { toast } from 'sonner'

const Categories = dynamic(() => import('~/components/categories'), {
  loading: () => (
    <div className='flex gap-4'>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className='h-32 min-w-32 bg-[var(--secondary-color)]' />
        ))}
    </div>
  ),
  ssr: false
})

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { tag } = useQueryParams()
  const addCategoryMutation = useAddCategoryMutation()
  const form = useForm<{ name: string; description: string }>({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const handleActiveTag = (_tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tag', _tag)
    router.push(`/admin/menu/?${params.toString()}`)
  }

  const handleAddCategory = form.handleSubmit(async (data) => {
    try {
      const response = await addCategoryMutation.mutateAsync(data)
      toast(response?.message)
      form.reset()
    } catch (error: any) {
      console.log(error?.response?.m)
    }
  })

  return (
    <main className='flex flex-col gap-4'>
      <div className='h-[1px] w-full bg-slate-700 leading-[0px]' />
      <section className='flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>Categories</h2>
        <CustomSheet
          isConfirmationRequired={form.formState.isDirty}
          title='New category'
          render={
            <div className='h-full space-y-5 py-9'>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => <CustomInput required field={field} label='Name' />}
                />

                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => <CustomInput label='Description' field={field} />}
                />
                <div className='!mt-9 flex items-center justify-end gap-5'>
                  <Button
                    onClick={handleAddCategory}
                    className='h-auto bg-[var(--primary-color)] px-12 py-3 text-base text-white transition-all hover:bg-[var(--primary-color)] hover:shadow-md hover:shadow-[var(--primary-color)]'
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </div>
          }
        >
          <Button className='bg-[#EA7C69] text-white transition-all hover:bg-[#EA7C69] hover:opacity-90'>
            New category
          </Button>
        </CustomSheet>
      </section>
      <Categories />
      <h2 className='mt-4 text-[20px] font-medium text-white'>Special menu all items</h2>
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Tabs value={tag || 'ALL'} onValueChange={handleActiveTag}>
              <TabsList className='h-auto bg-[var(--secondary-color)] p-2 text-2xl'>
                <TabsTrigger className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]' value='ALL'>
                  All
                </TabsTrigger>
                <TabsTrigger
                  className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]'
                  value={`${TagType.Nomarl}`}
                >
                  Normal menu
                </TabsTrigger>
                <TabsTrigger
                  className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]'
                  value={`${TagType.Special}`}
                >
                  Special deals
                </TabsTrigger>
                <TabsTrigger
                  className='h-auto px-5 py-2 data-[state=active]:bg-[var(--primary-color)]'
                  value={`${TagType.New}`}
                >
                  NEW
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <CustomSheet isConfirmationRequired title='New category' render={<span>test</span>}>
            <Button className='bg-[#EA7C69] text-white transition-all hover:bg-[#EA7C69] hover:opacity-90'>
              New item
            </Button>
          </CustomSheet>
        </div>
        <TableDishes />
      </section>
    </main>
  )
}
