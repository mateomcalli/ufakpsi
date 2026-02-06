'use client'

import { useState } from "react"
import Polaroid from "@/src/components/events/Polaroid"
import EventPicker from "@/src/components/events/EventPicker"

const EventsContent = () => {
  const [selectedEvent, setSelectedEvent] = useState<number>(0)

  const events = [
    {
      cover: '/guac.jpg', 
      id: 0, 
      title: 'Big Little Reveal', 
      pics: [
        {text: 'Guac GOAT Fam', url: '/guac.jpg'}, 
        {text: 'Spring Mem Team :)', url: '/mem_spr_2026.JPG'}, 
        {text: 'Scavenger hunt!', url: '/bros.jpg'}, 
        {text: 's/o celsius', url: '/recruitment-photo.jpg'}
      ]
    },
    {
      cover: '/guac.jpg', 
      id: 1, 
      title: 'Big Little Reveal', 
      pics: [
        {text: 'Guac GOAT Fam', url: '/recruitment-photo.jpg'}, 
        {text: 'Spring Mem Team :)', url: '/recruitment-photo.jpg'}, 
        {text: 'Scavenger hunt!', url: '/recruitment-photo.jpg'}, 
        {text: 's/o celsius', url: '/recruitment-photo.jpg'}
      ]
    },
    // {url: '/bros.jpg', id: 1, title: 'Intramural Football'},
    // {url: '/mem_spr_2026.JPG', id: 2, title: 'Professional Trip to NYC'},
    // {url: '/recruitment-photo.jpg', id: 3, title: 'Spring Recruitment'},
  ]

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
        {events[selectedEvent].pics?.map((pic,i) => (
          <Polaroid key={i} src={pic.url} text={pic.text} year="2025"/>
        ))}
      </div>
    </div>
  )
}

export default EventsContent