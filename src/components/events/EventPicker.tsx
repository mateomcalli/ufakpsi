import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { RiArrowRightWideFill } from 'react-icons/ri'
import { RiArrowLeftWideFill } from 'react-icons/ri'

interface Event {
  id: number;
  cover: string;
  title: string;
}

interface EventPickerParams {
  events: Event[];
  selectedEvent: number;
  setSelectedEvent: React.Dispatch<React.SetStateAction<number>>;
}

const EventPicker = ({ selectedEvent, setSelectedEvent, events }: EventPickerParams) => {
  const [direction, setDirection] = useState<number>(0)

  const handleRight = () => {
    setDirection(1)
    setSelectedEvent((selectedEvent + 1) % events.length)
  }

  const handleLeft = () => {
    setDirection(-1)
    setSelectedEvent((selectedEvent - 1 + events.length) % events.length)
  }

  const getRelativePosition = (eventIndex: number) => {
    let diff = eventIndex - selectedEvent

    if (diff > events.length / 2) {
      diff -= events.length
    } else if (diff < -events.length / 2) {
      diff += events.length
    }

    return diff
  }

  const cardVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
    },
    left: {
      x: -420,
      opacity: 0.8,
      scale: 0.85,
      zIndex: 1,
    },
    right: {
      x: 420,
      opacity: 0.8,
      scale: 0.85,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.8,
    }),
  }

  return (
    <div style={{ overflowX: undefined }} className='w-full overflow-x-clip sm:overflow-x-visible'>
      <div className='w-full flex justify-center relative pt-8 sm:pt-0 z-2'>
        <div className='flex items-center'>
          <motion.button
            whileTap={{
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
            className='pr-4 sm:pr-0 h-fit z-1 w-fit cursor-pointer'
            onClick={() => handleLeft()}
            aria-label="Left arrow button"
          >
            <RiArrowLeftWideFill size='40' />
          </motion.button>

          <div className='relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center overflow-visible'>
            <AnimatePresence initial={false} custom={direction}>
              {events.map((event, index) => {
                const relativePosition = getRelativePosition(index)

                if (Math.abs(relativePosition) > 1) return null

                const state = relativePosition === 0 ? 'center' : relativePosition === -1 ? 'left' : 'right'

                return (
                  <motion.div
                    key={event.id}
                    custom={direction}
                    variants={cardVariants}
                    initial="enter"
                    animate={state}
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 40 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 }
                    }}
                    className={`absolute flex flex-col w-72 h-80 sm:w-88 sm:h-96 bg-white rounded-lg shadow-lg ${relativePosition === 0 ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => {
                      if (relativePosition === -1) handleLeft()
                      if (relativePosition === 1) handleRight()
                    }}
                  >
                    <Image
                      src={event.cover}
                      alt={event.title}
                      width={550}
                      height={440}
                      quality={80}
                      priority={relativePosition === 0}
                      sizes="(max-width: 640px) 400px, 480px"
                      className='w-full h-64 sm:h-80 object-cover rounded-tl-lg rounded-tr-lg bg-white pointer-events-none select-none'
                    />
                    <p className='text-center my-auto font-merry text-lg sm:text-xl'>{event.title}</p>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
            className='pl-4 sm:pl-0 h-fit z-1 cursor-pointer'
            onClick={() => handleRight()}
            aria-label="Right arrow button"
          >
            <RiArrowRightWideFill size='40' />
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default EventPicker