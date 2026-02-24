import createClient from "@/lib/supabase/server";

const TeamPage = async ({ params }: { params: Promise<{ teamId: string }> }) => {
  const { teamId } = await params
  const teamIdInt = parseInt(teamId, 10)

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('brother_team_position')
    .select('brothers(first_name, last_name, major, college)')
    .eq('team_id', teamIdInt)
    
  if (error) {
    console.error(error)
    return
  }

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
          {data?.map((item, i) => {
            const brother = item.brothers as unknown as { first_name: string; last_name: string; major: string; college: string; }
            return (
              <tr key={i} className="hover:bg-gray-200 transition duration-300 ease-in-out border-b border-gray-200 last:border-b-0">
                <td className="py-2 px-3">
                </td>
                <td className="p-2 font-crimson text-lg">{brother.first_name} {brother.last_name}</td>
                <td className="p-2 font-crimson text-lg">{brother.major}</td>
                <td className="p-2 font-crimson text-lg">{brother.college}</td>
                <td>
                  
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default TeamPage