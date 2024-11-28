import React, { Suspense } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  return <Suspense>{children}</Suspense>
}
