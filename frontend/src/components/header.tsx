import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function Header() {
  return (
    <header className='flex h-[70px] items-center justify-between rounded-sm bg-[#1F1D2B] px-4'>
      <section className='flex flex-col'>
        <h2 className='text-[20px] font-semibold text-gray-200'>Reservation</h2>
        <h4 className='text-[12px] font-medium text-gray-500'>Friday, 1 Nov 2024</h4>
      </section>

      <section className='flex items-center gap-[2px]'>
        <div className='flex items-center justify-between gap-1 rounded-3xl bg-slate-600 px-2 py-1'>
          <Avatar className='h-9 w-9'>
            <AvatarImage className='h-full w-full' src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>Nguyen Duy Khanh</AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <h2 className='text-[14px] font-normal text-gray-400'>Nguyen Duy Khanh</h2>
            <p className='text-[10px] font-light text-gray-400'>Blockchain Engineer</p>
          </div>
        </div>
      </section>
    </header>
  )
}
