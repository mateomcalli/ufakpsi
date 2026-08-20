import HomeContent from "./HomeContent"

export const metadata = {
  metadataBase: new URL('https://ufakpsi.com'),
  title: 'UF Alpha Kappa Psi | Professional Business Fraternity',
  description: 'The official website for the Alpha Phi chapter of Alpha Kappa Psi at the University of Florida (UF AKPsi). Established in 1926, we are the oldest and largest professional co-ed business fraternity in Gainesville, FL, developing principled business leaders.',
  keywords: ['Alpha Kappa Psi', 'UF', 'University of Florida', 'AKPsi', 'business fraternity', 'professional fraternity', 'Gainesville', 'Alpha Phi chapter', 'co-ed fraternity', 'UF AKPsi'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'UF Alpha Kappa Psi - Alpha Phi',
    description: 'Alpha Kappa Psi at the University of Florida is a professional business fraternity devoted to developing principled business leaders across all majors.',
    url: 'https://ufakpsi.com',
    siteName: 'UF Alpha Kappa Psi',
    images: ['/mem_spr_2026.JPG'],
    type: 'website',
  },
  icons: {
    icon: '/akp_emblem.png',
  },
};

const Home = () => {
  return (
    <HomeContent/>
  )
}

export default Home