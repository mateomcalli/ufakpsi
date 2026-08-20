import HomeContent from "./HomeContent"

export const metadata = {
  metadataBase: new URL('https://ufakpsi.com'),
  title: {
    absolute: 'UF Alpha Kappa Psi',
  },
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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'UF Alpha Kappa Psi - Alpha Phi Chapter',
  alternateName: ['UF AKPsi', 'AKPsi UF', 'Alpha Kappa Psi University of Florida', 'AKPsi Gainesville'],
  url: 'https://ufakpsi.com',
  logo: 'https://ufakpsi.com/akp_emblem.png',
  image: 'https://ufakpsi.com/mem_spr_2026.JPG',
  description: 'The official website for the Alpha Phi chapter of Alpha Kappa Psi at the University of Florida. Established in 1926, developing principled business leaders in Gainesville, FL.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gainesville',
    addressRegion: 'FL',
    postalCode: '32611',
    addressCountry: 'US',
  },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Florida',
    url: 'https://www.ufl.edu',
  },
  foundingDate: '1926',
}

const Home = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent/>
    </>
  )
}

export default Home