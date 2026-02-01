'use client'

import Image from "next/image"
import InfiniteCarousel from "@/src/components/InfiniteCarousel"

const ServiceContent = () => {
  const images : string[] = [
    '/guac.jpg',
    '/pcfall25.jpg',
    '/bros.jpg',
    '/recruitment-photo.jpg',
  ]

  return (
    <>
    <div className="flex flex-col gap-24">
      <section className="flex flex-col pt-8 px-6 sm:px-16 top-16 h-fit relative">
        <div className="flex w-full xl:w-6xl m-auto gap-8">
          <div className="flex flex-col gap-4">
            <div className="">
              <h1 className="font-libre text-2xl md:text-3xl">Service at Alpha Kappa Psi</h1>
              <h2 className="font-crimson text-2xl text-lblue italic">How we give back.</h2>
            </div>

            <div className="flex flex-col gap-2 font-crimson p-4 rounded-xl border border-gray-400 w-full xl:w-xl h-70">
              <p className="text-2xl md:text-3xl">Proudly serving with GNV Thrives.</p>
              <p className="text-lg/6 sm:text-xl/6">As a partner of GNV Thrives, we support community revitalization and educational incentives in Gainesville. With their support, we are empowered to help those around us and promote a brighter future for our neighbors.</p>
              <a className="mt-auto" href="https://gainesvillethrives.org" target="_blank">
                <div className="bg-dblue/10 inset-shadow-sm/20 transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg hover:inset-shadow-sm/0 flex items-center border border-lblue rounded-lg w-36 h-12">
                  <p className="m-auto text-lg">Learn more</p>
                </div>
              </a>
            </div>
          </div>

          <div className="relative flex-1 rounded-xl hidden xl:block">
            <Image 
              className="rounded-xl"
              src='/pickle.png'
              alt='Brothers playing pickleball'
              fill
            />
          </div>
        </div>
        
      </section>
      <InfiniteCarousel images={images} />
    </div>
    </>
  )
}

export default ServiceContent