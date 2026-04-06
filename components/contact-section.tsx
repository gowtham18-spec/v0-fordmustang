"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import Image from "next/image"

export function ContactSection() {
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
      id="contact"
      className="relative min-h-screen py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/mustang-hero.jpg"
          alt=""
          fill
          className="object-cover opacity-10"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p
            className={`text-gold font-light tracking-[0.3em] uppercase text-sm mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Get In Touch
          </p>
          <h2
            className={`font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-balance">Reserve Yours</span>
          </h2>
          <p
            className={`mt-6 text-muted-foreground text-lg max-w-xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Become part of an exclusive legacy. Contact us to begin your journey with the legendary
            Shelby GT500CR.
          </p>
        </div>

        {/* Contact grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
            }`}
          >
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground tracking-wider uppercase">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-card border border-border rounded focus:border-gold focus:outline-none transition-colors text-foreground"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground tracking-wider uppercase">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-card border border-border rounded focus:border-gold focus:outline-none transition-colors text-foreground"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground tracking-wider uppercase">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-card border border-border rounded focus:border-gold focus:outline-none transition-colors text-foreground"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground tracking-wider uppercase">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-card border border-border rounded focus:border-gold focus:outline-none transition-colors text-foreground"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground tracking-wider uppercase">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-card border border-border rounded focus:border-gold focus:outline-none transition-colors resize-none text-foreground"
                  placeholder="Tell us about your dream Mustang..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gold text-background font-medium tracking-widest uppercase hover:bg-gold-dark transition-colors flex items-center justify-center gap-2 group rounded"
              >
                Send Inquiry
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div
            className={`space-y-10 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20"
            }`}
          >
            <div className="p-8 bg-card/50 border border-border rounded-lg">
              <h3 className="font-serif text-2xl text-foreground mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded text-gold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <p className="text-foreground">reservations@shelbygt500cr.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded text-gold">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      Phone
                    </p>
                    <p className="text-foreground">+1 (555) 428-1969</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gold/10 rounded text-gold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-foreground">
                      Las Vegas, Nevada
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="p-8 border border-gold/30 rounded-lg relative">
              <div className="absolute top-4 left-4 text-6xl text-gold/20 font-serif">"</div>
              <blockquote className="relative z-10 text-lg text-muted-foreground italic leading-relaxed pl-8">
                The car was made for the highway - you could take it anywhere.
              </blockquote>
              <cite className="block mt-4 pl-8 text-gold font-serif not-italic">
                — Carroll Shelby
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
