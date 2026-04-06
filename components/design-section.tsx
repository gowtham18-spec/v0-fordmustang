"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function DesignSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height))
      )
      setScrollProgress(progress)
    }

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const features = [
    {
      title: "Iconic Fastback",
      description:
        "The legendary fastback design that revolutionized American automotive styling. A silhouette that remains timeless.",
    },
    {
      title: "Shelby Heritage",
      description:
        "Born from the genius of Carroll Shelby, this machine carries the DNA of a racing champion.",
    },
    {
      title: "Handcrafted Excellence",
      description:
        "Every detail meticulously restored and enhanced. Modern reliability meets classic beauty.",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="design"
      className="relative min-h-screen py-32 px-4 md:px-8"
    >
      {/* Background with parallax image */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          transform: `translateY(${scrollProgress * 50}px)`,
        }}
      >
        <Image
          src="/images/mustang-rear.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className={`text-gold font-light tracking-[0.3em] uppercase text-sm mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Craftsmanship
          </p>
          <h2
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-balance">Design Philosophy</span>
          </h2>
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/mustang-interior.jpg"
                alt="1969 Ford Mustang Interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Decorative frame */}
              <div className="absolute inset-4 border border-gold/30 rounded pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8">
                <div className="absolute top-0 left-0 w-full h-px bg-gold" />
                <div className="absolute top-0 left-0 w-px h-full bg-gold" />
              </div>
              <div className="absolute top-0 right-0 w-8 h-8">
                <div className="absolute top-0 right-0 w-full h-px bg-gold" />
                <div className="absolute top-0 right-0 w-px h-full bg-gold" />
              </div>
              <div className="absolute bottom-0 left-0 w-8 h-8">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gold" />
                <div className="absolute bottom-0 left-0 w-px h-full bg-gold" />
              </div>
              <div className="absolute bottom-0 right-0 w-8 h-8">
                <div className="absolute bottom-0 right-0 w-full h-px bg-gold" />
                <div className="absolute bottom-0 right-0 w-px h-full bg-gold" />
              </div>
            </div>

            {/* Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-2/3 h-20 bg-gold/20 blur-3xl rounded-full" />
          </div>

          {/* Content side */}
          <div className="space-y-10">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
                }`}
                style={{ transitionDelay: `${500 + index * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center border border-gold/50 rounded">
                    <span className="text-gold font-serif text-xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif text-foreground mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {index < features.length - 1 && (
                  <div className="ml-6 mt-10 w-px h-10 bg-gradient-to-b from-gold/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
