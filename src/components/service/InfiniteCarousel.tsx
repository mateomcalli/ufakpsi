'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const InfiniteCarousel = (props: { images : string[] }) => {
  const imageWidth : number = 512
  const gapWidth : number = 32
  const totalOriginalWidth : number = props.images.length * imageWidth + (props.images.length * gapWidth)

  return (
    <div className="relative h-fit overflow-hidden w-full px-6 sm:pl-[30px] sm:pr-8 lg:px-0 lg:w-4xl xl:w-6xl 2xl:w-7xl m-auto">
      <motion.div
        className="flex gap-8 w-fit"
        animate={{ x: [0, -totalOriginalWidth] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {[...props.images, ...props.images].map((image, i) => (
          <div
            key={i}
            className="relative w-lg shrink-0 h-48 rounded-lg"
          >
            <Image
              src={image}
              alt="Brothers serving the community"
              fill
              className="select-none rounded-lg object-cover"
              draggable='false'
            />
          </div>
        ))}
      </motion.div>
      <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-cream to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-4 bg-linear-to-l from-cream to-transparent pointer-events-none" />
    </div>
  );
};

export default InfiniteCarousel;