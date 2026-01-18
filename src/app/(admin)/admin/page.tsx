import createClient from "@/lib/supabase/server"
import { redirect } from 'next/navigation'
import DBCard from "@/src/components/cards/DBCard"

const Admin = async () => {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/login")

  return (
    <div className="relative top-24 flex flex-col gap-8 pl-[30px] pr-8 w-full h-144">
      <p className="text-3xl font-crimson text-center">Welcome, admin!</p>
      <div className="flex lg:flex-row flex-col gap-4 w-full h-full">
        <DBCard DBImage={'/pickle.png'} DBName={'All Brothers'}/>
        <DBCard DBImage={'/pickle.png'} DBName={'Teams'}/>
      </div>
    </div>
  )
}

export default Admin