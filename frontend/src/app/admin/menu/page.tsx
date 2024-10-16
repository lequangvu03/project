import { getServerSession } from 'next-auth'
import { publicPost } from '~/api/request'
import Food from '~/components/food'
import { Button } from '~/components/ui/button'
import { foods } from '~/data/foods'

export default async function MenuPage() {
  const session = await getServerSession()
  console.log({
    session
  })

  return (
    <main className='flex flex-col gap-4'>
      <div className='h-[1px] w-full bg-slate-700 leading-[0px]' />

      <section className='flex items-center justify-between'>
        <h2 className='text-[20px] text-white'>Categories</h2>

        <Button className='bg-[#EA7C69]'>Add new category</Button>
      </section>

      <section className='grid grid-cols-7 gap-4'>
        {foods.map(function (food, index: number) {
          return <Food amount={food.amount} key={index} icon={food.icon} name={food.name} />
        })}
      </section>

      <h2 className='mt-4 text-[20px] font-medium text-white'>Special menu all items</h2>

      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-1'>
          <Button className='bg-[#EA7C69] text-white'>Normal menu</Button>
          <Button className='bg-transparent text-white'>Special deals</Button>
          <Button className='bg-transparent text-white'>New year special</Button>
          <Button className='bg-transparent text-white'>Deserts and drinks</Button>
        </div>

        <Button className='bg-[#EA7C69] text-white'>Add new menu item</Button>
      </section>
    </main>
  )
}
