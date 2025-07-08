"use client"

import { useState, useEffect, useRef } from "react"
import { useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Heart, Star } from "lucide-react"

interface Photo {
  id: string
  name: string
  description: string
  pixels: string[][]
  rarity: "common" | "rare" | "legendary"
}

const pixelPhotos: Photo[] = [
  {
    id: "sunset",
    name: "Golden Hour",
    description: "A perfect sunset captured on film",
    rarity: "common",
    pixels: [
      ["#ff6b35", "#ff6b35", "#ff8c42", "#ff8c42", "#ffa726"],
      ["#ff8c42", "#ffa726", "#ffb74d", "#ffcc80", "#ffe0b2"],
      ["#ffb74d", "#ffcc80", "#ffe0b2", "#fff3e0", "#fff8e1"],
      ["#333", "#333", "#444", "#444", "#555"],
      ["#222", "#222", "#333", "#333", "#444"],
    ],
  },
  {
    id: "coffee",
    name: "Morning Brew",
    description: "Steam rising from a perfect cup",
    rarity: "common",
    pixels: [
      ["#3e2723", "#5d4037", "#6d4c41", "#5d4037", "#3e2723"],
      ["#5d4037", "#8d6e63", "#a1887f", "#8d6e63", "#5d4037"],
      ["#6d4c41", "#a1887f", "#bcaaa4", "#a1887f", "#6d4c41"],
      ["#444", "#666", "#888", "#666", "#444"],
      ["#222", "#333", "#444", "#333", "#222"],
    ],
  },
  {
    id: "cat",
    name: "Miso's Portrait",
    description: "A rare self-portrait by the artist",
    rarity: "rare",
    pixels: [
      ["#ff6b35", "#ff6b35", "#ff8c42", "#ff6b35", "#ff6b35"],
      ["#ff6b35", "#000", "#ff8c42", "#000", "#ff6b35"],
      ["#ff8c42", "#ff8c42", "#000", "#ff8c42", "#ff8c42"],
      ["#ff8c42", "#000", "#000", "#000", "#ff8c42"],
      ["#ffa726", "#ffa726", "#ffa726", "#ffa726", "#ffa726"],
    ],
  },
  {
    id: "stars",
    name: "Night Sky",
    description: "Long exposure of the cosmos",
    rarity: "rare",
    pixels: [
      ["#0d1421", "#1a237e", "#0d1421", "#fff", "#0d1421"],
      ["#1a237e", "#283593", "#3949ab", "#1a237e", "#fff"],
      ["#0d1421", "#3949ab", "#5c6bc0", "#3949ab", "#0d1421"],
      ["#fff", "#1a237e", "#3949ab", "#1a237e", "#0d1421"],
      ["#0d1421", "#0d1421", "#1a237e", "#0d1421", "#fff"],
    ],
  },
  {
    id: "rainbow",
    name: "Double Rainbow",
    description: "A legendary moment in time",
    rarity: "legendary",
    pixels: [
      ["#e3f2fd", "#e3f2fd", "#e3f2fd", "#e3f2fd", "#e3f2fd"],
      ["#f44336", "#ff9800", "#ffeb3b", "#4caf50", "#2196f3"],
      ["#e91e63", "#ff5722", "#ffc107", "#8bc34a", "#3f51b5"],
      ["#333", "#444", "#555", "#444", "#333"],
      ["#222", "#333", "#444", "#333", "#222"],
    ],
  },
  {
    id: "heart",
    name: "Love Letter",
    description: "A message from the heart",
    rarity: "legendary",
    pixels: [
      ["#ffebee", "#f44336", "#e91e63", "#f44336", "#ffebee"],
      ["#f44336", "#e91e63", "#ad1457", "#e91e63", "#f44336"],
      ["#e91e63", "#ad1457", "#880e4f", "#ad1457", "#e91e63"],
      ["#f44336", "#e91e63", "#ad1457", "#e91e63", "#f44336"],
      ["#ffebee", "#f44336", "#e91e63", "#f44336", "#ffebee"],
    ],
  },
]

