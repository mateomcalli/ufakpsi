import createClient from "@/lib/supabase/server"
import { redirect } from 'next/navigation'
import { TiArrowRight } from "react-icons/ti";
import Link from "next/link"
import DashboardButton from "@/src/components/ui/DashboardButton";

const Admin = async () => {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect("/login")

  return (
    <div className="relative top-24 flex flex-col gap-4 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl min-h-112">
      <p className="text-3xl font-crimson">Welcome, admin!</p>
      <div className="flex gap-2 mx-auto w-full lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl">
        <DashboardButton text="Manage all brothers" href='/admin/all_brothers'/>
        <DashboardButton text="Manage items and their photos" href='/admin/events'/>
        <DashboardButton text="Manage teams and positions" href='/admin/teams'/>
      </div>
    </div>
  )
}

export default Admin