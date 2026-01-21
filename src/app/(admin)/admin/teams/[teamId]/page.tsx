import createClient from "@/lib/supabase/server";

const TeamPage = async ({ params }: { params: Promise<{ teamId: string }> }) => {
  const { teamId } = await params
  const teamIdInt = parseInt(teamId, 10)

  const supabase = await createClient()
  const { data, error } = await supabase.from('teams').select().eq('id', teamIdInt)
  if (error) console.error(error)
    else console.log(data)


  return (
    <section className="relative top-24 w-6xl m-auto">
      <table className="w-full bg-white">
        <thead>
          <tr className="border-b border-gray-300 font-crimson text-xl text-left">
            <th className="p-2"></th>
            <th className="p-2 font-normal">Name</th>
            <th className="p-2 font-normal">Major</th>
            <th className="p-2 font-normal">College</th>
            <th className="p-2 font-normal"></th>
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </section>
  )
}

export default TeamPage