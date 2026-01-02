"use client"

 import { motion, Variants } from 'framer-motion';
 import Link from 'next/link';

 // could use polish; underline appears w/o being clickable
 const AnimatedNavLink = (props: { buttonName: string; }) => {
  const variants : Variants = {
    not_active: { width: '0%' },
    active: { width: '100%' }
  }

  return (
    <motion.div 
      initial='not_active'
      whileHover='active'
      className="w-fit"
    >
      <Link className='text-xl font-crimson' href={`/${props.buttonName.toLowerCase().replace(/ /g, "_")}`}>{props.buttonName}</Link>
      <motion.div
        className='bg-black h-0.5'
        variants={variants}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default AnimatedNavLink