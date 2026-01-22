'use client'

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Brother = {
  id: string
  first_name: string
  last_name: string
}

type PositionWithBrother = {
  id: number
  name: string
  brother_team_position: { brothers?: Brother[] }[]
}

const TeamCardContent = (props: { teamId: number; border: boolean; caption: string; isExpanded: boolean; }) => {
  const [positions, setPositions] = useState<PositionWithBrother[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchPositions = async () => {
      const { data, error } = await supabase
        .from("positions")
        .select(`
          id,
          name,
          brother_team_position (
            brothers ( id, first_name, last_name )
          )
        `)
        .eq("team_id", props.teamId)
  
      if (error) {
        console.error(error)
      } else {
        console.log(data)
        setPositions(data)
      }
    }

    fetchPositions()
  }, [])

  return (
    <div className={`flex flex-col flex-1 px-4 ${props.border ? `border-r border-gray-400` : ``}`}>
      <p className="font-crimson text-xl font-semibold pl-2">Placeholder teamName</p>
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
                  <p key={position.id}>{position.name}</p>
                  {position.brother_team_position.map((item) => {
                    const brothersArray = Array.isArray(item.brothers) // checks if brother_team_position exists, makes empty array if not. SHOULD ALWAYS EXIST
                      ? item.brothers
                      : item.brothers
                      ? [item.brothers]
                      : []

                    return brothersArray.map((brother) => (
                      <p className='-mt-1 font-bold' key={brother.id}>
                        {brother.first_name} {brother.last_name}
                      </p>
                    ))
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        className="bg-cream hover:bg-[#dddddd] transition-colors ease-in-out duration-100 rounded-xl flex items-center gap-4 p-2 w-fit mt-auto"
        initial={{ x: 0, y: 0 }}
        whileHover={{ x: 10, y: -10 }}
        transition={{ duration: 0.1 }}
      >
        <div className="relative shrink-0 rounded-full border border-black w-24 h-24">
          <Image
            alt="Executive Board Member Headshot"
            src='/good3316.jpg'
            fill
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col h-fit">
          <p className="font-crimson text-xl font-semibold">Exec</p>
          <p className="font-crimson text-lg">PosTitle</p>
        </div>
      </motion.div>
    </div>
  )
}

export default TeamCardContent;
