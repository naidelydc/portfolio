"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Calendar, Code, Database, GraduationCap, Briefcase, Award } from "lucide-react"

const timelineEvents = [
  {
    id: 1,
    year: "2021",
    title: "Rice University: Computational and Applied Mathematics (CAAM)",
    description: "Began my journey in CAAM, discovering my passion for programming and data structures.",
    type: "education",
    icon: <GraduationCap className="h-4 w-4" />,
    filmStock: "Kodak Gold 200",
    exposure: "f/2.8 • 1/125s",
    stage: "initial",
  },
  {
    id: 2,
    year: "2022",
    title: "First Internship (Google AI)",
    description: "Quantum AI Intern at Google, explored quantum algorithms using Python and Qiskit, and contributed to optimization projects with researchers.",
    type: "work",
    icon: <Briefcase className="h-4 w-4" />,
    filmStock: "Fuji Superia 400",
    exposure: "f/4 • 1/60s",
    stage: "developer",
  },
  {
    id: 2.5,
    year: "2022",
    title: "Fondren Fellows Research",
    description: "Led a data-driven research project analyzing interlibrary loan usage through statistical modeling, survey design, and user behavior analysis. Developed a prototype web interface to enhance service efficiency and user experience.",
    type: "research",
    icon: <Database className="h-4 w-4" />,
    filmStock: "Ilford HP5 Plus",
    exposure: "f/8 • 1/60s",
    stage: "developer",
  },
  {
    id: 3,
    year: "2023",
    title: "Axion Energy Internship (Buenos Aires)",
    description: "Worked on oil well production data analysis, enhancing extraction efficiency through advanced data modeling. Led a QR code project to streamline field operations and data collection.",
    type: "work",
    icon: <Briefcase className="h-4 w-4" />,
    filmStock: "Tri-X 400",
    exposure: "f/5.6 • 1/30s",
    stage: "fixer",
  },
  {
    id: 3.5,
    year: "2024",
    title: "MD Anderson Undergrad Researcher",
    description:
      "Conducted research on optimizing surveillance strategies for head and neck cancer patients using advanced statistical modeling and Markov decision processes. Collaborated with clinicians and data scientists to develop predictive tools.",
    type: "research",
    icon: <Database className="h-4 w-4" />,
    filmStock: "Kodak T-Max 400",
    exposure: "f/11 • 1/125s",
    stage: "developer",
  },
  {
    id: 3.75,
    year: "2025",
    title: "Brown Mailroom System Project",
    description:
      "Restored and modernized Brown Residential College’s (Rice U) legacy Java-based mailroom system by integrating secure SMTP services for automated email notifications, rebuilding the .jar for 2FA compatibility, and refactoring authentication logic to support package tracking for ~250 student residents.",
    type: "project",
    icon: <Code className="h-4 w-4" />,
    filmStock: "Kodak Ektar 100",
    exposure: "f/2.2 • 1/200s",
    stage: "fixer",
  },
  {
    id: 4,
    year: "2025",
    title: "Full-Stack Project",
    description: "Developed a retro-inspired full-stack portfolio site using Next.js, TypeScript, Tailwind CSS, and Framer Motion, with film photography-themed components and dynamic UI animations.",
    type: "project",
    icon: <Code className="h-4 w-4" />,
    filmStock: "Portra 800",
    exposure: "f/2 • 1/250s",
    stage: "wash",
  },

]

const developmentStages = [
  { name: "Exposed", description: "Initial learning phase", color: "bg-gray-800" },
  { name: "Developer", description: "Skills taking shape", color: "bg-gray-700" },
  { name: "Fixer", description: "Solidifying knowledge", color: "bg-gray-600" },
  { name: "Wash", description: "Refining abilities", color: "bg-gray-500" },
  { name: "Final", description: "Professional ready", color: "bg-[#150B10]" },
]

