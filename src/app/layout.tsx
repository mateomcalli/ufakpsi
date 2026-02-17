import "./globals.css"
import { Libre_Baskerville, Crimson_Pro, Nothing_You_Could_Do } from 'next/font/google'
import Navbar from "../components/navbar-footer/Navbar";
import BreakpointIndicator from "../components/dev/BreakpointIndicator";
import Footer from "../components/navbar-footer/Footer";

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

const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: ['400'], 
  variable: '--font-hand',
})

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {

  return (
    <html className={`${libreBaskerville.variable} ${crimsonPro.variable} ${nothingYouCouldDo.variable}`} lang='en'>
      <body className="bg-cream overflow-x-hidden">
        <BreakpointIndicator/>
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}

export default Layout