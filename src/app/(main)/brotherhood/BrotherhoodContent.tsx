"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ExpandArrow from "@/src/components/ui/ExpandArrow";
import TeamCardContent from "@/src/components/cards/TeamCardContent";

const BrotherhoodContent = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <section className="flex flex-col gap-4 pt-8 px-8 top-16 h-fit relative">
      <div className="font-crimson px-8">
        <h1 className="text-4xl">Brotherhood at Alpha Kappa Psi</h1>
        <h2 className="text-2xl text-lblue italic">Leadership, growth, and community.</h2>
      </div>

      <div className="relative w-full shrink-0 h-80">
        <Image 
          src="/eboard2526.jpg" 
          alt="Executive Board 25-26" 
          fill
          className="rounded-2xl object-cover"
        />
      </div>

      <div className="relative flex border py-4 border-black rounded-2xl w-full mb-50 overflow-hidden">
        <ExpandArrow isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>

        <motion.div
          className="flex w-full"
          animate={{ height: isExpanded ? "30rem" : "15rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
        <TeamCardContent 
          teamName="President's Team"
          caption="The President's Team is the..."
          imageString="/good3316.JPG" 
          border={true}
          execName="Elizabeth Myers"
          execTitle="Chapter President"
        />

        <TeamCardContent
          teamName="Executive Vice President's Team"
          caption="The EVP's Team is the..."
          imageString="/good3316.JPG"
          border={true}
          execName="Justin Hall"
          execTitle="Executive Vice President"
        />

        <TeamCardContent
          teamName="Finance Team"
          caption="The Finance Team is the..."
          imageString="/good3316.JPG"
          border={false}
          execName="Brother Wadhwani"
          execTitle="Vice President of Finance"
        />
        </motion.div>
      </div>



    </section>
  )
};

export default BrotherhoodContent