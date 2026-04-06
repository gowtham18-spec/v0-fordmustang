"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  title: string
}

const galleryImages: GalleryImage[] = [
  {
    src: "/images/mustang-hero.jpg",
    alt: "1969 Ford Mustang Shelby GT500CR Front View",
    title: "Fastback Front",
  },
  {
    src: "/images/mustang-side.jpg",
    alt: "1969 Ford Mustang Shelby GT500CR Side View",
    title: "Shelby GT500CR Side",
  },
  {
    src: "/images/mustang-engine.jpg",
    alt: "Ford Mustang V8 Engine Detail",
    title: "V8 Engine Detail",
  },
  {
    src: "/images/mustang-rear.jpg",
    alt: "1969 Ford Mustang Shelby GT500CR Rear View",
    title: "Rear View",
  },
  {
    src: "/images/mustang-interior.jpg",
    alt: "1969 Ford Mustang Interior",
    title: "Classic Interior",
  },
  {
    src: "/images/mustang-logo.jpg",
    alt: "Ford Mustang Logo Emblem",
    title: "Mustang Emblem",
  },
]

export function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    setIsZoomed(false)
  }, [])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setIsZoomed(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullscreen) {
        if (e.key === "ArrowRight") goToNext()
        if (e.key === "ArrowLeft") goToPrev()
        if (e.key === "Escape") setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isFullscreen, goToNext, goToPrev])

  // Touch/swipe handling
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    setStartX(clientX)
  }

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const diff = clientX - startX
    setTranslateX(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    if (translateX > 100) {
      goToPrev()
    } else if (translateX < -100) {
      goToNext()
    }
    setTranslateX(0)
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative min-h-screen py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className={`text-gold font-light tracking-[0.3em] uppercase text-sm mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Photography
          </p>
          <h2
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-balance">Gallery</span>
          </h2>
        </div>

        {/* Main slider */}
        <div
          ref={sliderRef}
          className={`relative transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          {/* Main image container */}
          <div
            className="relative aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
              }}
            >
              {galleryImages.map((image, index) => (
                <div key={image.src} className="relative w-full h-full shrink-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-contain transition-transform duration-300 ${
                      index === currentIndex ? "scale-100" : "scale-95 opacity-50"
                    }`}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Hover zoom indicator */}
            <button
              className="absolute top-4 right-4 p-3 bg-background/50 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300"
              onClick={() => setIsFullscreen(true)}
              aria-label="View fullscreen"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            {/* Navigation arrows */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-background/50 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300"
              onClick={goToPrev}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-background/50 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300"
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gold/10 blur-3xl rounded-full pointer-events-none" />
          </div>

          {/* Image title */}
          <div className="text-center mt-6">
            <h3 className="text-xl font-serif text-foreground">
              {galleryImages[currentIndex].title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {currentIndex + 1} / {galleryImages.length}
            </p>
          </div>

          {/* Thumbnail navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                className={`relative w-20 h-14 rounded overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? "ring-2 ring-gold scale-110"
                    : "ring-1 ring-border opacity-60 hover:opacity-100"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsZoomed(false)
                }}
                aria-label={`View ${image.title}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-deep-black flex items-center justify-center">
          {/* Close button */}
          <button
            className="absolute top-6 right-6 p-3 bg-background/20 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300 z-10"
            onClick={() => {
              setIsFullscreen(false)
              setIsZoomed(false)
            }}
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom toggle */}
          <button
            className="absolute top-6 right-20 p-3 bg-background/20 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300 z-10"
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          >
            {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
          </button>

          {/* Image */}
          <div
            className={`relative w-full h-full transition-transform duration-500 ${
              isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Navigation arrows */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-background/20 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300"
            onClick={goToPrev}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-background/20 backdrop-blur-sm rounded-full text-foreground hover:bg-gold hover:text-background transition-all duration-300"
            onClick={goToNext}
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image info */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
            <h3 className="text-2xl font-serif text-foreground mb-1">
              {galleryImages[currentIndex].title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} / {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
