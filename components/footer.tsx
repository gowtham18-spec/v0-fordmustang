"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer className="relative py-16 px-4 md:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-1 ring-gold/30">
              <Image
                src="/images/mustang-logo.jpg"
                alt="Mustang Logo"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <span className="text-foreground font-serif text-xl tracking-wider">SHELBY</span>
              <span className="text-gold font-serif text-xl tracking-wider ml-2">GT500CR</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <a href="#performance" className="hover:text-gold transition-colors">
              Performance
            </a>
            <a href="#explore" className="hover:text-gold transition-colors">
              Explore
            </a>
            <a href="#design" className="hover:text-gold transition-colors">
              Design
            </a>
            <a href="#gallery" className="hover:text-gold transition-colors">
              Gallery
            </a>
            <a href="#contact" className="hover:text-gold transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Shelby American Inc.
          </p>
        </div>

        {/* Bottom decorative text */}
        <div className="mt-16 overflow-hidden">
          <p
            className="text-[8vw] font-serif text-foreground/5 whitespace-nowrap tracking-widest text-center"
            aria-hidden="true"
          >
            AMERICAN MUSCLE LEGEND
          </p>
        </div>
      </div>
    </footer>
  )
}
