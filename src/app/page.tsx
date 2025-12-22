import Landing from "../components/Landing"

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: 'Professional business fraternity at the University of Florida',
  icons: {
    icon: '/akp_emblem.png',
  },
};

const Home = () => {

  return (
    <div className="pt-16 h-fit">
      <Landing/>

      <section className='relative bg-cream border-t rounded-t-[60px] border-t-gray-500 w-screen h-screen z-10 shadow-[-5px_-20px_30px_-10px_rgba(0,0,0,0.3)]'>
        <div className='flex'>

        </div>
      </section>

    </div>
  )
}

export default Home