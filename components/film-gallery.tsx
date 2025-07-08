"use client"

import { useState } from "react"
import Image from "next/image"

const images = [
  {
    src: "/canela1",
    alt: "Film photo 1",
    filmStock: "Portra 400",
    camera: "Leica M6",
    location: "New York City",
  },
  {
    src: "/placeholder.svg?height=600&width=800&text=Tri-X 400",
    alt: "Film photo 2",
    filmStock: "Tri-X 400",
    camera: "Nikon F3",
    location: "San Francisco",
  },
  {
    src: "/placeholder.svg?height=600&width=800&text=Ektar 100",
    alt: "Film photo 3",
    filmStock: "Ektar 100",
    camera: "Pentax K1000",
    location: "Los Angeles",
  },
  {
    src: "/placeholder.svg?height=600&width=800&text=HP5 Plus",
    alt: "Film photo 4",
    filmStock: "HP5 Plus",
    camera: "Canon AE-1",
    location: "Chicago",
  },
  {
    src: "/placeholder.svg?height=600&width=800&text=Fuji Superia",
    alt: "Film photo 5",
    filmStock: "Fuji Superia",
    camera: "Olympus OM-1",
    location: "Seattle",
  },
  {
    src: "/placeholder.svg?height=600&width=800&text=Cinestill 800T",
    alt: "Film photo 6",
    filmStock: "Cinestill 800T",
    camera: "Contax T2",
    location: "Miami",
  },
]

export function FilmGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[url('/grain-texture.png')] opacity-20 mix-blend-overlay z-10 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <div className="relative overflow-hidden rounded-md border-8 border-white shadow-lg">
              <div className="absolute inset-0 bg-[url('/grain-texture.png')] opacity-30 mix-blend-overlay z-10" />
              <Image
                src={image.src || "/placeholder.svg"}
                width={800}
                height={600}
                alt={image.alt}
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-vt323 text-xs text-amber-900">{image.filmStock}</p>
                  <p className="text-sm text-amber-800">{image.camera}</p>
                </div>
                <p className="text-xs text-amber-700">{image.location}</p>
              </div>
            </div>
            <div className="absolute -top-2 -right-2 bg-amber-100 px-2 py-1 border border-amber-200 shadow-sm rotate-3">
              <p className="font-vt323 text-xs text-amber-900">#{index + 1}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
