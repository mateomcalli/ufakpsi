"use client"

import Image from "next/image"
import { useState } from "react";
import { motion } from "framer-motion"

const Navbar = () => {
  const [hovered, setHovered] = useState<boolean>(false);
  const defaultColor: string = 'black';
  const hoverColor: string = '#120374';

  return (
    <nav className="w-screen h-16 flex justify-between pl-6 pr-8 items-center">
      <Image
        className=""
        alt='AKPsi logo'
        src='akp_nobg.svg'
        width={100}
        height={100}
      />
      <p className='text-xl font-crimson'>
        Recruitment
      </p>
      <p className='text-xl font-crimson'>
        Brotherhood
      </p>
      <p className='text-xl font-crimson'>
        Philanthropy
      </p>
      <p className='text-xl font-crimson'>
        All Brothers
      </p>
    </nav>
  );
};


export default Navbar