'use client'

import { motion } from "framer-motion";
import { useState } from "react";
import ExpandArrow from "@/src/components/ui/ExpandArrow";
import TeamCardContent from "@/src/components/cards/TeamCardContent";

const BigThree = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <div className="relative flex border py-4 border-gray-400 rounded-2xl w-full overflow-hidden">
      <ExpandArrow isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>

      <motion.div
        className="flex w-full"
        animate={{ height: isExpanded ? "auto" : "15rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <TeamCardContent 
          teamId={1}
          caption="The President's Team enforces internal and external standards, and it serves as the top organizational layer of the fraternity."
          border={true}
          isExpanded={isExpanded} 
        />

        <TeamCardContent
          teamId={2}
          caption="From internal communication to development with AI, the EVP's Team handles a majority of the technical necessities that keep AKPsi moving."
          border={true}
          isExpanded={isExpanded}
        />

        <TeamCardContent
          teamId={3}
          caption="The Finance Team is responsible for the chapter's spend and budget, among other critical financial processes for the fraternity."
          border={false}
          isExpanded={isExpanded}
        />
      </motion.div>
    </div>
  )
}

export default BigThree