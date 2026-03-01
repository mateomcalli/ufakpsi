'use client'

import Image from "next/image";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { LuScale } from "react-icons/lu";

const CoreValues = () => {
  return (
    <div className="relative border border-dblue/50 rounded-lg m-auto px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl h-fit pt-8 pb-8">
      <p className="absolute -top-4 left-[49.8%] -translate-x-1/2 bg-cream px-2 font-crimson text-2xl whitespace-nowrap">
        Our core values
      </p>
      <div className="grid grid-cols-2 gap-4 sm:gap-0 sm:flex sm:flex-row w-full sm:justify-around h-fit">
        <div className="flex flex-col items-center h-fit">
          <MdOutlinePeopleAlt color={"#120374"} size={80}/>
          <p className="font-crimson text-xl">Unity</p>
        </div>
        <div className="flex flex-col items-center h-fit">
          <RiServiceLine color={"#120374"} size={80}/>
          <p className="font-crimson text-xl">Service</p>
        </div>
        <div className="flex flex-col items-center pt-0.5 h-fit">
          <Image src="/brotherhood.svg" alt='pillar' width={80} height={80}/>
          <p className="font-crimson -mt-0.5 text-xl">Brotherhood</p>
        </div>
        <div className="flex flex-col items-center pt-1 h-fit">
          <BsBook color={"#120374"} strokeWidth={0.2} size={76}/>
          <p className="font-crimson text-xl">Knowledge</p>
        </div>
        <div className="flex flex-col items-center col-span-2 h-fit">
          <LuScale color={"#120374"} strokeWidth={1.6} size={80}/>
          <p className="font-crimson text-xl">Integrity</p>
        </div>
      </div>
    </div>
  )
}

export default CoreValues