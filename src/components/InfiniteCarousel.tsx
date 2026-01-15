'use client';

import { motion } from 'framer-motion'
import Image from 'next/image'

const InfiniteCarousel = (props: { images : string[] }) => {
  const imageWidth : number = 512
  const gapWidth : number = 32
  const totalOriginalWidth : number = props.images.length * imageWidth + (props.images.length * gapWidth)

  return (
    <div className="h-fit overflow-hidden">
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
            className="relative w-lg shrink-0 h-48 rounded-xl"
          >
            <Image
              src={image}
              alt="Brothers serving the community"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel;
