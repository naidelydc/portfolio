"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface Skill {
    name: string
    level: "beginner" | "intermediate" | "proficient" | "advanced" | "expert"
}

interface FilmCanisterProps {
    title: string
    skills: Skill[]
    filmBrand: "kodak-gold" | "fujifilm" | "portra" | "ilford"
    isHovered: boolean
    onHover: () => void
    onUnhover: () => void
    className?: string
    icon: React.ReactNode // Add this
}

export function FilmCanister({
    title,
    skills,
    filmBrand,
    isHovered,
    onHover,
    onUnhover,
    className,
}: FilmCanisterProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const rewindAudioRef = useRef<HTMLAudioElement | null>(null)

    const playSound = (isRewind = false) => {
        try {
            const audio = isRewind ? rewindAudioRef.current : audioRef.current
            if (audio) {
                audio.currentTime = 0
                audio.play().catch(() => { })
            }
        } catch (error) { }
    }

    const filmBrands = {
        "kodak-gold": {
            wrapper: "#F4D03F",
            wrapperGradient: "linear-gradient(135deg,rgb(212, 189, 95) 0%,rgb(187, 159, 45) 50%,rgb(142, 115, 7) 100%)",
            text: "#000000",
            label: "KODAK GOLD 200",
            filmColor: "#2C2C2C",
            brandColor: "#E8E8E8",
            glowColor: "rgba(244, 208, 63, 0.4)",
        },
        fujifilm: {
            wrapper: "#58D68D",
            wrapperGradient: "linear-gradient(135deg,rgb(86, 172, 123) 0%,rgb(32, 143, 78) 50%,rgb(15, 49, 30) 100%)",
            text: "#0E4B99",
            label: "FUJIFILM C200",
            filmColor: "#2C2C2C",
            brandColor: "#E8E8E8",
            glowColor: "rgba(88, 214, 141, 0.4)",
        },
        portra: {
            wrapper: "#EC7063",
            wrapperGradient: "linear-gradient(135deg,rgb(201, 121, 112) 0%,rgb(113, 57, 143) 50%,rgb(118, 33, 24) 100%)",
            text: "#C9C1C1",
            label: "KODAK PORTRA 400",
            filmColor: "#2C2C2C",
            brandColor: "#E8E8E8",
            glowColor: "rgba(140, 54, 198, 0.4)",
        },
        ilford: {
            wrapper: "#5D6D7E",
            wrapperGradient: "linear-gradient(135deg,rgb(97, 106, 113) 0%,rgb(62, 69, 77) 50%,rgb(33, 41, 49) 100%)",
            text: "#FDFEFE",
            label: "ILFORD HP5 PLUS",
            filmColor: "#2C2C2C",
            brandColor: "#E8E8E8",
            glowColor: "rgba(149, 161, 174, 0.4)",
        },
    }

    const brand = filmBrands[filmBrand]
    if (!brand) {
        console.error(`Unknown film brand: ${filmBrand}`)
        return null
    }

    const getSkillMarks = (level: string) => {
        const marks: Record<string, string> = {
            beginner: "◦◦◦◦◦",
            intermediate: "●◦◦◦◦",
            proficient: "●●◦◦◦",
            advanced: "●●●◦◦",
            expert: "●●●●●",
        };
        return marks[level] || "◦◦◦◦◦";
    };

return (
    <div className={cn("relative flex items-center", className)}>
        {/* Hidden audio elements */}
        <audio ref={audioRef} preload="none" className="hidden">
            <source src="/film-wind.mp3" type="audio/mpeg" />
        </audio>
        <audio ref={rewindAudioRef} preload="none" className="hidden">
            <source src="/film-wind.mp3" type="audio/mpeg" />
        </audio>

        {/* Shared Hover Container */}
        <div
            className="relative flex items-center"
            onMouseEnter={() => {
                onHover()
                playSound(false)
            }}
            onMouseLeave={() => {
                onUnhover()
                playSound(true)
            }}
        >
            {/* Darkroom Backlight Glow */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 -m-8 rounded-full blur-2xl z-0"
                        style={{
                            background: `radial-gradient(circle, ${brand.glowColor} 0%, transparent 70%)`,
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Film Canister */}
            <motion.div
                className="relative cursor-pointer select-none z-10"
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    rotateY: isHovered ? 8 : 0,
                    rotateX: isHovered ? -3 : 0,
                    rotateZ: isHovered ? 2 : 0,
                }}
                transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Enhanced Cylindrical Canister Body */}
                <div className="relative w-20 h-40 md:w-24 md:h-48">
                    {/* Soft Drop Shadow */}
                    <div
                        className="absolute -bottom-6 -left-3 -right-3 h-10 opacity-50 rounded-sm blur-xl"
                        style={{
                            background: "radial-gradient(ellipse, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                        }}
                    />

                    {/* Black Metal Canister Body - Enhanced Cylindrical */}
                    <div
                        className="absolute inset-0 rounded-sm overflow-hidden"
                        style={{
                            background: "linear-gradient(90deg, #1A1A1A 0%, #0D0D0D 20%, #000000 50%, #0D0D0D 80%, #1A1A1A 100%)",
                            boxShadow: `
                  inset 3px 0 6px rgba(255,255,255,0.15),
                  inset -3px 0 6px rgba(0,0,0,0.4),
                  0 6px 20px rgba(0,0,0,0.5),
                  0 2px 8px rgba(0,0,0,0.3)
                `,
                        }}
                    >
                        {/* Enhanced Cylindrical Highlights */}
                        <div
                            className="absolute left-1 top-4 bottom-4 w-2 rounded-sm opacity-40"
                            style={{
                                background: `
                    linear-gradient(to bottom, 
                      rgba(121, 115, 115, 0.9) 0%, 
                      rgba(35, 34, 34, 0.6) 20%, 
                      rgba(255,255,255,0.3) 50%, 
                      rgba(255,255,255,0.6) 80%, 
                      rgba(255,255,255,0.9) 100%
                    )
                  `,
                                filter: "blur(0.5px)",
                            }}
                        />

                        {/* Secondary highlight */}
                        <div
                            className="absolute left-0.5 top-6 bottom-6 w-0.5 rounded-sm opacity-60"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.8) 100%)",
                            }}
                        />

                        {/* Right side shadow for depth */}
                        <div
                            className="absolute right-1 top-6 bottom-6 w-1 rounded-full opacity-30"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.6) 100%)",
                            }}
                        />

                        {/* Film grain and scratches texture */}
                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                background: `
                    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0.5px, transparent 0.5px),
                    radial-gradient(circle at 75% 75%, rgba(0,0,0,0.2) 0.5px, transparent 0.5px),
                    linear-gradient(45deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(-45deg, rgba(0,0,0,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                  `,
                                backgroundSize: "3px 3px, 4px 4px, 20px 20px, 25px 25px, 15px 15px",
                            }}
                        />

                        {/* Metal texture lines */}
                        {Array.from({ length: 18 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute left-1 right-1 h-px opacity-15"
                                style={{
                                    top: `${6 + i * 4.8}%`,
                                    background:
                                        "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)",
                                }}
                            />
                        ))}

                        {/* Top and bottom cylindrical shading */}
                        <div
                            className="absolute top-0 left-0 right-0 h-6 rounded-t-lg opacity-60"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(80,80,80,0.8) 0%, rgba(40,40,40,0.4) 50%, transparent 100%)",
                            }}
                        />
                        <div
                            className="absolute bottom-0 left-0 right-0 h-6 rounded-b-lg opacity-60"
                            style={{
                                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.4) 50%, transparent 100%)",
                            }}
                        />
                    </div>

                    {/* Paper Wrapper - Enhanced with realistic shadows */}
                    <div
                        className="absolute inset-x-1.5 top-6 bottom-6 rounded overflow-hidden"
                        style={{
                            background: brand.wrapperGradient,
                            boxShadow: `
                  inset 0 2px 4px rgba(255,255,255,0.4),
                  inset 0 -2px 4px rgba(0,0,0,0.3),
                  0 3px 8px rgba(0,0,0,0.3),
                  0 1px 3px rgba(0,0,0,0.2)
                `,
                        }}
                    >
                        {/* Enhanced paper texture */}
                        <div
                            className="absolute inset-0 opacity-25"
                            style={{
                                background: `
                    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 1px, transparent 1px),
                    radial-gradient(circle at 70% 70%, rgba(0,0,0,0.15) 1px, transparent 1px),
                    linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(0,0,0,0.08) 25%, transparent 25%)
                  `,
                                backgroundSize: "4px 4px, 5px 5px, 8px 8px, 8px 8px",
                            }}
                        />

                        {/* Brand Typography */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-1">
                            <div
                                className="text-[8px] md:text-[10px] font-black leading-tight tracking-wider"
                                style={{
                                    color: brand.text,
                                    fontFamily: "Arial Black, sans-serif",
                                    textShadow: "0 1px 2px rgba(255,255,255,0.4), 0 1px 1px rgba(0,0,0,0.2)",
                                }}
                            >
                                {brand.label}
                            </div>
                            <div
                                className="text-[6px] md:text-[7px] font-bold mt-0.5 opacity-90"
                                style={{
                                    color: brand.text,
                                    fontFamily: "Arial, sans-serif",
                                }}
                            >
                                35mm • 36 EXP
                            </div>
                        </div>

                        {/* Paper edge effects */}
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-white opacity-50" />
                        <div className="absolute right-0 top-0 bottom-0 w-px bg-black opacity-40" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-white opacity-30" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-black opacity-30" />
                    </div>

                    {/* Enhanced Metallic Top Knob */}
                    <div
                        className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-5 md:w-14 md:h-5 rounded-[2px] overflow-hidden"
                        style={{
                            background: "linear-gradient(90deg, #333 0%, #555 50%, #333 100%)",
                            boxShadow: `
                  inset 0 1px 0 rgba(50, 48, 48, 0.2),
                  inset 0 -1px 0 rgba(0,0,0,0.5),
                  0 2px 4px rgba(0,0,0,0.4)
                `,
                        }}
                    >
                        {/* Slim top highlight */}
                        <div
                            className="absolute top-0 left-1/4 right-1/4 h-px"
                            style={{ background: "rgba(255, 255, 255, 0.5)" }}
                        />

                        {/* Knob texture */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "linear-gradient(to bottom, #444 0%, #222 100%)",
                            }}
                        />
                    </div>

                    {/* Bottom - Flat metal base */}
                    <div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-18 h-1.5 md:w-22 md:h-2 rounded-none"
                        style={{
                            background: "linear-gradient(to top, #0D0D0D 0%, #2A2A2A 50%, #404040 100%)",
                            boxShadow: "0 -1px 3px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)",
                        }}
                    />

                    {/* Category Label */}
                    <div
                        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded text-white text-[9px] font-mono text-center whitespace-nowrap"
                        style={{
                            background: "rgba(0,0,0,0.85)",
                            backdropFilter: "blur(6px)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        }}
                    >
                        {title}
                    </div>
                </div>
            </motion.div>

            {/* Dark Gray Film Strip */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="relative overflow-visible ml-2"
                    >
                        {/* Dark Gray Film Strip */}
                        <div
                            className="relative shadow-2xl"
                            style={{
                                width: "440px",
                                height: "130px",
                                background: brand.filmColor,
                                clipPath:
                                    "polygon(0 15%, 8% 0%, calc(100% - 15px) 0%, 100% 25%, 100% calc(100% - 25px), calc(100% - 8px) 100%, 8% 100%, 0 85%)",
                                transform: "perspective(800px) rotateY(-2deg) rotateX(1deg) rotateZ(0.5deg)",
                                transformOrigin: "left center",
                                boxShadow: "0 8px 25px rgba(0,0,0,0.4), 0 3px 8px rgba(0,0,0,0.3)",
                            }}
                        >
                            {/* Film grain texture */}
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    background: `
                      radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0.5px, transparent 0.5px),
                      radial-gradient(circle at 75% 75%, rgba(0,0,0,0.3) 0.5px, transparent 0.5px),
                      linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)
                    `,
                                    backgroundSize: "2px 2px, 3px 3px, 5px 5px, 5px 5px",
                                }}
                            />

                            {/* Film curl lighting */}
                            <div
                                className="absolute inset-0 opacity-25"
                                style={{
                                    background:
                                        "linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.3) 100%)",
                                }}
                            />

                            {/* Sprocket holes */}
                            <div className="absolute top-2 left-6 right-6 h-1.5 flex justify-around items-center">
                                {Array.from({ length: 28 }).map((_, i) => (
                                    <div
                                        key={`top-${i}`}
                                        className="w-1 h-1 bg-black rounded-sm opacity-90"
                                        style={{
                                            boxShadow: "inset 0 0.5px 1px rgba(0,0,0,0.8), 0 0.5px 1px rgba(255,255,255,0.1)",
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="absolute bottom-2 left-6 right-6 h-1.5 flex justify-around items-center">
                                {Array.from({ length: 28 }).map((_, i) => (
                                    <div
                                        key={`bottom-${i}`}
                                        className="w-1 h-1 bg-black rounded-sm opacity-90"
                                        style={{
                                            boxShadow: "inset 0 0.5px 1px rgba(0,0,0,0.8), 0 0.5px 1px rgba(255,255,255,0.1)",
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Frame markings */}
                            <div
                                className="absolute left-8 top-1 text-[7px] opacity-60"
                                style={{
                                    color: brand.brandColor,
                                    fontFamily: "monospace",
                                }}
                            >
                                24A
                            </div>
                            <div
                                className="absolute right-10 bottom-1 text-[7px] opacity-60"
                                style={{
                                    color: brand.brandColor,
                                    fontFamily: "monospace",
                                }}
                            >
                                25
                            </div>

                            {/* Skills Content */}
                            <div className="absolute inset-0 flex items-center px-10 py-3">
                                <div className="w-full">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-sm font-bold mb-2 tracking-wide"
                                        style={{
                                            color: brand.brandColor,
                                            fontFamily: '"Courier New", monospace',
                                            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {title.toUpperCase()}
                                    </motion.h3>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                                        {skills.map((skill, index) => (
                                            <motion.div
                                                key={skill.name}
                                                initial={{ opacity: 0, x: -15 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.08 + 0.4 }}
                                                className="flex items-center justify-between"
                                            >
                                                <span
                                                    className="text-xs"
                                                    style={{
                                                        color: brand.brandColor,
                                                        fontFamily: '"Courier New", monospace',
                                                        textShadow: "0 1px 1px rgba(0,0,0,0.5)",
                                                    }}
                                                >
                                                    {skill.name}
                                                </span>
                                                <span
                                                    className="text-xs ml-2"
                                                    style={{
                                                        color: brand.brandColor,
                                                        fontFamily: '"Courier New", monospace',
                                                    }}
                                                >
                                                    {getSkillMarks(skill.level)}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Film edge highlights */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white opacity-60" />
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black opacity-70" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
)
}
