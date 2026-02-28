"use client"

import { BiBookBookmark } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { FiPlus, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"
import { createClient } from "@/lib/supabase/client"

type pic = {
  key: number;
  imgFile: File | null;
  imgText: string;
}

type picEntry = {
  url: string;
  text: string;
}

// type Event = { 
//   id: number;
//   title: string;
//   cover: string;
//   pics: picEntry[];
// }

const Events = () => {
  const supabase = createClient()
  const picIndex = [0,1,2,3]
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [cover, setCover] = useState<File | null>(null)
  const [imgs, setImgs] = useState<pic[]>([])
  const formRef = useRef<HTMLFormElement | null>(null)

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
        return prev.map(img => img.key === index ? 
          { ...img, imgFile: file } : 
          img
        )
      } else return [...prev, { key: index, imgFile: file, imgText: '' }]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const coverFileExt = cover!.name.split('.').pop()
    const coverFilePath = `${title.toLowerCase()}.${coverFileExt}`

    const { error: uploadError } = await supabase.storage.from('event_covers').upload(coverFilePath, cover!)
    if (uploadError) {
      console.error(uploadError) 
      return
    }

    const finalPics: picEntry[] = []
    for (let i = 0; i < imgs.length; i++) {
      const fileExt = imgs[i].imgFile!.name.split('.').pop()
      const filePath = `${title.toLowerCase()}_img${i}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('event_pictures').upload(filePath, imgs[i].imgFile!)
      if (uploadError) {
        console.error(uploadError) 
        return
      }

      const { data: imgUrlData } = supabase.storage.from('event_pictures').getPublicUrl(filePath)
      const coverPUrl = imgUrlData.publicUrl

      finalPics.push({url: coverPUrl, text: imgs[i].imgText})
    }

    const { data: coverUrlData } = supabase.storage.from('event_covers').getPublicUrl(coverFilePath)
    const coverPUrl = coverUrlData.publicUrl

    const { data, error: addError } = await supabase.from('events').insert({
      title: title,
      cover: coverPUrl,
      pics: finalPics
    })

    if (addError) {
      console.error(addError)
      return
    }

    formRef.current?.reset()
    setMenuOpen(!menuOpen)
    
  }

  return (
    <div className="relative top-24 flex flex-col gap-4 mx-auto w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl min-h-112">
      <button 
        onClick={() => setMenuOpen(!menuOpen)} 
        className="bg-[#248837] border border-[#65c476] w-38 gap-2 h-8 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200"
      >
        <BiBookBookmark size={16}/>
        <p className="font-crimson">Add a new event</p>
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
              className="relative flex flex-col w-[95%] sm:w-[80%] md:w-[70%] lg:w-[55%] xl:w-[45%] 2xl:w-[35%] border border-gray-500 rounded-lg bg-cream font-crimson p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <h1 className="font-crimson text-2xl pb-2">Add a new event</h1>
              <form className="flex flex-col gap-2 h-full" ref={formRef} onSubmit={handleSubmit}>
                <button 
                  onClick={() => setMenuOpen(!menuOpen)} 
                  className="hover:cursor-pointer w-fit h-fit block absolute top-5 right-5"
                >
                  <CgClose 
                    className='hover:text-red-600 transition-colors duration-200' size={24} 
                  />
                </button>

                <div className="flex flex-col">
                  <p className="text-lg">Event Name<span className="text-red-600 pl-0.5">*</span></p>
                  <input
                    className="bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                    type="text"
                    value={title}
                    onChange={(e) => {setTitle(e.target.value)}}
                    placeholder="Professional Trip"
                  />
                </div>

                <div className="flex-col">
                  <p className="text-lg">Cover Image (.heic filetype not supported)<span className="text-red-600 pl-0.5">*</span></p>
                  <input 
                    type='file' 
                    accept='image/jpeg,image/png,image/webp'
                    id={`cover_upload`}
                    onChange={(e) => setCover(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <label 
                    htmlFor={`cover_upload`}
                    className={`border border-gray-500 rounded-lg h-24 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition`}
                  >
                    {cover ? <FiCheck size={28}/> : <FiPlus size={28}/>}
                  </label>
                </div>

                <div className="flex gap-2 w-full">
                  {picIndex.map(i => (
                    <div className="flex flex-col w-1/4" key={i}>
                      <p className="text-lg">{`Image ${i+1} (no .heic)`}<span className="text-red-600 pl-0.5">*</span></p>
                      <input 
                        type='file' 
                        accept='image/jpeg,image/png,image/webp'
                        id={`upload_${i}`}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) onImgsChange(i, file)
                        }}
                        className="hidden"
                        required
                        />
                      <label 
                        htmlFor={`upload_${i}`}
                        className={`border border-gray-500 rounded-lg h-24 px-3 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition`}
                        >
                        {imgs.find(img => img.key === i)?.imgFile ? <FiCheck size={28}/> : <FiPlus size={28}/>}
                      </label>
                      <input
                        onChange={(e) => {onCaptionChange(i, e.target.value)}}
                        className="mt-2 bg-white focus:outline-none border border-gray-500 w-full rounded-lg h-8 pl-2"
                        type="text"
                        placeholder="Caption (<35 char)"
                        maxLength={35}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="mt-4 bg-[#248837] border border-[#65c476] w-full gap-2 h-8 rounded-lg flex items-center justify-center text-white hover:bg-[#1d6b2e] transition duration-200"
                  type='submit'
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default Events