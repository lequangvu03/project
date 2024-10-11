import React, { ReactNode } from 'react'
import MainLayout from '~/layouts/MainLayout'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>
}

export default Layout
