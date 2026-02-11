'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import Polaroid from "@/src/components/events/Polaroid"
import EventPicker from "@/src/components/events/EventPicker"

interface Event {
  id : number;
  title : string;
  cover: string;
  pics: { text: string; url: string; }[]
}

const EventsContent = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0)
  const [events, setEvents] = useState<Event[]>([])

  const supabase = createClient()

  useEffect(() => {
    const getEvents = async () => {
      const { data, error } = await supabase.from("events").select()
      if (error) {
        console.error(error)
        return
      }
      setEvents(data)
    }
    getEvents()
  }, [])

  return (
    <div className="relative w-full">
      <section className="relative flex flex-col gap-8 py-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto top-16 h-fit">
        <div className="sm:pl-[30px] sm:pr-8 px-6 sm:px-4">
          <h1 className="font-libre text-2xl md:text-3xl">Events at Alpha Kappa Psi</h1>
          <h2 className="font-crimson text-2xl text-lblue italic">Here's what we've been up to</h2>
        </div>
        <EventPicker selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} events={events}/>
      </section>
      <div className="absolute mt-24 left-0 right-0 mx-auto w-fit flex shrink-0">
        {events[selectedEvent]?.pics?.map((pic, i) => (
          <motion.div
          key={`${i}-${selectedEvent}`}
          initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Polaroid src={pic.url} text={pic.text}/>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default EventsContent