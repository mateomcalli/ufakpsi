import { BsThreeDots } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"

type Brother = {
  id: string;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;
  college: string;
  start_year: number;
  grad_year: number;
  headshot: string;
  exec: boolean;
  persona: boolean;
  active: boolean;
  linkedin: string;
  positions: string[];
}

const EditMenu = (props: { brother: Brother }) => {
  return (
    <button onClick={() => console.log(props.brother)} className="hover:cursor-pointer w-fit p-1.5 rounded-lg transition duration-300 hover:bg-gray-400">
      <BsThreeDots size={20}/>
    </button>
  )
}

export default EditMenu