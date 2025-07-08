"use client"

import { motion, type MotionValue, useTransform } from "framer-motion"

interface FilmCounterProps {
  scrollYProgress: MotionValue<number>
}

export function FilmCounter({ scrollYProgress }: FilmCounterProps) {
  // Transform scroll progress to frame count (1-36, typical for 35mm film)
  const frameCount = useTransform(scrollYProgress, [0, 1], [1, 36])

  return (
    <motion.div
      className="fixed top-24 right-6 z-40 bg-black border border-gray-800 px-3 py-2 rounded-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <div className="font-vt323 text-xs text-gray-400">
          FRAME <motion.span className="text-red-500">{frameCount}</motion.span>/36
        </div>
      </div>
    </motion.div>
  )
}
