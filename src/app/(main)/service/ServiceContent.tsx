'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import InfiniteCarousel from "@/src/components/service/InfiniteCarousel"
import ServiceCard, { ServiceAccordion, ServiceEvent } from "@/src/components/cards/ServiceCard"
import { createClient } from "@/lib/supabase/client"

const DEFAULT_IMAGES: string[] = [
  '/vests.jpg',
  '/planting.jpg',
  '/breadmighty.jpg',
  '/dog.jpg',
]

const ServiceContent = () => {
  const [images, setImages] = useState<string[]>(DEFAULT_IMAGES)
  const [events, setEvents] = useState<ServiceEvent[]>([])

  useEffect(() => {
    const supabase = createClient()
    const getData = async () => {
      try {
        const { data: photoData, error: photoErr } = await supabase
          .from("service_carousel")
          .select("slot_index, url")
          .order("slot_index", { ascending: true })

        if (!photoErr && photoData && photoData.length > 0) {
          const fetchedImages = [...DEFAULT_IMAGES]
          photoData.forEach((item: { slot_index: number; url: string }) => {
            if (item.slot_index >= 0 && item.slot_index < 4 && item.url) {
              fetchedImages[item.slot_index] = item.url
            }
          })
          setImages(fetchedImages)
        }

        const { data: eventData, error: eventErr } = await supabase
          .from("service_events")
          .select("slot_index, title, caption")
          .order("slot_index", { ascending: true })

        if (!eventErr && eventData && eventData.length > 0) {
          const fetchedEvents = eventData
            .filter((item: any) => item.title || item.caption)
            .map((item: any) => ({
              title: item.title || '',
              caption: item.caption || ''
            }))
          setEvents(fetchedEvents)
        }
      } catch (err) {
        console.error(err)
      }
    }
    getData()
  }, [])

  return (
    <>
    <div className="flex flex-col gap-12">
      <section className="flex pt-8 mt-16 h-fit relative">
        <div className="flex w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl  m-auto gap-8">
          <div className="flex flex-col gap-4">
            <div className="px-0 sm:px-4">
              <h1 className="font-merry text-2xl md:text-3xl">Service at Alpha Kappa Psi</h1>
              <h2 className="font-sans text-lg text-lblue">How we give back.</h2>
            </div>

            <div className="flex flex-col gap-2 font-crimson p-4 rounded-lg border border-neutral-300 w-full xl:w-xl h-70">
              <p className="font-sans text-base/6 sm:text-lg/6">As a partner of GNV Thrives, we support community revitalization and educational incentives in Gainesville. With their support, we are empowered to help those around us and promote a brighter future for our neighbors.</p>
              <div className="mt-auto flex relative">
                <a href="https://gainesvillethrives.org" target="_blank">
                  <div className="inset-shadow-sm/20 transition-shadow duration-300 hover:cursor-pointer hover:shadow-lg hover:inset-shadow-sm/0 flex items-center border border-neutral-300 rounded-lg w-36 h-12">
                    <p className="m-auto font-merry">Learn more</p>
                  </div>
                </a>
                <Image
                  src='/gnv_thrives.svg'
                  alt='GNV Thrives Logo'
                  width={80}
                  height={80}
                  className="absolute right-0.5 bottom-0"
                  draggable='false'
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
              draggable='false'
              fill
            />
          </div>
        </div>
      </section>
      
      <InfiniteCarousel images={images} />

      {events.length > 0 && (
        <div className="flex flex-col gap-6 m-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl">
          <div className="px-0 sm:px-4">
            <h1 className="font-merry text-xl md:text-2xl">Explore our latest service events:</h1>
          </div>
          <ServiceAccordion events={events} />
        </div>
      )}
      
    
    </div>
  </>
  )
}

export default ServiceContent