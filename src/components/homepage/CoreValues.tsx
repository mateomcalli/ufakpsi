'use client'

import Image from "next/image";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { RiServiceLine } from "react-icons/ri";
import { BsBook } from "react-icons/bs";
import { LuScale } from "react-icons/lu";


const CoreValues = () => {
  return (
    <fieldset className="border m-auto rounded-xl border-dblue px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl h-fit pt-4 pb-8">
      <legend className="m-auto px-2 font-crimson text-2xl">Our core values</legend>
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row w-full justify-around h-fit pt-1">
        <div className="flex flex-col self-center h-fit">
          <MdOutlinePeopleAlt color={"#120374"} size={80}/>
          <p className="self-center font-crimson text-xl">Unity</p>
        </div>
        <div className="flex flex-col self-center h-fit">
          <RiServiceLine color={"#120374"} size={80}/>
          <p className="self-center font-crimson text-xl">Service</p>
        </div>
        <div className="flex flex-col self-center h-fit">
          <Image className="ml-3" src="/brotherhood.svg" alt='pillar' width={80} height={80}/>
          <p className="self-center font-crimson text-xl">Brotherhood</p>
        </div>
        <div className="flex flex-col self-center h-fit px-1">
          <BsBook color={"#120374"} className="mt-1 ml-1.5" strokeWidth={0.2} size={76}/>
          <p className="self-center font-crimson text-xl">Knowledge</p>
        </div>
        <div className="flex flex-col self-center h-fit">
          <LuScale color={"#120374"} strokeWidth={1.6} size={80}/>
          <p className="self-center font-crimson text-xl">Integrity</p>
        </div>
      </div>
    </fieldset>
  )
}

export default CoreValues