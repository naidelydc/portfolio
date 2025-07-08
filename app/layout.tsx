import type { Metadata } from 'next'
import './globals.css'


import { VT323 } from 'next/font/google'

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
})


export const metadata: Metadata = {
  title: 'Naidelys Portfolio',
  description: ' ',
  generator: ' ',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={vt323.variable}>
      <body>{children}</body>
    </html>
  )
}
