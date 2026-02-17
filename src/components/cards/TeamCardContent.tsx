'use client'

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Brother = {
  id: string;
  first_name: string;
  last_name: string;
  headshot: string;
  persona: boolean;
  exec: boolean;
  positions: string[]
}

type Position = {
  id: number
  name: string
  brothers: Brother[]
}

const TeamCardContent = (props: { teamId: number; border: boolean; caption: string; isExpanded: boolean; }) => {
  const [teamName, setTeamName] = useState<string>('')
  const [positions, setPositions] = useState<Position[]>([])
  const [execBrother, setExecBrother] = useState<Brother | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchTeamData = async () => {
      const { data: teamData, error: teamError } = await supabase.from('teams').select().eq("id", String(props.teamId)).single()
      
      if (teamError) {
        console.error(teamError)
        return
      }
      setTeamName(teamData.name)

      const { data: positionsData, error: positionsError } = await supabase
        .from("positions")
        .select(`
          id,
          name,
          brother_team_position (
            brothers ( id, first_name, last_name, headshot, persona, exec, positions )
          )
        `)
        .eq("team_id", props.teamId)
  
      if (positionsError) {
        console.error(positionsError)
        return
      }

      const flattened: Position[] = positionsData.map(position => ({
        id: position.id,
        name: position.name,
        brothers: position.brother_team_position.flatMap(item => {
          if (!item.brothers) return []
          return Array.isArray(item.brothers) ? item.brothers : [item.brothers]
        })
      }))
      setPositions(flattened)

      const exec = flattened.find(pos => pos.id === props.teamId)?.brothers[0] || null
      setExecBrother(exec)
    }

    fetchTeamData()
  }, [])

  return (
    <div className={`flex flex-col flex-1 px-4 ${props.border ? `border-r border-gray-400` : ``}`}>
      <p className="font-crimson text-xl font-semibold pl-2">{teamName}</p>
      <p className="font-crimson xl:text-lg pl-2">{props.caption}</p>

      <AnimatePresence>
        {props.isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden font-crimson text-base mt-2 pl-2 pr-2"
          >
            <div className="text-center flex flex-col gap-2 py-2">
              {positions.map(position => (
                <div className='flex flex-col' key={position.id}>
                  <p>{position.name}</p>
                  {position.brothers.map(brother => (
                    <p className='-mt-1 font-bold' key={brother.id}>
                      {brother.persona ? "Brother" : brother.first_name} {brother.last_name}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {execBrother && (
        <motion.div 
          className="bg-cream hover:bg-[#dddddd] transition-colors ease-in-out duration-100 rounded-lg flex items-center gap-4 p-2 w-fit mt-auto"
          initial={{ x: 0, y: 0 }}
          whileHover={{ x: 10, y: -10 }}
          transition={{ duration: 0.1 }}
        >
          <div className="relative shrink-0 rounded-full border border-black w-24 h-24">
            <Image
              alt="Executive Board Member Headshot"
              src={execBrother.headshot}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col h-fit">
            <p className="font-crimson text-xl font-semibold">
              {execBrother.persona ? "Brother" : execBrother.first_name} {execBrother.last_name}
            </p>
            <p className="font-crimson text-lg">{execBrother.positions[0]}</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TeamCardContent;