export function FilmDevelopmentTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const [currentStage, setCurrentStage] = useState(0)
  const [developmentProgress, setDevelopmentProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

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

  // Development animation
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setDevelopmentProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 100)

      // Play development sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
      }

      return () => clearInterval(interval)
    }
  }, [isInView])

  // Update current stage based on progress
  useEffect(() => {
    const stage = Math.floor((developmentProgress / 100) * developmentStages.length)
    setCurrentStage(Math.min(stage, developmentStages.length - 1))
  }, [developmentProgress])

  return (
    <section ref={sectionRef} className="relative py-24 bg-black">
      <div className="absolute inset-0 bg-[url('/grain-texture.png')] opacity-30 mix-blend-overlay" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-block mb-6 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-sm">
            <p className="font-vt323 text-xs text-red-400">DEVELOPMENT PROCESS • TIMELINE</p>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-vt323 tracking-tighter">Career Development</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Like developing film in a darkroom, my career has progressed through distinct stages of growth and learning.
          </p>
        </div>

        {/* Development Tank Visualization */}
        <div className="mb-16 flex justify-center">
          <div className="relative w-80 h-20 bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-vt323 text-xs text-gray-400">DEVELOPMENT TANK</p>
            </div>
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-red-500/30 border-t border-red-500/50"
              style={{ height: `${developmentProgress}%` }}
            />
            <div className="absolute top-2 right-2 bg-black px-2 py-1 rounded">
              <p className="font-vt323 text-xs text-red-400">{Math.round(developmentProgress)}%</p>
            </div>
          </div>
        </div>

        {/* Development Stages */}
        <div className="mb-16">
          <div className="flex justify-center gap-4 flex-wrap">
            {developmentStages.map((stage, index) => (
              <div
                key={index}
                className={`px-4 py-2 rounded-sm border transition-all duration-300 ${
                  index <= currentStage
                    ? `${stage.color} border-bg-[#000B10]/50 text-white`
                    : "bg-gray-800 border-gray-700 text-gray-500"
                }`}
              >
                <p className="font-vt323 text-xs font-bold">{stage.name}</p>
                <p className="font-vt323 text-[10px] opacity-80">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Film strip background */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-full bg-gray-900 border-x-4 border-black">
            {/* Sprocket holes */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-black rounded-full"
                style={{
                  
                  left: i % 2 === 0 ? "-6px" : "calc(100% - 6px)",
                  top: `${i * 5 + 2}%`,
                }}
              />
            ))}
          </div>

          {/* Progress line */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[#000B10] z-10"
            style={{ height: progressHeight }}
          />

          {/* Timeline events */}
          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`flex items-center gap-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                  <div
                    className={`inline-block bg-gray-900 border border-gray-800 rounded-md p-6 max-w-md relative ${
                      index % 2 === 0 ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    {/* Film frame effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#B17453]/10 to-transparent rounded-md" />
                    <div className="absolute inset-0 pointer-events-none rounded-md" style={{
                      background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 40%, rgba(0,0,0,0.25) 100%)"
                    }} />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#B17453]/20 flex items-center justify-center">
                          {event.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white font-vt323">{event.title}</h3>
                      </div>

                      <p className="text-gray-400 mb-4">{event.description}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        <div className="px-2 py-1 bg-black/50 border border-gray-800 rounded-sm">
                          <span className="font-vt323 text-xs text-gray-300">{event.filmStock}</span>
                        </div>
                        <div className="px-2 py-1 bg-black/50 border border-gray-800 rounded-sm">
                          <span className="font-vt323 text-xs text-gray-300">{event.exposure}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-[#B17453]" />
                        <span className="font-vt323 text-xs text-[#B17453]">{event.year}</span>
                      </div>
                    </div>

                    {/* Film frame corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t border-l  border-[#C2A58D]/30" />
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r  border-[#C2A58D]/30" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l  border-[#C2A58D]/30" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r  border-[#C2A58D]/30" />
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="relative z-20">
                  <motion.div
                    className="w-4 h-4 bg-[#00000] rounded-full border-4 border-gray-950"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Development Complete */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-gray-900 border  border-[#C2A58D]/30 rounded-md p-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white font-vt323">Development Complete</h3>
            </div>
            <p className="text-gray-400 mb-4">Ready for the next chapter in software and data engineering.</p>
            <div className="flex justify-center gap-4">
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
