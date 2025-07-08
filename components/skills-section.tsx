"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Code, Database, LineChart, Server } from "lucide-react"
import { FilmCanister } from "@/components/film-canister"

const skillCategories = [
  {
    title: "Software Engineering",
    icon: <Code className="h-5 w-5 text" />,
    filmBrand: "kodak-gold",
    skills: [
      { name: "Python", level: 90 },
      { name: "TypeScript", level: 75 },
      { name: "React", level: 70 },
      { name: "Node.js", level: 65 },
      { name: "Go", level: 55 },
    ],
  },
  {
    title: "Data Engineering + Computing",
    icon: <Database className="h-5 w-5 text" />,
    filmBrand: "fujifilm",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 70 },
      { name: "MATLAB", level: 90 },
      { name: "MATLAB GUI", level: 90 },
      { name: "Looker/Tableau", level: 65 },
    ],
  },
  {
    title: "Data Analysis",
    icon: <LineChart className="h-5 w-5 text" />,
    filmBrand: "portra",
    skills: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Matplotlib", level: 80 },
      { name: "Scikit-learn", level: 80 },
      { name: "Jupyter", level: 90 },
    ],
  },
  {
    title: "Web Development",
    icon: <Server className="h-5 w-5 text" />,
    filmBrand: "ilford",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "Tailwind CSS", level: 65 },
      { name: "Next.js", level: 60 },
      { name: "Framer Motion", level: 65 },
    ],
  },
]

function mapLevelToLabel(level: number): "beginner" | "intermediate" | "proficient" | "advanced" | "expert" {
  if (level >= 85) return "expert";
  if (level >= 70) return "advanced";
  if (level >= 50) return "proficient";
  if (level >= 30) return "intermediate";
  return "beginner";
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Parallax scroll for layered background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const farY   = useTransform(scrollYProgress, [0, 1], ["20px", "-20px"])
  const midY   = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"])
  const frontY = useTransform(scrollYProgress, [0, 1], ["60px", "-60px"])

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  // Play sound when section comes into view
  useEffect(() => {
    if (isInView && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
    }
  }, [isInView])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-black"
      style={{
        backdropFilter: 'blur(2px)'
      }}
    >
      {/* Parallax “film shelf” layers */}
      <motion.div
        className="absolute inset-0 bg-[url('/shelf-far.png')] bg-cover bg-center pointer-events-none z-0"
        style={{ y: farY, scale: 1.1 }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/shelf-mid.png')] bg-cover bg-center pointer-events-none z-10"
        style={{ y: midY, scale: 1.05 }}
      />
      <motion.div
        className="absolute inset-0 bg-[url('/shelf-front.png')] bg-cover bg-center pointer-events-none z-20"
        style={{ y: frontY }}
      />

      <div className="container mx-auto px-4 relative z-30">
        <div className="mb-24">
          <div className="inline-block mb-6 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-sm">
            <p className="font-vt323 text-xs text-[#B17453]">FRAME 03 • SKILLS</p>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-vt323 tracking-tighter">Technical Expertise</h2>
          <p className="text-gray-400 max-w-2xl">
            My technical toolkit spans software development, data engineering, and math.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-[6.5rem]">
          {skillCategories.map((category, index) => (
            <FilmCanister
              key={index}
              title={category.title}
              icon={category.icon}
              skills={category.skills.map(skill => ({
                name: skill.name,
                level: mapLevelToLabel(skill.level),
              }))}
              filmBrand={category.filmBrand as "kodak-gold" | "fujifilm" | "portra" | "ilford"}
              isHovered={hoveredIndex === index}
              onHover={() => setHoveredIndex(index)}
              onUnhover={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
