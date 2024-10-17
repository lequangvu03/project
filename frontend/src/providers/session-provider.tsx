'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'
type Props = {
  children: ReactNode
}
function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
}

export default SessionProvider
