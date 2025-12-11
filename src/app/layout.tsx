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

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html className={`${libreBaskerville.variable} ${crimsonPro.variable}`} lang='en'>
      <head>
        <title>Alpha Kappa Psi</title>
        <link rel='icon' type="image/x-icon" href='akp_emblem.png'/>
      </head>
      <body className="bg-cream w-screen h-screen">
        <Navbar/>
        {children}
      </body>
    </html>
  )
}

export default Layout