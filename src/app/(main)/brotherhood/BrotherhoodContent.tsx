"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import ExpandArrow from "@/src/components/ui/ExpandArrow";
import TeamContent from "@/src/components/brotherhood/TeamCardContent";

const BrotherhoodContent = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <section className="flex flex-col gap-4 pt-8 px-8 top-16 h-fit relative">
      <div>
        <h1 className="font-crimson text-4xl px-8">Brotherhood at Alpha Kappa Psi</h1>
        <h2 className="font-crimson text-2xl text-lblue px-8 italic">leadership, growth, and community.</h2>
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
        <TeamContent 
          teamName="President's Team"
          caption="The President's Team is the..."
          imageString="/good3316.jpg" 
          border={true}
          execName="Elizabeth Myers"
          execTitle="Chapter President"
        />

        <TeamContent
          teamName="Executive Vice President's Team"
          caption="The EVP's Team is the..."
          imageString="/good3316.jpg"
          border={true}
          execName="Justin Hall"
          execTitle="Executive Vice President"
        />

        <TeamContent 
          teamName="Finance Team"
          caption="The Finance Team is the..."
          imageString="/good3316.jpg"
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