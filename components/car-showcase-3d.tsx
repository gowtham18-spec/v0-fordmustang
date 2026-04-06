"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  Environment, 
  Html, 
  useTexture, 
  PerspectiveCamera,
  MeshReflectorMaterial,
  Float
} from "@react-three/drei"
import * as THREE from "three"
import { X, ChevronRight } from "lucide-react"

interface HotspotData {
  id: string
  position: [number, number, number]
  cameraTarget: [number, number, number]
  cameraPosition: [number, number, number]
  title: string
  subtitle: string
  description: string
  specs?: { label: string; value: string }[]
  image: string
}

const hotspots: HotspotData[] = [
  {
    id: "engine",
    position: [-0.8, 0.3, 0],
    cameraTarget: [-1.5, 0.2, 0],
    cameraPosition: [-1.5, 0.8, 2],
    title: "428 Cobra Jet V8",
    subtitle: "The Heart of the Beast",
    description: "A 428 cubic inch V8 engine producing raw American muscle power. Ram Air induction system for maximum performance.",
    specs: [
      { label: "Engine", value: "V8 428ci" },
      { label: "Horsepower", value: "335 HP" },
      { label: "Top Speed", value: "200 km/h" },
      { label: "0-100 km/h", value: "~6 seconds" },
      { label: "Transmission", value: "4-Speed Manual" },
      { label: "Drive Type", value: "RWD" },
    ],
    image: "/images/mustang-engine.jpg",
  },
  {
    id: "interior",
    position: [0.2, 0.2, 0.5],
    cameraTarget: [0, 0.1, 0],
    cameraPosition: [0.5, 0.5, 1.5],
    title: "Driver Cockpit",
    subtitle: "Command Center",
    description: "Step inside the driver-focused cockpit featuring classic gauges, leather-wrapped steering wheel, and ergonomic controls.",
    specs: [
      { label: "Steering", value: "Leather Wrapped" },
      { label: "Gauges", value: "Full Chrome" },
      { label: "Seats", value: "Sport Bucket" },
      { label: "Shifter", value: "Hurst 4-Speed" },
    ],
    image: "/images/mustang-cockpit.jpg",
  },
  {
    id: "wheel",
    position: [-1.2, -0.3, 0.8],
    cameraTarget: [-1.5, -0.3, 0.8],
    cameraPosition: [-1.5, 0, 2],
    title: "Performance Wheels",
    subtitle: "Grip & Style",
    description: "Custom 17-inch Shelby wheels with performance rubber. Designed for both aesthetics and optimal grip.",
    specs: [
      { label: "Size", value: '17" Alloy' },
      { label: "Style", value: "10-Spoke" },
      { label: "Brakes", value: "Disc Front/Rear" },
      { label: "Tires", value: "Performance" },
    ],
    image: "/images/mustang-wheel.jpg",
  },
  {
    id: "rear",
    position: [1.5, 0.1, 0],
    cameraTarget: [2, 0, 0],
    cameraPosition: [2.5, 0.5, 2],
    title: "Signature Rear",
    subtitle: "Iconic Design",
    description: "The distinctive sequential taillights and dual exhaust define the GT500's aggressive rear stance.",
    specs: [
      { label: "Taillights", value: "Sequential LED" },
      { label: "Exhaust", value: "Dual Chrome Tips" },
      { label: "Spoiler", value: "Ducktail" },
      { label: "Badging", value: "GT500 Chrome" },
    ],
    image: "/images/mustang-rear-detail.jpg",
  },
]

function Hotspot({ 
  hotspot, 
  isActive, 
  onClick 
}: { 
  hotspot: HotspotData
  isActive: boolean
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        hovered || isActive ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      )
    }
  })

  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
      <group position={hotspot.position}>
        {/* Outer glow ring */}
        <mesh>
          <ringGeometry args={[0.08, 0.1, 32]} />
          <meshBasicMaterial 
            color="#d4af37" 
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Pulse ring */}
        <mesh scale={isActive ? 1.5 : 1 + Math.sin(Date.now() * 0.003) * 0.2}>
          <ringGeometry args={[0.1, 0.12, 32]} />
          <meshBasicMaterial 
            color="#d4af37" 
            transparent 
            opacity={0.3} 
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Center dot */}
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = "pointer"
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = "auto"
          }}
        >
          <sphereGeometry args={[0.05, 32, 32]} />
          <meshStandardMaterial 
            color="#d4af37" 
            emissive="#d4af37"
            emissiveIntensity={hovered || isActive ? 2 : 0.8}
          />
        </mesh>
      </group>
    </Float>
  )
}

function CarImage() {
  const texture = useTexture("/images/mustang-studio.jpg")
  
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <planeGeometry args={[4, 2.25]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}

function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={1024}
        mixBlur={1}
        mixStrength={40}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.5}
        mirror={0.5}
      />
    </mesh>
  )
}

function CameraController({ 
  targetPosition, 
  targetLookAt,
  isAnimating
}: { 
  targetPosition: [number, number, number]
  targetLookAt: [number, number, number]
  isAnimating: boolean
}) {
  const { camera } = useThree()
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))
  
  useFrame((_, delta) => {
    // Smooth camera position transition
    camera.position.lerp(
      new THREE.Vector3(...targetPosition),
      isAnimating ? delta * 2 : delta * 0.5
    )
    
    // Smooth look-at transition
    currentLookAt.current.lerp(
      new THREE.Vector3(...targetLookAt),
      isAnimating ? delta * 2 : delta * 0.5
    )
    camera.lookAt(currentLookAt.current)
  })
  
  return null
}

