"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, LightbulbOff } from "lucide-react"

interface DarkroomToggleProps {
  onToggle: (isDarkroom: boolean) => void
  isDarkroom: boolean
}

export function DarkroomToggle({ onToggle, isDarkroom }: DarkroomToggleProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggle = () => {
    if (isAnimating) return

    setIsAnimating(true)
    onToggle(!isDarkroom)

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 1000)
  }

  return (
    <div className="fixed top-24 left-12 z-40">
      <motion.button
        onClick={handleToggle}
        className={`relative w-12 h-12 rounded-full border-2 transition-all duration-300 ${
          isDarkroom ? "bg-red-900/80 border-red-500/50 text-red-300" : "bg-gray-900/80 border-gray-700 text-gray-300"
        } backdrop-blur-sm hover:scale-110 disabled:opacity-50`}
        disabled={isAnimating}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isDarkroom ? (
            <motion.div
              key="darkroom"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <LightbulbOff className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="normal"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Lightbulb className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow effect for darkroom mode */}
        {isDarkroom && (
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      <motion.div
        className={`absolute left-16 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-md text-xs font-vt323 whitespace-nowrap transition-all duration-300 ${
          isDarkroom
            ? "bg-red-900/90 border border-red-500/30 text-red-300"
            : "bg-gray-900/90 border border-gray-700 text-gray-300"
        }`}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isDarkroom ? "Exit Darkroom" : "Enter Darkroom"}
        <div
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 rotate-45 ${
            isDarkroom ? "bg-red-900/90" : "bg-gray-900/90"
          }`}
        />
      </motion.div>
    </div>
  )
}
