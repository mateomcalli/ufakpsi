'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ExpandArrow from "@/src/components/ui/ExpandArrow";
import TeamCardContent from "@/src/components/cards/TeamCardContent";
import { createClient } from "@/lib/supabase/client";

const BigThree = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [pTeam, setPTeam] = useState<any>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchPTeam = async () => {
      const { data: pTeam, error: errorPTeam } = await supabase
        .from('brothers_teams')
        .select('brothers(first_name, last_name, positions)')
        .eq('team_id', 2)
      if (errorPTeam) console.error(errorPTeam)
        else setPTeam(pTeam)
    }
    fetchPTeam()
  }, [])

  pTeam.map((obj: { brothers: any; }) => {
    const brother = obj.brothers
    console.log(brother.positions)
  })


  return (
    <div className="relative flex border py-4 border-black rounded-2xl w-full mb-50 overflow-hidden">
      <ExpandArrow isExpanded={isExpanded} setIsExpanded={setIsExpanded}/>

      <motion.div
        className="flex w-full"
        animate={{ height: isExpanded ? "30rem" : "15rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <TeamCardContent 
          teamName="President's Team"
          caption="The President's Team enforces internal and external standards, and it serves as the top organizational layer of the fraternity."
          imageString="/good3316.JPG" 
          border={true}
          execName="Elizabeth Myers"
          execTitle="Chapter President"
          description="heireirheif"
          isExpanded={isExpanded} 
        />

        <TeamCardContent
          teamName="Executive Vice President's Team"
          caption="From internal communication to development with AI, the EVP's Team handles a majority of the technical necessities that keep AKPsi moving."
          imageString="/good3316.JPG"
          border={true}
          execName="Justin Hall"
          execTitle="Executive Vice President"
          description={'as'}
          isExpanded={isExpanded}
        />

        <TeamCardContent
          teamName="Finance Team"
          caption="The Finance Team is responsible for the chapter's spend and budget, among other critical financial processes for the fraternity."
          imageString="/good3316.JPG"
          border={false}
          execName="Brother Wadhwani"
          execTitle="Vice President of Finance"
          description="heireirheif"
          isExpanded={isExpanded}
        />
      </motion.div>
    </div>
  )
}

export default BigThree