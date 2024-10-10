import React from 'react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { LogOut } from 'lucide-react'
type Props = {}

const Sidebar = function ({}: Props) {
  return (
    <nav
      className={cn(
        'bottom-0 left-0 top-0 flex h-full w-[100px] flex-col items-center justify-between gap-6 rounded-br-2xl rounded-tr-2xl bg-[#292D2C] py-4'
      )}
    >
      <Link href=''>T</Link>
      <aside className={cn('flex flex-1 flex-col gap-2')}>
        <Button className={cn('flex h-[60px] w-[70px] flex-col gap-1 bg-transparent hover:border hover:bg-[#EA7C69]')}>
          <LogOut width={20} height={20} />
          <span className={cn('text-[13px] font-medium')}>Log out</span>
        </Button>
        <Button className={cn('flex h-[60px] w-[70px] flex-col gap-1 bg-transparent hover:border hover:bg-[#EA7C69]')}>
          <LogOut width={20} height={20} />
          <span className={cn('text-[13px] font-medium')}>Log out</span>
        </Button>
        <Button className={cn('flex h-[60px] w-[70px] flex-col gap-1 bg-transparent hover:border hover:bg-[#EA7C69]')}>
          <LogOut width={20} height={20} />
          <span className={cn('text-[13px] font-medium')}>Log out</span>
        </Button>
        <Button className={cn('flex h-[60px] w-[70px] flex-col gap-1 bg-transparent hover:border hover:bg-[#EA7C69]')}>
          <LogOut width={20} height={20} />
          <span className={cn('text-[13px] font-medium')}>Log out</span>
        </Button>
        <Button className={cn('flex h-[60px] w-[70px] flex-col gap-1 bg-transparent hover:border hover:bg-[#EA7C69]')}>
          <LogOut width={20} height={20} />
          <span className={cn('text-[13px] font-medium')}>Log out</span>
        </Button>
      </aside>
      <Button className={cn('flex h-[60px] w-[70px] flex-col gap-1 bg-transparent hover:border hover:bg-[#EA7C69]')}>
        <LogOut width={20} height={20} />
        <span className={cn('text-[13px] font-medium')}>Log out</span>
      </Button>
    </nav>
  )
}

export default Sidebar
