'use client'

import { useState, useRef, useEffect } from "react"
import { BiBookBookmark } from "react-icons/bi"
import { AnimatePresence, motion } from "framer-motion"
import { CgClose } from "react-icons/cg";
import { createClient } from "@/lib/supabase/client";

type Position = {
  id: string;
  name: string;
  team_id: string;
}

const AddMenu = () => {
  const supabase = createClient()
  const formRef = useRef<HTMLFormElement | null>(null)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [major, setMajor] = useState<string>('')
  const [minor, setMinor] = useState<string>('')
  const [headshot, setHeadshot] = useState<File | null>(null)
  const [imgRecieved, setImgRecieved] = useState<boolean>(false)
  const [college, setCollege] = useState<string>('')
  const [startYear, setStartYear] = useState<string>('')
  const [gradYear, setGradYear] = useState<string>('')
  const [isEBoard, setIsEBoard] = useState<boolean>(false)
  const [isPersona, setIsPersona] = useState<boolean>(false)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [allPositions, setAllPositions] = useState<Position[]>([])
  const [positionsIds, setPositionsIds] = useState<string[]>([])
  const [linkedin, setLinkedin] = useState<string>('')
  
  useEffect(() => {
    if (headshot) setImgRecieved(true)
    const queryPositions = async () => {
      const { data: positionsData, error: positionsErr } = await supabase.from('positions').select()
      if (positionsErr) {
        console.error(positionsErr)
        return
      }
      setAllPositions(positionsData)
    }

    queryPositions()
  }, [headshot])

  const positionChange = (positionId: string) => {
    setPositionsIds(prev => 
      prev.includes(positionId) ? prev.filter(id => id !== positionId) : [...prev, positionId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    /* SETTING FILENAME FOR HEADSHOT, POST TO SUPABASE STORAGE */

    const fileExt = headshot!.name.split('.').pop()
    const headshotPath = `${firstName}_${lastName}.${fileExt}`

    const { error: uploadError } = await supabase.storage.from('headshots').upload(headshotPath, headshot!)

    if (uploadError) {
      console.error(uploadError)
      alert('Error while uploading image, check browser console and try again.')
      return
    }

    const { data: urlData } = supabase.storage.from('headshots').getPublicUrl(headshotPath)
    const headshotUrl = urlData.publicUrl

    /* GETTING ARRAY OF POSITION NAMES BASED ON positionsIds */

    const { data: selPos, error: positionsErr } = await supabase.from('positions').select('name, team_id').in('id', positionsIds)
    if (positionsErr) {
      console.error(positionsErr)
      return
    }
    const posNames : string[] = selPos.map(p => p.name)

    /* POSTING BROTHER, SAVING ID FOR JOIN TABLE POSTS */

    const { data: brotherData, error: insertError } = await supabase.from('brothers').insert({
      first_name: firstName,
      last_name: lastName,
      major: major,
      minor: minor,
      headshot: headshotUrl,
      college: college,
      start_year: startYear,
      grad_year: gradYear,
      positions: posNames,
      exec: isEBoard,
      persona: isPersona,
      active: isActive,
      linkedin: linkedin
    }).select().single()

    if (insertError) {
      console.error(insertError)
      return
    }

    /* ADDING ENTRIES TO JOIN TABLE FOR EACH POSITION */

    for (let i = 0; i < positionsIds.length; i++) {
      const { error: joinTableError } = await supabase.from('brother_team_position').insert({
        brother_id: brotherData.id,
        team_id: selPos[i].team_id,
        lead: (Number(positionsIds[i]) < 13) ? true : false,
        position_id: positionsIds[i]
      })

      if (joinTableError) {
        console.error(joinTableError)
        return
      }
    }

    formRef.current?.reset()
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="bg-[#248837] w-1/4 gap-2 h-12 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200"
      >
        <BiBookBookmark size={24}/>
        <p className="font-crimson text-xl">Add a new brother</p>
      </button>

      <AnimatePresence initial={false} mode="wait">
        {menuOpen &&
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/36 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <motion.div
              className="relative flex flex-col w-19/20 sm:4/6 md:w-4/7 xl:w-1/3 2xl:w-[31%] h-170 border border-gray-500 rounded-xl bg-cream font-crimson p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <form className="flex flex-col h-full" ref={formRef} onSubmit={handleSubmit}>
                <button 
                  onClick={() => setMenuOpen(!menuOpen)} 
                  className="hover:cursor-pointer w-fit h-fit block absolute top-5 right-5"
                >
                  <CgClose 
                    className='hover:text-red-600 transition-colors duration-200' size={24} 
                  />
                </button>

                <section className="flex flex-col font-crimson gap-1.5 flex-1">
                  <p className="text-2xl">Add a new brother</p>
                  <div className="flex gap-2">
                    <div className="flex-1 flex-col gap-0.5">
                      <p className="text-lg">First Name<span className="text-red-600 pl-0.5">*</span></p>
                      <input 
                        placeholder='Mateo' 
                        type='text' 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2" 
                        required
                      />

                    </div>
                    <div className="flex-1 flex-col gap-0.5">
                      <p className="text-lg">Last Name<span className="text-red-600 pl-0.5">*</span></p>
                      <input 
                        placeholder='McAllister' 
                        type='text' 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                        className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2" 
                        required
                      />
                    </div>
                  </div>

                  <div className='flex gap-2'>
                    <div className="flex-[0.6] flex-col gap-0.5">
                      <p className="text-lg">Major</p>
                      <input 
                        placeholder='Computer Science' 
                        type='text' 
                        value={major} 
                        onChange={(e) => setMajor(e.target.value)} 
                        className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                      />
                    </div>
                    <div className="flex-[0.4] flex-col gap-0.5">
                      <p className="text-lg">Minor</p>
                      <input 
                        placeholder='Finance' 
                        type='text' value={minor} 
                        onChange={(e) => setMinor(e.target.value)} 
                        className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                      />
                    </div>
                  </div>

                  <div className="flex-col gap-0.5">
                    <p className="text-lg">College</p>
                    <input placeholder='College of Liberal Arts and Sciences' 
                      type='text' value={college} onChange={(e) => setCollege(e.target.value)} 
                      className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                      />
                  </div>

                  <div className='flex gap-2'>
                    <div className="w-1/4 flex-col gap-0.5">
                      <p className="text-lg">Start Year</p>
                      <input 
                        placeholder='2024' 
                        type='number' 
                        min="2021" max="2030" 
                        value={startYear}
                        onChange={(e) => setStartYear(e.target.value)}
                        className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                      />
                    </div>
                    <div className="w-1/4 flex-col gap-0.5">
                      <p className="text-lg">Grad Year</p>
                      <input placeholder='2028'

                        type='number'
                        min="2021" max="2030"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                      />
                    </div>
                    <div className="flex-[0.5] flex pl-2 gap-5">
                      <div className="flex flex-col gap-2.5">
                        <p className="text-lg">EBoard</p>
                        <input type='checkbox' checked={isEBoard} onChange={(e) => setIsEBoard(e.target.checked)}/>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <p className="text-lg">Persona</p>
                        <input type='checkbox' checked={isPersona} onChange={(e) => setIsPersona(e.target.checked)}/>
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <p className="text-lg">Active</p>
                        <input type='checkbox' checked={isActive} onChange={(e) => setIsActive(e.target.checked)}/>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col w-88 max-h-36 gap-2">
                    <p className="text-lg">Position(s)</p>
                    <div className="flex flex-col gap-2 p-3 border rounded-lg max-h-48 overflow-y-auto">
                      {allPositions.map(p => (
                        <label key={p.id} className="flex items-center gap-2 cursor-pointer p-1 rounded">
                          <input onChange={() => positionChange(p.id)} type="checkbox" value={p.id} className="w-4 h-4" />
                          <span>{p.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex-col gap-0.5">
                    <p className="text-lg">LinkedIn</p>
                    <input 
                      placeholder='https://linkedin.com/in/mateomcallister' 
                      type='text' 
                      value={linkedin} 
                      onChange={(e) => setLinkedin(e.target.value)} 
                      className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                    />
                  </div>

                  <div className="flex-col gap-0.5">
                    <p className="text-lg">Headshot<span className="text-red-600 pl-0.5">*</span></p>
                    <input 
                      type='file' 
                      accept='image/*'
                      id='image-upload'
                      onChange={(e) => setHeadshot(e.target.files?.[0] || null)}
                      className="hidden"
                      required
                    />
                    <label 
                      htmlFor='image-upload'
                      className={`${imgRecieved ? 'bg-[#32c04c]' : 'bg-white'}
                      border border-gray-500 rounded-lg h-8 px-3 flex w-1/3 items-center justify-center cursor-pointer hover:bg-gray-50 transition`}
                    >
                      {imgRecieved ? 'Image recieved!' : 'Submit image'}
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="hover:cursor-pointer bg-[#248837] border border-[#145c21] w-full gap-2 h-10 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200 mt-4"
                  >
                    Submit
                  </button>
                </section>
              </form>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default AddMenu