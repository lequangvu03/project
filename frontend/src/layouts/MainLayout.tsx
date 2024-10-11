import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

function MainLayout({ children }: Props) {
  return <div>{children}</div>
}

export default MainLayout
