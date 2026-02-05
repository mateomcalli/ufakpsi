import { useState } from 'react'
import { motion } from 'framer-motion'
import { RiArrowRightWideFill } from 'react-icons/ri'
import { RiArrowLeftWideFill } from 'react-icons/ri'

const EventPicker = () => {
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [direction, setDirection] = useState<number>(0)

  const events = [
    {url: '/guac.jpg', id: 0},
    {url: '/bros.jpg', id: 1},
    {url: '/mem_spr_2026.JPG', id: 2},
    {url: '/recruitment-photo.jpg', id: 3},
  ]

  const handleRight = () => {
    setDirection(1)
    selectedImage === (events.length - 1) ? setSelectedImage(selectedImage - (events.length - 1)) : setSelectedImage(selectedImage + 1)
  }

  const handleLeft = () => {
    setDirection(-1)
    selectedImage === 0 ? setSelectedImage(selectedImage + (events.length - 1)) : setSelectedImage(selectedImage - 1)
  }

  return (
    <>
      <div className='m-auto items-center w-fit relative z-2'>
        <div className='flex items-center'>
          <motion.button
            whileTap={{
              scale: 1.4,
              transition: { duration: 0.3 }
            }}
            className='mr-3 h-fit'
            onClick={() => handleLeft()}
          >
            <RiArrowLeftWideFill size='40'/>
          </motion.button>
          {events.map(image => (
            selectedImage === image.id &&
              <motion.div 
                key={image.id}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                className='flex flex-col w-120 h-96 bg-white rounded-lg shadow-lg'
              >
                <img
                  className='w-full h-80 object-cover rounded-tl-lg rounded-tr-lg bg-white pointer-events-none select-none' 
                  src={image.url}
                  key={image.id}
                  alt='Club members'
                />
                <p className='text-center my-auto font-crimson text-2xl'>Professional Trip to NYC</p>
              </motion.div>
          ))}
          <motion.button
            whileTap={{
              scale: 1.4,
              transition: { duration: 0.3 }
            }}
            className='ml-3 h-fit'
            onClick={() => handleRight()}
          >
            <RiArrowRightWideFill size='40'/>
          </motion.button>
        </div>
          <div className='flex gap-x-2 items-center justify-center w-full h-8'>
            {events.map(image => (
              <button key={image.id} onClick={() => setSelectedImage(image.id)}>
                <div key={image.id} className={selectedImage === image.id ? 'bg-ggorange w-2 h-2 rounded-full' : 'bg-ggwhite w-2 h-2 rounded-full fade-orange cursor-pointer'}/>
              </button>
            ))}
          </div>
        </div>
    </>
  )
}

export default EventPicker