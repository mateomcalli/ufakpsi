'use client'

import Image from "next/image"

const Polaroid = () => {
  return (
    <div className='relative w-64 h-88 flex items-center justify-center rotate-15'>
      <Image
        src='/pickle.png'
        alt='Pictures of members'
        fill
        className='object-cover p-4 pb-24 bg-white shadow-lg'
      />
    </div>
  )
}

export default Polaroid