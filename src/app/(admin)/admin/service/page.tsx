'use client'

import { createClient } from "@/lib/supabase/client"
import { redirect } from 'next/navigation'
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FiArrowLeft, FiPlus, FiCheck, FiUpload, FiSave } from "react-icons/fi"

type SlotState = {
  slotIndex: number;
  currentUrl: string;
  newFile: File | null;
}

type ServiceEventState = {
  slot_index: number;
  title: string;
  caption: string;
  isDirty?: boolean;
}

const DEFAULT_IMAGES = [
  '/vests.jpg',
  '/planting.jpg',
  '/breadmighty.jpg',
  '/dog.jpg'
]

const DEFAULT_SERVICE_EVENTS: ServiceEventState[] = [
  { slot_index: 0, title: '', caption: '' },
  { slot_index: 1, title: '', caption: '' },
  { slot_index: 2, title: '', caption: '' },
  { slot_index: 3, title: '', caption: '' }
]

const AdminService = () => {
  const supabase = createClient()
  const [slots, setSlots] = useState<SlotState[]>([
    { slotIndex: 0, currentUrl: DEFAULT_IMAGES[0], newFile: null },
    { slotIndex: 1, currentUrl: DEFAULT_IMAGES[1], newFile: null },
    { slotIndex: 2, currentUrl: DEFAULT_IMAGES[2], newFile: null },
    { slotIndex: 3, currentUrl: DEFAULT_IMAGES[3], newFile: null }
  ])
  const [events, setEvents] = useState<ServiceEventState[]>(DEFAULT_SERVICE_EVENTS)
  const [loading, setLoading] = useState<boolean>(true)
  const [savingIndex, setSavingIndex] = useState<number | null>(null)
  const [saveAllLoading, setSaveAllLoading] = useState<boolean>(false)
  const [savingEventIndex, setSavingEventIndex] = useState<number | null>(null)

  const fetchCarouselPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('service_carousel')
        .select('*')
        .order('slot_index', { ascending: true })

      if (!error && data && data.length > 0) {
        setSlots(prev => prev.map(slot => {
          const match = data.find((d: any) => d.slot_index === slot.slotIndex)
          return {
            ...slot,
            currentUrl: match && match.url ? match.url : DEFAULT_IMAGES[slot.slotIndex],
            newFile: null
          }
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetchServiceEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('service_events')
        .select('*')
        .order('slot_index', { ascending: true })

      if (!error && data && data.length > 0) {
        setEvents(prev => prev.map(evt => {
          const match = data.find((d: any) => d.slot_index === evt.slot_index)
          return {
            ...evt,
            title: match ? match.title || '' : '',
            caption: match ? match.caption || '' : '',
            isDirty: false
          }
        }))
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) redirect("/login")
      await Promise.all([fetchCarouselPhotos(), fetchServiceEvents()])
      setLoading(false)
    }
    checkAuth()
  }, [])

  const handleFileChange = (index: number, file: File | null) => {
    setSlots(prev => prev.map(s => s.slotIndex === index ? { ...s, newFile: file } : s))
  }

  const handleSaveSlot = async (index: number) => {
    const slot = slots.find(s => s.slotIndex === index)
    if (!slot || !slot.newFile) return

    setSavingIndex(index)
    try {
      const fileExt = slot.newFile.name.split('.').pop()
      const timeStamp = Date.now()
      const filePath = `service_slot_${index}_${timeStamp}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('service_carousel')
        .upload(filePath, slot.newFile)

      let publicUrl = ''
      if (uploadError) {
        console.error("Storage upload error:", uploadError)
        // Fallback: try event_pictures if service_carousel bucket isn't set up yet
        const { error: altUploadErr } = await supabase.storage
          .from('event_pictures')
          .upload(`service_${filePath}`, slot.newFile)

        if (altUploadErr) {
          alert(`Error uploading image: ${uploadError.message}`)
          setSavingIndex(null)
          return
        }
        const { data: altUrlData } = supabase.storage.from('event_pictures').getPublicUrl(`service_${filePath}`)
        publicUrl = altUrlData.publicUrl
      } else {
        const { data: urlData } = supabase.storage.from('service_carousel').getPublicUrl(filePath)
        publicUrl = urlData.publicUrl
      }

      const { error: dbError } = await supabase
        .from('service_carousel')
        .upsert({ slot_index: index, url: publicUrl }, { onConflict: 'slot_index' })

      if (dbError) {
        const errorMsg = dbError.message || dbError.details || JSON.stringify(dbError)
        console.error("DB Upsert error:", errorMsg)
        alert(`Database error saving photo: ${errorMsg}`)
      } else {
        await fetchCarouselPhotos()
      }
    } catch (err) {
      console.error(err)
      alert("Failed to save image.")
    } finally {
      setSavingIndex(null)
    }
  }

  const handleSaveAllPhotos = async () => {
    const slotsToSave = slots.filter(s => s.newFile !== null)
    if (slotsToSave.length === 0) return

    setSaveAllLoading(true)
    for (const slot of slotsToSave) {
      await handleSaveSlot(slot.slotIndex)
    }
    setSaveAllLoading(false)
  }

  const handleEventChange = (slotIndex: number, field: 'title' | 'caption', value: string) => {
    setEvents(prev => prev.map(e => e.slot_index === slotIndex ? { ...e, [field]: value, isDirty: true } : e))
  }

  const handleSaveEvent = async (slotIndex: number) => {
    const evt = events.find(e => e.slot_index === slotIndex)
    if (!evt) return

    setSavingEventIndex(slotIndex)
    try {
      const { error } = await supabase
        .from('service_events')
        .upsert({ slot_index: slotIndex, title: evt.title, caption: evt.caption }, { onConflict: 'slot_index' })

      if (error) {
        const errorMsg = error.message || error.details || JSON.stringify(error)
        console.error("DB Upsert error:", errorMsg)
        alert(`Database error saving event: ${errorMsg}\n\nMake sure the "service_events" database table is created in Supabase.`)
      } else {
        setEvents(prev => prev.map(e => e.slot_index === slotIndex ? { ...e, isDirty: false } : e))
      }
    } catch (err) {
      console.error(err)
      alert("Failed to save service event.")
    } finally {
      setSavingEventIndex(null)
    }
  }

  return (
    <div className="relative top-24 pb-16 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl flex flex-col gap-10">
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
            <h1 className="font-crimson text-3xl text-neutral-900">Manage Service Page</h1>
            <p className="font-sans text-sm text-neutral-500">Manage and replace the carousel photos and service event descriptions.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="font-crimson text-lg text-neutral-500 italic">Loading service page data...</p>
      ) : (
        <>
          {/* Section 2: Service Event Initiatives (Titles & Descriptions) */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {events.map((evt) => (
                <div
                  key={evt.slot_index}
                  className="flex flex-col gap-3 p-5 bg-white border border-neutral-300 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-crimson text-xl font-semibold text-neutral-800">
                      Service Event {evt.slot_index + 1}
                    </span>
                    {evt.isDirty && (
                      <span className="font-sans text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Unsaved Changes
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-crimson text-lg font-semibold text-neutral-800">Event Title</label>
                    <input
                      type="text"
                      value={evt.title}
                      onChange={(e) => handleEventChange(evt.slot_index, 'title', e.target.value)}
                      className="bg-white border border-neutral-300 rounded-lg h-9 px-3 font-sans text-sm text-neutral-900 focus:outline-none focus:border-dblue"
                      placeholder="Event Title"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-crimson text-lg font-semibold text-neutral-800">Event Description</label>
                    <textarea
                      rows={4}
                      value={evt.caption}
                      onChange={(e) => handleEventChange(evt.slot_index, 'caption', e.target.value)}
                      className="bg-white border border-neutral-300 rounded-lg p-3 font-sans text-sm text-neutral-800 focus:outline-none focus:border-dblue resize-none"
                      placeholder="Event Description"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      disabled={!evt.isDirty || savingEventIndex === evt.slot_index}
                      onClick={() => handleSaveEvent(evt.slot_index)}
                      className="bg-[#248837] text-white px-4 h-9 rounded-lg font-sans text-sm font-semibold hover:bg-[#1d6b2e] transition cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1.5"
                    >
                      <FiSave size={16} />
                      <span>{savingEventIndex === evt.slot_index ? 'Saving...' : 'Save Event'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Section 1: Carousel Photos */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="font-crimson text-2xl font-semibold text-neutral-900">Carousel Photos (4 Slots)</h2>
              {slots.some(s => s.newFile !== null) && (
                <button
                  type="button"
                  disabled={saveAllLoading}
                  onClick={handleSaveAllPhotos}
                  className="bg-[#248837] border border-[#65c476] px-4 gap-2 h-9 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 cursor-pointer disabled:opacity-50"
                >
                  <FiUpload size={16} />
                  <span className="font-sans text-sm font-semibold whitespace-nowrap">
                    {saveAllLoading ? 'Saving...' : 'Save All Photo Changes'}
                  </span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {slots.map((slot) => (
                <div
                  key={slot.slotIndex}
                  className="flex flex-col gap-3 p-4 bg-white border border-neutral-300 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-crimson text-xl font-semibold text-neutral-800">
                      Carousel Photo {slot.slotIndex + 1}
                    </span>
                    {slot.newFile && (
                      <span className="font-sans text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                        Pending Save
                      </span>
                    )}
                  </div>

                  {/* Image Preview Box */}
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-100 flex items-center justify-center">
                    <Image
                      src={slot.newFile ? URL.createObjectURL(slot.newFile) : slot.currentUrl}
                      alt={`Carousel ${slot.slotIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Upload Input & Save Action */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      id={`service_upload_${slot.slotIndex}`}
                      onChange={(e) => handleFileChange(slot.slotIndex, e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`service_upload_${slot.slotIndex}`}
                      className="flex-1 border border-neutral-300 rounded-lg h-9 px-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-neutral-100 transition font-sans text-sm text-neutral-700 font-medium"
                    >
                      {slot.newFile ? (
                        <>
                          <FiCheck size={18} className="text-green-600" />
                          <span className="truncate">{slot.newFile.name}</span>
                        </>
                      ) : (
                        <>
                          <FiPlus size={18} />
                          <span>Choose New Image</span>
                        </>
                      )}
                    </label>

                    {slot.newFile && (
                      <button
                        type="button"
                        disabled={savingIndex === slot.slotIndex}
                        onClick={() => handleSaveSlot(slot.slotIndex)}
                        className="bg-[#248837] text-white px-4 h-9 rounded-lg font-sans text-sm font-semibold hover:bg-[#1d6b2e] transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0"
                      >
                        {savingIndex === slot.slotIndex ? 'Saving...' : 'Save Photo'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </>
      )}
    </div>
  )
}

export default AdminService
