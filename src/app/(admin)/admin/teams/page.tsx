import createClient from "@/lib/supabase/server"
import { redirect } from 'next/navigation'
import TeamCard from "@/src/components/cards/TeamDBCard"

const Teams = async () => {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/login")

  const teamNameImage = [
    {id: 1, name: 'President\'s Team', image: '/guac.jpg'},
    {id: 2, name: 'EVP Team', image: '/guac.jpg'},
    {id: 3, name: 'Finance Team', image: '/guac.jpg'},
    {id: 4, name: 'Membership Team', image: '/guac.jpg'},
    {id: 5, name: 'Professional Team', image: '/guac.jpg'},
    {id: 6, name: 'A&E Team', image: '/guac.jpg'},
    {id: 7, name: 'Pro Activities Team', image: '/guac.jpg'},
    {id: 8, name: 'Public Relations Team', image: '/guac.jpg'},
    {id: 9, name: 'Social Affairs Team', image: '/guac.jpg'},
    {id: 10, name: 'Community Service Team', image: '/guac.jpg'},
    {id: 11, name: 'DEI Team', image: '/guac.jpg'},
  ]

  return (
    <section className="relative top-24 pb-16 flex flex-col mx-auto min-[600px]:grid w-fit min-[720px]:grid-cols-2 min-[1060px]:grid-cols-3 min-[1390px]:grid-cols-4 gap-4">
      {teamNameImage.map((team, i) => (
        <TeamCard key={i} id={team.id} image={team.image} teamName={team.name}/>
      ))}
    </section>
  )
}

export default Teams