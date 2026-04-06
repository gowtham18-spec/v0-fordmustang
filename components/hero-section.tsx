"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const parallaxY = scrollY * 0.5
  const opacity = Math.max(0, 1 - scrollY / 600)
  const scale = 1 + scrollY * 0.0005
  const rotateX = mousePosition.y * 5
  const rotateY = mousePosition.x * 5

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Gradient overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10 shadow-depth-xl" />

      {/* Radial spotlight effect */}
      <div
        className="absolute inset-0 z-5"
        style={{
          background: `radial-gradient(ellipse 80% 50% at ${50 + mousePosition.x * 10}% ${40 + mousePosition.y * 10}%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)`,
        }}
      />

      {/* Main car image with parallax and mouse tracking */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{
          transform: `translateY(${parallaxY}px) scale(${scale}) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          opacity,
        }}
      >
        <div className="relative w-full max-w-6xl aspect-video">
          <Image
            src="/images/mustang-hero.jpg"
            alt="1969 Ford Mustang Shelby GT500CR"
            fill
            priority
            className={`object-contain transition-all duration-1000 ${isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />

          {/* Neon glow under car */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gold/20 blur-3xl rounded-full animate-glow" />

          {/* Engine glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-40 h-20 bg-gold/10 blur-2xl rounded-full animate-pulse" />
        </div>
      </div>

      {/* Floor reflection */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-5"
        style={{
          background: "linear-gradient(to top, rgba(10,10,15,1) 0%, transparent 100%)",
        }}
      />

      {/* Title content */}
      <div
        className="relative z-20 text-center px-4"
        style={{
          transform: `translateY(${-scrollY * 0.3}px)`,
          opacity,
        }}
      >
        <p
          className={`text-gold font-light tracking-[0.3em] uppercase text-sm md:text-base mb-4 transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Shelby GT500CR
        </p>

        <h1
          className={`font-serif text-5xl md:text-7xl lg:text-9xl font-bold text-foreground mb-6 transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ textShadow: "0 0 60px rgba(212, 175, 55, 0.4), 0 8px 20px rgba(0, 0, 0, 0.5), 0 4px 10px rgba(0, 0, 0, 0.3)" }}
        >
          <span className="text-balance">1969 Mustang</span>
        </h1>

        <p
          className={`text-lg md:text-2xl text-muted-foreground font-light tracking-wider transition-all duration-1000 delay-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          American Muscle Legend
        </p>

        <div
          className={`mt-12 transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button
            className="px-8 py-4 border border-gold/50 text-gold hover:bg-gold hover:text-background transition-all duration-300 tracking-widest uppercase text-sm animate-pulse-glow shadow-depth-md elevation-1"
            onClick={() => {
              document.getElementById("performance")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-all duration-1000 delay-1200 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ opacity: opacity * 0.8 }}
      >
        <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gold animate-bounce" />
      </div>

      {/* Smoke effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-5 opacity-50">
        <div
          className="absolute bottom-10 left-1/4 w-60 h-20 bg-white/5 blur-3xl rounded-full animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute bottom-5 right-1/4 w-80 h-24 bg-white/5 blur-3xl rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  )
}
