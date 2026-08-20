'use client'

import { use, useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { redirect } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { BiBookBookmark } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"

type Brother = {
  first_name: string
  last_name: string
  headshot: string
}

type BrotherTeamPosition = {
  brothers: Brother
}

type PositionItem = {
  id: number
  name: string
  team_id: number
  lead: boolean
  brother_team_position: BrotherTeamPosition[]
}

const TeamPage = ({ params }: { params: Promise<{ teamId: string }> }) => {
  const resolvedParams = use(params)
  const teamIdInt = parseInt(resolvedParams.teamId, 10)

  const supabase = createClient()
  const [teamName, setTeamName] = useState<string>('')
  const [positions, setPositions] = useState<PositionItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false)
  const [newPosName, setNewPosName] = useState<string>('')
  const [newIsLead, setNewIsLead] = useState<boolean>(false)

  const [editingPos, setEditingPos] = useState<PositionItem | null>(null)
  const [editPosName, setEditPosName] = useState<string>('')
  const [editIsLead, setEditIsLead] = useState<boolean>(false)

  const [deletingPos, setDeletingPos] = useState<PositionItem | null>(null)
  const [actionLoading, setActionLoading] = useState<boolean>(false)

  const fetchData = async () => {
    const { data: teamData, error: teamErr } = await supabase
      .from('teams')
      .select('name')
      .eq('id', teamIdInt)
      .single()

    if (teamErr) console.error(teamErr)
    else setTeamName(teamData?.name || 'Team')

    const { data: positionsData, error: positionsErr } = await supabase
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
      .order('id', { ascending: true }) as any

    if (positionsErr) console.error(positionsErr)
    else setPositions(positionsData || [])

    setLoading(false)
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) redirect("/login")
      await fetchData()
    }
    checkAuth()
  }, [teamIdInt])

  // Keyboard shortcut: Escape key closes active modal
  useEffect(() => {
    const activeModal = isAddOpen || editingPos || deletingPos
    if (!activeModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddOpen(false)
        setEditingPos(null)
        setDeletingPos(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAddOpen, editingPos, deletingPos])

  // 1. Add Position
  const handleAddPosition = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPosName.trim()) return

    setActionLoading(true)
    try {
      const { error } = await supabase.from('positions').insert({
        name: newPosName.trim(),
        team_id: teamIdInt,
        lead: newIsLead
      })

      if (error) {
        console.error(error)
        alert(`Error adding position: ${error.message}`)
      } else {
        setNewPosName('')
        setNewIsLead(false)
        setIsAddOpen(false)
        await fetchData()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to create position.')
    } finally {
      setActionLoading(false)
    }
  }

  // 2. Edit Position
  const handleEditPosition = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPos || !editPosName.trim()) return

    setActionLoading(true)
    try {
      const oldName = editingPos.name
      const newName = editPosName.trim()

      const { error } = await supabase
        .from('positions')
        .update({
          name: newName,
          lead: editIsLead
        })
        .eq('id', editingPos.id)

      if (error) {
        console.error(error)
        alert(`Error updating position: ${error.message}`)
      } else {
        // If name changed, update brothers.positions text arrays
        if (oldName !== newName) {
          const { data: allBrothers } = await supabase
            .from('brothers')
            .select('id, positions')

          if (allBrothers) {
            for (const bro of allBrothers) {
              const positions: string[] = bro.positions || []
              if (positions.includes(oldName)) {
                const updated = positions.map((p: string) => p === oldName ? newName : p)
                await supabase
                  .from('brothers')
                  .update({ positions: updated })
                  .eq('id', bro.id)
              }
            }
          }
        }
        setEditingPos(null)
        await fetchData()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to update position.')
    } finally {
      setActionLoading(false)
    }
  }

  // 3. Delete Position
  const handleDeletePosition = async () => {
    if (!deletingPos) return

    setActionLoading(true)
    try {
      const posNameToRemove = deletingPos.name

      // 1. Clean brothers.positions text arrays
      const { data: allBrothers } = await supabase
        .from('brothers')
        .select('id, positions')

      if (allBrothers) {
        for (const bro of allBrothers) {
          const positions: string[] = bro.positions || []
          if (positions.includes(posNameToRemove)) {
            const cleaned = positions.filter((p: string) => p !== posNameToRemove)
            await supabase
              .from('brothers')
              .update({ positions: cleaned })
              .eq('id', bro.id)
          }
        }
      }

      // 2. Remove join table references
      await supabase.from('brother_team_position').delete().eq('position_id', deletingPos.id)

      // 3. Delete the position itself
      const { error } = await supabase.from('positions').delete().eq('id', deletingPos.id)

      if (error) {
        console.error(error)
        alert(`Error deleting position: ${error.message}`)
      } else {
        setDeletingPos(null)
        await fetchData()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to delete position.')
    } finally {
      setActionLoading(false)
    }
  }

  const lead = positions.filter((pos) => pos.lead) || []
  const members = positions.filter((pos) => !pos.lead) || []
  const leadHeadshot = lead[0]?.brother_team_position[0]?.brothers?.headshot || '/akp_emblem.png'

  return (
    <section className="flex flex-col gap-6 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl mt-24 h-fit relative pb-16">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-3">
        <Link
          href="/admin/teams"
          className="flex items-center gap-1 text-sm font-sans text-neutral-500 hover:text-dblue transition duration-200 w-fit"
        >
          <FiArrowLeft size={16} />
          <span>Back to All Teams</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="font-crimson text-3xl font-semibold text-neutral-900">{teamName}</h1>

          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#248837] border border-[#65c476] px-4 gap-2 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 w-full sm:w-auto self-start sm:self-auto cursor-pointer"
          >
            <BiBookBookmark size={20} />
            <span className="font-crimson text-lg font-semibold whitespace-nowrap">Add a position</span>
          </button>
        </div>
      </div>

      {loading ? (
        <p className="font-crimson text-lg text-neutral-500 italic">Loading team positions...</p>
      ) : positions.length === 0 ? (
        <div className="p-8 bg-white border border-neutral-300 rounded-xl text-center flex flex-col items-center gap-3">
          <p className="font-crimson text-xl text-neutral-600">No positions found for this team yet.</p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-[#248837] text-white px-4 py-2 rounded-lg font-sans text-sm font-semibold hover:bg-[#1d6b2e] transition cursor-pointer"
          >
            Create First Position
          </button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {/* LEFT COLUMN: Team Lead */}
          {lead.length > 0 && (
            <div className="flex flex-col gap-4 w-full h-fit md:w-64 xl:w-72 2xl:w-80 p-5 rounded-xl bg-white md:sticky top-28 shadow-md border border-neutral-200">
              <h2 className="text-center text-xs font-bold uppercase tracking-wider text-neutral-400">Team lead</h2>

              <div className="relative shrink-0 rounded-full w-28 h-28 mx-auto border border-black overflow-hidden bg-neutral-100">
                <Image
                  alt="Team Lead Headshot"
                  src={leadHeadshot}
                  fill
                  sizes="112px"
                  className="object-cover rounded-full"
                />
              </div>

              {lead.map((position) => (
                <div key={position.id} className="text-center flex flex-col gap-1 items-center">
                  <div className="flex items-center justify-center gap-1.5 w-full">
                    <p className="font-crimson text-xl font-semibold text-neutral-800">{position.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPos(position)
                        setEditPosName(position.name)
                        setEditIsLead(position.lead)
                      }}
                      className="p-1 text-neutral-400 hover:text-dblue rounded transition cursor-pointer"
                      title="Edit Position"
                    >
                      <FiEdit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingPos(position)}
                      className="p-1 text-neutral-400 hover:text-red-600 rounded transition cursor-pointer"
                      title="Delete Position"
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </div>

                  {position.brother_team_position && position.brother_team_position.length > 0 ? (
                    position.brother_team_position.map((b, idx) => (
                      <p key={idx} className="font-sans text-sm text-neutral-600">
                        {b.brothers?.first_name} {b.brothers?.last_name}
                      </p>
                    ))
                  ) : (
                    <p className="font-sans text-xs italic text-neutral-400">Vacant</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* RIGHT COLUMN: Team Members */}
          <div className="w-full md:flex-1 bg-white border border-neutral-300 rounded-xl divide-y divide-neutral-200">
            {members.length === 0 ? (
              <div className="p-6 text-center text-neutral-400 font-sans italic text-sm">
                No member positions added yet.
              </div>
            ) : (
              members.map((position) => (
                <div
                  key={position.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-neutral-50 transition gap-2 sm:gap-4"
                >
                  {/* Position Title & Action Buttons */}
                  <div className="flex items-center gap-2">
                    <p className="font-crimson text-lg text-neutral-900 font-semibold">{position.name}</p>
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPos(position)
                          setEditPosName(position.name)
                          setEditIsLead(position.lead)
                        }}
                        className="p-1 text-neutral-400 hover:text-dblue hover:bg-neutral-100 rounded transition cursor-pointer"
                        title="Edit Position"
                      >
                        <FiEdit2 size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeletingPos(position)}
                        className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition cursor-pointer"
                        title="Delete Position"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Assigned Brother(s) */}
                  <div className="text-left sm:text-right">
                    {position.brother_team_position && position.brother_team_position.length > 0 ? (
                      position.brother_team_position.map((b, idx) => (
                        <p key={idx} className="font-sans text-neutral-700">
                          {b.brothers?.first_name} {b.brothers?.last_name}
                        </p>
                      ))
                    ) : (
                      <p className="font-sans text-sm italic text-neutral-400">Vacant</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODAL 1: ADD POSITION */}
      <AnimatePresence initial={false} mode="wait">
        {isAddOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-[95%] sm:w-96 border border-neutral-300 rounded-xl bg-cream font-crimson p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="hover:cursor-pointer w-fit h-fit block absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition duration-200"
              >
                <CgClose size={22} />
              </button>

              <h2 className="text-2xl font-semibold mb-4">Add a new position</h2>

              <form onSubmit={handleAddPosition} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Position Name<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Assistant Director"
                    value={newPosName}
                    onChange={(e) => setNewPosName(e.target.value)}
                    className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-9 px-3 text-base"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="newIsLead"
                    checked={newIsLead}
                    onChange={(e) => setNewIsLead(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="newIsLead" className="text-base cursor-pointer font-sans">
                    Team Lead Position
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-[#248837] border border-[#145c21] text-white rounded-lg h-9 font-sans text-sm font-semibold hover:bg-[#1d6b2e] transition duration-200 cursor-pointer disabled:opacity-50 mt-1"
                >
                  {actionLoading ? 'Creating...' : 'Create Position'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDIT POSITION */}
      <AnimatePresence initial={false} mode="wait">
        {editingPos && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-[95%] sm:w-96 border border-neutral-300 rounded-xl bg-cream font-crimson p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <button
                type="button"
                onClick={() => setEditingPos(null)}
                className="hover:cursor-pointer w-fit h-fit block absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition duration-200"
              >
                <CgClose size={22} />
              </button>

              <h2 className="text-2xl font-semibold mb-4">Edit Position</h2>

              <form onSubmit={handleEditPosition} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Position Name<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    type="text"
                    required
                    value={editPosName}
                    onChange={(e) => setEditPosName(e.target.value)}
                    className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-9 px-3 text-base"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="editIsLead"
                    checked={editIsLead}
                    onChange={(e) => setEditIsLead(e.target.checked)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="editIsLead" className="text-base cursor-pointer font-sans">
                    Team Lead Position
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-[#248837] border border-[#145c21] text-white rounded-lg h-9 font-sans text-sm font-semibold hover:bg-[#1d6b2e] transition duration-200 cursor-pointer disabled:opacity-50 mt-1"
                >
                  {actionLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 3: DELETE CONFIRMATION */}
      <AnimatePresence initial={false} mode="wait">
        {deletingPos && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-[95%] sm:w-96 border border-neutral-300 rounded-xl bg-cream font-crimson p-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <button
                type="button"
                onClick={() => setDeletingPos(null)}
                className="hover:cursor-pointer w-fit h-fit block absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition duration-200"
              >
                <CgClose size={22} />
              </button>

              <h2 className="text-2xl font-semibold mb-2 text-red-600">Delete Position</h2>
              <p className="font-sans text-sm text-neutral-700 mb-5">
                Are you sure you want to delete position <strong className="text-black">&quot;{deletingPos.name}&quot;</strong>? This will remove position assignments for any brothers currently holding it.
              </p>

              <div className="flex gap-3 justify-end font-sans text-sm">
                <button
                  type="button"
                  onClick={() => setDeletingPos(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleDeletePosition}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50 font-semibold"
                >
                  {actionLoading ? 'Deleting...' : 'Delete Position'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default TeamPage