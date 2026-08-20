'use client'

import { createClient } from "@/lib/supabase/client"
import { redirect } from 'next/navigation'
import Link from "next/link"
import { useState, useEffect } from "react"
import { TiArrowRight } from "react-icons/ti"
import { BiBookBookmark } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import { AnimatePresence, motion } from "framer-motion"

type TeamItem = {
  id: number
  name: string
}

const fallbackTeams: TeamItem[] = [
  { id: 1, name: "President's Team" },
  { id: 2, name: "EVP Team" },
  { id: 3, name: "Finance Team" },
  { id: 4, name: "Membership Team" },
  { id: 5, name: "Professional Team" },
  { id: 6, name: "A&E Team" },
  { id: 7, name: "Pro Activities Team" },
  { id: 8, name: "Public Relations Team" },
  { id: 9, name: "Social Affairs Team" },
  { id: 10, name: "Community Service Team" },
  { id: 11, name: "DEI Team" },
]

const Teams = () => {
  const supabase = createClient()
  const [teams, setTeams] = useState<TeamItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Modal States
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false)
  const [newTeamName, setNewTeamName] = useState<string>('')

  const [editingTeam, setEditingTeam] = useState<TeamItem | null>(null)
  const [editTeamName, setEditTeamName] = useState<string>('')

  const [deletingTeam, setDeletingTeam] = useState<TeamItem | null>(null)

  const [actionLoading, setActionLoading] = useState<boolean>(false)

  const fetchTeams = async () => {
    const { data: teamsData, error } = await supabase
      .from('teams')
      .select('id, name')
      .order('id', { ascending: true })

    if (error) {
      console.error(error)
      setTeams(fallbackTeams)
    } else {
      setTeams(teamsData && teamsData.length > 0 ? teamsData : fallbackTeams)
    }
    setLoading(false)
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) redirect("/login")
      await fetchTeams()
    }
    checkAuth()
  }, [])

  // Keyboard shortcut: Escape key closes active modal
  useEffect(() => {
    const activeModal = isAddOpen || editingTeam || deletingTeam
    if (!activeModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddOpen(false)
        setEditingTeam(null)
        setDeletingTeam(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAddOpen, editingTeam, deletingTeam])

  // 1. Add Team
  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTeamName.trim()) return

    setActionLoading(true)
    try {
      const { error } = await supabase.from('teams').insert({
        name: newTeamName.trim(),
        caption: '',
        big_three: false
      })

      if (error) {
        console.error(error)
        alert(`Error adding team: ${error.message}`)
      } else {
        setNewTeamName('')
        setIsAddOpen(false)
        await fetchTeams()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to create team.')
    } finally {
      setActionLoading(false)
    }
  }

  // 2. Edit Team
  const handleEditTeam = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTeam || !editTeamName.trim()) return

    setActionLoading(true)
    try {
      const { error } = await supabase
        .from('teams')
        .update({ name: editTeamName.trim() })
        .eq('id', editingTeam.id)

      if (error) {
        console.error(error)
        alert(`Error updating team: ${error.message}`)
      } else {
        setEditingTeam(null)
        await fetchTeams()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to update team.')
    } finally {
      setActionLoading(false)
    }
  }

  // 3. Delete Team
  const handleDeleteTeam = async () => {
    if (!deletingTeam) return

    setActionLoading(true)
    try {
      // 1. Get all position names for this team so we can clean brothers.positions
      const { data: teamPositions } = await supabase
        .from('positions')
        .select('name')
        .eq('team_id', deletingTeam.id)

      const posNamesToRemove = (teamPositions || []).map(p => p.name)

      // 2. If there are positions to remove, clean up brothers.positions arrays
      if (posNamesToRemove.length > 0) {
        const { data: affectedBrothers } = await supabase
          .from('brothers')
          .select('id, positions')

        if (affectedBrothers) {
          for (const bro of affectedBrothers) {
            const currentPositions: string[] = bro.positions || []
            const cleanedPositions = currentPositions.filter(
              (p: string) => !posNamesToRemove.includes(p)
            )
            if (cleanedPositions.length !== currentPositions.length) {
              await supabase
                .from('brothers')
                .update({ positions: cleanedPositions })
                .eq('id', bro.id)
            }
          }
        }
      }

      // 3. Cascade delete join table records and positions
      await supabase.from('brother_team_position').delete().eq('team_id', deletingTeam.id)
      await supabase.from('positions').delete().eq('team_id', deletingTeam.id)

      const { error } = await supabase.from('teams').delete().eq('id', deletingTeam.id)

      if (error) {
        console.error(error)
        alert(`Error deleting team: ${error.message}`)
      } else {
        setDeletingTeam(null)
        await fetchTeams()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to delete team.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="relative top-24 pb-16 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-crimson text-3xl font-semibold text-neutral-900">Manage Teams</h1>
          <p className="font-sans text-sm text-neutral-500">Add, edit, or select a team to manage its position assignments.</p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="bg-[#248837] border border-[#65c476] px-4 gap-2 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 w-full sm:w-auto self-start sm:self-auto cursor-pointer"
        >
          <BiBookBookmark size={20} />
          <span className="font-crimson text-lg font-semibold whitespace-nowrap">Add a new team</span>
        </button>
      </div>

      {loading ? (
        <p className="font-crimson text-lg text-neutral-500 italic">Loading teams...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
          {teams.map((team) => (
            <div
              key={team.id}
              className="flex items-center justify-between p-4 bg-white border border-neutral-300 rounded-xl hover:cursor-pointer transition-all duration-200 group"
            >
              <Link
                href={`/admin/teams/${team.id}`}
                className="flex-1 flex items-center justify-between pr-4 overflow-hidden"
              >
                <span className="font-crimson text-xl text-neutral-800 transition-colors truncate">
                  {team.name}
                </span>
                <TiArrowRight size={24} className="text-neutral-400 group-hover:text-dblue group-hover:translate-x-1 transition-all duration-200 shrink-0" />
              </Link>

              {/* Action buttons: Edit & Delete */}
              <div className="flex items-center gap-1 border-l border-neutral-200 pl-3 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTeam(team)
                    setEditTeamName(team.name)
                  }}
                  className="p-1.5 text-neutral-500 hover:text-dblue hover:bg-neutral-100 rounded-lg transition duration-200 cursor-pointer"
                  title="Edit Team Name"
                >
                  <FiEdit2 size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingTeam(team)}
                  className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200 cursor-pointer"
                  title="Delete Team"
                >
                  <FiTrash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: ADD TEAM */}
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

              <h2 className="text-2xl font-semibold mb-4">Add a new team</h2>

              <form onSubmit={handleAddTeam} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Team Name<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Mateo(goat)'s Team"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-9 px-3 text-base"
                  />
                </div>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-[#248837] border border-[#145c21] text-white rounded-lg h-9 font-sans text-sm font-semibold hover:bg-[#1d6b2e] transition duration-200 cursor-pointer disabled:opacity-50 mt-1"
                >
                  {actionLoading ? 'Creating...' : 'Create Team'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDIT TEAM */}
      <AnimatePresence initial={false} mode="wait">
        {editingTeam && (
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
                onClick={() => setEditingTeam(null)}
                className="hover:cursor-pointer w-fit h-fit block absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition duration-200"
              >
                <CgClose size={22} />
              </button>

              <h2 className="text-2xl font-semibold mb-4">Edit Team</h2>

              <form onSubmit={handleEditTeam} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-lg">Team Name<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    type="text"
                    required
                    value={editTeamName}
                    onChange={(e) => setEditTeamName(e.target.value)}
                    className="bg-white focus:outline-none border border-neutral-300 w-full rounded-lg h-9 px-3 text-base"
                  />
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
        {deletingTeam && (
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
                onClick={() => setDeletingTeam(null)}
                className="hover:cursor-pointer w-fit h-fit block absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition duration-200"
              >
                <CgClose size={22} />
              </button>

              <h2 className="text-2xl font-semibold mb-2 text-red-600">Delete Team</h2>
              <p className="font-sans text-sm text-neutral-700 mb-5">
                Are you sure you want to delete <strong className="text-black">{deletingTeam.name}</strong>? This will also remove all positions and member assignments associated with this team.
              </p>

              <div className="flex gap-3 justify-end font-sans text-sm">
                <button
                  type="button"
                  onClick={() => setDeletingTeam(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleDeleteTeam}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50 font-semibold"
                >
                  {actionLoading ? 'Deleting...' : 'Delete Team'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Teams