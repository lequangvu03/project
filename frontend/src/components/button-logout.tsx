'use client'

import { signOut } from 'next-auth/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

function ButtonLogout({ className, children }: Props) {
  return (
    <div
      role='button'
      onClick={() =>
        signOut({
          redirect: true
        })
      }
      className={className}
    >
      {children}
    </div>
  )
}

export default ButtonLogout
