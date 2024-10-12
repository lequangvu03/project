import Order from '~/components/order'
import { orders } from '~/data/orders'
import { foods } from '~/data/foods'
import { kitchens } from '~/data/kitchens'
import Food from '~/components/food'
import Kitchen from '~/components/kitchen'

export default function Page() {
  return (
    <main className=''>
      <aside className='flex gap-4'>
        <section className='flex flex-[0.7] flex-col gap-4'>
          <div className='grid grid-cols-4 gap-3'>
            {foods.map(function (food, index: number) {
              return <Food amount={food.amount} key={index} icon={food.icon} name={food.name} />
            })}
          </div>
          <div className='h-[1px] bg-slate-500 leading-[0px]' />
          <div className='grid grid-cols-4 gap-3'>
            {kitchens.map(function (kitchen, index: number) {
              return (
                <Kitchen
                  amount={kitchen.amount}
                  key={index}
                  path={kitchen.path}
                  price={kitchen.price}
                  title={kitchen.title}
                />
              )
            })}
          </div>
        </section>
        <div className='flex flex-[0.3] flex-col gap-4 rounded-xl bg-[#292C2D] p-4'>
          <header className='flex items-start justify-between'>
            <section className='flex flex-col text-gray-400'>
              <h2 className='text-[20px] font-medium'>Table 01</h2>
              <p className='text-[12px]'>Le Quang Vu</p>
            </section>
            <section>
              <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M3.66406 15.7736V17.8755C3.66406 17.9971 3.71235 18.1136 3.79831 18.1996C3.88426 18.2856 4.00084 18.3338 4.1224 18.3338H6.2289C6.35022 18.3338 6.46658 18.2857 6.55248 18.2L15.2131 9.53935L12.4631 6.78935L3.79881 15.45C3.7128 15.5358 3.66433 15.6521 3.66406 15.7736ZM13.598 5.6536L16.348 8.4036L17.6863 7.06526C17.8582 6.89336 17.9547 6.66025 17.9547 6.41718C17.9547 6.17411 17.8582 5.941 17.6863 5.7691L16.2334 4.31526C16.0615 4.14341 15.8284 4.04687 15.5853 4.04688C15.3422 4.04687 15.1091 4.14341 14.9372 4.31526L13.598 5.6536Z'
                  fill='white'
                />
              </svg>
            </section>
          </header>

          <aside className='h-[400px]'></aside>
          <footer className='flex items-center justify-between bg-[#3D4142] p-4'>
            <section></section>
            <section></section>
            <button className='flex items-center justify-center bg-slate-700 text-center text-gray-300'>
              Send To Token
            </button>
          </footer>
        </div>
      </aside>
    </main>
  )
}
