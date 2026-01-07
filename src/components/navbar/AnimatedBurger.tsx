"use client"

import { motion, Variants } from 'framer-motion'

interface AnimatedBurgerProps {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AnimatedBurger = ({ isMenuOpen, setMenuOpen } : AnimatedBurgerProps) => {
  const line1Variants : Variants = {
    open: {rotate: 45, translateY: 5},
    closed: {rotate: 0, translateX: 0}
  }

  const line2Variants : Variants = {
    open: {rotate: -45, translateY: -5},
    closed: {rotate: 0, translateY: 0}
  }

  return (
    <div onClick={() => setMenuOpen(!isMenuOpen)}>
      <svg width='36' height='36' viewBox='0 0 36 36' xmlns='http://www.w3.org/2000/svg'>
        <motion.path
          variants={line1Variants}
          animate={isMenuOpen ? 'open' : 'closed'}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.4
          }}
          d='M8 12h20'
          stroke='#120374'
          strokeWidth='3'
          strokeLinecap='round'
          style={{ originX: '50%', originY: '50%' }}
        />
        <motion.path
          variants={line2Variants}
          animate={isMenuOpen ? 'open' : 'closed'}
          transition={{
            type: 'spring',
            bounce: 0,
            duration: 0.4
          }}
          d='M8 22h20'
          stroke='#120374'
          strokeWidth='3'
          strokeLinecap='round'
          style={{ originX: '50%', originY: '50%' }}
        />
      </svg>
    </div>
  )
}

export default AnimatedBurger