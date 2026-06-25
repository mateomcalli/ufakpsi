import { BsThreeDots } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"
import type { Brother } from "@/src/types"

const EditMenu = (props: { brother: Brother }) => {
  return (
    <button onClick={() => console.log(props.brother)} className="hover:cursor-pointer w-fit p-1.5 rounded-lg transition duration-300 hover:bg-gray-400">
      <BsThreeDots size={20}/>
    </button>
  )
}

export default EditMenu