'use client'

import Image from "next/image"
import { useState, useEffect } from "react";

const Polaroid = (props: { src: string; text: string; year: string }) => {
  const [angle, setAngle] = useState<number>(0)

  const yearShort : string = "'" + props.year[2] + props.year[3]
  const caption : string = props.text + ' ' + yearShort

useEffect(() => {
  setAngle(Math.random() *  30 - 15)
}, [])

  return (
    <div 
      className='relative w-64 h-88 flex flex-col items-center justify-center'
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <Image
        src='/pickle.png'
        alt='Pictures of members'
        fill
        className='object-cover p-4 pb-24 bg-white shadow-lg'
      />
      <div className="absolute bottom-12 z-2 h-8 px-4 w-full">
        <p className="font-hand text-xl">{caption}</p>
      </div>
    </div>
  )
}

export default Polaroid