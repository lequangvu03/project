import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { ReactNode } from 'react'
import { Toaster } from '~/components/ui/sonner'
import QueryProvider from '~/providers/query-provider'
import SessionProvider from '~/providers/session-provider'
import { ThemeProvider } from '~/providers/theme-provider'
import './globals.scss'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

export const metadata: Metadata = {
  title: 'Restaurant',
  description: 'Restaurant'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <QueryProvider>
            <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
              {children}
              <Toaster position='top-center' />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
