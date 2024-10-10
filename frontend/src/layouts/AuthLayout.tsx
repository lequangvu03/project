import { ReactNode } from 'react'
import '../app/globals.css'

type Props = {
  children: ReactNode
}

function AuthLayout({ children }: Props) {
  return <div className='flex min-h-screen w-full items-center justify-center px-6'>{children}</div>
}

export default AuthLayout
