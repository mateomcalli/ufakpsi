import HomeContent from "./HomeContent"

export const metadata = {
  title: 'UF Alpha Kappa Psi',
  description: 'The official website for the Alpha Phi chapter of Alpha Kappa Psi at the University of Florida (UF AKPsi). Established in 1926, we are the oldest and largest professional co-ed business fraternity in Gainesville, FL, developing principled business leaders.',
  openGraph: {
    title: 'UF Alpha Kappa Psi - Alpha Phi',
    description: 'Alpha Kappa Psi at the University of Florida is a professional business fraternity devoted to developing principled business leaders across all majors.',
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