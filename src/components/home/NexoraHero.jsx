import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaArrowRight,
  FaVideo,
  FaRocket,
  FaChevronDown,
} from "react-icons/fa";
import {
  HiSparkles,
  HiCursorClick,
  HiArrowRight,
  HiPlay,
} from "react-icons/hi";

// ===== Infinite Particle Background =====
const ParticleBackground = ({ count = 8000 }) => {
  const particlesRef = useRef();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

    // Deep space colors
    colors[i * 3] = 0.1 + Math.random() * 0.2;
    colors[i * 3 + 1] = 0.2 + Math.random() * 0.3;
    colors[i * 3 + 2] = 0.4 + Math.random() * 0.4;
  }

  useFrame((state, delta) => {
    if (particlesRef.current) {
      const time = state.clock.getElapsedTime();

      // Infinite flowing movement
      particlesRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
      particlesRef.current.rotation.y = Math.cos(time * 0.15) * 0.1;
      particlesRef.current.rotation.z += delta * 0.02;

      // Continuous forward movement
      particlesRef.current.position.z = Math.sin(time * 0.2) * 2;
    }
  });

  return (
    <Points ref={particlesRef} positions={positions} colors={colors}>
      <PointMaterial
        vertexColors
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.8}
        alphaTest={0.01}
        depthWrite={false}
      />
    </Points>
  );
};

// ===== Smooth Text Animation =====
const AnimatedText = ({ text, delay = 0, className = "", size = "xl" }) => {
  const sizeClasses = {
    xl: "text-6xl md:text-8xl lg:text-9xl font-black",
    lg: "text-5xl md:text-7xl lg:text-8xl font-bold",
    md: "text-4xl md:text-6xl lg:text-7xl font-semibold",
    sm: "text-xl md:text-2xl lg:text-3xl font-medium",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`${className}`}
    >
      <motion.span
        className={`inline-block ${sizeClasses[size]} tracking-tighter`}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        style={{
          background: "linear-gradient(45deg, #a78bfa, #ec4899, #06b6d4)",
          backgroundSize: "200% 200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

// ===== Enhanced Video Player =====
const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showCentralButton, setShowCentralButton] = useState(true);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setVideoPlaying(true);
        setShowCentralButton(false);
      } else {
        videoRef.current.pause();
        setVideoPlaying(false);
        setShowCentralButton(true);
      }
    }
  };

  const videoSource = "https://assets.codepen.io/3364143/sample.mp4";
  const videoPoster =
    "data:image/gif,base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 1.2,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative w-full max-w-4xl mx-auto px-4 mb-8"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="text-center mb-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-purple-300 text-sm font-light tracking-widest"
        >
          EXPERIENCE OUR WORK IN MOTION
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full h-[400px] lg:h-[500px] relative overflow-hidden rounded-2xl border border-purple-500/20 shadow-2xl shadow-purple-500/10 bg-black/60 backdrop-blur-sm"
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(192, 132, 252, 0.4)",
          transition: { duration: 0.3 },
        }}
        onClick={handlePlayPause}
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={videoPoster}
        >
          <source src={videoSource} type="video/mp4" />
        </video>

        {/* Enhanced Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/70 to-transparent pointer-events-none z-10" />

        {/* Video Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-sm font-mono z-20 backdrop-blur-sm text-purple-300 border border-purple-500/30 flex items-center gap-2"
        >
          <FaVideo className="text-purple-400" />
          <span>INTRODUCTION_2025.MP4</span>
        </motion.div>

        {/* Central Play Button */}
        <AnimatePresence>
          {showCentralButton && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                {/* Pulsing Glow Rings */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-500/30"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-pink-500/20"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    delay: 0.5,
                  }}
                />

                {/* Main Button */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                  <HiPlay className="w-10 h-10 text-white " />
                </div>

                {/* Text Label */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-2"
                >
                  <HiCursorClick className="w-4 h-4" />
                  Play
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

// ===== HeroSection =====
export default function HeroSection() {
  return (
    <div className="relative w-full bg-black overflow-hidden flex flex-col justify-center min-h-screen">
      {/* Infinite Particle Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
          <ParticleBackground />
        </Canvas>
      </div>

      {/* Animated Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-900/30 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "loop",
            delay: 5,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-900/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-20">
        {/* Heading */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="text-purple-400 text-lg md:text-xl font-medium tracking-widest">
              NEXT-GENERATION VIDEO PLATFORM
            </div>
          </motion.div>

          <div className="mb-6">
            <AnimatedText text="Elevate Your Content" delay={0.3} size="xl" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <AnimatedText
              text="With Professional Editing"
              delay={0.6}
              size="lg"
            />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-12 max-w-2xl mx-auto text-center"
        >
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
            Transform raw footage into professional-grade videos in minutes.
            Experience the future of video editing with advanced processing and
            cinematic rendering.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-16 flex flex-col sm:flex-row gap-6 items-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 40px rgba(192, 132, 252, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl text-white font-bold text-xl hover:shadow-2xl transition-all group overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center">
              <FaRocket className="w-5 h-5 mr-2" />
              Book a Call
              <motion.span
                className="ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <HiArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              borderColor: "rgba(192, 132, 252, 0.6)",
              color: "#e879f9",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-gray-900/80 backdrop-blur-md border border-gray-700 text-gray-300 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center gap-3"
          >
            <FaVideo className="w-5 h-5" />
            View Reel
          </motion.button>
        </motion.div>

        {/* Video Player */}
        <VideoPlayer />

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="flex flex-col items-center"
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-purple-300 text-sm mb-3 tracking-widest font-light flex items-center gap-2"
            >
              <FaChevronDown className="w-3 h-3" />
              SCROLL TO EXPLORE
              <FaChevronDown className="w-3 h-3" />
            </motion.span>
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-purple-400 to-transparent"
              animate={{
                height: [16, 32, 16],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Glow Elements */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="absolute top-20 left-10 w-48 h-48 bg-purple-900/20 rounded-full blur-xl"
      />

      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -25, 0],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          delay: 2,
        }}
        className="absolute bottom-40 right-16 w-32 h-32 bg-cyan-900/15 rounded-full blur-xl"
      />
    </div>
  );
}
