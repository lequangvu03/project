import React from 'react'
import Sidebar from '~/components/layouts/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'

const Dashboard = function () {
  return (
    <main className={cn('flex h-screen w-full bg-[#111315]')}>
      <Sidebar />
      <aside className={cn('flex-1 p-8')}>
        <header className={cn('flex h-[65px] w-full items-center justify-between rounded-md bg-[#292D2C] p-4')}>
          <section>
            <h2 className={cn('text-[20px] font-bold text-white')}>Dashboard</h2>
          </section>
          <section>
            <Popover>
              <PopoverTrigger asChild>
                <Button className={cn('flex h-14 items-center justify-center gap-2 rounded-full')}>
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>Nguyen Duy Khanh</AvatarFallback>
                  </Avatar>
                  <div className={cn('flex flex-col gap-[2px]')}>
                    <span className={cn('text-left text-[14px]')}>Nguyen Duy Khanh</span>
                    <span className={cn('text-left text-[10px] text-gray-400')}>Blockchain Engineer</span>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent align='end' className='w-80'>
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>Dimensions</h4>
                    <p className='text-sm text-muted-foreground'>Set the dimensions for the layer.</p>
                  </div>
                  <div className='grid gap-2'></div>
                </div>
              </PopoverContent>
            </Popover>
          </section>
        </header>

        <div className=''>
          
      </div>
      </aside>
    </main>
  )
}

export default Dashboard
