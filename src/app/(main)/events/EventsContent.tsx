'use client'

import Polaroid from "@/src/components/events/Polaroid"
import EventPicker from "@/src/components/events/EventPicker"

const EventsContent = () => {
  return (
    <section className="red flex flex-col gap-4 py-8 px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto top-16 h-fit relative">
      <div className="px-0 sm:px-4">
        <h1 className="font-libre text-2xl md:text-3xl">Events at Alpha Kappa Psi</h1>
        <h2 className="font-crimson text-2xl text-lblue italic">Here's what we've been up to</h2>
      </div>
      <EventPicker/>
      <Polaroid src='/pickle.png' text="Intramural football" year="2025"/>
    </section>
  )
}

export default EventsContent