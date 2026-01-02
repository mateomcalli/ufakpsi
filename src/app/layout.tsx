import "./globals.css"
import { Libre_Baskerville, Crimson_Pro } from 'next/font/google'
import Navbar from "../components/homepage/navbar/Navbar";
import BreakpointIndicator from '../components/dev/BreakpointIndicator'

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
      <body className="bg-cream w-screen h-screen relative">
        <BreakpointIndicator/>
        <Navbar/>
        <main>{children}</main>
      </body>
    </html>
  )
}

export default Layout