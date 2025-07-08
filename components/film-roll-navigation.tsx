"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, User, Clock, Code, Wrench, Mail, ChevronRight } from "lucide-react"

const navigationSections = [
  {
    id: "about",
    label: "About",
    icon: <User className="h-4 w-4" />,
    angle: 0,
    frame: "01",
  },
  {
    id: "timeline",
    label: "Timeline",
    icon: <Clock className="h-4 w-4" />,
    angle: 60,
    frame: "02",
  },
  {
    id: "projects",
    label: "Projects",
    icon: <Code className="h-4 w-4" />,
    angle: 120,
    frame: "03",
  },
  {
    id: "skills",
    label: "Skills",
    icon: <Wrench className="h-4 w-4" />,
    angle: 180,
    frame: "04",
  },
  {
    id: "contact",
    label: "Contact",
    icon: <Mail className="h-4 w-4" />,
    angle: 240,
    frame: "05",
  },
]

interface FilmRollNavigationProps {
  isDarkroom?: boolean
}

export function FilmRollNavigation({ isDarkroom = false }: FilmRollNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState("about")
  const [rotation, setRotation] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const windAudioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/camera-shutter.mp3")
    windAudioRef.current = new Audio("/film-advance.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (windAudioRef.current) {
        windAudioRef.current.pause()
        windAudioRef.current = null
      }
    }
  }, [])

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationSections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      const currentSectionElement = sections.find((section) => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSectionElement && currentSectionElement.id !== currentSection) {
        setCurrentSection(currentSectionElement.id)
        const sectionData = navigationSections.find((s) => s.id === currentSectionElement.id)
        if (sectionData) {
          setRotation(-sectionData.angle)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [currentSection])

  const handleSectionClick = (sectionId: string) => {
    if (isAnimating) return

    setIsAnimating(true)
    const section = navigationSections.find((s) => s.id === sectionId)
    if (!section) return

    // Play camera shutter sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }

    // Rotate film roll
    setRotation(-section.angle)
    setCurrentSection(sectionId)

    // Navigate to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }

    // Close navigation after a delay
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimating(false)
    }, 800)
  }

  const toggleNavigation = () => {
    if (isAnimating) return

    setIsOpen(!isOpen)

    // Play film advance sound
    if (windAudioRef.current) {
      windAudioRef.current.currentTime = 0
      windAudioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }

  const currentSectionData = navigationSections.find((s) => s.id === currentSection)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Main film roll container */}
      <motion.div
        className={`relative transition-all duration-500 ${isOpen ? "w-64 h-64" : "w-16 h-16"}`}
        animate={{
          scale: isOpen ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Film roll background */}
        <div
          className={`absolute inset-0 rounded-full border-4 transition-all duration-500 ${
            isDarkroom
              ? "bg-red-950/90 border-red-800/50 shadow-lg shadow-red-900/50"
              : "bg-gray-900/90 border-gray-700 shadow-lg shadow-black/50"
          } backdrop-blur-sm`}
        >
          {/* Film roll texture */}
          <div className="absolute inset-2 rounded-full overflow-hidden">
            <div
              className={`w-full h-full rounded-full transition-all duration-500 ${
                isDarkroom ? "bg-red-900/50" : "bg-gray-800/50"
              }`}
              style={{
                backgroundImage: `conic-gradient(from 0deg, ${
                  isDarkroom ? "#7f1d1d" : "#374151"
                } 0deg, ${isDarkroom ? "#991b1b" : "#4b5563"} 60deg, ${
                  isDarkroom ? "#7f1d1d" : "#374151"
                } 120deg, ${isDarkroom ? "#991b1b" : "#4b5563"} 180deg, ${
                  isDarkroom ? "#7f1d1d" : "#374151"
                } 240deg, ${isDarkroom ? "#991b1b" : "#4b5563"} 300deg, ${isDarkroom ? "#7f1d1d" : "#374151"} 360deg)`,
              }}
            />
          </div>

          {/* Center hub */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 transition-all duration-500 ${
              isDarkroom ? "bg-red-800 border-red-600" : "bg-gray-700 border-gray-500"
            }`}
          />
        </div>

        {/* Navigation sections */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navigationSections.map((section, index) => {
                const angle = section.angle + rotation
                const radius = 100
                const x = Math.cos((angle * Math.PI) / 180) * radius
                const y = Math.sin((angle * Math.PI) / 180) * radius
                const isActive = section.id === currentSection

                return (
                  <motion.button
                    key={section.id}
                    className={`absolute w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? isDarkroom
                          ? "bg-red-600 border-red-400 text-white shadow-lg shadow-red-500/50"
                          : "bg-red-500 border-red-400 text-white shadow-lg shadow-red-500/50"
                        : isDarkroom
                          ? "bg-red-900/80 border-red-700/50 text-red-300 hover:bg-red-800/80"
                          : "bg-gray-800/80 border-gray-600/50 text-gray-300 hover:bg-gray-700/80"
                    } backdrop-blur-sm`}
                    style={{
                      left: `calc(50% + ${x}px - 24px)`,
                      top: `calc(50% + ${y}px - 24px)`,
                    }}
                    onClick={() => handleSectionClick(section.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {section.icon}

                    {/* Frame number */}
                    <div
                      className={`absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-vt323 flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-orange-500 text-black"
                          : isDarkroom
                            ? "bg-red-800 text-red-300"
                            : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {section.frame}
                    </div>

                    {/* Label */}
                    <div
                      className={`absolute top-14 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-vt323 whitespace-nowrap transition-all duration-300 ${
                        isDarkroom
                          ? "bg-red-950/90 border border-red-800/50 text-red-300"
                          : "bg-gray-900/90 border border-gray-700 text-gray-300"
                      }`}
                    >
                      {section.label}
                    </div>
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <motion.button
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            isDarkroom
              ? "bg-red-800 border-red-600 text-red-300 hover:bg-red-700"
              : "bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
          } backdrop-blur-sm z-10`}
          onClick={toggleNavigation}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <Camera className="h-5 w-5" />
          ) : (
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-current rounded-full" />
              <ChevronRight className="h-4 w-4" />
            </div>
          )}
        </motion.button>

        {/* Current section indicator */}
        {!isOpen && currentSectionData && (
          <motion.div
            className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-md text-xs font-vt323 whitespace-nowrap transition-all duration-300 ${
              isDarkroom
                ? "bg-red-950/90 border border-red-800/50 text-red-300"
                : "bg-gray-900/90 border border-gray-700 text-gray-300"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {currentSectionData.frame}. {currentSectionData.label}
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 transition-all duration-300 ${
                isDarkroom ? "bg-red-950/90" : "bg-gray-900/90"
              }`}
            />
          </motion.div>
        )}

        {/* Film advance indicator */}
        {isOpen && (
          <motion.div
            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-md text-xs font-vt323 transition-all duration-300 ${
              isDarkroom
                ? "bg-red-950/90 border border-red-800/50 text-red-300"
                : "bg-gray-900/90 border border-gray-700 text-gray-300"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            FILM ROLL ACTIVE
          </motion.div>
        )}
      </motion.div>

      {/* Film strip decoration */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute -top-4 -left-4 w-6 h-80 pointer-events-none"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className={`w-full h-full border-x-2 transition-all duration-500 ${
                isDarkroom ? "bg-red-900/30 border-red-800/50" : "bg-gray-900/30 border-gray-700"
              }`}
            >
              {/* Sprocket holes */}
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
                    isDarkroom ? "bg-red-800" : "bg-gray-800"
                  }`}
                  style={{
                    left: i % 2 === 0 ? "-4px" : "calc(100% - 4px)",
                    top: `${i * 6 + 4}%`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
