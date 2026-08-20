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
  positions: string[];
  linkedin: string;
}

type Position = {
  id: number
  name: string
  lead: boolean
  brothers: Brother[]
}

const TeamCardContent = (props: { teamId: number; border: boolean; caption: string; isExpanded: boolean; }) => {
  const [teamName, setTeamName] = useState<string>('')
  const [positions, setPositions] = useState<Position[]>([])
  const [execBrother, setExecBrother] = useState<Brother | null>(null)
  const [execPositionName, setExecPositionName] = useState<string>('')
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
          lead,
          brother_team_position (
            brothers ( id, first_name, last_name, headshot, persona, exec, positions, linkedin )
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
        lead: position.lead,
        brothers: position.brother_team_position.flatMap(item => {
          if (!item.brothers) return []
          return Array.isArray(item.brothers) ? item.brothers : [item.brothers]
        })
      }))
      setPositions(flattened)

      const execPosition = flattened.find(pos => pos.id === props.teamId)
      const exec = execPosition?.brothers[0] || null
      setExecBrother(exec)
      if (execPosition) setExecPositionName(execPosition.name)
    }

    fetchTeamData()
  }, [])

  return (
    <div className={`flex flex-col flex-1 px-4 ${props.border ? `border-r border-gray-400` : ``}`}>
      <p className="font-crimson text-xl font-semibold pl-2 pb-1">{teamName}</p>
      <p className="font-sans sm:text-base/6.5 lg:text-sm xl:text-base/6.5 pl-2 pb-1">{props.caption}</p>

      <AnimatePresence>
        {props.isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden font-crimson text-base pb-1 mt-2 pl-2 pr-2"
          >
            <div className="flex flex-col gap-4 pt-2 pb-6">
              {positions.map(position => {
                if (position.lead) return
                return (
                  <div className='flex flex-col' key={position.id}>
                    <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#6e6d6d] pb-1">{position.name}</p>
                    {position.brothers.map((brother) => (
                      <p className={`-mt-1 font-semibold`} key={brother.id}>
                        {brother.persona ? "Brother" : brother.first_name} {brother.last_name}
                      </p>
                    ))}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {execBrother && (
        <motion.a 
          className="bg-cream hover:bg-[#dddddd] transition-colors ease-in-out duration-100 rounded-lg flex items-center gap-4 p-2 w-fit mt-auto"
          href={execBrother.linkedin}
          initial={{ x: 0, y: 0 }}
          whileHover={{ x: 4, y: -4 }}
          transition={{ duration: 0.1 }}
        >
          <div className="relative shrink-0 rounded-full border border-black w-24 h-24">
            <Image
              alt="Executive Board Member Headshot"
              src={execBrother.headshot}
              fill
              sizes="96px"
              className="rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col h-fit">
            <p className="font-crimson text-xl font-semibold">
              {execBrother.persona ? "Brother" : execBrother.first_name} {execBrother.last_name}
            </p>
            <p className="font-crimson text-lg">{execBrother.positions[0]}</p>
          </div>
        </motion.a>
      )}
    </div>
  )
}

export default TeamCardContent;