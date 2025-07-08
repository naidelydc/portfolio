"use client"

import { useEffect, useRef } from "react"

export function FilmGrainEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      // Ensure we never set 0×0 which would break createImageData
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = Math.max(1, w)
      canvas.height = Math.max(1, h)
    }

    resize()
    window.addEventListener("resize", resize)

    let animationFrameId: number

const drawGrain = () => {
  const { width: w, height: h } = canvas
  if (w === 0 || h === 0) return

  const imageData = ctx.createImageData(w, h)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const gray = Math.floor(Math.random() * 255)
    data[i] = gray      // Red
    data[i + 1] = gray  // Green
    data[i + 2] = gray  // Blue
    data[i + 3] = 25    // Opacity (0–255)
  }

  ctx.putImageData(imageData, 0, 0)
  animationFrameId = requestAnimationFrame(drawGrain)
}


    drawGrain()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] opacity-30"
      style={{ imageRendering: "pixelated", background: "transparent"}}
    />
  )
}
