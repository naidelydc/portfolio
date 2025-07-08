"use client"


import Spline from '@splinetool/react-spline';
import dynamic from "next/dynamic";
// Dynamically import it on the client only
const SplineScene = dynamic(() => import("@/components/SplineScene"), { ssr: false });
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { FilmStrip } from "@/components/film-strip"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { FilmGrainEffect } from "@/components/film-grain-effect"
import { FilmCounter } from "@/components/film-counter"
import { DisposableCameraLoader } from "@/components/disposable-camera-loader"
import { ViewfinderOverlay } from "@/components/viewfinder-overlay"
import { FilmDevelopmentTimeline } from "@/components/film-development-timeline"
import { DarkroomToggle } from "@/components/darkroom-toggle"
import { DarkroomOverlay } from "@/components/darkroom-overlay"
import { FilmRollNavigation } from "@/components/film-roll-navigation"
import { Button } from "@/components/ui/button"
import { Code, Download, Github, Linkedin, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { PentaxK1000Back } from "@/components/pentax-k1000-back"
import { PolaroidGallery } from "@/components/polaroid-gallery"


export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [flashActive, setFlashActive] = useState(false)
  const [isDarkroom, setIsDarkroom] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [cameraShake, setCameraShake] = useState(false)
  const router = useRouter()

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/shutter1.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Camera shake on navigation
  useEffect(() => {
    const handleRouteChange = () => {
      setCameraShake(true)

      // Play camera shutter sound
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch((e) => console.log("Audio play failed:", e))
      }

      setTimeout(() => setCameraShake(false), 600)
    }

    // Listen for hash changes (internal navigation)
    const handleHashChange = () => {
      handleRouteChange()
    }

    window.addEventListener("hashchange", handleHashChange)

    // Also trigger on smooth scroll to sections
    const navLinks = document.querySelectorAll('a[href^="#"]:not(.contact-button)')
    navLinks.forEach((link) => {
      link.addEventListener("click", handleRouteChange)
    })

    return () => {
      window.removeEventListener("hashchange", handleHashChange)
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleRouteChange)
      })
    }
  }, [])

  // Apply darkroom styles to body
  useEffect(() => {
    if (isDarkroom) {
      document.body.classList.add("darkroom-mode")
    } else {
      document.body.classList.remove("darkroom-mode")
    }

    return () => {
      document.body.classList.remove("darkroom-mode")
    }
  }, [isDarkroom])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 p-8">
        <PentaxK1000Back
          filmType="kodak"
          showFilmCanister={true}
          className="max-w-2xl"
          isLoading={true}
          onLoadingComplete={() => setIsLoading(false)}
        />
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="font-mono text-lg text-white mb-2">LOADING PORTFOLIO</p>
          <p className="font-mono text-sm text-gray-400">Professional 35mm SLR Camera System</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-black text-gray-300 relative transition-all duration-1000 ${cameraShake ? "animate-camera-shake" : ""
        } ${isDarkroom ? "darkroom-active" : ""}`}
    >
      <FilmGrainEffect />
      <FilmCounter scrollYProgress={scrollYProgress} />
      <ViewfinderOverlay />
      <DarkroomToggle onToggle={setIsDarkroom} isDarkroom={isDarkroom} />
      <DarkroomOverlay isDarkroom={isDarkroom} />
      <FilmRollNavigation isDarkroom={isDarkroom} />

      {/* Flash effect */}
      <AnimatePresence>
        {flashActive && (
          <motion.div
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b transition-all duration-1000 ${isDarkroom ? "bg-red-950/80 border-red-800/50" : "bg-black/80 border-gray-800"
          }`}
      >
        <div className="container mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-1000 ${isDarkroom ? "bg-[#B17453]" : "bg-[#A35E3A]"
                }`}
            >
              <Code className="h-4 w-4 text-black" />
            </div>
            <h1
              className={`text-lg font-vt323 tracking-tighter transition-all duration-1000 ${isDarkroom ? "text-red-200" : "text-white"
                }`}
            >
              NAI<span className={isDarkroom ? "text-[#B17453]" : "text-[#A35E3A]"}>DELY</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className={`font-vt323 text-sm transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              01. ABOUT
            </a>
            <a
              href="#timeline"
              className={`font-vt323 text-sm transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              02. TIMELINE
            </a>
            <a
              href="#projects"
              className={`font-vt323 text-sm transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              03. PROJECTS
            </a>
            <a
              href="#skills"
              className={`font-vt323 text-sm transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              04. SKILLS
            </a>
            <a
              href="#contact"
              className={`font-vt323 text-sm transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              05. CONTACT
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/naidelydc"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/naidely/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/80 hover:text-red-300" : "text-gray-400 hover:text-white"
                }`}
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="relative min-h-screen flex items-center pt-20">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={`absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent transition-all duration-1000 ${isDarkroom ? "via-red-500/20" : "via-red-500/20"
                }`}
            />
            <div
              className={`absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent to-transparent transition-all duration-1000 ${isDarkroom ? "via-red-500/20" : "via-red-500/20"
                }`}
            />
          </div>

          <div className="container mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div
                  className={`inline-block mb-6 px-3 py-1 border rounded-sm transition-all duration-1000 ${isDarkroom ? "bg-red-500/10 border-red-500/20" : "bg-red-500/10 border-red-500/20"
                    }`}
                >
                  <p
                    className={`font-vt323 text-xs transition-all duration-1000 ${isDarkroom ? "text-[#B17453]" : "text-[#B17453]"
                      }`}
                  >
                    FRAME 01 • ABOUT
                  </p>
                </div>
                <h1
                  className={`text-4xl md:text-6xl font-bold mb-6 tracking-tighter transition-all duration-1000 font-vt323 ${isDarkroom ? "text-red-200" : "text-white"
                    }`}
                >
              Naidely Parada-De La Cruz <span className={isDarkroom ? "text-[#B17453]" : "text-[#A35E3A]"}>Data Engineer</span>
                </h1>
                <p
                  className={`mb-8 max-w-lg transition-all duration-1000 ${isDarkroom ? "text-red-300/80" : "text-gray-400"
                    }`}
                >
                  Hello! I’m a Bay Area native with a love for 35mm film photography, matcha, and meaningful data. I enjoy exploring cities—especially through their food scenes. Some of my favorite experiences include discovering Houston’s diverse neighborhoods, from Chinatown and Katy to its many crane games, matcha spots, and boba cafes. In San Francisco, I love hunting for vintage photo booths and spending time in Japantown with friends.

I’m passionate about uncovering insights, building simulations, and turning complex information into clear, impactful solutions. Oh, and I love music.
                </p>
                <div className="rounded-md overflow-hidden mb-8">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/3dA8HFdzzLh8EJcEJPu6wq?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div
                    className={`px-3 py-1 rounded-sm font-vt323 text-xs transition-all duration-1000 ${isDarkroom ? "bg-red-900/50 text-red-300" : "bg-gray-800 text-gray-300"
                      }`}
                  >
                    Python
                  </div>
                  <div
                    className={`px-3 py-1 rounded-sm font-vt323 text-xs transition-all duration-1000 ${isDarkroom ? "bg-red-900/50 text-red-300" : "bg-gray-800 text-gray-300"
                      }`}
                  >
                    MATLAB
                  </div>
                  <div
                    className={`px-3 py-1 rounded-sm font-vt323 text-xs transition-all duration-1000 ${isDarkroom ? "bg-red-900/50 text-red-300" : "bg-gray-800 text-gray-300"
                      }`}
                  >
                    C++
                  </div>
                  <div
                    className={`px-3 py-1 rounded-sm font-vt323 text-xs transition-all duration-1000 ${isDarkroom ? "bg-red-900/50 text-red-300" : "bg-gray-800 text-gray-300"
                      }`}
                  >
                    SQL
                  </div>
                  <div
                    className={`px-3 py-1 rounded-sm font-vt323 text-xs transition-all duration-1000 ${isDarkroom ? "bg-red-900/50 text-red-300" : "bg-gray-800 text-gray-300"
                      }`}
                  >
                    Data Engineering
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative"
              >
                <div className="relative mx-auto inline-block ml-24 md:ml-40">
                  <div
                    className={`absolute inset-0 border-2 rounded-md transform rotate-3 transition-all duration-1000 ${isDarkroom ? "border-red-500/30" : "border-red-500/30"
                      }`}
                  />
                  <div
                    className={`absolute inset-0 border-2 rounded-md transform -rotate-2 transition-all duration-1000 ${isDarkroom ? "border-red-500/20" : "border-red-500/20"
                      }`}
                  />
                <div
                  className="relative rounded-md overflow-hidden transition-all duration-1000"
                >
                  {/* ISO 800 / film info bar moved to bottom left */}
                  <div className="absolute bottom-8 left-2 p-2 text-xs font-vt323 text-white z-20">
                    <span className={isDarkroom ? "text-[#B17453]" : "text-[#A35E3A]"}>ISO 800</span> • f/2.8 • 1/60s • Kodak Gold 200
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent mix-blend-overlay" />
                  <div className="relative z-10">
                    <PolaroidGallery />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 text-center text-xs font-vt323 text-white z-10">
                    Click to shuffle!
                  </div>
                  <div className="absolute top-4 right-4 bg-orange-500/80 px-2 py-1 font-vt323 text-xs text-black rotate-2">
                    {new Date().toLocaleDateString("en-US", { year: "2-digit", month: "2-digit", day: "2-digit" })}
                  </div>
                </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <FilmStrip />

        <section id="timeline">
          <FilmDevelopmentTimeline />
        </section>

        <ProjectsSection />

        <SkillsSection />

        <ContactSection />
      </main>

      <footer
        className={`border-t py-12 transition-all duration-1000 ${isDarkroom ? "bg-red-950/50 border-red-800/50" : "bg-black border-gray-800"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-1000 ${isDarkroom ? "bg-[#B17453]" : "bg-[#A35E3A]"
                    }`}
                >
                  <Code className="h-3 w-3 text-black" />
                </div>
                <h2
                  className={`text-lg font-vt323 tracking-tighter transition-all duration-1000 ${isDarkroom ? "text-red-200" : "text-white"
                    }`}
                >
                  NAI<span className={isDarkroom ? "text-[#B17453]" : "text-[#A35E3A]"}>DELY</span>
                </h2>
              </div>
              <p
                className={`text-sm max-w-xs transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/60" : "text-gray-500"
                  }`}
              >
                Software & Data Engineering Portfolio with a passion for 35mm film photography.
              </p>
            </div>

            <div className="flex gap-6">
              <a
                href="https://github.com/naidelydc"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/60 hover:text-red-300" : "text-gray-500 hover:text-white"
                  }`}
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/naidely/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/60 hover:text-red-300" : "text-gray-500 hover:text-white"
                  }`}
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:contact@example.com"
                className={`transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/60 hover:text-red-300" : "text-gray-500 hover:text-white"
                  }`}
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div
            className={`border-t mt-8 pt-8 text-center transition-all duration-1000 ${isDarkroom ? "border-red-800/50" : "border-gray-800"
              }`}
          >
            <p
              className={`text-sm font-vt323 transition-all duration-1000 ${isDarkroom ? "text-[#B17453]/60" : "text-gray-500"
                }`}
            >
              © {new Date().getFullYear()} • Shot on Kodak Gold 200 •{" "}
              {isDarkroom ? "Developed in Darkroom" : "Single-use Camera"}
            </p>
          </div>
        </div>
      </footer>
      {/* Global scale and black background */}
      <style jsx global>{`
        html {
          zoom: 0.9;
          background-color: #000;
        }
      `}</style>
    </div>
  )
}
