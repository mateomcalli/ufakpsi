'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Polaroids = () => {
  const [cards, setCards] = useState([
    { url: '/bros.jpg', rotation: 0, id: 0 },
    { url: '/eboard2526.jpg', rotation: 0, id: 1 },
    { url: '/pcfall25.jpg', rotation: 0, id: 2 },
    { url: '/pickle.png', rotation: 0, id: 3 },
    { url: '/guac.jpg', rotation: 0, id: 4 }
  ])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setCards(prevCards => prevCards.map(card => ({
      ...card,
      rotation: Math.random() * 25 - 10
    })))
    setMounted(true)
  }, [])

  const handleClick = () => {
    setCards(prevCards => {
      const newCards = [...prevCards]
      const topCard = newCards.shift()!
      newCards.push({ ...topCard, rotation: Math.random() * 25 - 10 })
      return newCards
    })
  }

  return (
    <div className='relative w-80 h-80 flex items-center justify-center'>
      <AnimatePresence initial={false}>
        {cards.map((card, i) => {
          const zIndex = cards.length - i

          return (
            <motion.button
              key={card.id}
              onClick={handleClick}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='absolute p-4 pb-16 bg-white shadow-lg'
              style={{
                rotate: card.rotation,
                zIndex: zIndex
              }}
            >
              <img
                className='w-64 h-64 object-cover pointer-events-none select-none'
                src={card.url}
                alt='Club members'
              />
            </motion.button>
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default Polaroids