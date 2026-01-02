"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from 'framer-motion'
import { useState } from "react"
import AnimatedBurger from "./AnimatedBurger"

const MobileNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

  const variants : Variants = {
    open: { x: 0 },
    closed: { x: 400}
  }

  return (
    <>
      <nav className="bg-cream shadow-xl fixed z-20 w-screen top-0 h-[62px] flex justify-between pl-[30px] pr-8 items-center">
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
            className="hover:cursor-auto absolute z-10 h-screen-minus-nav top-16 -right-12 border-l border-l-black bg-cream w-1/2"
            variants={variants}
            transition={{
              type: "spring",
              stiffness: 100,
              mass: 0.1
            }}
          >
          </motion.div>
        </motion.div>
      </nav>
    </>
  )
}

export default MobileNavbar