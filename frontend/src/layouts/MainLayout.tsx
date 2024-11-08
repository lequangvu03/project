import React, { ReactNode } from 'react'
import Header from '~/components/header'
import Sidebar from '~/components/sidebar'

type Props = {
  children: ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div className='flex gap-10'>
      <Sidebar />

      <main className='flex w-full flex-col gap-10'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
