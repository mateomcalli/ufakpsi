'use client'

import { TiArrowRight } from "react-icons/ti";
import Link from "next/link";
import { motion } from "framer-motion";

const DashboardButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href}>
      <motion.div 
        whileHover="xTransl"
        className='px-3 py-1.5 hover:bg-dblue/5 transition-colors  bg-cream hover:cursor-pointer flex items-center border border-lblue rounded-lg'
      >
        <div className="flex flex-col justify-between h-24 w-full">
          <p className="font-crimson text-xl">{text}</p>
          <motion.div 
            variants={{
              xTransl: { x: 3 }
            }}
            transition={{ duration: 0.2 }}
            className="self-end"
          >
            <TiArrowRight size={32}/>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

export default DashboardButton