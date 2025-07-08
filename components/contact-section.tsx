"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useMemo } from "react";
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send } from "lucide-react"

// Global styles for Contact Section
export function ContactSection() {
  // const TEST_MODE = process.env.NODE_ENV === "development"

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [flashActive, setFlashActive] = useState(false)
  const [showPolaroid, setShowPolaroid] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentCard, setCurrentCard] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const connectRef = useRef<HTMLDivElement | null>(null)
  const connectInView = useInView(connectRef, { once: false, amount: 0.3 })

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/instax.mp3")
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const polaroids = [
    { src: '/linkedin.png', alt: 'Polaroid 1', link: 'https://linkedin.com/in/naidely' },
    { src: '/github.png', alt: 'Polaroid 2', link: 'https://github.com/naidelydc' },
    { src: '/email.png', alt: 'Polaroid 3', link: 'mailto:naidelydc@gmail.com' },
    { src: '/canela1.png', alt: 'Polaroid 4', link: null },
    { src: '/canela2.png', alt: 'Polaroid 5', link: null },
  ];

  // instead of random, use explicit angles per image
  const angles = useMemo(
    () => [5, 12, -15, 25, -8],
    []
  );
  // Static positions for polaroids
  const offsets = [
    { x: -70, y: -50 },
    { x: 170, y: 10 },
    { x: 400, y: -20 },
    { x: 30, y: 260 },
    { x: 300, y: 300 },
  ];

  // handleSubmit function for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = "https://formspree.io/f/mldnvzqa";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (res.ok) {
        const filmSound = new Audio("/instax.mp3");
        filmSound.play().catch((e) => console.log("Audio play failed:", e));
        setFormState({ name: "", email: "", message: "" });
        setShowPolaroid(true);
        setTimeout(() => setShowPolaroid(false), 7000);
      } else {
        alert("Error submitting form.");
      }
    } catch (error) {
      console.error(error);
      alert("Submission failed.");
    }
  };

  return (
    <>
      <section
        id="contact"
        ref={sectionRef}
        className="relative pt-40 pb-10 overflow-visible bg-black"
        style={{ backgroundColor: 'black' }}
      >

        {/* Flash effect */}
        {flashActive && (
          <motion.div
            className="absolute inset-0 bg-white z-10 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-16">
            <div className="inline-block mb-6 px-3 py-1 bg-[#B17453]/10 border border-[#B17453]/20 rounded-sm">
              <p className="font-vt323 text-xs text-[#B17453]">FRAME 04 • CONTACT</p>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4 font-vt323 tracking-tighter">Get In Touch</h2>
            <p className="text-gray-400 max-w-2xl">
              Have a project in mind or want to discuss potential collaborations? Send me a message and I'll get back to
              you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 relative items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-[420px] mx-auto">
                {/* Camera Image */}
                <img
                  src="/camera.png"
                  alt="Camera"
                  className="w-[420px] mx-auto relative z-20 transition-filter duration-300"
                  style={{
                    filter: "contrast(1.15) brightness(0.75) sepia(0.2) saturate(1.1) grayscale(0.05)"
                  }}
                />

                {/* Overlay Form on Screen */}
                <form
                  onSubmit={handleSubmit}
                  className="absolute top-[-470px] left-[79px] w-[190px] h-[190px] flex flex-col justify-center items-center gap-2 relative z-30"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full text-white text-[15px] font-vt323 border-none p-1 bg-transparent placeholder-white/60 tracking-wide text-center"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full text-white text-[15px] font-vt323 border-none p-1 bg-transparent placeholder-white/60 tracking-wide text-center"
                    required
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={2}
                    className="w-full text-white text-[15px] font-vt323 border-none p-1 bg-transparent placeholder-white/60 tracking-wide text-center"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute bottom-[-173px] left-[-1px] w-[40px] h-[40px] rounded-full bg-[#8b5e3c] border-2 border-[#4b3a2f] text-white hover:scale-105 hover:bg-[#a37758] transition flex items-center justify-center shadow-md"
                    aria-label="Shutter Button"
                  >
                    SEND
                  </button>
                </form>

                {/* Polaroid Confirmation */}
                {showPolaroid && (
                  <motion.div
                    initial={{ top: '40%' }}
                    animate={{ top: '22%' }}
                    exit={{ top: '80%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute z-10 top-[60%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 w-[450px]"
                    style={{ left: '45%' }}
                  >
                    <img
                      src="/polaroid-frame.png"
                      alt="Polaroid"
                      className="w-full h-auto"
                    />
                    <div className="polaroid-text-overlay">
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center w-full -mt-[200px]"
            >
              <h3 className="font-vt323 text-xl text-white mb-6 tracking-tight"></h3>
              <div ref={containerRef} className="relative w-full h-[400px] mx-auto">
                {polaroids.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ rotate: angles[idx] }}
                    whileHover={{
                      rotate: angles[idx] + 10,
                      scale: 1.05,
                      y: -8,
                      boxShadow: '0 20px 20px rgba(255,255,255,0.5)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      position: 'absolute',
                      top: `${offsets[idx].y}px`,
                      left: `${offsets[idx].x}px`,
                      width: '180px',
                      transformOrigin: 'center center'
                    }}
                  >
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer">
                        <img src={p.src} alt={p.alt} className="w-full h-auto block" />
                      </a>
                    ) : (
                      <img src={p.src} alt={p.alt} className="w-full h-auto block" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <style jsx>{contactSectionStyles}</style>
      </section>
    </>
  )
}

import css from 'styled-jsx/css'

export const contactSectionStyles = css`
img[src="/camera.png"]:hover {
  filter: contrast(1.2) brightness(1) sepia(0.15) saturate(1.2);
}
.film-roll-stack {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
}

.film-roll {
  position: relative;
  width: 100px;
  height: 100px;
  background: #3c2f25;
  border-radius: 50%;
  box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  cursor: pointer;
  overflow: visible;
  transition: transform 0.3s ease;
}

.film-roll::after {
  content: "";
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 20px;
  background: #8b5e3c;
  border-radius: 10px;
}

.film-strip-roll {
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(-20%);
  width: 0;
  height: 40px;
  background: #fef7e5;
  border: 2px dashed #8b5e3c;
  font-family: 'VT323', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: width 1s ease;
}

.film-roll:hover .film-strip-roll {
  width: 260px;
}

.postcard-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.postcard {
  position: relative;
  width: 240px;
  height: 140px;
  background-color: #ede0c8;
  background-image: url('/wrinkle-texture.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
  filter: contrast(1.2) brightness(0.9);
  border: 2px solid #8b5e3c;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.4);
  transform: rotate(var(--angle));
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.postcard::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 8px;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.3);
  pointer-events: none;
}

.postcard-front {
  font-family: 'VT323', monospace;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #3c2f25;
  padding: 1rem;
}

.postcard-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ede0c8;
  border-top: 2px dashed #8b5e3c;
  font-family: 'VT323', monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.postcard:hover {
  transform: translateX(15px) rotate(var(--angle));
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

.postcard:hover .postcard-back {
  opacity: 1;
}
`