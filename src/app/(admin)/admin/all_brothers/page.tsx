'use client'

import { createClient } from "@/lib/supabase/client"
import AddMenu from "@/src/components/admin/AddMenu"
import EditMenu from "@/src/components/admin/EditMenu"
import { redirect } from 'next/navigation'
import { useState, useEffect } from "react"

type Brother = {
  id: string;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;
  college: string;
  start_year: number;
  grad_year: number;
  headshot: string;
  exec: boolean;
  persona: boolean;
  active: boolean;
  linkedin: string;
  positions: string[];
}

const Admin = () => {
  const supabase = createClient()
  const [brothers, setBrothers] = useState<Brother[]>([])
  const [selectedUuids, setSelectedUuids] = useState<string[]>([])

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) redirect("/login")
      
      const { data: brothersData, error } = await supabase.from('brothers').select().order('last_name', { ascending: true })
      if (error) console.error(error)
      else setBrothers(brothersData)
    }
    checkAuth()
  }, [])

  const handleCheckbox = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUuids([...selectedUuids, id])
    } else {
      setSelectedUuids(selectedUuids.filter(uuid => uuid !== id))
    }
  }

  const handleBulkAction = () => {
    console.log('Selected UUIDs:', selectedUuids)
  }

  return (
    <div className="relative flex flex-col gap-16 pt-8 top-16">
      <div className="flex p-4 flex-col m-auto w-6xl h-40 bg-white border border-gray-300 rounded-lg">
        <div className="flex gap-4">
          <div className="flex items-center w-3/4 h-12 border border-gray-300 rounded-lg">
            <p className="text-gray-500 font-crimson text-xl pl-4">Search for a brother...</p>
          </div>
          <AddMenu/>
        </div>
      </div>

      <div className="m-auto w-6xl border border-gray-300 rounded-lg overflow-hidden">
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
            {brothers.map((brother, i) => (
              <tr key={i} className="hover:bg-gray-200 transition duration-300 ease-in-out border-b border-gray-200 last:border-b-0">
                <td className="py-2 px-3">
                  <input 
                    type="checkbox"
                    onChange={(e) => handleCheckbox(brother.id, e.target.checked)}
                    checked={selectedUuids.includes(brother.id)}
                  />
                </td>
                <td className="p-2 font-crimson text-lg">{brother.first_name} {brother.last_name}</td>
                <td className="p-2 font-crimson text-lg">{brother.major}</td>
                <td className="p-2 font-crimson text-lg">{brother.college}</td>
                <td className="p-2">
                  <EditMenu brother={brother}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}

export default Admin