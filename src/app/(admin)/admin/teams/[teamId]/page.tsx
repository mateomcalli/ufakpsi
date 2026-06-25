import createClient from "@/lib/supabase/server";

const TeamPage = async ({ params }: { params: Promise<{ teamId: string }> }) => {
  const { teamId } = await params
  const teamIdInt = parseInt(teamId, 10)

  const supabase = await createClient()
  const { data, error } = await supabase
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
    
  if (error) {
    console.error(error)
    return
  }

  // 1. Separate the data into leads vs regular roles
  const lead = data?.filter((pos: any) => pos.lead) || []
  const members = data?.filter((pos: any) => !pos.lead) || []

  return (
    <section className="flex gap-4 px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto mt-24 h-fit relative">
      
      {/* LEFT COLUMN: Executive Leads */}
      {lead.length > 0 && (
        <div className="w-full mx-8 sm:mx-0 md:w-56 lg:w-64 xl:w-72 2xl:w-80 p-6 rounded-xl bg-white sticky shadow-md ">
          <h2 className="m-auto text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Team Leadership</h2>
          {lead.map((position: any) => (
            <div key={position.id} className="mb-4 last:mb-0">
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

      {/* RIGHT COLUMN: Regular Positions Directory */}
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

    </section>
  )
}

export default TeamPage