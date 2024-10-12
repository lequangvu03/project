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
      <main className='flex flex-1 flex-col gap-4 p-4'>
        <Header />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
