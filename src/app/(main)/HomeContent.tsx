'use client'

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import AnimatedNavLink from '@/src/components/navbar-footer/AnimatedNavLink';
import Landing from "../../components/homepage/Landing";
import CoreValues from "../../components/homepage/CoreValues";

const HomeContent = () => {
  const [showBody, setShowBody] = useState<boolean>(false);

  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  useEffect(() => {
    if (!isTextInView) return;

    const timer = setTimeout(() => {
      setShowBody(true)
    }, 1300)

    return () => clearTimeout(timer);
  }, [isTextInView])

  return (
    <div className="relative mt-16 h-fit">
      <Landing/>
      <section className='relative bg-cream border-t rounded-t-[40px] sm:rounded-t-[50px] border-t-gray-500 w-screen z-10 shadow-[-5px_-20px_30px_-10px_rgba(0,0,0,0.3)]'>   
        <div className='pt-14 p-8 pr-12 flex flex-col gap-16 sm:gap-12'>
          {/* <h1 className="font-crimson self-center text-2xl">Who we are:</h1> */}
          <motion.h2
            ref={textRef}
            className="font-merry self-center text-center text-3xl sm:text-3xl"
            variants={containerVariants}
            initial="hidden"
            animate={isTextInView ? "visible" : "hidden"}
            transition={{ delay: 1 }}
          >
            <i>
              <motion.span variants={childVariants} className="inline-block mr-2">
                "Shaping
              </motion.span>
              <motion.span variants={childVariants} className="inline-block mr-2">
                people,
              </motion.span>
              <motion.span variants={childVariants} className="inline-block mr-2">
                shaping
              </motion.span>
              <motion.span variants={childVariants} className="inline-block">
                business."
              </motion.span>
            </i>
          </motion.h2>

          <motion.div
            className="flex flex-col md:flex-row justify-center w-full h-fit md:gap-16"
            variants={contentVariants}
            initial="hidden"
            animate={showBody ? "visible" : "hidden"}
          >
            <div className="md:w-240 items-center flex">
              <h3 className='text-center font-crimson text-xl'>Founded in 1904, Alpha Kappa Psi is the number one professional <b>co-ed</b> business fraternity in the nation. With over 298,000 members at 219 different universities, our mission is clear: to develop our members into principled business leaders. With an extensive alumni network and resources all around the Heavener School of Business and beyond, we foster growth, professional development, and lasting connections for members of <b>any major</b>.</h3>
            </div>

            {/* <div className="flex flex-col my-4 items-center">
              <p className="text-dblue text-5xl font-crimson">50+</p>
              <h3 className="font-crimson text-xl text-nowrap pb-2">active members</h3>

              <p className="text-dblue text-5xl font-crimson">32</p>
              <h3 className="font-crimson text-xl text-nowrap pb-2">majors represented</h3>

              <p className="text-dblue text-5xl font-crimson">1000+</p>
              <h3 className="font-crimson text-xl pb-2">alumni</h3>
            </div> */}
          </motion.div>
          
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={showBody ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <CoreValues/>
          </motion.div>
        </div>

        <motion.div
          className='w-full mt-16 h-80 relative bg-black'
          variants={contentVariants}
          initial="hidden"
          animate={showBody ? "visible" : "hidden"}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="/mem_spr_2026.JPG"
              alt="Membership Team"
              fill
              className="object-cover object-[30%_42%] blur-[1px] opacity-30"
            />
          </div>
          
          <div className='relative h-full flex flex-col gap-4 sm:gap-6 items-center justify-center mx-auto px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl'>
            <h2 className="text-stone-200 font-merry text-xl sm:text-2xl md:text-3xl text-center">
              Interested in becoming a part of our brotherhood?
            </h2>
            <p className="text-stone-200 font-crimson text-md sm:text-lg md:text-xl text-center">
              We're glad you want to become a part of one of the largest and most active communities on campus. To learn more about our recruitment process and how you can get involved, visit our recruitment page! Look our for our rush events near the start of each semester, and follow our instagram to see what we're up to.
            </p>
            <div className='flex gap-8'>
              <AnimatedNavLink bg={true} buttonName='Recruitment' popOut={true}/>
              <AnimatedNavLink bg={true} onlyLink='https://instagram.com/ufakpsi' buttonName='Instagram' popOut={true}/>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default HomeContent