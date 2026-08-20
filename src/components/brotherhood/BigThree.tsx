'use client'

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ExpandArrow from "@/src/components/ui/ExpandArrow";
import TeamCardContent from "@/src/components/cards/TeamCardContent";
import { createClient } from "@/lib/supabase/client";

type BigThreeTeam = {
  id: number;
  caption: string;
}

const BigThree = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const [teams, setTeams] = useState<BigThreeTeam[]>([])

  useEffect(() => {
    const supabase = createClient()
    const fetchCaptions = async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('id, caption')
        .in('id', [1, 2, 3])
        .order('id', { ascending: true })

      if (error) {
        console.error(error)
        return
      }
      setTeams(data)
    }
    fetchCaptions()
  }, [])

  const getCaption = (teamId: number) => teams.find(t => t.id === teamId)?.caption || ''

  return (
    <div className="relative flex border py-4 border-neutral-300 rounded-2xl w-full overflow-hidden">
      <ExpandArrow isExpanded={isExpanded} setIsExpanded={setIsExpanded} />

      <motion.div
        className="flex w-full"
        animate={{ height: isExpanded ? "auto" : "15rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <TeamCardContent
          teamId={1}
          caption={getCaption(1)}
          border={true}
          isExpanded={isExpanded}
        />

        <TeamCardContent
          teamId={2}
          caption={getCaption(2)}
          border={true}
          isExpanded={isExpanded}
        />

        <TeamCardContent
          teamId={3}
          caption={getCaption(3)}
          border={false}
          isExpanded={isExpanded}
        />
      </motion.div>
    </div>
  )
}

export default BigThree