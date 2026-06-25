import ServiceContent from "./ServiceContent";

export const metadata = {
  title: 'UF Alpha Kappa Psi',
  description: 'Check out community service, philanthropy, and partnerships for good organized by Alpha Kappa Psi (UF AKPsi) at the University of Florida.',
  openGraph: {
    title: 'Service | UF Alpha Kappa Psi',
    description: 'Check out community service, philanthropy, and partnerships for good organized by Alpha Kappa Psi (UF AKPsi) at the University of Florida.',
    type: 'website',
  },
  icons: {
    icon: '/akp_emblem.png',
  },
}

const Service = () => {
  return (
    <ServiceContent/>   
  )
}

export default Service