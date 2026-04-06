import { ParticleBackground } from "@/components/particle-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PerformanceSection } from "@/components/performance-section"
import { HotspotSection } from "@/components/hotspot-section"
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

      {/* Interactive Hotspot Explorer */}
      <HotspotSection />

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
