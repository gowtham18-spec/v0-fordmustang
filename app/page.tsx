import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PerformanceSection } from "@/components/performance-section"
import { CarShowcase3D } from "@/components/car-showcase-3d"
import { DesignSection } from "@/components/design-section"
import { ImageGallery } from "@/components/image-gallery"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function MustangPage() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Animated particle background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Cinematic car reveal */}
      <HeroSection />

      {/* Performance Stats - Animated counters */}
      <PerformanceSection />

      {/* Interactive 3D Car Showcase */}
      <CarShowcase3D />

      {/* Design Philosophy Section */}
      <DesignSection />

      {/* Luxury Image Gallery */}
      <ImageGallery />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  )
}
