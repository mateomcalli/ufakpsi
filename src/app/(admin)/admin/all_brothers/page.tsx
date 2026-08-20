'use client'

import { createClient } from "@/lib/supabase/client"
import AddMenu from "@/src/components/admin/AddMenu"
import EditMenu from "@/src/components/admin/EditMenu"
import { redirect } from 'next/navigation'
import { useState, useEffect } from "react"
import type { Brother } from "@/src/types"

const Admin = () => {
  const supabase = createClient()
  const [brothers, setBrothers] = useState<Brother[]>([])
  const [selectedUuids, setSelectedUuids] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fetchBrothers = async () => {
    const { data: brothersData, error } = await supabase.from('brothers').select().order('last_name', { ascending: true })
    if (error) console.error(error)
    else setBrothers(brothersData || [])
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) redirect("/login")

      await fetchBrothers()
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

  const filteredBrothers = brothers.filter((brother) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    const fullName = `${brother.first_name} ${brother.last_name}`.toLowerCase()
    const major = (brother.major || '').toLowerCase()
    const college = (brother.college || '').toLowerCase()
    const positions = (brother.positions || []).join(' ').toLowerCase()
    return (
      fullName.includes(query) ||
      major.includes(query) ||
      college.includes(query) ||
      positions.includes(query)
    )
  })

  return (
    <div className="relative top-24 flex flex-col gap-8 sm:gap-16 pb-16 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl">
      <div className="flex p-4 flex-col mx-auto w-full h-auto bg-white border border-neutral-300 rounded-lg">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <div className="flex items-center flex-1 h-12 border border-neutral-300 rounded-lg px-2">
            <input
              type="text"
              placeholder="Search for a brother..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full font-crimson text-xl px-2 focus:outline-none bg-transparent"
            />
          </div>
          <AddMenu />
        </div>
      </div>

      <div className="w-full border border-neutral-300 rounded-lg overflow-x-auto bg-white">
        <table className="w-full min-w-[550px] bg-white">
          <thead>
            <tr className="border-b border-neutral-300 font-crimson text-xl text-left">
              <th className="p-2 w-10"></th>
              <th className="p-2 font-normal">Name</th>
              <th className="p-2 font-normal">Major</th>
              <th className="p-2 font-normal">College</th>
              <th className="p-2 font-normal w-12"></th>
            </tr>
          </thead>
          <tbody>
            {filteredBrothers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500 font-crimson text-xl">
                  No brothers found matching &quot;{searchQuery}&quot;
                </td>
              </tr>
            ) : (
              filteredBrothers.map((brother, i) => (
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
                    <EditMenu brother={brother} onUpdate={fetchBrothers} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Admin