'use client'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'

export default function Table() {
  return (
    <div className='flex flex-col gap-4 rounded-xl bg-[#292C2D] p-4 shadow-sm'>
      <section className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center rounded bg-[#EA7C69] p-4'>01</div>
          <div className='flex flex-col'>
            <h2 className='text-[16px] font-medium leading-6 text-gray-300'>Watson Joyce</h2>
            <p className='text-[12px] font-light leading-5 text-gray-500'>Order # 990</p>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-end gap-2'>
            <div className='flex items-center gap-1 rounded bg-[#E3FFE4] p-1'>
              <svg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10 3.18359L4.5 8.68359L2 6.18359'
                  stroke='black'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
              <h3 className='text-[12px] font-light leading-4 text-gray-50'>Ready</h3>
            </div>
            <div className='flex items-center gap-1 text-[12px] font-light leading-[16px]'>
              <svg width='6' height='7' viewBox='0 0 6 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='3' cy='3.18359' r='3' fill='#37D101' />
              </svg>
              <p>Ready to serve</p>
              <svg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M3.25 4.875L6.5 8.125L9.75 4.875'
                  stroke='white'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                />
              </svg>
            </div>
          </div>
        </div>
      </section>
      <section className='flex items-center justify-between'>
        <h4 className='text-[16px] font-light leading-8 text-white'>Wednesday, 28, 2024</h4>
        <p className='text-[16px] font-light leading-8 text-white'>4 : 48 PM</p>
      </section>
      <section className='h-[1px] w-full bg-slate-600' />
      <section className='flex flex-col gap-4'>
        <header className='flex items-center justify-between gap-3 text-[16px] font-light leading-[24px] text-gray-700'>
          <h2>Qty</h2>
          <h2 className='flex-1'>Items</h2>
          <h2>Price</h2>
        </header>
        <aside className='flex items-center justify-between gap-3 text-[16px] font-light leading-[24px] text-gray-50'>
          <h2>01</h2>
          <h2 className='flex-1'>Scrambled eggs with toast</h2>
          <h2>$199</h2>
        </aside>
        <aside className='flex items-center justify-between gap-3 text-[16px] font-light leading-[24px] text-gray-50'>
          <h2>01</h2>
          <h2 className='flex-1'>Scrambled eggs with toast</h2>
          <h2>$199</h2>
        </aside>
        <aside className='flex items-center justify-between gap-3 text-[16px] font-light leading-[24px] text-gray-50'>
          <h2>01</h2>
          <h2 className='flex-1'>Scrambled eggs with toast</h2>
          <h2>$199</h2>
        </aside>
        <aside className='flex items-center justify-between gap-3 text-[16px] font-light leading-[24px] text-gray-50'>
          <h2>01</h2>
          <h2 className='flex-1'>Scrambled eggs with toast</h2>
          <h2>$199</h2>
        </aside>
      </section>
      <section className='h-[1px] w-full bg-slate-600' />
      <section className='flex items-center justify-between'>
        <div className='text-[16px] font-light leading-[24px] text-white'>Subtotal</div>
        <h2 className='text-[16px] font-light leading-[24px] text-white'>$649</h2>
      </section>
      <section className='flex items-center gap-1'>
        <Button className='w-full flex-[0.25]'>
          <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M3.5 17.4321V21.1821H7.25L18.31 10.1221L14.56 6.37213L3.5 17.4321ZM21.21 7.22213C21.3027 7.12962 21.3762 7.01973 21.4264 6.89876C21.4766 6.77778 21.5024 6.6481 21.5024 6.51713C21.5024 6.38616 21.4766 6.25648 21.4264 6.13551C21.3762 6.01453 21.3027 5.90465 21.21 5.81213L18.87 3.47213C18.7775 3.37943 18.6676 3.30588 18.5466 3.2557C18.4257 3.20552 18.296 3.17969 18.165 3.17969C18.034 3.17969 17.9043 3.20552 17.7834 3.2557C17.6624 3.30588 17.5525 3.37943 17.46 3.47213L15.63 5.30213L19.38 9.05213L21.21 7.22213Z'
              fill='#EA7C69'
            />
          </svg>
        </Button>
        <Button className='w-full flex-[0.25]'>
          <svg width='25' height='25' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M10.5 5.18359H14.5C14.5 4.65316 14.2893 4.14445 13.9142 3.76938C13.5391 3.39431 13.0304 3.18359 12.5 3.18359C11.9696 3.18359 11.4609 3.39431 11.0858 3.76938C10.7107 4.14445 10.5 4.65316 10.5 5.18359ZM9 5.18359C9 4.72397 9.09053 4.26884 9.26642 3.8442C9.44231 3.41956 9.70012 3.03373 10.0251 2.70872C10.3501 2.38372 10.736 2.12591 11.1606 1.95002C11.5852 1.77412 12.0404 1.68359 12.5 1.68359C12.9596 1.68359 13.4148 1.77412 13.8394 1.95002C14.264 2.12591 14.6499 2.38372 14.9749 2.70872C15.2999 3.03373 15.5577 3.41956 15.7336 3.8442C15.9095 4.26884 16 4.72397 16 5.18359H21.75C21.9489 5.18359 22.1397 5.26261 22.2803 5.40326C22.421 5.54392 22.5 5.73468 22.5 5.93359C22.5 6.13251 22.421 6.32327 22.2803 6.46392C22.1397 6.60458 21.9489 6.68359 21.75 6.68359H20.43L19.26 18.7946C19.1702 19.7226 18.738 20.5838 18.0477 21.2104C17.3573 21.837 16.4583 22.1839 15.526 22.1836H9.474C8.54186 22.1837 7.6431 21.8366 6.95295 21.2101C6.2628 20.5835 5.83073 19.7224 5.741 18.7946L4.57 6.68359H3.25C3.05109 6.68359 2.86032 6.60458 2.71967 6.46392C2.57902 6.32327 2.5 6.13251 2.5 5.93359C2.5 5.73468 2.57902 5.54392 2.71967 5.40326C2.86032 5.26261 3.05109 5.18359 3.25 5.18359H9ZM11 9.93359C11 9.73468 10.921 9.54392 10.7803 9.40326C10.6397 9.26261 10.4489 9.18359 10.25 9.18359C10.0511 9.18359 9.86032 9.26261 9.71967 9.40326C9.57902 9.54392 9.5 9.73468 9.5 9.93359V17.4336C9.5 17.6325 9.57902 17.8233 9.71967 17.9639C9.86032 18.1046 10.0511 18.1836 10.25 18.1836C10.4489 18.1836 10.6397 18.1046 10.7803 17.9639C10.921 17.8233 11 17.6325 11 17.4336V9.93359ZM14.75 9.18359C14.5511 9.18359 14.3603 9.26261 14.2197 9.40326C14.079 9.54392 14 9.73468 14 9.93359V17.4336C14 17.6325 14.079 17.8233 14.2197 17.9639C14.3603 18.1046 14.5511 18.1836 14.75 18.1836C14.9489 18.1836 15.1397 18.1046 15.2803 17.9639C15.421 17.8233 15.5 17.6325 15.5 17.4336V9.93359C15.5 9.73468 15.421 9.54392 15.2803 9.40326C15.1397 9.26261 14.9489 9.18359 14.75 9.18359Z'
              fill='#EA7C69'
            />
          </svg>
        </Button>
        <Button className='w-full flex-1'>Pay Bill</Button>
      </section>
    </div>
  )
}
