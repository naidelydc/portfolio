"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface PentaxK1000BackProps {
  filmType?: "fuji" | "kodak" | "ilford" | "none"
  showFilmCanister?: boolean
  className?: string
  isLoading?: boolean
  onLoadingComplete?: () => void
}

export function PentaxK1000Back({
  filmType = "fuji",
  showFilmCanister = true,
  className = "",
  isLoading = false,
  onLoadingComplete,
}: PentaxK1000BackProps) {
  const [isViewfinderActive, setIsViewfinderActive] = useState(false)
  const [stage, setStage] = useState<"initial" | "focus" | "flash" | "advance" | "complete">("initial")
  const [progress, setProgress] = useState(0)

  const filmReminders = {
    fuji: {
      topColor: "#00a651",
      bottomColor: "#ffffff",
      brand: "FUJIFILM",
      type: "X-TRA 400",
      speed: "400",
      textColor: "#000000",
    },
    kodak: {
      topColor: "#ffd700",
      bottomColor: "#1e40af",
      brand: "KODAK",
      type: "GOLD 200",
      speed: "200",
      textColor: "#ffffff",
    },
    ilford: {
      topColor: "#000000",
      bottomColor: "#ffffff",
      brand: "ILFORD",
      type: "HP5 PLUS",
      speed: "400",
      textColor: "#000000",
    },
    none: null,
  }

  const currentFilm = filmReminders[filmType]

  // Loading animation sequence
  useEffect(() => {
    if (!isLoading) return

    const sequence = async () => {
      // Initial focusing stage
      setTimeout(() => {
        setStage("focus")
        setIsViewfinderActive(true)

        // Play camera focus sound
        const focusSound = new Audio("/camera-focus.mp3")
        focusSound.play().catch((e) => console.log("Audio play failed:", e))
      }, 1000)

      // Flash and shutter
      setTimeout(() => {
        setStage("flash")

        // Play shutter sound
        const shutterSound = new Audio("/camera-shutter.mp3")
        shutterSound.play().catch((e) => console.log("Audio play failed:", e))
      }, 2500)

      // Film advance stage
      setTimeout(() => {
        setStage("advance")
        setIsViewfinderActive(false)

        // Play film advance sound
        const advanceSound = new Audio("/film-advance.mp3")
        advanceSound.play().catch((e) => console.log("Audio play failed:", e))

        // Start progress animation
        let currentProgress = 0
        const progressInterval = setInterval(() => {
          currentProgress += 3
          setProgress(currentProgress)

          if (currentProgress >= 100) {
            clearInterval(progressInterval)
            setStage("complete")

            // Complete loading after a short delay
            setTimeout(() => {
              onLoadingComplete?.()
            }, 800)
          }
        }, 60)
      }, 3300)
    }

    sequence()
  }, [isLoading, onLoadingComplete])

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Flash overlay */}
      {stage === "flash" && (
        <motion.div
          className="absolute inset-0 bg-white z-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}

      {/* Main camera body container */}
      <motion.div
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl"
        style={{
          background: `
            linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)
          `,
        }}
        animate={stage === "flash" ? { scale: [1, 1.02, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {/* Top chrome/metal panel */}
        <div
          className="absolute top-0 left-0 right-0 h-1/3 border-b-2 border-gray-600"
          style={{
            background: `
              linear-gradient(to bottom, 
                #f8f9fa 0%, 
                #e9ecef 15%, 
                #dee2e6 30%, 
                #ced4da 45%, 
                #adb5bd 60%, 
                #868e96 75%, 
                #6c757d 90%, 
                #495057 100%
              ),
              repeating-linear-gradient(90deg, 
                transparent 0px, 
                rgba(255,255,255,0.1) 1px, 
                transparent 2px, 
                transparent 4px
              )
            `,
            backgroundSize: "100% 100%, 3px 3px",
          }}
        >
          {/* Pentaprism hump */}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/5 h-16 rounded-t-lg border-2 border-gray-400"
            style={{
              background: `
                linear-gradient(to bottom,
                  #ffffff 0%,
                  #f1f3f4 20%,
                  #e8eaed 40%,
                  #dadce0 60%,
                  #bdc1c6 80%,
                  #9aa0a6 100%
                )
              `,
            }}
          >
            {/* Hot shoe */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-gray-800 rounded-sm border border-gray-600">
              <div className="absolute inset-0.5 bg-gray-700 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Brand name */}
          <div className="absolute top-4 left-8">
            <div
              className="text-black font-bold text-xl tracking-wider"
              style={{
                textShadow: "0 1px 2px rgba(255,255,255,0.5)",
                fontFamily: "serif",
              }}
            >
              PENTAX
            </div>
            <div className="text-gray-700 text-sm font-semibold tracking-wide">K1000</div>
          </div>



          {/* Shutter speed dial and film advance (right side) */}
          <div className="absolute top-2 right-4 flex items-center space-x-2">
            {/* Shutter speed dial */}
            <div
              className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, 
                    #ffffff 0%, 
                    #f1f3f4 50%, 
                    #bdc1c6 100%
                  )
                `,
              }}
            >
              <span className="text-black text-xs font-bold">125</span>
            </div>

            {/* Film advance lever */}
            <motion.div
              className="w-14 h-14 rounded-full border-2 border-gray-500 cursor-pointer relative"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, 
                    #ffffff 0%, 
                    #f1f3f4 40%, 
                    #bdc1c6 100%
                  )
                `,
              }}
              animate={stage === "advance" ? { rotate: [0, 45, 0] } : {}}
              transition={{ repeat: stage === "advance" ? 3 : 0, duration: 0.8, ease: "easeInOut" }}
            >
              <div className="absolute top-1 right-1 w-8 h-2 bg-gray-700 rounded-full transform rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full border border-gray-500"></div>
            </motion.div>
          </div>

          {/* Film counter window */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-black rounded border-2 border-gray-500">
            <div className="absolute inset-0.5 bg-gray-900 rounded flex items-center justify-center">
              <motion.span
                className="text-orange-400 text-sm font-mono font-bold"
                key={progress}
                initial={{ scale: 1.2, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stage === "advance"
                  ? Math.floor(progress / 10)
                      .toString()
                      .padStart(2, "0")
                  : "12"}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Lower leatherette body */}
        <div
          className="absolute top-1/3 left-0 right-0 bottom-0 border-2 border-gray-700"
          style={{
            background: `
              /* Base leather color */
              linear-gradient(135deg, #2c2c2c 0%, #1e1e1e 50%, #141414 100%),
              /* Leather grain texture */
              repeating-conic-gradient(from 0deg at 50% 50%, 
                #1a1a1a 0deg, #2a2a2a 20deg, #1a1a1a 40deg, #252525 60deg,
                #1a1a1a 80deg, #2a2a2a 100deg, #1a1a1a 120deg
              ),
              /* Fine grain pattern */
              repeating-linear-gradient(45deg, 
                transparent 0px, transparent 1px, 
                rgba(255,255,255,0.02) 1px, rgba(255,255,255,0.02) 2px,
                transparent 2px, transparent 3px
              ),
              repeating-linear-gradient(-45deg, 
                transparent 0px, transparent 1px, 
                rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px,
                transparent 2px, transparent 3px
              )
            `,
            backgroundSize: "100% 100%, 6px 6px, 2px 2px, 2px 2px",
          }}
        >
          {/* Stitching detail */}
          <div className="absolute top-1 left-2 right-2 h-px bg-gray-600 opacity-40"></div>
          <div className="absolute bottom-1 left-2 right-2 h-px bg-gray-600 opacity-40"></div>
          <div className="absolute top-1 left-1 bottom-1 w-px bg-gray-600 opacity-40"></div>
          <div className="absolute top-1 right-1 bottom-1 w-px bg-gray-600 opacity-40"></div>

          {/* Central viewfinder window */}
          <div
            className="absolute top-4 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-black rounded border-4 border-gray-600"
            style={{
              boxShadow: `
                inset 0 4px 8px rgba(0,0,0,0.8),
                inset 0 -2px 4px rgba(255,255,255,0.1),
                0 2px 8px rgba(0,0,0,0.5)
              `,
            }}
          >
            <div className="absolute inset-2 bg-gray-900 rounded border border-gray-700 overflow-hidden">
              {/* Glass reflection effect */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255,255,255,0.3) 0%, 
                      transparent 30%, 
                      transparent 70%, 
                      rgba(255,255,255,0.1) 100%
                    )
                  `,
                }}
              ></div>

              {/* Viewfinder content based on stage */}
              {stage === "initial" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-600 text-xs font-mono">READY</div>
                </div>
              )}

              {stage === "focus" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-green-400 text-xs font-mono">
                    <div className="flex items-center justify-center mb-1">
                      <motion.div
                        className="w-4 h-4 border border-green-400 rounded-full mr-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                      />
                      <span>f/2.8</span>
                    </div>
                    <div className="text-center">125</div>
                    <div className="text-center text-xs mt-1">FOCUS</div>
                  </div>
                </motion.div>
              )}

              {stage === "advance" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-red-500 text-xs font-mono animate-pulse mb-2">PROCESSING</div>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-red-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-1 h-1 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-red-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              )}

              {stage === "complete" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-green-400 text-xs font-mono text-center">
                    <div>✓ COMPLETE</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Film reminder holder */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-12 bg-black rounded border-3 border-gray-600 mt-8">
            <div
              className="absolute inset-1 bg-gray-900 rounded border border-gray-700 overflow-hidden"
              style={{
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {currentFilm && (
                <motion.div
                  className="absolute inset-0.5 rounded-sm overflow-hidden"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  {/* Film reminder insert */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2"
                    style={{ backgroundColor: currentFilm.topColor }}
                  >
                    <div className="flex items-center justify-center h-full">
                      <span className="text-xs font-bold" style={{ color: currentFilm.textColor }}>
                        {currentFilm.speed}
                      </span>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2 flex flex-col items-center justify-center"
                    style={{ backgroundColor: currentFilm.bottomColor }}
                  >
                    <div
                      className="text-xs font-bold leading-tight text-center"
                      style={{ color: currentFilm.textColor }}
                    >
                      <div>{currentFilm.brand}</div>
                      <div className="text-[8px]">{currentFilm.type}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Slot guides */}
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gray-800"></div>
              <div className="absolute top-0 right-0 w-0.5 h-full bg-gray-800"></div>
            </div>

            {/* Label */}
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs font-mono">
              FILM TYPE
            </div>
          </div>

          {/* Film door latch (right side) */}
          <div className="absolute top-4 right-4 w-6 h-16 bg-gray-600 rounded border-2 border-gray-500">
            <div className="absolute top-2 left-1 w-4 h-3 bg-gray-400 rounded border border-gray-300"></div>
            <div className="absolute bottom-2 left-1 w-4 h-2 bg-gray-700 rounded"></div>
          </div>

          {/* Camera model and serial number */}
          <div className="absolute bottom-2 left-4 text-gray-400 text-xs font-mono">K1000 #7654321</div>
          <div className="absolute bottom-2 right-4 text-gray-500 text-xs font-mono">MADE IN JAPAN</div>

          {/* Tripod mount */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-500">
            <div className="absolute inset-1 bg-gray-800 rounded-full border border-gray-700">
              <div className="absolute inset-0.5 border border-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Film canister (optional) */}
        {showFilmCanister && (
          <motion.div
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-16 rounded-full border-2 border-gray-600"
            style={{
              background: `
                linear-gradient(to right,
                  #4a4a4a 0%,
                  #5a5a5a 50%,
                  #4a4a4a 100%
                )
              `,
            }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Film canister top */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-500 rounded-t border border-gray-400"></div>

            {/* Film leader */}
            <motion.div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-orange-600 rounded-r"
              animate={stage === "advance" ? { x: [0, 8, 0] } : {}}
              transition={{ repeat: stage === "advance" ? 3 : 0, duration: 0.8 }}
            />

            {/* Canister label */}
            <div className="absolute inset-1 flex items-center justify-center">
              <div className="text-white text-xs font-bold transform -rotate-90 whitespace-nowrap">35mm</div>
            </div>
          </motion.div>
        )}

        {/* Corner reinforcements */}
        <div className="absolute top-0 left-0 w-4 h-4 border-r-2 border-b-2 border-gray-500 bg-gray-400 rounded-br"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-l-2 border-b-2 border-gray-500 bg-gray-400 rounded-bl"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-r-2 border-t-2 border-gray-500 bg-gray-600 rounded-tr"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-l-2 border-t-2 border-gray-500 bg-gray-600 rounded-tl"></div>
      </motion.div>

      {/* Loading progress bar (only show during loading) */}
      {isLoading && stage === "advance" && (
        <motion.div
          className="mt-8 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-mono text-sm text-red-500 font-bold">DEVELOPING FILM</p>
            <p className="font-mono text-sm text-red-500 font-bold">{progress}%</p>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-600">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 via-red-500 to-red-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.9 }}
            />
          </div>
          <div className="mt-2 text-center">
            <p className="font-mono text-xs text-gray-400">
              Pentax K1000 • {currentFilm?.brand} {currentFilm?.type}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
