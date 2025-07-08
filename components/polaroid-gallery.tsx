"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const photos = ["/poloroid1.PNG", "/poloroid2.PNG", "/poloroid3.PNG", "/poloroid7.PNG", "/poloroid4.PNG", "/poloroid5.PNG"]  // Replace with your images

export function PolaroidGallery() {
  const [current, setCurrent] = useState(0)

  const shuffleNext = () => {
    setCurrent((prev) => (prev + 1) % photos.length)
  }

  return (
    <div onClick={shuffleNext} className="relative cursor-pointer">
      <div className="border-2 border-gray-800 rounded-md overflow-hidden shadow-lg p-1">
        <AnimatePresence mode="wait">
          <motion.img
            key={photos[current]}
            src={photos[current]}
            alt="Polaroid"
            initial={{ opacity: 0, y: 50, rotate: 8 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -50, rotate: -8 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[370px]"
          />
        </AnimatePresence>
      </div>
    </div>
  )
}