"use client"

import { BiBookBookmark } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { FiPlus, FiCheck, FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { p } from "framer-motion/client"

type pic = {
  key: number;
  imgFile: File | null;
  imgText: string;
  existingUrl?: string;
}

type picEntry = {
  url: string;
  text: string;
}

type EventItem = {
  id: number;
  title: string;
  cover: string;
  pics: picEntry[];
}

const picIndex = [0, 1, 2, 3]

const Events = () => {
  const supabase = createClient()
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [actionLoading, setActionLoading] = useState<boolean>(false)

  // Add Modal State
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [cover, setCover] = useState<File | null>(null)
  const [imgs, setImgs] = useState<pic[]>([])
  const addFormRef = useRef<HTMLFormElement | null>(null)

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')
  const [editCover, setEditCover] = useState<File | null>(null)
  const [editImgs, setEditImgs] = useState<pic[]>([])

  // Delete Modal State
  const [deletingEvent, setDeletingEvent] = useState<EventItem | null>(null)

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error("Error fetching events:", error)
    } else {
      setEvents(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) redirect("/login")
      await fetchEvents()
    }
    checkAuth()
  }, [])

  // Keyboard shortcut: Escape key closes active modal
  useEffect(() => {
    const activeModal = isAddOpen || editingEvent || deletingEvent
    if (!activeModal) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAddOpen(false)
        setEditingEvent(null)
        setDeletingEvent(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAddOpen, editingEvent, deletingEvent])

  // --- ADD EVENT HANDLERS ---
  const onCaptionChange = (index: number, caption: string) => {
    setImgs(prev => {
      const exists = prev.some(img => img.key === index)
      if (exists) {
        return prev.map(img => img.key === index ? { ...img, imgText: caption } : img)
      }
      return [...prev, { key: index, imgFile: null, imgText: caption }]
    })
  }

  const onImgsChange = (index: number, file: File) => {
    setImgs(prev => {
      const exists = prev.some(img => img.key === index)
      if (exists) {
        return prev.map(img => img.key === index ? { ...img, imgFile: file } : img)
      } else return [...prev, { key: index, imgFile: file, imgText: '' }]
    })
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !cover) return

    setActionLoading(true)
    try {
      const timeStamp = Date.now()
      const coverFileExt = cover.name.split('.').pop()
      const coverFilePath = `${title.toLowerCase().replace(/\s+/g, '_')}_${timeStamp}.${coverFileExt}`

      const { error: uploadError } = await supabase.storage.from('event_covers').upload(coverFilePath, cover)
      if (uploadError) {
        console.error(uploadError)
        alert(`Error uploading cover image: ${uploadError.message}`)
        setActionLoading(false)
        return
      }

      const finalPics: picEntry[] = []
      for (let i = 0; i < imgs.length; i++) {
        if (!imgs[i].imgFile) continue
        const fileExt = imgs[i].imgFile!.name.split('.').pop()
        const filePath = `${title.toLowerCase().replace(/\s+/g, '_')}_img${i}_${timeStamp}.${fileExt}`

        const { error: imgUploadError } = await supabase.storage.from('event_pictures').upload(filePath, imgs[i].imgFile!)
        if (imgUploadError) {
          console.error(imgUploadError)
          alert(`Error uploading image ${i + 1}: ${imgUploadError.message}`)
          setActionLoading(false)
          return
        }

        const { data: imgUrlData } = supabase.storage.from('event_pictures').getPublicUrl(filePath)
        finalPics.push({ url: imgUrlData.publicUrl, text: imgs[i].imgText })
      }

      const { data: coverUrlData } = supabase.storage.from('event_covers').getPublicUrl(coverFilePath)

      const { error: addError } = await supabase.from('events').insert({
        title: title.trim(),
        cover: coverUrlData.publicUrl,
        pics: finalPics
      })

      if (addError) {
        console.error(addError)
        alert(`Error creating event: ${addError.message}`)
      } else {
        setTitle('')
        setCover(null)
        setImgs([])
        setIsAddOpen(false)
        await fetchEvents()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to create event.')
    } finally {
      setActionLoading(false)
    }
  }

  // --- EDIT EVENT HANDLERS ---
  const startEditing = (event: EventItem) => {
    setEditingEvent(event)
    setEditTitle(event.title)
    setEditCover(null)

    const initialPics: pic[] = picIndex.map(i => {
      const existing = event.pics && event.pics[i]
      return {
        key: i,
        imgFile: null,
        imgText: existing ? existing.text : '',
        existingUrl: existing ? existing.url : undefined
      }
    })
    setEditImgs(initialPics)
  }

  const onEditCaptionChange = (index: number, caption: string) => {
    setEditImgs(prev => prev.map(img => img.key === index ? { ...img, imgText: caption } : img))
  }

  const onEditImgsChange = (index: number, file: File) => {
    setEditImgs(prev => prev.map(img => img.key === index ? { ...img, imgFile: file } : img))
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingEvent || !editTitle.trim()) return

    setActionLoading(true)
    try {
      let finalCoverUrl = editingEvent.cover
      const timeStamp = Date.now()

      if (editCover) {
        const coverFileExt = editCover.name.split('.').pop()
        const coverFilePath = `${editTitle.toLowerCase().replace(/\s+/g, '_')}_${timeStamp}.${coverFileExt}`

        const { error: uploadError } = await supabase.storage.from('event_covers').upload(coverFilePath, editCover)
        if (uploadError) {
          console.error(uploadError)
          alert(`Error uploading new cover: ${uploadError.message}`)
          setActionLoading(false)
          return
        }

        const { data: coverUrlData } = supabase.storage.from('event_covers').getPublicUrl(coverFilePath)
        finalCoverUrl = coverUrlData.publicUrl
      }

      const finalPics: picEntry[] = []
      for (let i = 0; i < editImgs.length; i++) {
        const item = editImgs[i]
        let itemUrl = item.existingUrl || ''

        if (item.imgFile) {
          const fileExt = item.imgFile.name.split('.').pop()
          const filePath = `${editTitle.toLowerCase().replace(/\s+/g, '_')}_img${i}_${timeStamp}.${fileExt}`

          const { error: imgUploadError } = await supabase.storage.from('event_pictures').upload(filePath, item.imgFile)
          if (imgUploadError) {
            console.error(imgUploadError)
            alert(`Error uploading picture ${i + 1}: ${imgUploadError.message}`)
            setActionLoading(false)
            return
          }

          const { data: imgUrlData } = supabase.storage.from('event_pictures').getPublicUrl(filePath)
          itemUrl = imgUrlData.publicUrl
        }

        if (itemUrl) {
          finalPics.push({ url: itemUrl, text: item.imgText })
        }
      }

      const { error: updateError } = await supabase
        .from('events')
        .update({
          title: editTitle.trim(),
          cover: finalCoverUrl,
          pics: finalPics
        })
        .eq('id', editingEvent.id)

      if (updateError) {
        console.error(updateError)
        alert(`Error updating event: ${updateError.message}`)
      } else {
        setEditingEvent(null)
        await fetchEvents()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to update event.')
    } finally {
      setActionLoading(false)
    }
  }

  // --- DELETE EVENT LOGIC ---
  const handleDeleteEvent = async () => {
    if (!deletingEvent) return

    setActionLoading(true)
    try {
      const { error } = await supabase.from('events').delete().eq('id', deletingEvent.id)
      if (error) {
        console.error(error)
        alert(`Error deleting event: ${error.message}`)
      } else {
        setDeletingEvent(null)
        await fetchEvents()
      }
    } catch (err) {
      console.error(err)
      alert('Failed to delete event.')
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <div className="relative top-24 pb-16 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl flex flex-col gap-6">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col pb-1">
          <Link
            href="/admin"
            className="flex items-center gap-1 text-sm font-sans text-neutral-500 hover:text-dblue transition duration-200 w-fit"
          >
            <FiArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="flex flex-col gap-4 md:gap-0 md:flex-row sm:justify-between">
          <div>
            <h1 className="font-crimson text-3xl text-neutral-900">Manage Events</h1>
            <p className="font-sans text-sm text-neutral-500">Add, edit, or delete events and manage their pictures and captions.</p>
          </div>
          <button
            onClick={() => {
              setTitle('')
              setCover(null)
              setImgs([])
              setIsAddOpen(true)
            }}
            className="bg-[#248837] border border-[#65c476] px-4 gap-2 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 w-full sm:w-auto self-start sm:self-auto cursor-pointer"
          >
            <BiBookBookmark size={20} />
            <span className="font-crimson text-lg whitespace-nowrap">Add a new event</span>
          </button>
        </div>

      </div>

      {loading ? (
        <p className="font-crimson text-lg text-neutral-500 italic">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 bg-white border border-neutral-300 rounded-xl transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 overflow-hidden flex-1 pr-3">
                {event.cover ? (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-neutral-200">
                    <Image
                      src={event.cover}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-200 shrink-0 flex items-center justify-center text-neutral-400">
                    <BiBookBookmark size={20} />
                  </div>
                )}
                <div className="flex flex-col truncate">
                  <span className="font-crimson text-xl text-neutral-800 truncate font-semibold">
                    {event.title}
                  </span>
                  <span className="font-sans text-xs text-neutral-500">
                    {event.pics ? `${event.pics.length} picture${event.pics.length === 1 ? '' : 's'}` : 'No pictures'}
                  </span>
                </div>
              </div>

              {/* Action buttons: Edit & Delete */}
              <div className="flex items-center gap-1 border-l border-neutral-200 pl-3 shrink-0">
                <button
                  type="button"
                  onClick={() => startEditing(event)}
                  className="p-1.5 text-neutral-500 hover:text-dblue hover:bg-neutral-100 rounded-lg transition duration-200 cursor-pointer"
                  title="Edit Event"
                >
                  <FiEdit2 size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingEvent(event)}
                  className="p-1.5 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition duration-200 cursor-pointer"
                  title="Delete Event"
                >
                  <FiTrash2 size={17} />
                </button>
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="font-crimson text-lg text-neutral-500 italic col-span-2">No events found. Click "Add a new event" to create one.</p>
          )}
        </div>
      )}

      {/* MODAL 1: ADD NEW EVENT */}
      <AnimatePresence initial={false} mode="wait">
        {isAddOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20 p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-[95%] sm:w-[80%] md:w-[70%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] max-h-[92vh] border border-gray-500 rounded-lg bg-cream font-crimson p-4 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="font-crimson text-2xl pb-2 font-semibold">Add a new event</h2>
              <form className="flex flex-col gap-3 h-full" ref={addFormRef} onSubmit={handleAddSubmit}>
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="hover:cursor-pointer w-fit h-fit block absolute top-5 right-5"
                >
                  <CgClose
                    className='hover:text-red-600 transition-colors duration-200' size={24}
                  />
                </button>

                <div className="flex flex-col">
                  <label className="text-lg">Event Name<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Professional Trip"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-lg">Cover Image (.heic filetype not supported)<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/webp'
                    id="cover_upload"
                    onChange={(e) => setCover(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="cover_upload"
                    className="border border-gray-500 rounded-lg h-24 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                  >
                    {cover ? <FiCheck size={28} /> : <FiPlus size={28} />}
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                  {picIndex.map(i => (
                    <div className="flex flex-col w-full" key={i}>
                      <label className="text-base sm:text-lg">{`Image ${i + 1}`}</label>
                      <input
                        type='file'
                        accept='image/jpeg,image/png,image/webp'
                        id={`upload_${i}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onImgsChange(i, file)
                        }}
                        className="hidden"
                      />
                      <label
                        htmlFor={`upload_${i}`}
                        className="border border-gray-500 rounded-lg h-24 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition"
                      >
                        {imgs.find(img => img.key === i)?.imgFile ? <FiCheck size={28} /> : <FiPlus size={28} />}
                      </label>
                      <input
                        onChange={(e) => onCaptionChange(i, e.target.value)}
                        className="mt-2 bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2 text-sm"
                        type="text"
                        placeholder="Caption (<35 char)"
                        maxLength={35}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="mt-4 bg-[#248837] border border-[#65c476] w-full gap-2 h-9 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  {actionLoading ? 'Submitting...' : 'Submit Event'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL 2: EDIT EVENT */}
      <AnimatePresence initial={false} mode="wait">
        {editingEvent && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20 p-2 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-[95%] sm:w-[80%] md:w-[70%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] max-h-[92vh] border border-gray-500 rounded-lg bg-cream font-crimson p-4 overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <h2 className="font-crimson text-2xl pb-2 font-semibold">Edit Event</h2>
              <form className="flex flex-col gap-3 h-full" onSubmit={handleEditSubmit}>
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="hover:cursor-pointer w-fit h-fit block absolute top-5 right-5"
                >
                  <CgClose
                    className='hover:text-red-600 transition-colors duration-200' size={24}
                  />
                </button>

                <div className="flex flex-col">
                  <label className="text-lg">Event Name<span className="text-red-600 pl-0.5">*</span></label>
                  <input
                    className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-lg">Cover Image (Upload to replace)</label>
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/webp'
                    id="edit_cover_upload"
                    onChange={(e) => setEditCover(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                  <label
                    htmlFor="edit_cover_upload"
                    className="border border-gray-500 rounded-lg h-24 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition relative overflow-hidden"
                  >
                    {editCover ? (
                      <FiCheck size={28} />
                    ) : editingEvent.cover ? (
                      <div className="flex items-center gap-2">
                        <Image src={editingEvent.cover} alt="Cover" width={80} height={80} className="object-cover rounded" />
                        <span className="text-sm font-sans text-neutral-600">Click to replace</span>
                      </div>
                    ) : (
                      <FiPlus size={28} />
                    )}
                  </label>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
                  {picIndex.map(i => {
                    const picSlot = editImgs.find(img => img.key === i)
                    return (
                      <div className="flex flex-col w-full" key={i}>
                        <label className="text-base sm:text-lg">{`Image ${i + 1}`}</label>
                        <input
                          type='file'
                          accept='image/jpeg,image/png,image/webp'
                          id={`edit_upload_${i}`}
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) onEditImgsChange(i, file)
                          }}
                          className="hidden"
                        />
                        <label
                          htmlFor={`edit_upload_${i}`}
                          className="border border-gray-500 rounded-lg h-24 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition relative overflow-hidden"
                        >
                          {picSlot?.imgFile ? (
                            <FiCheck size={28} />
                          ) : picSlot?.existingUrl ? (
                            <Image src={picSlot.existingUrl} alt={`Img ${i + 1}`} width={100} height={50} className="object-cover rounded" />
                          ) : (
                            <FiPlus size={28} />
                          )}
                        </label>
                        <input
                          value={picSlot?.imgText || ''}
                          onChange={(e) => onEditCaptionChange(i, e.target.value)}
                          className="mt-2 bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2 text-sm"
                          type="text"
                          placeholder="Caption (<35 char)"
                          maxLength={35}
                        />
                      </div>
                    )
                  })}
                </div>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="mt-4 bg-[#248837] border border-[#65c476] w-full gap-2 h-9 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 cursor-pointer disabled:opacity-50"
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
        {deletingEvent && (
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
                onClick={() => setDeletingEvent(null)}
                className="hover:cursor-pointer w-fit h-fit block absolute top-4 right-4 text-neutral-600 hover:text-red-600 transition duration-200"
              >
                <CgClose size={22} />
              </button>

              <h2 className="text-2xl font-semibold mb-2 text-red-600">Delete Event</h2>
              <p className="font-sans text-sm text-neutral-700 mb-5">
                Are you sure you want to delete <strong className="text-black">{deletingEvent.title}</strong>? This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-end font-sans text-sm">
                <button
                  type="button"
                  onClick={() => setDeletingEvent(null)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg bg-white hover:bg-neutral-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={actionLoading}
                  onClick={handleDeleteEvent}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50 font-semibold"
                >
                  {actionLoading ? 'Deleting...' : 'Delete Event'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Events