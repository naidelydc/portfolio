"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Database, ExternalLink, Github, LineChart, Server, Workflow } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Rice Parking Data Automation",
    description:
      "A Python-powered tool for automating Rice University's parking lot usage reports by extracting, cleaning, and summarizing complex Excel files, with an intuitive interface for generating monthly reports.",
    tags: ["Python", "Pandas", "Data Automation", "Excel"],
    icon: <Database className="h-5 w-5" />,
    github: "https://github.com/naidelydc/lot-summary-app",
    demo: "",
  },
  {
    id: 2,
    title: "Mapping Black History in Sugar Land",
    description:
      "An interactive website built with HTML and CSS documenting sites of Black history in Sugar Land, Texas, developed for Rice University's HIST 246 course.",
    tags: ["HTML", "CSS", "Digital History", "Mapping"],
    icon: <Workflow className="h-5 w-5" />,
    github: "",
    demo: "https://naidely.blogs.rice.edu/",
  },
  {
    id: 3,
    title: "Project In Progress",
    description: "This project is currently being developed. Stay tuned for updates!",
    tags: ["Coming Soon"],
    icon: <Server className="h-5 w-5" />,
  },
  {
    id: 4,
    title: "Project In Progress",
    description: "This project is currently being developed. Stay tuned for updates!",
    tags: ["Coming Soon"],
    icon: <Workflow className="h-5 w-5" />,
  },
]

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/camera-shutter.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleProjectHover = (id: number) => {
    if (hoveredProject !== id) {
      setHoveredProject(id)

      // Play camera shutter sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
      }

      // Trigger camera shake on the specific project card
      const projectCard = document.querySelector(`[data-project-id="${id}"]`)
      if (projectCard) {
        projectCard.classList.add("animate-camera-shake")
        setTimeout(() => {
          projectCard.classList.remove("animate-camera-shake")
        }, 600)
      }
    }
  }

  return (
    <section id="projects" ref={sectionRef} className="relative py-24 bg-black">
      {/* Subtle 35mm film grain background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            repeating-conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg, 
              rgba(255, 255, 255, 0.1) 0.1deg, 
              transparent 0.2deg, 
              transparent 2deg
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.05) 1px,
              rgba(255, 255, 255, 0.05) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 1px,
              rgba(255, 255, 255, 0.05) 1px,
              rgba(255, 255, 255, 0.05) 2px
            )
          `,
          backgroundSize: "4px 4px, 3px 3px, 3px 3px",
        }}
      />

      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="inline-block mb-6 px-3 py-1 bg-[#B17453]/10 border  border-[#B17453]/20 rounded-sm">
            <p className="font-pixel text-xs text-[#B17453]">FRAME 02 • PROJECTS</p>
          </div>
          <h2 className="text-3xl font-pixel-black text-white mb-4 tracking-wider retro-glitch">FEATURED PROJECTS</h2>
          <p className="text-gray-400 max-w-2xl font-pixel">
            A collection of software and data engineering projects that showcase my technical skills and problem-solving
            approach.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              data-project-id={project.id}
              className="relative bg-gray-900 border border-gray-800 rounded-md overflow-hidden group"
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.2,
                        // Add a developing effect
                        opacity: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
                      },
                    }
                  : {}
              }
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B17453]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Vignette effect */}
              <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-60" />

              <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#B17453]/10 flex items-center justify-center">
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-pixel-bold text-white tracking-wide">{project.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ExternalLink className="h-5 w-5" />
                        <span className="sr-only">Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 mb-6 font-pixel">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <div key={index} className="px-2 py-1 bg-black/50 border border-gray-800 rounded-sm">
                      <span className="font-pixel text-xs text-gray-300">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Film frame corners */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-red-500/30" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-red-500/30" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-red-500/30" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-red-500/30" />

            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
