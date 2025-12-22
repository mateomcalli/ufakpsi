"use client"

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, Variants, useScroll } from 'framer-motion';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const [showBorder, setShowBorder] = useState<boolean>(false);

  useEffect(() => {
    scrollYProgress.on('change', (latest) => {
      // console.log(scrollYProgress)
      setShowBorder(latest > 0.92)
    })
  }, [scrollYProgress])

  const variants : Variants = {
    not_active: { width: '0%' },
    active: { width: '100%' }
  };

  // could use polish; underline appears w/o being clickable
  const AnimatedNavLink = (props: { buttonName: string; }) => {
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
  };

  return (
    <nav className='bg-cream shadow-xl fixed z-20 w-screen top-0 h-[62px] flex justify-between pl-[30px] pr-8 items-center'>
      <Link href='/'>
        <Image
          alt='AKPsi logo'
          src='/akp_letters.svg'
          width={100}
          height={100}
        />
      </Link>
      <AnimatedNavLink buttonName='Recruitment'/>
      <AnimatedNavLink buttonName='Brotherhood'/>
      <AnimatedNavLink buttonName='Service'/>
      <AnimatedNavLink buttonName='All Brothers'/>
    </nav>
  );
};


export default Navbar