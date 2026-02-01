'use client'

import { motion } from 'framer-motion';
import { useState } from 'react';
import ExpandArrow from '../ui/ExpandArrow';
import TeamCardContent from '../cards/TeamCardContent';

const TeamSect = (props: { teamId: number, caption: string }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <div className="relative flex border py-4 border-gray-400 rounded-2xl w-full lg:w-1/2 overflow-hidden">
      <ExpandArrow isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>
      <motion.div
          className="flex w-full"
          animate={{ height: isExpanded ? "auto" : "15rem" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <TeamCardContent
            teamId={props.teamId}
            caption={props.caption}
            border={false}
            isExpanded={isExpanded}
            />
      </motion.div>
    </div>
  )
}

export default TeamSect