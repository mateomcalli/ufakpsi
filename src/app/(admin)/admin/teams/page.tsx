import createClient from "@/lib/supabase/server"
import { redirect } from 'next/navigation'

const Teams = async () => {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/login")

  return (
    <>
    </>
  )
}

export default Teams