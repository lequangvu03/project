import React, { ReactNode } from 'react'
import AuthLayout from '~/layouts/AuthLayout'

type Props = {
  children: ReactNode
}

function Layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>
}

export default Layout
