import HomeContent from "./HomeContent"

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: 'The official website for the Alpha Phi chapter of the oldest professional business fraternity in the nation, Alpha Kappa Psi. Established in 1926, our chapter has been at the University of Florida for over 100 years!',
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