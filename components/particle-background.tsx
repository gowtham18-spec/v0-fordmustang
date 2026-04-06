"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  opacity: number
  layer: number
}

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const numParticles = Math.min(150, Math.floor((width * height) / 10000))

    for (let i = 0; i < numParticles; i++) {
      const layer = Math.random() * 3
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        layer,
      })
    }
    return particles
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particlesRef.current = initParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      if (!canvas || !ctx) return

      ctx.fillStyle = "rgba(10, 10, 15, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse influence based on distance
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 200

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 0.02
          p.vx += dx * force * 0.1
          p.vy += dy * force * 0.1
        }

        // Apply velocity with damping
        p.x += p.vx * (1 + p.layer * 0.3)
        p.y += p.vy * (1 + p.layer * 0.3)
        p.vx *= 0.99
        p.vy *= 0.99

        // Reset particle if out of bounds
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        // Draw particle with depth effect
        const depthFactor = (1000 - p.z) / 1000
        const size = p.size * (1 + p.layer * 0.5) * depthFactor

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 3)
        const goldOpacity = p.opacity * depthFactor

        gradient.addColorStop(0, `rgba(212, 175, 55, ${goldOpacity})`)
        gradient.addColorStop(0.4, `rgba(212, 175, 55, ${goldOpacity * 0.5})`)
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")

        ctx.beginPath()
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${goldOpacity * 0.8})`
        ctx.fill()
      }

      // Draw light streaks occasionally
      if (Math.random() > 0.995) {
        const streakY = Math.random() * canvas.height
        const gradient = ctx.createLinearGradient(0, streakY, canvas.width * 0.3, streakY)
        gradient.addColorStop(0, "rgba(212, 175, 55, 0)")
        gradient.addColorStop(0.5, "rgba(212, 175, 55, 0.3)")
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)")

        ctx.beginPath()
        ctx.moveTo(-100, streakY)
        ctx.lineTo(canvas.width * 0.3, streakY + Math.random() * 10 - 5)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}
