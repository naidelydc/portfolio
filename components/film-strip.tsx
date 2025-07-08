"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function FilmStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])

  const images = [
    "/film1.JPG",
    "/film2.JPG",
    "/film3.JPG",
    "/film4.JPG",
    "/film5.jpg",
    "/film6.JPG",
    "/film7.JPG",
    "/film8.JPG",
    "/film9.JPG",
    "/film10.JPG",
    "/film11.JPG",
    "/film12.JPG",
  ]

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/film-advance.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Play sound on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      if ((value > 0.1 && value < 0.12) || (value > 0.5 && value < 0.52) || (value > 0.8 && value < 0.82)) {
        if (audioRef.current) {
          audioRef.current.currentTime = 0
          audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
        }
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div ref={ref} className="relative overflow-hidden py-12 bg-black border-y border-gray-800">
      <motion.div className="flex gap-4 whitespace-nowrap" style={{ x }}>
        {images.map((src, i) => (
          <div key={i} className="relative inline-block min-w-[300px] h-[200px] bg-gray-1000 border-y-2 border-black">
            <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
              <div className="w-[280px] h-[160px] bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent mix-blend-overlay" />
                <img
                  src={src}
                  alt={`Film frame ${i + 1}`}
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute bottom-2 right-2 bg-orange-500 px-1 py-0.5 rotate-1">
                  <p className="font-vt323 text-[12px] text-black">
                    {new Date().toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
            {/* Film sprocket holes */}
            <div className="absolute -top-8 left-4 w-4 h-4 rounded-full bg-black border border-gray-700"></div>
            <div className="absolute -top-8 right-4 w-4 h-4 rounded-full bg-black border border-gray-700"></div>
            <div className="absolute -bottom-8 left-4 w-4 h-4 rounded-full bg-black border border-gray-700"></div>
            <div className="absolute -bottom-8 right-4 w-4 h-4 rounded-full bg-black border border-gray-700"></div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
