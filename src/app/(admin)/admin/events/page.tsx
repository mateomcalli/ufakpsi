"use client"

import { BiBookBookmark } from "react-icons/bi"
import { CgClose } from "react-icons/cg"
import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { AnimatePresence } from "framer-motion"

const Events = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const formRef = useRef(null)

  const handleSubmit = () => {

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
              className="relative flex flex-col w-19/20 sm:4/6 md:w-4/7 xl:w-1/3 2xl:w-[31%] h-fit min-h-24 border border-gray-500 rounded-lg bg-cream font-crimson p-4"
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
                hi
              </form>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default Events