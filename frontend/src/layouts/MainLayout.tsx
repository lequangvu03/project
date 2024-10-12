import React, { ReactNode } from 'react'
import Sidebar from '~/components/sidebar'

type Props = {
  children: ReactNode
}

function MainLayout({ children }: Props) {
  return (
    <div className='flex'>
      <Sidebar />
      {children}
    </div>
  )
}

export default MainLayout
