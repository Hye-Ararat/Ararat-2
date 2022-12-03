import './globals.css'
import Link from 'next/link'
import Sidebar from '../components/Sidebar'
import { CommandLineIcon } from '@heroicons/react/24/outline'
import { Inter } from '@next/font/google'
import { Poppins } from '@next/font/google'

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

<nav class="p-3 border-gray-200 bg-gray-50 dark:bg-dark2 dark:border-gray-700 drop-shadow-lg">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <Link href="/" className="flex items-center">
        <img src="https://cloud.hye.gg/logo-square.png" class="h-6 mr-3 sm:h-10" alt="Hye Logo" />
        <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Ararat</span>
    </Link>
    <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
      <ul class="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
        <li>

        <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
    <span class="font-medium text-gray-600 dark:text-gray-300">JM</span>
</div>
        </li>
      </ul>
    </div>
  </div>
</nav>

        <div className="w-full flex h-screen">
          <Sidebar variant="branded" branding={{
            name: "Ararat",
            url: "/",
            logo: "https://cloud.hye.gg/logo-square.png"
          }} items={[
            {
              "name": "Instances",
              "url": "/instances",
              "icon": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            },
            {
              "name": "Nodes",
              "url": "/nodes",
              "icon": <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>
            },
            {
              name: "Users",
              url: "/users",
              icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            }
          ]} />
          <div className="flex-1 px-2 mt-3 ml-2">
            {children}
            <p className="text-center text-gray-600 mt-3">Copryight © 2022 Hye Hosting LLC.</p>
          </div>
        </div>
        </body>
    </html>
  )
}
