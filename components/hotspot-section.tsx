"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface Hotspot {
  id: string
  x: number
  y: number
  title: string
  description: string
  image?: string
}

const hotspots: Hotspot[] = [
  {
    id: "engine",
    x: 35,
    y: 40,
    title: "428 Cobra Jet V8",
    description:
      "The heart of the beast. A 428 cubic inch V8 engine producing 335 horsepower and 440 lb-ft of torque. Ram Air induction system for maximum performance.",
    image: "/images/mustang-engine.jpg",
  },
  {
    id: "hood",
    x: 50,
    y: 25,
    title: "Functional Hood Scoop",
    description:
      "The iconic hood scoop isn't just for show. It channels cold air directly to the engine, providing an extra boost of power when you need it most.",
  },
  {
    id: "stripe",
    x: 65,
    y: 45,
    title: "Racing Heritage",
    description:
      "The signature GT500 stripes pay homage to Carroll Shelby's racing legacy. Each stripe tells a story of victories on the track.",
  },
  {
    id: "wheels",
    x: 25,
    y: 70,
    title: "Shelby 10-Spoke Wheels",
    description:
      "Custom 17-inch Shelby wheels wrapped in performance rubber. Designed for both aesthetics and optimal grip on any surface.",
  },
  {
    id: "lights",
    x: 15,
    y: 48,
    title: "Quad Headlights",
    description:
      "The distinctive quad headlight design became an icon of American automotive design. Enhanced with modern LED technology while maintaining the classic look.",
  },
]

export function HotspotSection() {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative min-h-screen py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/10 to-background z-0" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p
            className={`text-gold font-light tracking-[0.3em] uppercase text-sm mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Interactive
          </p>
          <h2
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-balance">Explore Every Detail</span>
          </h2>
          <p
            className={`mt-6 text-muted-foreground text-lg max-w-xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Click on the hotspots to discover the engineering excellence behind every component
          </p>
        </div>

        {/* Interactive car image */}
        <div
          className={`relative max-w-5xl mx-auto transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src="/images/mustang-side.jpg"
              alt="1969 Ford Mustang Shelby GT500CR Side View"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 1200px"
            />

            {/* Hotspots */}
            {hotspots.map((hotspot, index) => (
              <button
                key={hotspot.id}
                className={`absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 group transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transitionDelay: `${600 + index * 100}ms`,
                }}
                onClick={() => setActiveHotspot(hotspot)}
                aria-label={`Learn about ${hotspot.title}`}
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-gold/30 animate-ping" />
                {/* Outer ring */}
                <span className="absolute inset-0 rounded-full border-2 border-gold/50 group-hover:border-gold transition-colors" />
                {/* Inner dot */}
                <span className="absolute inset-2 rounded-full bg-gold group-hover:scale-110 transition-transform" />
              </button>
            ))}

            {/* Glow effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-gold/10 blur-3xl rounded-full" />
          </div>
        </div>

        {/* Hotspot detail modal */}
        {activeHotspot && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setActiveHotspot(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-card border border-border rounded-lg p-8 animate-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setActiveHotspot(null)}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {activeHotspot.image && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                  <Image
                    src={activeHotspot.image}
                    alt={activeHotspot.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}

              <p className="text-gold font-light tracking-[0.2em] uppercase text-xs mb-2">
                Feature
              </p>
              <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                {activeHotspot.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {activeHotspot.description}
              </p>

              <button
                className="mt-6 px-6 py-3 bg-gold text-background font-medium tracking-wider uppercase text-sm hover:bg-gold-dark transition-colors rounded"
                onClick={() => setActiveHotspot(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
