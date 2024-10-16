'use client'

import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

function ButtonLogout({ className, children }: Props) {
  const handleLogout = () => {
    signOut({
      redirect: true
    })
  }
  return (
    <div role='button' onClick={handleLogout} className={className}>
      {children}
    </div>
  )
}

export default ButtonLogout
