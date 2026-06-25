import createClient from "@/lib/supabase/server";
import Image from "next/image";

const TeamPage = async ({ params }: { params: Promise<{ teamId: string }> }) => {
  const { teamId } = await params
  const teamIdInt = parseInt(teamId, 10)

  const supabase = await createClient()
  const { data: positionsData, error: positionsError } = await supabase
    .from('positions')
    .select(`
      id,
      name,
      team_id,
      lead,
      brother_team_position (
        brothers (
          first_name,
          last_name,
          headshot
        )
      )
    `)
    .eq('team_id', teamIdInt)
    .order('id', { ascending: true }) as any;

  if (positionsError) {
    console.error(positionsError)
    return
  }

  const { data: teamName, error: teamNameError } = await supabase
    .from('teams')
    .select('name')
    .eq('id', teamIdInt)
    .single()

  if (teamNameError) {
    console.error(teamNameError)
    return
  }

  const lead = positionsData?.filter((pos: any) => pos.lead) || []
  const members = positionsData?.filter((pos: any) => !pos.lead) || []

  return (
    <section className="flex flex-col gap-4 px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto mt-24 h-fit relative">

      <div className="w-full px-4"> 
        <h1 className="font-crimson text-3xl">{teamName.name}</h1>
        
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT COLUMN: team lead */}
        {lead.length > 0 && (
          <div className="flex flex-col gap-4 w-full h-fit md:w-64 xl:w-72 2xl:w-80 p-5 rounded-xl bg-white sticky shadow-md ">
            <h2 className="text-center text-xs font-bold uppercase tracking-wider text-neutral-400">Team lead</h2>
            <div className="relative shrink-0 rounded-full w-28 h-28 mx-auto border border-black">
              <Image
                alt="Executive Board Member Headshot"
                src={lead[0]?.brother_team_position[0]?.brothers.headshot}
                fill
                sizes="96px"
                className="object-cover rounded-full"
              />
            </div>
            {lead.map((position: any) => (
              <div key={position.id} className="text-center">
                <p className="font-crimson text-xl font-semibold text-neutral-800">{position.name}</p>
                {position.brother_team_position.map((b: any, idx: number) => (
                  <p key={idx} className="font-sans text-sm text-neutral-600">
                    {b.brothers.first_name} {b.brothers.last_name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* RIGHT COLUMN: team members */}
        <div className="w-full md:flex-1 bg-white border border-neutral-300 rounded-xl divide-y divide-neutral-200">
          {members.map((position: any) => (
            <div
              key={position.id}
              className="flex items-center justify-between p-4 hover:bg-neutral-50 transition"
            >
              <p className="font-crimson text-lg text-neutral-900">{position.name}</p>
              <div className="text-right">
                {position.brother_team_position.length > 0 ? (
                  position.brother_team_position.map((b: any, idx: number) => (
                    <p key={idx} className="font-sans text-neutral-700">
                      {b.brothers.first_name} {b.brothers.last_name}
                    </p>
                  ))
                ) : (
                  <p className="font-sans text-sm italic text-neutral-400">Vacant</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

export default TeamPage