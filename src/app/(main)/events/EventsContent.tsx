'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import Polaroid from "@/src/components/events/Polaroid"
import EventPicker from "@/src/components/events/EventPicker"

interface Event {
  id: number;
  title: string;
  cover: string;
  pics: { text: string; url: string; }[]
}

const EventsContent = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0)
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const supabase = createClient()
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
    <div className="flex flex-col gap-24 relative">
      <section className="flex h-fit pt-24 relative">
        <div className="flex w-full sm:px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto gap-8">
          <div className="flex flex-col gap-4 w-screen sm:w-full">
            <div className="sm:px-4 px-6">
              <h1 className="font-merry text-2xl md:text-3xl">Events at Alpha Kappa Psi</h1>
              <h2 className="font-sans text-lg text-lblue">Here's what we've been up to</h2>
            </div>
            <EventPicker selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} events={events} />
          </div>
        </div>
      </section>
      <div className="w-screen relative left-1/2 -translate-x-1/2">
        <div className="overflow-hidden">
          <div className="flex shrink-0 justify-center py-8">
            {events[selectedEvent]?.pics?.map((pic, i) => (
              <motion.div
                key={`${i}-${selectedEvent}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Polaroid src={pic.url} text={pic.text} priority={i < 2} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsContent