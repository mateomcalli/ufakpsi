'use client'

import { useState, useEffect } from "react"
import { BsThreeDots } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"
import { CgClose } from "react-icons/cg"
import { createClient } from "@/lib/supabase/client"
import type { Brother } from "@/src/types"

type Position = {
  id: string;
  name: string;
  team_id: string;
}

const EditMenu = ({ brother, onUpdate }: { brother: Brother; onUpdate?: () => void }) => {
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [major, setMajor] = useState<string>(brother.major || '')
  const [minor, setMinor] = useState<string>(brother.minor || '')
  const [isPersona, setIsPersona] = useState<boolean>(brother.persona ?? false)
  const [headshot, setHeadshot] = useState<File | null>(null)
  const [imgReceived, setImgReceived] = useState<boolean>(false)
  const [allPositions, setAllPositions] = useState<Position[]>([])
  const [positionsIds, setPositionsIds] = useState<string[]>([])
  const [positionSearch, setPositionSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const filteredPositions = allPositions.filter(p =>
    p.name.toLowerCase().includes(positionSearch.toLowerCase().trim())
  )

  useEffect(() => {
    setMajor(brother.major || '')
    setMinor(brother.minor || '')
    setIsPersona(brother.persona ?? false)
  }, [brother])

  useEffect(() => {
    if (!menuOpen) return

    const fetchData = async () => {
      const { data: positionsData, error: positionsErr } = await supabase
        .from('positions')
        .select('*')
        .order('name', { ascending: true })

      if (positionsErr) {
        console.error(positionsErr)
        return
      }

      setAllPositions(positionsData || [])

      // Use brother.positions text array as source of truth for checked state
      const brotherPosNames = brother.positions || []
      const matchedIds = (positionsData || [])
        .filter(p => brotherPosNames.includes(p.name))
        .map(p => String(p.id))
      setPositionsIds(matchedIds)
    }

    fetchData()
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) {
      setPositionSearch('')
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPositionSearch('')
        setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  const handleHeadshotChange = (file: File | null) => {
    setHeadshot(file)
    setImgReceived(!!file)
  }

  const positionChange = (positionId: string | number) => {
    const idStr = String(positionId)
    setPositionsIds(prev =>
      prev.includes(idStr) ? prev.filter(id => id !== idStr) : [...prev, idStr]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let headshotUrl: string | null = null
      let oldFileNameToDelete: string | null = null

      if (headshot) {
        const fileExt = headshot.name.split('.').pop()
        const headshotPath = `${brother.first_name}_${brother.last_name}_${Date.now()}.${fileExt}`

        if (brother.headshot) {
          oldFileNameToDelete = decodeURIComponent(
            brother.headshot.split('/headshots/').pop()?.split('?')[0] || ''
          )
        }

        const { error: uploadError } = await supabase
          .storage
          .from('headshots')
          .upload(headshotPath, headshot)

        if (uploadError) {
          console.error('Storage upload error:', uploadError)
          alert(`Error uploading image: ${uploadError.message}`)
          setLoading(false)
          return
        }

        const { data: urlData } = supabase
          .storage
          .from('headshots')
          .getPublicUrl(headshotPath)

        headshotUrl = urlData.publicUrl
      }

      const selectedPositions = (allPositions || []).filter(p => positionsIds.includes(String(p.id)))
      const posNames: string[] = selectedPositions.map(p => p.name)

      // Update brothers table FIRST — this is the reliable source of truth
      const updateData: Record<string, any> = {
        major: major,
        minor: minor,
        persona: isPersona,
        positions: posNames
      }

      if (headshotUrl) {
        updateData.headshot = headshotUrl
      }

      const { error: updateError } = await supabase
        .from('brothers')
        .update(updateData)
        .eq('id', brother.id)

      if (updateError) {
        console.error(updateError)
        alert('Error updating brother details.')
        setLoading(false)
        return
      }

      // Sync join table: compute diff to avoid duplicate key issues
      const { data: currentJoinRows } = await supabase
        .from('brother_team_position')
        .select('position_id')
        .eq('brother_id', brother.id)

      const currentPosIds = (currentJoinRows || []).map(r => String(r.position_id))
      const desiredPosIds = positionsIds

      // Positions to add (checked but not yet in join table)
      const toAdd = desiredPosIds.filter(id => !currentPosIds.includes(id))
      // Positions to remove (in join table but unchecked)
      const toRemove = currentPosIds.filter(id => !desiredPosIds.includes(id))

      // Insert new join table rows
      for (const posId of toAdd) {
        const pos = (allPositions || []).find(p => String(p.id) === posId)
        if (pos) {
          await supabase.from('brother_team_position').insert({
            brother_id: brother.id,
            team_id: Number(pos.team_id),
            position_id: Number(pos.id),
            lead: !!(pos as any).lead
          })
        }
      }

      // Remove unchecked join table rows
      for (const posId of toRemove) {
        await supabase
          .from('brother_team_position')
          .delete()
          .eq('brother_id', brother.id)
          .eq('position_id', Number(posId))
      }

      if (oldFileNameToDelete) {
        const { error: removeErr } = await supabase
          .storage
          .from('headshots')
          .remove([oldFileNameToDelete])

        if (removeErr) {
          console.warn('Could not remove old headshot file from storage:', removeErr)
        }
      }

      setMenuOpen(false)
      setHeadshot(null)
      setImgReceived(false)
      if (onUpdate) {
        onUpdate()
      }
    } catch (err) {
      console.error(err)
      alert('An unexpected error occurred.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setMenuOpen(true)}
        className="hover:cursor-pointer w-fit p-1.5 rounded-lg transition duration-300 hover:bg-gray-400"
        title="Edit Brother"
      >
        <BsThreeDots size={20} />
      </button>

      <AnimatePresence initial={false} mode="wait">
        {menuOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20 p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-[95%] sm:w-4/6 md:w-4/7 xl:w-1/3 2xl:w-[31%] max-h-[92vh] border border-neutral-300 rounded-lg bg-cream font-crimson p-4 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <form className="flex flex-col h-full gap-3" onSubmit={handleSubmit}>
                <button
                  type="button"
                  onClick={() => { setPositionSearch(''); setMenuOpen(false) }}
                  className="hover:cursor-pointer w-fit h-fit block absolute top-5 right-5"
                >
                  <CgClose
                    className="hover:text-red-600 transition-colors duration-200"
                    size={24}
                  />
                </button>

                <section className="flex flex-col font-crimson gap-2.5 flex-1">
                  <p className="text-2xl font-semibold">
                    Edit {brother.first_name} {brother.last_name}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-[0.6] flex-col gap-0.5">
                      <p className="text-lg">Major</p>
                      <input
                        placeholder="Computer Science"
                        type="text"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-8 pl-2"
                      />
                    </div>
                    <div className="flex-[0.4] flex-col gap-0.5">
                      <p className="text-lg">Minor</p>
                      <input
                        placeholder="Finance"
                        type="text"
                        value={minor}
                        onChange={(e) => setMinor(e.target.value)}
                        className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-8 pl-2"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <p className="text-lg">Persona Status</p>
                    <input
                      type="checkbox"
                      checked={isPersona}
                      onChange={(e) => setIsPersona(e.target.checked)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </div>

                  <div className="flex flex-col w-full gap-1">
                    <p className="text-lg">Position(s)</p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        placeholder="Search positions..."
                        value={positionSearch}
                        onChange={(e) => setPositionSearch(e.target.value)}
                        className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-7 px-2 text-md font-crimson"
                      />
                      <div className="flex flex-col gap-1 p-3 border border-neutral-300 rounded-lg max-h-40 overflow-y-auto bg-white">
                        {filteredPositions.length === 0 ? (
                          <p className="text-md text-gray-500 italic font-crimson">No matching positions found.</p>
                        ) : (
                          filteredPositions.map(p => (
                            <label key={p.id} className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-100">
                              <input
                                onChange={() => positionChange(p.id)}
                                type="checkbox"
                                value={p.id}
                                checked={positionsIds.includes(String(p.id))}
                                className="w-4 h-4"
                              />
                              <span>{p.name}</span>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="text-lg">Change Headshot Image</p>
                    <input
                      type="file"
                      accept="image/*"
                      id={`image-upload-edit-${brother.id}`}
                      onChange={(e) => handleHeadshotChange(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`image-upload-edit-${brother.id}`}
                      className={`${imgReceived ? 'bg-[#32c04c] text-white' : 'bg-white text-black'}
                      border border-neutral-300 rounded-lg h-9 px-3 flex w-full sm:w-1/2 items-center justify-center cursor-pointer hover:bg-gray-100 transition text-sm font-sans`}
                    >
                      {imgReceived ? 'New Image Selected!' : 'Choose New Image'}
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="hover:cursor-pointer bg-[#248837] border border-[#145c21] w-full gap-2 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 mt-2 disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </section>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EditMenu