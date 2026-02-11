'use client'

import Image from "next/image"
import { useState, useEffect } from "react";

const Polaroid = (props: { src: string; text: string }) => {
  const [angle, setAngle] = useState<number>(0)
  const [yPos, setYPos] = useState<number>(0)

useEffect(() => {
  setAngle(Math.random() *  30 - 15)
  setYPos(Math.random() * 4 - 2)
}, [])

  return (
    <div 
      className='relative w-64 h-88 flex flex-col items-center justify-center shrink-0'
      style={{ transform: `rotate(${angle}deg) translateY(${yPos}rem)` }}
    >
      <Image
        src={props.src}
        alt='Pictures of members'
        fill
        className='object-cover p-4 pb-24 bg-white shadow-lg'
      />
      <div className="absolute bottom-12 z-2 h-8 px-4 w-full">
        <p className="font-hand text-xl">{props.text}</p>
      </div>
    </div>
  )
}

export default Polaroid