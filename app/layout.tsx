import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { QueryProvider } from '@/components/query-provider'
import { sileo, Toaster } from "sileo";
import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' })

export const metadata: Metadata = {
  title: 'PriceScan - Find the Lowest Prices Anywhere',
  description: 'Search any product and compare prices across multiple online stores. Find the best deals on electronics, furniture, clothing, and more.',
}

export const viewport: Viewport = {
  themeColor: '#2f9e6e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_spaceGrotesk.variable} font-sans antialiased`}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
