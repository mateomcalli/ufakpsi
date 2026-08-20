'use client'

import Image from "next/image"
import { useState, useEffect } from "react";

const Polaroid = (props: { src: string; text: string; priority?: boolean }) => {
  const [angle, setAngle] = useState<number>(0)
  const [yPos, setYPos] = useState<number>(0)

  useEffect(() => {
    setAngle(Math.random() * 20 - 10)
    setYPos(Math.random() * 2 - 1)
  }, [])

  return (
    <div
      className='relative w-54 h-75 sm:w-64 sm:h-88 flex flex-col items-center justify-center shrink-0'
      style={{ transform: `rotate(${angle}deg) translateY(${yPos}rem)` }}
    >
      <Image
        src={props.src}
        alt='Pictures of members'
        fill
        quality={80}
        priority={props.priority}
        fetchPriority={props.priority ? "high" : "auto"}
        sizes="(max-width: 640px) 300px, 360px"
        draggable='false'
        className='object-cover p-4 pb-24 bg-white shadow-lg select-none'
      />
      <div className="absolute bottom-12 z-2 h-8 px-4 w-full">
        <p className="font-hand text-xl break-words">{props.text}</p>
      </div>
    </div>
  )
}

export default Polaroid