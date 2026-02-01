"use client"

 import { motion, Variants } from 'framer-motion';
 import Link from 'next/link';

 // could use polish; underline appears w/o being clickable
 const AnimatedNavLink = (props: { buttonName: string, bg: boolean }) => {
  const variants : Variants = {
    not_active: { width: '0%' },
    active: { width: '100%' }
  }

  return (
    <motion.div 
      initial='not_active'
      whileHover={props.bg ? `not_active` : `active`}
      className={props.bg ? `px-3 py-1 bg-dblue/5 inset-shadow-sm/15 transition-shadow duration-300 hover:cursor-pointer hover:shadow-md hover:inset-shadow-sm/0 flex items-center border border-lblue rounded-lg w-fit` : `` + `w-fit mt-0.5`}
    >
      <Link 
        className='font-libre' 
        href={`${props.buttonName === "Recruitment" ? "https://recruitment.ufakpsi.com" : '/' + props.buttonName.toLowerCase().replace(/ /g, "_")}`}
      >
        {props.buttonName}
      </Link>
      <motion.div
        className='bg-black h-0.5'
        variants={variants}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default AnimatedNavLink