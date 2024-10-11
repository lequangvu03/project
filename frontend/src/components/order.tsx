'use client'
import { cn } from '~/lib/utils'
import { Button } from './ui/button'

export default function Order() {
  return (
    <div className={'gap-4 rounded-xl bg-[#292C2D] p-4 shadow-sm'}>
      <section className={''}>
        <div className=''>
          <div className=''></div>
          <div></div>
        </div>
        <div className=''>
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
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </footer>
      </section>
    </div>
  )
}
