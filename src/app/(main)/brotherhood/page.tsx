import BrotherhoodContent from './BrotherhoodContent'

export const metadata = {
  title: 'UF Alpha Kappa Psi',
  description: 'Meet the brothers and leadership of the Alpha Phi chapter of Alpha Kappa Psi (UF AKPsi) at the University of Florida. Learn about our teams, executive board, and brotherhood.',
  openGraph: {
    title: 'Brotherhood | UF Alpha Kappa Psi',
    description: 'Meet the brothers and leadership of the Alpha Phi chapter of Alpha Kappa Psi at the University of Florida. Learn about our teams, executive board, and brotherhood.',
    type: 'website',
  },
  icons: {
    icon: '/akp_emblem.png',
  },
};

const Brotherhood = () => {
  return <BrotherhoodContent/>
}

export default Brotherhood