'use client'

import { useState } from 'react'

export type ServiceEvent = {
  title: string;
  pics?: string;
  caption: string;
}

export const ServiceCard = ({ title, caption }: ServiceEvent) => {
  return (
    <div className="flex flex-col gap-1 p-5 rounded-xl h-64 border border-neutral-300 bg-cream">
      <p className="font-merry text-xl text-neutral-900">{title}</p>
      <p className="font-sans text-base/6 text-neutral-700">{caption}</p>
    </div>
  )
}

export const ServiceAccordion = ({ events }: { events: ServiceEvent[] }) => {
  const defaultIndex = events.length > 0 ? events.length - 1 : 0
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(defaultIndex)

  return (
    <div 
      className="flex flex-col md:flex-row gap-4 w-full h-auto md:h-72 transition-all duration-500 ease-in-out"
      onMouseLeave={() => setHoveredIndex(defaultIndex)}
    >
      {events.map((event, i) => {
        const isExpanded = hoveredIndex === i

        return (
          <div
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onClick={() => setHoveredIndex(i)}
            className={`flex flex-col justify-between p-5 md:p-6 rounded-xl border bg-cream cursor-pointer transition-all duration-500 ease-in-out relative overflow-hidden group ${
              isExpanded 
                ? 'md:flex-[3.5] border-dblue/70 shadow-md' 
                : 'md:flex-1 border-neutral-300 hover:border-neutral-400'
            }`}
          >
            <div className="flex flex-col gap-3 w-full">
              <h2 className="font-merry text-xl md:text-2xl text-neutral-900 transition-colors duration-300 leading-snug break-normal">
                {event.title}
              </h2>
              <p 
                className={`font-sans text-base/6 text-neutral-700 transition-opacity duration-300 ease-in-out break-normal ${
                  isExpanded 
                    ? 'opacity-100 md:delay-300' 
                    : 'opacity-100 md:opacity-0 md:h-0 md:overflow-hidden'
                }`}
              >
                {event.caption}
              </p>
            </div>

            <span className={`absolute bottom-5 right-5 w-3 h-3 rounded-full transition-colors duration-300 pointer-events-none ${
              isExpanded 
                ? 'bg-dblue' 
                : 'bg-neutral-400 group-hover:bg-dblue'
            }`} />
          </div>
        )
      })}
    </div>
  )
}

export default ServiceCard