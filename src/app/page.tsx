import Image from "next/image"

export const metadata = {
  title: 'Alpha Kappa Psi',
  description: 'Professional business fraternity at the University of Florida',
  icons: {
    icon: '/akp_emblem.png',
  },
}

const Landing = () => {
  return (
    <section className='flex pt-8 w-screen h-screen'>
      <div className='w-full flex flex-col gap-5 px-8'>
        <div className='px-6 flex justify-between'>
          <h1 className='font-crimson text-5xl'>
            Alpha Kappa Psi is:
          </h1>
          <h2 className='font-crimson italic text-dblue text-3xl self-end'>
            professional development
          </h2>
        </div>
        <div className='relative flex-1 rounded-2xl'>
          <Image
            className="object-cover rounded-2xl"
            alt='Executive Board'
            src='/eboard2526.jpg'
            fill
          />
        </div>
      </div>
    </section>
  )
}

export default Landing