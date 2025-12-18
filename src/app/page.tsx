"use client"

import Image from "next/image"
import { useRef } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion"

// export const metadata = {
//   title: 'Alpha Kappa Psi',
//   description: 'Professional business fraternity at the University of Florida',
//   icons: {
//     icon: '/akp_emblem.png',
//   },
// };

const Landing = () => {
  const landingRef = useRef(null);

  // tracks the progress of the scroll, is a value 0-1. 
  const { scrollYProgress } = useScroll({ target: landingRef });

  // inverts the scrollYProgress variable, so opacity is 1 when scrollYProgress is 0.
  const xPos1 : MotionValue<string> = useTransform(scrollYProgress, [0, 0.94, 1], ['0vw', '-98vw', '-98vw'])

  return (
    <>
      <div className="pt-24 h-[350vh]" ref={landingRef}>
        <section className='sticky top-24 flex w-screen overflow-x-hidden'>
          <div className='w-full flex flex-col gap-5 px-8'>

            <div className='px-6 flex justify-between'>
              <h1 className='font-crimson text-5xl'>
                Alpha Kappa Psi is:
              </h1>
              <h2 className='font-crimson italic text-dblue text-3xl self-end'>
                professional development
              </h2>
            </div>
            
            <motion.div 
              className="blue rounded-2xl flex gap-8"
              style={{ x: xPos1 }}
            >
              <div className='red relative w-full shrink-0 h-screen-minus-nav rounded-2xl'>
                <Image
                  className="object-cover rounded-2xl"
                  alt='Executive Board'
                  src='/eboard2526.jpg'
                  fill
                />
              </div>

              <div className='red relative w-full shrink-0 h-screen-minus-nav rounded-2xl'>
                <Image
                  className="object-cover rounded-2xl"
                  alt='Executive Board'
                  src='/guac.jpg'
                  fill
                />
              </div>
            </motion.div>

          </div>
        </section>
      </div>
      <div>
        <p>Alpha K</p>
      </div>
    </>
    
    
    
  )
}

export default Landing