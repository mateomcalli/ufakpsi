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
    'professional development,',
    'brotherhood,',
    'service,',
    'more than a business fraternity.'
  ]

  return (
    <section className='sticky top-16 flex flex-col gap-4 px-8 w-screen h-screen'>

      <div className='relative w-full shrink-0 h-[75vh]'>
        <AnimatePresence>
          <motion.div 
            key={imageState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              className="rounded-b-2xl object-cover"
              alt='Executive Board'
              src={images[imageState]}
              fill
            />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className='relative px-6 flex gap-2'>
        <h1 className='font-crimson text-nowrap text-2xl md:text-3xl lg:text-4xl'>
          Alpha Kappa Psi is
        </h1>
        <div className='relative font-crimson italic text-dblue text-2xl md:text-3xl lg:text-4xl self-end'>
          <AnimatePresence mode="wait">
            <motion.h2
              key={imageState}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {subtitles[imageState]}
            </motion.h2>
          </AnimatePresence>
        </div>
        <svg className="shrink-0 ms-auto w-8 h-8 -rotate-90" viewBox="0 0 100 100">
          <motion.circle
            key={imageState}
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="#120374"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </svg>
      </div>
    </section>
  )

}

export default Landing