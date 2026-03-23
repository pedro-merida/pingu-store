import "./globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pingu Store',
  description: 'Pingu Store, el catálogo definitivo de skins para usar en el servidor THNO La Maldad.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar></Navbar>
        <main className="pt-20">
          {children}
        </main>
        <Footer></Footer>
        <Analytics />
      </body>
    </html>
  )
}
