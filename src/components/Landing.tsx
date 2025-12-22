"use client"

import Image from "next/image"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

const Landing = () => {
  const [imageState, setImageState] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setImageState(prev => prev === 3 ? 0 : prev + 1)
    }, 3000)
  
    return () => clearInterval(interval)
  }, [])

  const images : Array<string> = [
    '/eboard2526.jpg',
    '/guac.jpg',
    '/bros.jpg',
    '/pcfall25.jpg'
  ]

  const subtitles : Array<string> = [
    'professional development',
    'brotherhood',
    'service',
    'more than a business fraternity'
  ]

  return (
    <section className='sticky top-16 flex flex-col gap-4 px-8 w-screen h-screen'>

      <div className='relative w-full shrink-0 h-140 rounded-2xl'>
        <AnimatePresence>
          <motion.div 
            key={imageState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              className="object-cover rounded-b-2xl"
              alt='Executive Board'
              src={images[imageState]}
              fill
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-0 w-full h-1 bg-dblue"/>
      </div>
      
      <div className='px-6 flex gap-16'>
        <h1 className='font-crimson text-5xl'>
          Alpha Kappa Psi is:
        </h1>
        <div className='font-crimson italic text-dblue text-3xl self-end'>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {subtitles[imageState]}
          </motion.h2>
        </div>
      </div>

    </section>
  )

}

export default Landing