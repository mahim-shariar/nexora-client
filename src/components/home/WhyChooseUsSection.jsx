import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaRocket,
  FaMagic,
  FaAward,
  FaShieldAlt,
  FaLightbulb,
  FaBolt,
  FaStar,
  FaCrown,
  FaGem,
  FaChartLine,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";
import {
  HiSparkles,
  HiCursorClick,
  HiTrendingUp,
  HiGlobeAlt,
} from "react-icons/hi";

// Cosmic Floating Element
const CosmicFloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [-15, 15, -15],
      rotateZ: [0, 2, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay,
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Particle Orb
const ParticleOrb = ({ size = 100, color = "indigo", delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-br from-${color}-500/20 to-${color}-400/10 blur-[40px]`}
    style={{ width: size, height: size }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay,
    }}
  />
);

// Enhanced Cosmic Background
const CosmicBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Galactic Core */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-600/10 via-purple-600/15 to-blue-600/20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Main Central Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/8 to-blue-500/12 blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating Particle Orbs */}
      <CosmicFloatingElement delay={0} className="absolute top-20 left-10">
        <ParticleOrb size={120} color="indigo" />
      </CosmicFloatingElement>

      <CosmicFloatingElement delay={2} className="absolute bottom-32 right-16">
        <ParticleOrb size={80} color="purple" />
      </CosmicFloatingElement>

      <CosmicFloatingElement delay={4} className="absolute top-40 right-1/4">
        <ParticleOrb size={60} color="cyan" />
      </CosmicFloatingElement>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-indigo-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Orbital Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`orbital-${i}`}
          className="absolute w-3 h-3 bg-cyan-400 rounded-full blur-sm"
          animate={{
            rotate: [0, 360],
            x: [0, Math.cos((i * 30 * Math.PI) / 180) * 400],
            y: [0, Math.sin((i * 30 * Math.PI) / 180) * 400],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
          style={{
            left: "50%",
            top: "50%",
          }}
        />
      ))}

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="grid grid-cols-12 gap-6 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-indigo-500 rounded-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.02 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </div>

      {/* Scanning Laser Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/8 to-transparent"
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
      />
    </div>
  );
};

// Floating Feature Orb with Orbit Ring
const FeatureOrb = ({ feature, index, total, isActive, onHover }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const angle = (index * 360) / total;
  const radius = 320;
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={
        inView
          ? {
              opacity: 1,
              scale: 1,
              x: x,
              y: y,
            }
          : {}
      }
      transition={{
        duration: 1,
        delay: index * 0.2,
        type: "spring",
        stiffness: 50,
      }}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.3 },
      }}
      onMouseEnter={() => onHover(index)}
      className="absolute left-1/2 top-1/2 cursor-pointer z-20"
      style={{
        marginLeft: "-40px",
        marginTop: "-40px",
      }}
    >
      {/* Individual Orbit Ring around each button */}
      <motion.div
        className="absolute -inset-4 border border-indigo-500/20 rounded-full"
        animate={{
          rotate: isActive ? [0, 360] : 0,
          opacity: isActive ? [0.3, 0.6, 0.3] : 0,
        }}
        transition={{
          duration: 4,
          repeat: isActive ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Pulsing Orbit Effect */}
      <motion.div
        className="absolute -inset-6 border border-cyan-400/30 rounded-full"
        animate={{
          scale: isActive ? [1, 1.2, 1] : 1,
          opacity: isActive ? [0, 0.5, 0] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
        }}
      />

      {/* Connection Line */}
      <motion.div
        className="absolute w-px h-24 bg-gradient-to-b from-indigo-500/30 to-transparent"
        style={{
          transform: `rotate(${angle + 90}deg)`,
          transformOrigin: "bottom center",
          bottom: "100%",
          left: "50%",
          marginLeft: "-0.5px",
        }}
        animate={{
          opacity: isActive ? [0.3, 0.8, 0.3] : 0.1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Main Orb */}
      <div
        className={`relative w-20 h-20 rounded-full backdrop-blur-xl border-2 transition-all duration-500 ${
          isActive
            ? "border-cyan-400 bg-cyan-500/20 shadow-2xl shadow-cyan-500/30 scale-110"
            : "border-indigo-500/30 bg-indigo-500/10 hover:border-purple-400/50 hover:bg-purple-500/10"
        }`}
      >
        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/20"
          animate={
            isActive
              ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }
              : {}
          }
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          style={{ filter: "blur(8px)" }}
        />

        {/* Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <motion.div
            animate={
              isActive
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
          >
            {feature.icon}
          </motion.div>
        </div>

        {/* Active Indicator */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute -inset-2 rounded-full border-2 border-cyan-400/50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Central Display Panel
const CentralPanel = ({ activeFeature }) => {
  const features = [
    {
      icon: <FaRocket className="w-8 h-8 text-white" />,
      title: "Lightning Fast Delivery",
      description:
        "Get your projects delivered in record time without compromising on quality. Our optimized workflow ensures rapid turnaround.",
      highlights: ["24h Delivery", "Real-time Updates", "Express Service"],
      stats: { speed: "2.4x", accuracy: "99.7%", efficiency: "85%" },
    },
    {
      icon: <FaMagic className="w-8 h-8 text-white" />,
      title: "Professional Editing",
      description:
        "Expert color grading, sound design, and visual effects enhancement by our team of skilled professionals.",
      highlights: ["Color Grading", "Audio Sync", "Visual Effects"],
      stats: { precision: "90%", quality: "4K", processing: "Real-time" },
    },
    {
      icon: <FaAward className="w-8 h-8 text-white" />,
      title: "Award-Winning Quality",
      description:
        "Consistently deliver cinematic quality that stands out. Our work has been recognized by industry leaders worldwide.",
      highlights: ["4K Quality", "Cinematic Grade", "Pro Tools"],
      stats: { awards: "50+", clients: "500+", countries: "50+" },
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-white" />,
      title: "Enterprise Security",
      description:
        "Your content is protected with military-grade encryption and secure cloud storage. Complete privacy guaranteed.",
      highlights: ["256-bit SSL", "Secure Cloud", "NDA Protected"],
      stats: { encryption: "AES-256", uptime: "99.9%", compliance: "SOC2" },
    },
    {
      icon: <FaLightbulb className="w-8 h-8 text-white" />,
      title: "Creative Innovation",
      description:
        "Push boundaries with innovative storytelling techniques and cutting-edge visual effects that captivate audiences.",
      highlights: ["VR Ready", "3D Animation", "Motion Graphics"],
      stats: {
        innovation: "95%",
        creativity: "Award",
        technology: "Cutting-edge",
      },
    },
    {
      icon: <FaBolt className="w-8 h-8 text-white" />,
      title: "Seamless Workflow",
      description:
        "Integrated project management tools and collaborative platforms make working together effortless and efficient.",
      highlights: ["Cloud Sync", "Team Collaboration", "Version Control"],
      stats: {
        integration: "200+",
        collaboration: "Real-time",
        efficiency: "40%",
      },
    },
  ];

  const feature = features[activeFeature];

  return (
    <motion.div
      key={activeFeature}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative w-96 h-96 rounded-3xl backdrop-blur-2xl border border-indigo-500/30 bg-gray-900/60 p-4 flex flex-col items-center justify-center"
    >
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ filter: "blur(20px)" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/50"
        >
          {feature.icon}
        </motion.div>

        <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>

        <p className="text-gray-300 leading-relaxed mb-6">
          {feature.description}
        </p>

        {/* Stats */}
        <div className="flex gap-4 mb-6">
          {Object.entries(feature.stats).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-cyan-400 font-bold text-lg">{value}</div>
              <div className="text-gray-400 text-xs capitalize">{key}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 justify-center">
          {feature.highlights.map((highlight, index) => (
            <motion.span
              key={highlight}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-sm"
            >
              {highlight}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Main WhyNexora Component
const WhyNexora = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const autoRotateRef = useRef(null);

  const features = [
    { icon: <FaRocket className="w-6 h-6 text-white" /> },
    { icon: <FaMagic className="w-6 h-6 text-white" /> },
    { icon: <FaAward className="w-6 h-6 text-white" /> },
    { icon: <FaShieldAlt className="w-6 h-6 text-white" /> },
    { icon: <FaLightbulb className="w-6 h-6 text-white" /> },
    { icon: <FaBolt className="w-6 h-6 text-white" /> },
  ];

  // Auto-rotate features
  useEffect(() => {
    if (!inView) return;

    autoRotateRef.current = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [inView, features.length]);

  const stats = [
    { number: "500+", label: "Projects Completed", icon: FaStar },
    { number: "99.8%", label: "Client Satisfaction", icon: FaCrown },
    { number: "24/7", label: "Support Available", icon: FaUsers },
    { number: "50+", label: "Countries Served", icon: FaGlobe },
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-black min-h-screen flex items-center">
      {/* Enhanced Cosmic Background */}
      <CosmicBackground />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-indigo-500/30 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5 text-indigo-400" />
            </motion.div>
            <span className="text-indigo-300 font-medium tracking-widest text-sm uppercase">
              The Nexora Advantage
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaGem className="w-5 h-5 text-indigo-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter leading-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            WHY{" "}
            <span
              style={{
                background: "linear-gradient(45deg, #4f46e5, #7c3aed, #0369a1)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              NEXORA
            </span>
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Revolutionizing video production through orbital innovation and
            <span className="text-indigo-300 font-semibold">
              {" "}
              cosmic-level performance.
            </span>
          </motion.p>
        </motion.div>

        {/* Orbital Feature Display */}
        <div className="relative h-[700px] flex items-center justify-center mb-20">
          {/* Central Panel - Perfectly Centered */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <CentralPanel activeFeature={activeFeature} />
          </div>

          {/* Feature Orbs Container */}
          <div className="relative w-full h-full">
            {features.map((feature, index) => (
              <FeatureOrb
                key={index}
                feature={feature}
                index={index}
                total={features.length}
                isActive={activeFeature === index}
                onHover={setActiveFeature}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-8 rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-800 hover:border-indigo-500/30 transition-all duration-300 group"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center group-hover:shadow-2xl group-hover:shadow-indigo-500/25 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-lg font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-6 items-center">
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 50px rgba(79, 70, 229, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-bold text-xl hover:shadow-2xl transition-all group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-3">
                Launch Your Project
                <HiTrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(79, 70, 229, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-gray-900/80 backdrop-blur-xl border border-gray-800 text-gray-400 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3 hover:text-white"
            >
              <HiCursorClick className="w-5 h-5" />
              Explore Orbit
            </motion.button>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-gray-500 text-lg flex items-center justify-center gap-3"
          >
            <FaChartLine className="w-5 h-5 text-green-400" />
            Orbiting excellence since 2024
            <HiGlobeAlt className="w-5 h-5 text-cyan-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyNexora;
