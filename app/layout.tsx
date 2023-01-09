import './globals.css'
import Link from 'next/link'
import { CommandLineIcon } from '@heroicons/react/24/outline'
import { Inter } from '@next/font/google'
import { Poppins } from '@next/font/google'
import { Suspense } from 'react'
import Loading from './loading'


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})


const poppins = Poppins({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-poppins',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" className={`${inter.variable} font-serif ${poppins.variable} font-sans`}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-white dark:bg-dark">
            {children}
        </body>
    </html>
  )
}