function SpotLights() {
  return (
    <>
      {/* Main spotlight from above */}
      <spotLight
        position={[0, 5, 2]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        color="#ffffff"
        castShadow
      />
      {/* Rim lights */}
      <spotLight
        position={[-5, 2, -2]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#4a90d9"
      />
      <spotLight
        position={[5, 2, -2]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#d4af37"
      />
      {/* Ambient fill */}
      <ambientLight intensity={0.2} />
    </>
  )
}

function Scene({ 
  activeHotspot, 
  onHotspotClick,
  defaultCameraPosition,
  defaultCameraTarget
}: { 
  activeHotspot: HotspotData | null
  onHotspotClick: (hotspot: HotspotData) => void
  defaultCameraPosition: [number, number, number]
  defaultCameraTarget: [number, number, number]
}) {
  const cameraPosition = activeHotspot?.cameraPosition || defaultCameraPosition
  const cameraTarget = activeHotspot?.cameraTarget || defaultCameraTarget
  
  return (
    <>
      <PerspectiveCamera makeDefault position={defaultCameraPosition} fov={50} />
      <CameraController 
        targetPosition={cameraPosition}
        targetLookAt={cameraTarget}
        isAnimating={!!activeHotspot}
      />
      
      <SpotLights />
      <Environment preset="studio" />
      
      <Suspense fallback={null}>
        <CarImage />
        <ReflectiveFloor />
      </Suspense>
      
      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          hotspot={hotspot}
          isActive={activeHotspot?.id === hotspot.id}
          onClick={() => onHotspotClick(hotspot)}
        />
      ))}
      
      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a0f", 5, 15]} />
    </>
  )
}

function DetailPanel({ 
  hotspot, 
  onClose 
}: { 
  hotspot: HotspotData
  onClose: () => void 
}) {
  return (
    <div className="absolute right-0 top-0 h-full w-full md:w-[450px] bg-gradient-to-l from-background/98 via-background/95 to-transparent p-8 flex flex-col justify-center animate-in slide-in-from-right duration-500">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-secondary/50 hover:bg-secondary text-foreground transition-colors"
        aria-label="Close panel"
      >
        <X className="w-5 h-5" />
      </button>
      
      <div className="space-y-6">
        <div>
          <p className="text-primary font-light tracking-[0.3em] uppercase text-xs mb-2">
            {hotspot.subtitle}
          </p>
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {hotspot.title}
          </h3>
        </div>
        
        {/* Image preview */}
        <div className="relative aspect-video rounded-lg overflow-hidden border border-border/50">
          <img
            src={hotspot.image}
            alt={hotspot.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        
        <p className="text-muted-foreground leading-relaxed">
          {hotspot.description}
        </p>
        
        {/* Specs grid */}
        {hotspot.specs && (
          <div className="grid grid-cols-2 gap-3">
            {hotspot.specs.map((spec, index) => (
              <div 
                key={spec.label}
                className="bg-secondary/30 border border-border/30 rounded-lg p-3 animate-in fade-in slide-in-from-bottom duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                  {spec.label}
                </p>
                <p className="text-foreground font-semibold">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        )}
        
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-primary hover:gap-3 transition-all group"
        >
          <span className="text-sm font-medium uppercase tracking-wider">
            Continue Exploring
          </span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

function HotspotIndicators({ 
  activeHotspot, 
  onSelect 
}: { 
  activeHotspot: HotspotData | null
  onSelect: (hotspot: HotspotData | null) => void 
}) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          onClick={() => onSelect(activeHotspot?.id === hotspot.id ? null : hotspot)}
          className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
            activeHotspot?.id === hotspot.id
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
          }`}
        >
          {hotspot.id}
        </button>
      ))}
    </div>
  )
}

export function CarShowcase3D() {
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const defaultCameraPosition: [number, number, number] = [0, 0.5, 4]
  const defaultCameraTarget: [number, number, number] = [0, 0, 0]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
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
      className="relative h-screen bg-background overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-8 text-center pointer-events-none">
        <p
          className={`text-primary font-light tracking-[0.3em] uppercase text-sm mb-2 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Interactive Experience
        </p>
        <h2
          className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <span className="text-balance">Explore Every Detail</span>
        </h2>
        <p
          className={`mt-4 text-muted-foreground text-base max-w-md mx-auto transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          Click the hotspots for cinematic camera transitions
        </p>
      </div>

      {/* 3D Canvas */}
      <div className={`w-full h-full transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <Canvas shadows dpr={[1, 2]}>
          <Scene
            activeHotspot={activeHotspot}
            onHotspotClick={setActiveHotspot}
            defaultCameraPosition={defaultCameraPosition}
            defaultCameraTarget={defaultCameraTarget}
          />
        </Canvas>
      </div>

      {/* Hotspot navigation */}
      <HotspotIndicators 
        activeHotspot={activeHotspot} 
        onSelect={setActiveHotspot}
      />

      {/* Detail panel */}
      {activeHotspot && (
        <DetailPanel 
          hotspot={activeHotspot} 
          onClose={() => setActiveHotspot(null)} 
        />
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
    </section>
  )
}
