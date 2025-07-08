"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function ViewfinderOverlay() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Randomly show the viewfinder overlay during browsing
    const showRandomly = () => {
      const shouldShow = Math.random() > 0.99 // 30% chance
      if (shouldShow) {
        setIsVisible(true)

        // Hide after a short period
        setTimeout(() => {
          setIsVisible(false)
        }, 2000)
      }

      // Schedule next check
      setTimeout(showRandomly, Math.random() * 10000 + 5000) // Between 5-15 seconds
    }

    // Initial delay before starting
    const timer = setTimeout(showRandomly, 8000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative w-full max-w-3xl aspect-[3/2]">
            {/* Viewfinder frame */}
            <div className="absolute inset-0 border-[40px] border-black rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Center focus point */}
                <div className="w-16 h-16 border border-red-500/50 rounded-full flex items-center justify-center">
                  <div className="w-1 h-16 border-l border-red-500/50"></div>
                  <div className="w-16 h-1 border-t border-red-500/50 absolute"></div>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-red-500/50"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-red-500/50"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-red-500/50"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-red-500/50"></div>
              </div>
            </div>

            {/* Exposure info */}
            <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 font-vt323 text-xs text-red-500">
              ISO 800 • 1/60
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
