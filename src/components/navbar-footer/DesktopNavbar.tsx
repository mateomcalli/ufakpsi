"use client"

import Image from "next/image";
import Link from "next/link";
import AnimatedNavLink from "./AnimatedNavLink";

const DesktopNavbar = () => {
  return (
    <nav className='bg-cream shadow-xl fixed z-20 w-screen top-0 h-[62px]'>
      <div className='w-full h-full flex justify-center'>
        <div className='lg:w-4xl xl:w-6xl 2xl:w-7xl flex justify-between items-center'>
          <div className="shrink-0 items-center flex gap-12">
            <Link href='/'>
              <Image
                alt='AKPsi logo'
                src='/akp_letters.svg'
                width={100}
                height={100}
              />
            </Link>
            <AnimatedNavLink bg={false} buttonName='Recruitment' popOut={true}/>
            <AnimatedNavLink bg={false} buttonName='Brotherhood' popOut={false}/>
            <AnimatedNavLink bg={false} buttonName='Events' popOut={false}/>
            <AnimatedNavLink bg={false} buttonName='Service' popOut={false}/>
          </div>
          <AnimatedNavLink bg={true} buttonName='All Brothers' popOut={false}/>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNavbar