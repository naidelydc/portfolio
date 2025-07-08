"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface DarkroomOverlayProps {
  isDarkroom: boolean
}

export function DarkroomOverlay({ isDarkroom }: DarkroomOverlayProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (isDarkroom) {
      setIsTransitioning(true)
      // Play darkroom ambience sound
      const audio = new Audio("/darkroom-ambience.mp3")
      audio.volume = 0.3
      audio.loop = true
      audio.play().catch((e) => console.log("Audio play failed:", e))

      return () => {
        audio.pause()
        audio.currentTime = 0
      }
    } else {
      setIsTransitioning(false)
    }
  }, [isDarkroom])

  return (
    <AnimatePresence>
      {isDarkroom && (
        <>
          {/* Red light overlay */}
          <motion.div
            className="fixed inset-0 bg-red-900/40 mix-blend-multiply z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />

          {/* Darkroom vignette */}
          <motion.div
            className="fixed inset-0 z-30 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              background: `radial-gradient(circle at center, transparent 20%, rgba(139, 0, 0, 0.3) 70%, rgba(139, 0, 0, 0.6) 100%)`,
            }}
          />

          {/* Flickering red light effect */}
          <motion.div
            className="fixed top-8 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full z-30 pointer-events-none"
            animate={{
              opacity: [0.8, 1, 0.9, 1, 0.8],
              scale: [1, 1.1, 1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Darkroom info panel */}
          <motion.div
            className="fixed bottom-12 right-14 bg-red-950/80 border border-red-800/50 rounded-md p-4 z-30 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="font-vt323 text-xs text-red-300">DARKROOM MODE</p>
            </div>
            <p className="font-vt323 text-xs text-red-400/80">Safe light active</p>
            <p className="font-vt323 text-xs text-red-400/80">Film development in progress</p>
          </motion.div>

          {/* Floating particles for atmosphere */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="fixed w-1 h-1 bg-red-400/20 rounded-full z-30 pointer-events-none"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}
