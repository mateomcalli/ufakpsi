"use client"

import Image from "next/image";
import BigThree from "@/src/components/brotherhood/BigThree";
import TeamSect from "@/src/components/brotherhood/TeamSect";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import type { Team } from "@/src/types"

const BrotherhoodContent = () => {
  const [teams, setTeams] = useState<Team[]>([])

  useEffect(() => {
    const supabase = createClient()
    const getTeamIds = async () => {
      const { data: fetchedTeams, error: teamIdsError } = await supabase
        .from("teams")
        .select()
        .order("id", { ascending: true })

      if (teamIdsError) {
        console.error(teamIdsError)
        return
      }

      setTeams(fetchedTeams)
    }

    getTeamIds()
  }, [])

  const bigThree = teams.filter(t => t.big_three)
  const normalTeams = teams.filter(t => !t.big_three)

  return (
    <section className="flex flex-col gap-4 px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto mt-24 h-fit relative">
      <div className="px-0 sm:px-4">
        <h1 className="font-merry text-2xl md:text-3xl">Brotherhood at Alpha Kappa Psi</h1>
        <h2 className="font-sans text-lg text-lblue">Leadership, growth, and community.</h2>
      </div>

      <div className="relative w-full shrink-0 h-80">
        <Image
          src="/tommy_iyaan_colby.JPG"
          alt="Executive Board 25-26"
          fill
          className="rounded-2xl object-cover object-[30%_44%]"
        />
      </div>

      {/* big three is hardcoded, there won't be an option to remove them so ids won't change */}
      <div className="flex gap-4 flex-col">
        <div className="hidden lg:block">
          <BigThree />
        </div>
        <div className="flex gap-4 flex-col lg:hidden">
          {bigThree.map(t => (
            <TeamSect key={t.id} teamId={t.id} caption={t.caption} />
          ))}
        </div>
      </div>

      {normalTeams.map((team, i) => {
        if (i % 2 !== 0) return null

        const nextTeam = normalTeams[i + 1]

        return (
          <div key={team.id} className="flex gap-4 flex-col lg:flex-row lg:items-start">
            <TeamSect teamId={team.id} caption={team.caption} />
            {nextTeam && <TeamSect teamId={nextTeam.id} caption={nextTeam.caption} />}
          </div>
        )
      })}

    </section>
  )
};

export default BrotherhoodContent