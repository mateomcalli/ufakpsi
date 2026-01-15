import Image from "next/image";

// export const metadata = {
//   title: 'Service',
//   description: 'Examples of the acts of service that members partake in with the fraternity.',
//   icons: {
//     icon: '/akp_emblem.png',
//   },
// }

const Service = () => {
  return (
    <section className="flex flex-col gap-4 pt-8 top-16 h-fit relative">
      <div className="flex w-fit m-auto gap-8">
        <div className="flex flex-col gap-4">
          <div className="font-crimson">
            <h1 className="text-4xl">Service at Alpha Kappa Psi</h1>
            <h2 className="text-2xl text-lblue italic">How we give back</h2>
          </div>

          <div className="flex flex-col gap-2 font-crimson p-4 rounded-xl border border-gray-400 w-xl h-70">
            <p className="text-3xl">Proudly serving with GNV Thrives.</p>
            <p className="text-xl/6">As a partner of GNV Thrives, we support community revitalization and educational incentives in Gainesville. With their support, we are empowered to help those around us and promote a brighter future for our neighbors.</p>
            <div className="bg-dblue/10 inset-shadow-sm/20 transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg hover:inset-shadow-sm/0 md mt-auto flex items-center border border-dblue rounded-lg w-36 h-12">
              <p className="m-auto text-lg">Learn more</p>
            </div>
          </div>
        </div>
        <div className="relative w-xl h-md rounded-xl">
          <Image 
            className="rounded-xl"
            src='/pickle.png'
            alt='Brothers playing pickleball'
            fill
          />
        </div>
      </div>
      
    </section>
  )
};

export default Service