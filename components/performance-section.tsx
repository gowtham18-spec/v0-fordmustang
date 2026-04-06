"use client"

import { useEffect, useRef, useState } from "react"
import { Gauge, Zap, Timer, Fuel } from "lucide-react"

interface StatCardProps {
  icon: React.ReactNode
  value: string
  unit: string
  label: string
  delay: number
  isVisible: boolean
}

function StatCard({ icon, value, unit, label, delay, isVisible }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    if (!isVisible) return

    const numValue = parseFloat(value)
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    let currentStep = 0

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)
        const current = numValue * easeOut

        if (value.includes(".")) {
          setDisplayValue(current.toFixed(1))
        } else {
          setDisplayValue(Math.floor(current).toString())
        }

        if (currentStep >= steps) {
          clearInterval(interval)
          setDisplayValue(value)
        }
      }, stepDuration)
    }, delay)

    return () => clearTimeout(timer)
  }, [isVisible, value, delay])

  return (
    <div
      className={`group relative p-8 rounded-lg bg-card/50 backdrop-blur-sm border border-border hover:border-gold/50 transition-all duration-500 hover:scale-105 shadow-depth-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="text-gold mb-4">{icon}</div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-5xl md:text-6xl font-bold text-foreground font-serif">
            {displayValue}
          </span>
          <span className="text-xl text-muted-foreground">{unit}</span>
        </div>
        <p className="text-sm text-muted-foreground tracking-wider uppercase">{label}</p>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-6 bg-gradient-to-b from-gold/50 to-transparent" />
        <div className="absolute top-0 right-0 w-6 h-px bg-gradient-to-l from-gold/50 to-transparent" />
      </div>
    </div>
  )
}

export function PerformanceSection() {
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

  const stats = [
    {
      icon: <Fuel className="w-8 h-8" />,
      value: "428",
      unit: "ci",
      label: "V8 Engine",
    },
    {
      icon: <Gauge className="w-8 h-8" />,
      value: "335",
      unit: "HP",
      label: "Horsepower",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: "200",
      unit: "km/h",
      label: "Top Speed",
    },
    {
      icon: <Timer className="w-8 h-8" />,
      value: "6.0",
      unit: "sec",
      label: "0-100 km/h",
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="performance"
      className="relative min-h-screen py-32 px-4 md:px-8 flex items-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className={`text-gold font-light tracking-[0.3em] uppercase text-sm mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Pure Power
          </p>
          <h2
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-balance">Performance</span>
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.label}
              {...stat}
              delay={index * 150}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom text */}
        <div
          className={`text-center mt-20 transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            The legendary 428 Cobra Jet V8 engine delivers raw, unfiltered American muscle power.
            Experience the thunderous roar that defined an era.
          </p>
        </div>
      </div>
    </section>
  )
}
