import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Header() {
  return (
    <header className='sticky top-6 z-10 flex h-[100px] items-center justify-between rounded-2xl bg-[var(--secondary-color)] px-4 shadow-sm shadow-white/20'>
      <section className='flex flex-col'>
        <h2 className='text-[26px] font-semibold leading-8 text-gray-200'>Reservation</h2>
        <h4 className='text-[13px] font-medium leading-7 text-gray-500'>Friday, 1 Nov 2024</h4>
      </section>

      <section className='flex items-center gap-[2px]'>
        <Link
          href='/admin/profile'
          className='flex items-center justify-between gap-1 rounded-full bg-slate-600 px-4 py-2'
        >
          <Avatar className='h-10 w-10'>
            <AvatarImage className='h-full w-full' src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>Nguyen Duy Khanh</AvatarFallback>
          </Avatar>
          <div className='gap flex flex-col'>
            <h2 className='text-[16px] font-semibold text-gray-400'>Nguyen Duy Khanh</h2>
            <p className='text-[12px] font-normal text-gray-400'>Blockchain Engineer</p>
          </div>
        </Link>
      </section>
    </header>
  )
}
