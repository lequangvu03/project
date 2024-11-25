import dynamic from 'next/dynamic'
import CustomSheet from '~/components/custom-sheet'
import { Button } from '~/components/ui/button'
import { Skeleton } from '~/components/ui/skeleton'

const TableDishes = dynamic(() => import('./data-table'), {
  ssr: false
})

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
  return (
    <main className='flex flex-col gap-4'>
      <div className='h-[1px] w-full bg-slate-700 leading-[0px]' />
      <section className='flex items-center justify-between'>
        <h2 className='text-[20px] font-semibold text-white'>Categories</h2>
        <CustomSheet title='Add new category' render={<span>test</span>}>
          <Button className='bg-[#EA7C69]'>Add new category</Button>
        </CustomSheet>
      </section>

      <Categories />
      <h2 className='mt-4 text-[20px] font-medium text-white'>Special menu all items</h2>
      <section className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1'>
            <Button className='bg-[#EA7C69] text-white'>Normal menu</Button>
            <Button className='bg-transparent text-white'>Special deals</Button>
            <Button className='bg-transparent text-white'>New year special</Button>
            <Button className='bg-transparent text-white'>Deserts and drinks</Button>
          </div>

          <Button className='bg-[#EA7C69] text-white'>Add new menu item</Button>
        </div>

        <TableDishes />
        {/* <TableDishes /> */}
      </section>
    </main>
  )
}
