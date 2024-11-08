import React, { ReactNode } from 'react'
import Header from '~/components/header'
import Sidebar from '~/components/sidebar'

type Props = {
  children: ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div className='flex'>
      <Sidebar />

      <main className='flex w-full flex-col gap-10 px-8'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
