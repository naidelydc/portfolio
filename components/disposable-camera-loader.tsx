"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface DisposableCameraLoaderProps {
  onComplete: () => void
}

export function DisposableCameraLoader({ onComplete }: DisposableCameraLoaderProps) {
  const [stage, setStage] = useState<"initial" | "flash" | "developing" | "complete">("initial")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Camera shutter and flash sequence
    const flashTimer = setTimeout(() => {
      // Play camera shutter sound
      const shutterSound = new Audio("/camera-shutter.mp3")
      shutterSound.play().catch((e) => console.log("Audio play failed:", e))

      setStage("flash")

      // After flash, move to developing stage
      setTimeout(() => {
        setStage("developing")

        // Start progress animation
        let currentProgress = 0
        const progressInterval = setInterval(() => {
          currentProgress += 2
          setProgress(currentProgress)

          if (currentProgress >= 100) {
            clearInterval(progressInterval)
            setStage("complete")

            // Complete loading
            setTimeout(() => {
              onComplete()
            }, 500)
          }
        }, 50)

        return () => clearInterval(progressInterval)
      }, 800)
    }, 1000)

    return () => clearTimeout(flashTimer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="relative w-full max-w-md aspect-[3/2] mx-auto">
        {/* Camera body */}
        <motion.div
          className="absolute inset-0 bg-gray-800 rounded-lg overflow-hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Camera details */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gray-700 flex items-center justify-between px-4">
            <div className="w-12 h-3 bg-gray-900 rounded-full"></div>
            <div className="w-8 h-3 bg-gray-900 rounded-full"></div>
          </div>

          {/* Viewfinder */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-24 h-16 bg-black border-4 border-gray-700 rounded-sm overflow-hidden">
            {stage === "initial" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-500 rounded-full"></div>
              </div>
            )}
            {stage === "flash" && (
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
            {(stage === "developing" || stage === "complete") && (
              <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                <p className="font-mono text-xs text-red-500">PROCESSING</p>
              </div>
            )}
          </div>

          {/* Flash */}
          <div className="absolute top-4 right-12 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
            {stage === "flash" && (
              <motion.div
                className="absolute inset-0 bg-yellow-300 rounded-full"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 0.3 }}
              />
            )}
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          </div>

          {/* Shutter button */}
          <motion.div
            className="absolute top-4 right-4 w-6 h-6 bg-red-500 rounded-full"
            animate={stage === "initial" ? { scale: [1, 0.9, 1] } : {}}
            transition={{ repeat: 3, duration: 0.5 }}
          />

          {/* Film advance wheel */}
          <motion.div
            className="absolute bottom-4 right-4 w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center"
            animate={stage === "developing" ? { rotate: 360 } : {}}
            transition={{ repeat: 2, duration: 1.5, ease: "easeInOut" }}
          >
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <div className="w-6 h-1 bg-gray-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Film counter */}
          <div className="absolute bottom-4 left-4 w-10 h-6 bg-gray-900 rounded-sm flex items-center justify-center">
            <p className="font-mono text-xs text-orange-500">01</p>
          </div>
        </motion.div>
      </div>

      {stage === "developing" && (
        <div className="mt-12 w-64">
          <div className="flex justify-between items-center mb-2">
            <p className="font-mono text-xs text-red-500">DEVELOPING</p>
            <p className="font-mono text-xs text-red-500">{progress}%</p>
          </div>
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div className="h-full bg-red-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}
