"use client"

import Image from "next/image";
import Link from "next/link";
import AnimatedNavLink from "./AnimatedNavLink";

const DesktopNavbar = () => {
  return (
    <nav className='bg-cream shadow-xl fixed z-20 w-screen top-0 h-[62px] flex justify-between pl-[62px] pr-16 items-center'>
      <div className="shrink-0 items-center flex gap-16">
        <Link href='/'>
          <Image
            alt='AKPsi logo'
            src='/akp_letters.svg'
            width={100}
            height={100}
          />
        </Link>
        <AnimatedNavLink bg={false} buttonName='Recruitment'/>
        <AnimatedNavLink bg={false} buttonName='Brotherhood'/>
        <AnimatedNavLink bg={false} buttonName='Events'/>
        <AnimatedNavLink bg={false} buttonName='Service'/>
      </div>
      <AnimatedNavLink bg={true} buttonName='All Brothers'/>
    </nav>
  )
}

export default DesktopNavbar