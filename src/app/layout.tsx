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

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://ufakpsi.com'),
  title: {
    default: 'UF Alpha Kappa Psi | Professional Business Fraternity',
    template: '%s | UF Alpha Kappa Psi',
  },
  description: 'The official website for the Alpha Phi chapter of Alpha Kappa Psi at the University of Florida. Established in 1926, we are the oldest professional co-ed business fraternity at UF, dedicated to developing principled business leaders.',
  keywords: ['Alpha Kappa Psi', 'UF', 'University of Florida', 'AKPsi', 'business fraternity', 'professional fraternity', 'Gainesville', 'Alpha Phi chapter', 'co-ed fraternity', 'UF AKPsi'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/akp_emblem.png',
  },
  openGraph: {
    title: 'UF Alpha Kappa Psi - Alpha Phi',
    description: 'Alpha Kappa Psi at the University of Florida is a professional business fraternity devoted to developing principled business leaders across all majors.',
    url: 'https://ufakpsi.com',
    siteName: 'UF Alpha Kappa Psi',
    images: [{ url: '/mem_spr_2026.JPG', width: 1200, height: 630, alt: 'UF Alpha Kappa Psi Brothers' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UF Alpha Kappa Psi | Professional Business Fraternity',
    description: 'Alpha Kappa Psi at the University of Florida is a professional business fraternity devoted to developing principled business leaders across all majors.',
    images: ['/mem_spr_2026.JPG'],
  },
}

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