import React from "react";
import { Libre_Baskerville, Crimson_Pro } from 'next/font/google'
import "./globals.css"
import Navbar from "../components/Navbar";

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-libre',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
})

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: 'Professional business fraternity at the University of Florida',
  icons: {
    icon: '/akp_emblem.png',
  },
}

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html className={`${libreBaskerville.variable} ${crimsonPro.variable}`} lang='en'>
      <body className="bg-cream w-screen h-screen relative">
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default Layout