'use client'

import Image from "next/image"
import InfiniteCarousel from "@/src/components/service/InfiniteCarousel"
import ServiceCard from "@/src/components/cards/ServiceCard"

const ServiceContent = () => {
  const images : string[] = [
    '/vests.jpg',
    '/planting.jpg',
    '/breadmighty.jpg',
    '/dog.jpg',
  ]

  return (
    <>
    <div className="flex flex-col gap-12">
      <section className="flex pt-8 mt-16 h-fit relative">
        <div className="flex w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl  m-auto gap-8">
          <div className="flex flex-col gap-4">
            <div className="px-0 sm:px-4">
              <h1 className="font-merry text-2xl md:text-3xl">Service at Alpha Kappa Psi</h1>
              <h2 className="font-crimson text-2xl text-lblue italic">How we give back.</h2>
            </div>

            <div className="flex flex-col gap-2 font-crimson p-4 rounded-lg border border-gray-400 w-full xl:w-xl h-70">
              <p className="text-lg/6 sm:text-xl/6">As a partner of GNV Thrives, we support community revitalization and educational incentives in Gainesville. With their support, we are empowered to help those around us and promote a brighter future for our neighbors.</p>
              <div className="mt-auto flex relative">
                <a href="https://gainesvillethrives.org" target="_blank">
                  <div className="inset-shadow-sm/20 transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg hover:inset-shadow-sm/0 flex items-center border border-lblue rounded-lg w-36 h-12">
                    <p className="m-auto font-merry">Learn more</p>
                  </div>
                </a>
                <Image
                  src='/gnv_thrives.svg'
                  alt='GNV Thrives Logo'
                  width={80}
                  height={80}
                  className="absolute right-0.5 bottom-0"
                />
              </div>
            </div>
          </div>

          <div className="w-full relative flex-1 rounded-lg hidden xl:block">
            <Image 
              className="rounded-lg object-cover object-[30%_20%]"
              quality={100}
              src='/pickle1.png'
              alt='Brothers playing pickleball'
              fill
              
            />
          </div>
        </div>
      </section>
      
      <InfiniteCarousel images={images} />

      <div className="flex flex-col gap-6 m-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl">
        <div className="px-0 sm:px-4">
          <h1 className="font-merry text-xl md:text-2xl">Check out our latest service events:</h1>
        </div>
        <div className="gap-4 flex flex-col w-full md:w-auto md:grid md:grid-cols-2 md:grid-rows-2">
          <ServiceCard title='Puppy Hill Farm Animal Rescue' pics=''/>
          <ServiceCard title='The Giving Garden' pics=''/>
          <ServiceCard title='Pickleball Tournament' pics=''/>
          <ServiceCard title='Bread of the Mighty' pics=''/>
        </div>
      </div>
    </div>
  </>
  )
}

export default ServiceContent