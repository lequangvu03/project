'use client'
import { Button } from './ui/button'

export default function Table() {
  return (
    <div className={'gap-4 rounded-xl bg-[#292C2D] p-4 shadow-sm'}>
      <section className={''}>
        <div className=''>
          <div className=''></div>
          <div></div>
        </div>
        <div className='flex items-center justify-between'>
          <h3>Wenednesday, 28th 2024</h3>
          <h3>4:48 PM</h3>
        </div>
      </section>
      <div className={'h-[1px] w-full bg-slate-300'} />
      <section className={''}></section>
      <div className={'h-[1px] w-full bg-slate-300'} />
      <section className={'flex flex-col gap-4'}>
        <header className='flex items-center justify-between'>
          <h2 className='text-[16px] font-light leading-[24px] text-white'>SubTotal</h2>
          <p className='text-[16px] font-light leading-[24px] text-white'>$650</p>
        </header>
        <footer>
          <Button className='flex items-center justify-center border-[]'>
            <svg width='18' height='18' viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M3.5 17.4321V21.1821H7.25L18.31 10.1221L14.56 6.37213L3.5 17.4321ZM21.21 7.22213C21.3027 7.12962 21.3762 7.01973 21.4264 6.89876C21.4766 6.77778 21.5024 6.6481 21.5024 6.51713C21.5024 6.38616 21.4766 6.25648 21.4264 6.13551C21.3762 6.01453 21.3027 5.90465 21.21 5.81213L18.87 3.47213C18.7775 3.37943 18.6676 3.30588 18.5466 3.2557C18.4257 3.20552 18.296 3.17969 18.165 3.17969C18.034 3.17969 17.9043 3.20552 17.7834 3.2557C17.6624 3.30588 17.5525 3.37943 17.46 3.47213L15.63 5.30213L19.38 9.05213L21.21 7.22213Z'
                fill='#EA7C69'
              />
            </svg>
          </Button>
          <Button></Button>
          <Button></Button>
        </footer>
      </section>
    </div>
  )
}
