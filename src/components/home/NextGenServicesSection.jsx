import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import {
  FaVideo,
  FaFilm,
  FaMagic,
  FaRocket,
  FaStar,
  FaGalacticRepublic,
  FaMeteor,
  FaComment,
} from "react-icons/fa";
import { HiSparkles, HiCursorClick, HiPlay, HiStar } from "react-icons/hi";

// ===== Floating Planets System =====
const FloatingPlanets = () => {
  const planets = [
    { size: 1.2, color: "#4f46e5", position: [8, 3, -15], speed: 0.3 },
    { size: 0.8, color: "#7c3aed", position: [-6, -2, -20], speed: 0.5 },
    { size: 1.0, color: "#0369a1", position: [10, -4, -25], speed: 0.4 },
    { size: 0.6, color: "#c026d3", position: [-12, 5, -18], speed: 0.6 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {planets.map((planet, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: `${planet.size * 80}px`,
            height: `${planet.size * 80}px`,
            background: `radial-gradient(circle at 30% 30%, ${planet.color}40, ${planet.color}20)`,
            boxShadow: `0 0 80px ${planet.color}30`,
            left: `${planet.position[0] * 5}%`,
            top: `${planet.position[1] * 5}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// ===== Constellation Connections =====
const ConstellationEffect = () => {
  const [points] = useState(() =>
    Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {points.map((point, index) => (
          <g key={index}>
            {/* Stars */}
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="0.3"
              fill="#4f46e5"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />

            {/* Connections */}
            {points.slice(index + 1, index + 3).map((target, targetIndex) => (
              <motion.line
                key={targetIndex}
                x1={point.x}
                y1={point.y}
                x2={target.x}
                y2={target.y}
                stroke="url(#constellationGradient)"
                strokeWidth="0.1"
                strokeDasharray="0.5"
                animate={{
                  strokeDashoffset: [0, 2, 0],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </g>
        ))}

        <defs>
          <linearGradient
            id="constellationGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// ===== 3D Orb Component (Separate Canvas Component) =====
const Orb3D = ({ isActive, color }) => {
  const orbRef = useRef();

  useFrame(({ clock }) => {
    if (orbRef.current) {
      orbRef.current.rotation.y = clock.getElapsedTime() * 0.2;
      orbRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={orbRef} position={[0, 0, 0]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color={isActive ? color : "#374151"}
        transparent
        opacity={0.8}
        emissive={isActive ? color : "#111827"}
        emissiveIntensity={isActive ? 0.3 : 0.1}
      />
    </mesh>
  );
};

// ===== Cosmic Service Orb =====
const CosmicServiceOrb = ({ service, index, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.8 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* 3D Orb */}
      <div className="relative w-64 h-64 mx-auto">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Orb3D isActive={isActive} color={service.color} />
        </Canvas>

        {/* Orb Glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${service.color}30, transparent 70%)`,
          }}
          animate={{
            scale: isActive ? [1, 1.2, 1] : 1,
            opacity: isActive ? [0.5, 0.8, 0.5] : 0.3,
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center mt-6"
        animate={{ y: isHovered ? -10 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-indigo-500/30"
          style={{
            background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
          }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <service.icon className="w-8 h-8 text-indigo-400" />
        </motion.div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Stars Rating */}
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: service.rating }).map((_, i) => (
            <HiStar key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>

        {/* CTA */}
        <motion.button
          className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm flex items-center gap-2 mx-auto"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          Explore Galaxy
          <HiSparkles className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// ===== Nebula Service Showcase =====
const NebulaShowcase = ({ service }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.7,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
      className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-gray-900/50 to-indigo-900/30 backdrop-blur-xl p-8"
    >
      {/* Nebula Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-2xl" />
      </div>
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
            <service.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">{service.title}</h3>
            <p className="text-indigo-300 text-sm">{service.subtitle}</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {service.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.2 + index * 0.1,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
              className="flex items-center gap-3 p-4 rounded-lg bg-indigo-900/20 border border-indigo-700/30"
            >
              <div className="w-8 h-8 bg-indigo-600/30 rounded-full flex items-center justify-center">
                <HiSparkles className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-white text-sm">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {service.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: 0.4 + index * 0.1,
                        ease: "easeOut",
                      },
                    }
                  : {}
              }
              className="text-center"
            >
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-indigo-300 text-xs uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Floating Elements */}
      <div className="absolute top-4 right-4">
        <motion.div
          className="w-4 h-4 bg-indigo-400 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
};

// ===== Shooting Stars Background =====
const ShootingStars = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, -1000],
            y: [0, 500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

// ===== Main Cosmic Services Section =====
export default function CosmicServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const { ref: ctaRef, inView: ctaInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const services = [
    {
      id: 1,
      title: "Stellar Editing",
      subtitle: "Cinematic Galaxy Creation",
      description:
        "Transform your footage into cosmic masterpieces with our stellar editing suite",
      icon: FaStar,
      color: "#4f46e5",
      rating: 5,
      features: [
        "4K Cosmic Color Grading",
        "Galaxy Transitions & Effects",
        "Stellar Sound Design",
        "Nebula Visual Effects",
      ],
      stats: [
        { value: "24-48h", label: "Orbit Time" },
        { value: "4K HDR", label: "Quality" },
        { value: "∞", label: "Creativity" },
      ],
    },
    {
      id: 2,
      title: "Comet Cuts",
      subtitle: "Lightning Fast Edits",
      description:
        "Quick, dynamic edits that streak across screens like comets in the night sky",
      icon: FaComment,
      color: "#7c3aed",
      rating: 4,
      features: [
        "Rapid Turnaround",
        "Trending Templates",
        "Social Media Ready",
        "Engagement Optimized",
      ],
      stats: [
        { value: "6-12h", label: "Delivery" },
        { value: "1080p", label: "Quality" },
        { value: "95%", label: "Engagement" },
      ],
    },
    {
      id: 3,
      title: "Nebula Magic",
      subtitle: "AI-Enhanced Creativity",
      description:
        "Let our AI weave magical edits that flow like colorful nebulas in space",
      icon: FaGalacticRepublic,
      color: "#0369a1",
      rating: 5,
      features: [
        "AI Style Transfer",
        "Auto Color Correction",
        "Smart Scene Detection",
        "Voice Enhancement",
      ],
      stats: [
        { value: "12-24h", label: "Processing" },
        { value: "AI Powered", label: "Technology" },
        { value: "3x", label: "Faster" },
      ],
    },
    {
      id: 4,
      title: "Meteor Effects",
      subtitle: "Impactful Visuals",
      description:
        "Create stunning visual impacts that leave lasting impressions like meteors",
      icon: FaMeteor,
      color: "#c026d3",
      rating: 4,
      features: [
        "Dynamic Motion Graphics",
        "3D Visual Effects",
        "Particle Systems",
        "Impact Transitions",
      ],
      stats: [
        { value: "48-72h", label: "Creation" },
        { value: "3D Ready", label: "Format" },
        { value: "100%", label: "Wow Factor" },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden py-20">
      {/* Space Background Elements */}
      <div className="absolute inset-0">
        {/* Reuse your existing SpaceCanvas */}
        <div className="absolute inset-0 opacity-40">
          {/* Your existing particle background */}
        </div>

        <FloatingPlanets />
        <ConstellationEffect />
        <ShootingStars />

        {/* Galactic Core Glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Cosmic Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 50 }}
          animate={
            headerInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                }
              : {}
          }
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 text-indigo-400 text-lg font-medium tracking-widest mb-6"
            initial={{ opacity: 0 }}
            animate={
              headerInView
                ? {
                    opacity: 1,
                    transition: {
                      duration: 0.6,
                      delay: 0.2,
                    },
                  }
                : {}
            }
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
            EXPLORE OUR COSMIC SERVICES
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black text-white mb-6">
            <span
              style={{
                background: "linear-gradient(45deg, #4f46e5, #7c3aed, #0369a1)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Cosmic
            </span>
            <br />
            <span className="text-4xl md:text-6xl">Video Editing</span>
          </h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={
              headerInView
                ? {
                    opacity: 1,
                    transition: {
                      duration: 0.7,
                      delay: 0.3,
                    },
                  }
                : {}
            }
          >
            Journey through our galaxy of video editing services, where every
            project becomes a celestial masterpiece in the vast universe of
            visual storytelling.
          </motion.p>
        </motion.div>

        {/* Services Orbs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {services.map((service, index) => (
            <CosmicServiceOrb
              key={service.id}
              service={service}
              index={index}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>

        {/* Active Service Showcase */}
        <div className="max-w-6xl mx-auto">
          <NebulaShowcase service={services[activeService]} />
        </div>

        {/* Cosmic Call-to-Action */}
        <motion.div
          ref={ctaRef}
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={
            ctaInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: "easeOut",
                  },
                }
              : {}
          }
        >
          <motion.button
            className="px-12 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-bold text-lg hover:shadow-2xl transition-all group overflow-hidden relative"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="relative z-10 flex items-center gap-3">
              <FaRocket className="w-5 h-5" />
              Launch Your Project Into Orbit
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <HiSparkles className="w-5 h-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
