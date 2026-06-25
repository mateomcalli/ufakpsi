import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Libre_Baskerville, Merriweather, Crimson_Pro, Nothing_You_Could_Do, IBM_Plex_Sans } from 'next/font/google'
import Navbar from "../components/navbar-footer/Navbar";
import BreakpointIndicator from "../components/dev/BreakpointIndicator";
import Footer from "../components/navbar-footer/Footer";

const libreBaskerville = Libre_Baskerville({ // headers
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-libre',
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-merry',
})

const crimsonPro = Crimson_Pro({ // subheaders
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson',
})

const ibmPlexSans = IBM_Plex_Sans({ // sans
  subsets: ['latin'],
  weight: ['400'], 
  variable: '--font-sans',
})


const nothingYouCouldDo = Nothing_You_Could_Do({
  subsets: ['latin'],
  weight: ['400'], 
  variable: '--font-hand',
})

const Layout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html className={`${libreBaskerville.variable} ${crimsonPro.variable} ${nothingYouCouldDo.variable} ${ibmPlexSans.variable} ${merriweather.variable}`} lang='en'>
      <body className="bg-cream overflow-x-hidden">
        {/* <BreakpointIndicator/> */}
        <Analytics />
        <SpeedInsights />
        <Navbar/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  )
}

export default Layout