export function DarkroomCatGame() {
  const [isGameActive, setIsGameActive] = useState(false)
  const [developingProgress, setDevelopingProgress] = useState(0)
  const [isDeveloping, setIsDeveloping] = useState(false)
  const [developedPhotos, setDevelopedPhotos] = useState<Photo[]>([])
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null)
  const [totalPhotosCount, setTotalPhotosCount] = useState(0)
  const [catAnimation, setCatAnimation] = useState("idle")
  const [showNewPhoto, setShowNewPhoto] = useState(false)
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const [catPosition, setCatPosition] = useState({ x: 0, y: 0 })
  const [nearTray, setNearTray] = useState(false)
  const darkroomWidth = 10
  const darkroomHeight = 8
  const trays = [
    { id: 1, x: 3, y: 2, developed: false },
    { id: 2, x: 6, y: 5, developed: false },
  ]
  const [trayStates, setTrayStates] = useState(trays)

  const developButtonRef = useRef<HTMLButtonElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const bubbleAudioRef = useRef<HTMLAudioElement | null>(null)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isGameActive) return

    setCatPosition((prev) => {
      let newX = prev.x
      let newY = prev.y
      if (e.key === "ArrowUp") newY = Math.max(0, prev.y - 1)
      if (e.key === "ArrowDown") newY = Math.min(darkroomHeight - 1, prev.y + 1)
      if (e.key === "ArrowLeft") newX = Math.max(0, prev.x - 1)
      if (e.key === "ArrowRight") newX = Math.min(darkroomWidth - 1, prev.x + 1)
      return { x: newX, y: newY }
    })

    if (e.key === " " && nearTray) {
      setTrayStates((prev) =>
        prev.map((tray) =>
          tray.x === catPosition.x && tray.y === catPosition.y
            ? { ...tray, developed: true }
            : tray
        )
      )
    }
  }, [catPosition, isGameActive, nearTray])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    const near = trayStates.some(
      (tray) => tray.x === catPosition.x && tray.y === catPosition.y && !tray.developed
    )
    setNearTray(near)
  }, [catPosition, trayStates])

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem("darkroom-cat-photos")
    if (saved) {
      const data = JSON.parse(saved)
      setTotalPhotosCount(data.count || 0)
      setDevelopedPhotos(data.photos || [])
    }
  }, [])

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/darkroom-ambience.mp3")
    bubbleAudioRef.current = new Audio("/bubble-pop.mp3")

    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (bubbleAudioRef.current) {
        bubbleAudioRef.current.pause()
        bubbleAudioRef.current = null
      }
    }
  }, [])

  // Start game
  const startGame = () => {
    setIsGameActive(true)
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  // Develop photo logic
  const startDeveloping = () => {
    if (isDeveloping) return

    setIsDeveloping(true)
    setCatAnimation("working")
    setDevelopingProgress(0)
    setShowNewPhoto(false)

    const interval = setInterval(() => {
      setDevelopingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          completeDevelopment()
          return 100
        }

        // Add random bubbles during development
        if (Math.random() > 0.7) {
          addBubble()
        }

        return prev + (Math.random() * 3 + 1)
      })
    }, 100)
  }

  const completeDevelopment = () => {
    // Select random photo based on rarity
    const rand = Math.random()
    let availablePhotos = pixelPhotos

    if (rand < 0.05) {
      // 5% legendary
      availablePhotos = pixelPhotos.filter((p) => p.rarity === "legendary")
    } else if (rand < 0.25) {
      // 20% rare
      availablePhotos = pixelPhotos.filter((p) => p.rarity === "rare")
    } else {
      // 75% common
      availablePhotos = pixelPhotos.filter((p) => p.rarity === "common")
    }

    const newPhoto = availablePhotos[Math.floor(Math.random() * availablePhotos.length)]
    setCurrentPhoto(newPhoto)
    setDevelopedPhotos((prev) => {
      const updated = [...prev, newPhoto]
      // Save to localStorage
      const saveData = {
        count: totalPhotosCount + 1,
        photos: updated.slice(-10), // Keep last 10 photos
      }
      localStorage.setItem("darkroom-cat-photos", JSON.stringify(saveData))
      return updated
    })

    setTotalPhotosCount((prev) => prev + 1)
    setIsDeveloping(false)
    setCatAnimation("happy")
    setShowNewPhoto(true)

    // Play success sound
    if (bubbleAudioRef.current) {
      bubbleAudioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }

    // Reset cat animation after celebration
    setTimeout(() => {
      setCatAnimation("idle")
    }, 2000)
  }

  const addBubble = () => {
    const newBubble = {
      id: Date.now() + Math.random(),
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100,
    }
    setBubbles((prev) => [...prev, newBubble])

    // Remove bubble after animation
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id))
    }, 2000)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "#ffd700"
      case "rare":
        return "#9c27b0"
      default:
        return "#4caf50"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Star className="w-3 h-3" />
      case "rare":
        return <Heart className="w-3 h-3" />
      default:
        return <Camera className="w-3 h-3" />
    }
  }

  if (!isGameActive) {
    return (
      <motion.div
        className="relative min-h-screen bg-black flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Film grain overlay */}
        <div className="absolute inset-0 bg-[url('/grain-texture.png')] opacity-20 mix-blend-overlay pointer-events-none" />

        {/* Red darkroom lighting */}
        <div className="absolute inset-0 bg-red-900/20" />

        <div className="text-center z-10">
          <motion.div
            className="inline-block mb-6 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="font-mono text-sm text-red-400">FRAME X • BONUS REEL</p>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-mono tracking-tighter"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            DARKROOM CAT
          </motion.h1>

          <motion.p
            className="text-gray-400 mb-8 max-w-md mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Help Miso develop mysterious photos in the darkroom. Click and hold to develop each frame!
          </motion.p>

          <motion.button
            onClick={startGame}
            className="px-8 py-4 bg-red-500 text-white font-mono font-bold rounded hover:bg-red-600 transition-colors"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ENTER DARKROOM
          </motion.button>

          {totalPhotosCount > 0 && (
            <motion.p
              className="text-red-400 text-sm font-mono mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Photos developed: {totalPhotosCount}
            </motion.p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 bg-[url('/grain-texture.png')] opacity-30 mix-blend-overlay pointer-events-none animate-pulse" />

      {/* Red darkroom lighting with flicker */}
      <motion.div
        className="absolute inset-0 bg-red-900/30"
        animate={{
          opacity: [0.3, 0.35, 0.3, 0.32, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Hanging photos line */}
      <div className="absolute top-16 left-0 right-0 h-px bg-gray-600 z-10" />

      {/* Developed photos hanging on line */}
      <div className="absolute top-8 left-4 right-4 flex gap-4 overflow-x-auto z-20">
        {developedPhotos.slice(-8).map((photo, index) => (
          <motion.div
            key={`${photo.id}-${index}`}
            className="flex-shrink-0 relative"
            initial={{ y: -50, opacity: 0, rotate: -5 }}
            animate={{ y: 0, opacity: 1, rotate: Math.random() * 10 - 5 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Clothespin */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-yellow-800 rounded-sm z-10" />

            {/* Photo */}
            <div className="w-16 h-16 bg-white p-1 shadow-lg transform hover:scale-110 transition-transform">
              <div className="w-full h-full grid grid-cols-5 gap-px">
                {photo.pixels.flat().map((color, pixelIndex) => (
                  <div key={pixelIndex} className="w-full h-full" style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main game area */}
      <div className="container mx-auto px-4 pt-32 pb-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Miso the cat */}
          <div className="relative">
            <motion.div
              className="relative w-64 h-64 mx-auto"
              animate={catAnimation === "working" ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: catAnimation === "working" ? Number.POSITIVE_INFINITY : 0, duration: 1 }}
            >
              {/* Pixel cat */}
              <div className="absolute inset-0 grid grid-cols-16 gap-px p-4">
                {/* Cat sprite - simplified pixel art */}
                <div className="col-span-16 h-4 grid grid-cols-16 gap-px">
                  {/* Row 1 - ears */}
                  {Array.from({ length: 16 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-full h-full ${
                        i === 4 || i === 5 || i === 10 || i === 11 ? "bg-orange-500" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>

                {/* More rows for cat body */}
                {Array.from({ length: 12 }, (_, rowIndex) => (
                  <div key={rowIndex} className="col-span-16 h-4 grid grid-cols-16 gap-px">
                    {Array.from({ length: 16 }, (_, colIndex) => {
                      // Define cat pattern
                      const isBody = rowIndex >= 2 && rowIndex <= 8 && colIndex >= 3 && colIndex <= 12
                      const isEyes = rowIndex === 4 && (colIndex === 6 || colIndex === 9)
                      const isNose = rowIndex === 5 && colIndex === 7
                      const isGoggles =
                        catAnimation === "working" && rowIndex >= 3 && rowIndex <= 5 && colIndex >= 5 && colIndex <= 10

                      let bgColor = "bg-transparent"
                      if (isGoggles) bgColor = "bg-red-600"
                      else if (isEyes) bgColor = "bg-black"
                      else if (isNose) bgColor = "bg-pink-500"
                      else if (isBody) bgColor = "bg-orange-400"

                      return <div key={colIndex} className={`w-full h-full ${bgColor}`} />
                    })}
                  </div>
                ))}
              </div>

              {/* Cat status */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <p className="font-mono text-sm text-orange-400">
                  {catAnimation === "working" && "Miso is developing..."}
                  {catAnimation === "happy" && "Miso found something special!"}
                  {catAnimation === "idle" && "Miso is ready to help"}
                </p>
              </div>
            </motion.div>

            {/* Bubbles during development */}
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.div
                  key={bubble.id}
                  className="absolute w-2 h-2 bg-red-400/50 rounded-full"
                  style={{ left: bubble.x, top: bubble.y }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1, y: -50, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2 }}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Right side - Development station */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-black/50 border border-red-500/30 rounded p-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-mono text-xs text-red-400">PHOTOS DEVELOPED</p>
                  <p className="font-mono text-2xl text-white">{totalPhotosCount}</p>
                </div>
                <div>
                  <p className="font-mono text-xs text-red-400">SESSION COUNT</p>
                  <p className="font-mono text-2xl text-white">{developedPhotos.length}</p>
                </div>
              </div>
            </div>

            {/* Development progress */}
            <div className="bg-black/50 border border-red-500/30 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-mono text-sm text-red-400">DEVELOPMENT PROGRESS</p>
                <p className="font-mono text-sm text-white">{Math.floor(developingProgress)}%</p>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400"
                  style={{ width: `${developingProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Develop button */}
            <motion.button
              ref={developButtonRef}
              onMouseDown={startDeveloping}
              disabled={isDeveloping}
              className={`w-full py-6 font-mono font-bold text-lg rounded transition-all ${
                isDeveloping
                  ? "bg-red-800 text-red-300 cursor-not-allowed"
                  : "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
              }`}
              whileHover={!isDeveloping ? { scale: 1.02 } : {}}
              whileTap={!isDeveloping ? { scale: 0.98 } : {}}
            >
              {isDeveloping ? "DEVELOPING..." : "HOLD TO DEVELOP PHOTO"}
            </motion.button>

            {/* Current photo display */}
            <AnimatePresence>
              {showNewPhoto && currentPhoto && (
                <motion.div
                  className="bg-white p-4 rounded shadow-2xl"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 10 }}
                  transition={{ type: "spring", damping: 15 }}
                >
                  <div className="w-full h-32 grid grid-cols-5 gap-1 mb-3">
                    {currentPhoto.pixels.flat().map((color, index) => (
                      <motion.div
                        key={index}
                        className="w-full h-full"
                        style={{ backgroundColor: color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span style={{ color: getRarityColor(currentPhoto.rarity) }}>
                        {getRarityIcon(currentPhoto.rarity)}
                      </span>
                      <h3 className="font-mono text-sm font-bold text-black">{currentPhoto.name}</h3>
                    </div>
                    <p className="font-mono text-xs text-gray-600">{currentPhoto.description}</p>
                    <p className="font-mono text-xs text-gray-500 mt-1 capitalize">{currentPhoto.rarity}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Darkroom grid and controls */}
        <div className="col-span-2 mt-8">
          <div className="grid grid-cols-10 gap-1 p-4">
            {Array.from({ length: darkroomHeight * darkroomWidth }, (_, idx) => {
              const x = idx % darkroomWidth
              const y = Math.floor(idx / darkroomWidth)
              const isCat = catPosition.x === x && catPosition.y === y
              const tray = trayStates.find((t) => t.x === x && t.y === y)
              return (
                <div
                  key={idx}
                  className={`w-8 h-8 border ${isCat ? "bg-orange-400" : tray ? "bg-gray-500" : "bg-black"}`}
                >
                  {tray && tray.developed && "✔️"}
                </div>
              )
            })}
          </div>
          <p className="text-center text-orange-400 font-mono">
            Use arrow keys to move. {nearTray ? "Press Space to develop film." : ""}
          </p>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={() => setIsGameActive(false)}
        className="absolute top-4 right-4 px-4 py-2 bg-black/50 border border-red-500/30 text-red-400 font-mono text-sm rounded hover:bg-red-500/10 transition-colors z-30"
      >
        EXIT DARKROOM
      </button>
    </div>
  )
}
