"use client"

import { motion } from "framer-motion";

// this component creates an animating arrow 
// that when clicked toggles the passed in state.

const ExpandArrow = (props: {
  isExpanded: boolean; 
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.button
      onClick={() => props.setIsExpanded(!props.isExpanded)}
      className="absolute top-3 right-5 z-10"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        animate={{ rotateX: props.isExpanded ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </motion.button>
  )
}

export default ExpandArrow