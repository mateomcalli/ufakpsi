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
      <nav className="bg-cream shadow-xl fixed z-20 left-0 right-0 top-0 h-[62px] flex justify-between px-6.5 items-center">
        <Link href='/'>
          <Image
            alt='AKPsi logo'
            src='/akp_letters.svg'
            width={100}
            height={100}
            className=""
          />
        </Link>
        <motion.div 
          className='hover:cursor-pointer' 
          initial='closed'
          animate={isMenuOpen ? 'open' : 'closed'}
        >
          <AnimatedBurger isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}/>
          <motion.div 
            className="pl-4 pt-2 flex flex-col gap-4 hover:cursor-auto fixed z-10 h-fit pb-3 top-16 right-0 border-b rounded-bl-lg border-l border-l-neutral-300 border-b-neutral-300 bg-cream w-1/2"
            variants={variants}
            transition={{
              type: "spring",
              stiffness: 100,
              mass: 0.1
            }}
          >
            <AnimatedNavLink bg={false} buttonName='Recruitment' popOut={true} onClose={() => setMenuOpen(false)}/>
            <AnimatedNavLink bg={false} buttonName='Brotherhood' popOut={false} onClose={() => setMenuOpen(false)}/>
            <AnimatedNavLink bg={false} buttonName='Events' popOut={false} onClose={() => setMenuOpen(false)}/>
            <AnimatedNavLink bg={false} buttonName='Service' popOut={false} onClose={() => setMenuOpen(false)}/>
            <AnimatedNavLink bg={false} buttonName='All Brothers' popOut={false} onClose={() => setMenuOpen(false)}/>
          </motion.div>
        </motion.div>
      </nav>
    </>
  )
}

export default MobileNavbar