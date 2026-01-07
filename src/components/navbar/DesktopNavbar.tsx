"use client"

import Image from "next/image";
import Link from "next/link";
import AnimatedNavLink from "./AnimatedNavLink";

const DesktopNavbar = () => {
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
  )
}

export default DesktopNavbar