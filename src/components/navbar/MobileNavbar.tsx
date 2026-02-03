"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from 'framer-motion'
import { useState } from "react"
import AnimatedBurger from "../ui/AnimatedBurger"
import AnimatedNavLink from "./AnimatedNavLink"

const MobileNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

  const variants : Variants = {
    open: { x: '20%' },
    closed: { x: '100%' }
  }

  return (
    <>
      <nav className="bg-cream shadow-xl fixed z-20 left-0 right-0 top-0 h-[62px] flex justify-between pl-5 pr-6 sm:pl-[30px] sm:pr-8 items-center">
        <Link href='/'>
          <Image
            alt='AKPsi logo'
            src='/akp_letters.svg'
            width={100}
            height={100}
          />
        </Link>
        <motion.div 
          className='hover:cursor-pointer' 
          initial='closed'
          animate={isMenuOpen ? 'open' : 'closed'}
        >
          <AnimatedBurger isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}/>
          <motion.div 
            className="pl-4 pt-2 flex flex-col gap-4 hover:cursor-auto fixed z-10 h-screen top-16 right-0 border-l border-l-black bg-cream w-1/2"  // Changed: absolute -> fixed, -right-12 -> right-0
            variants={variants}
            transition={{
              type: "spring",
              stiffness: 100,
              mass: 0.1
            }}
          >
            <AnimatedNavLink bg={false} buttonName='Recruitment'/>
            <AnimatedNavLink bg={false} buttonName='Brotherhood'/>
            <AnimatedNavLink bg={false} buttonName='Events'/>
            <AnimatedNavLink bg={false} buttonName='Service'/>
            <AnimatedNavLink bg={false} buttonName='All Brothers'/>
          </motion.div>
        </motion.div>
      </nav>
    </>
  )
}

export default MobileNavbar