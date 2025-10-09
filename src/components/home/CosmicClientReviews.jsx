import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import {
  FaQuoteLeft,
  FaQuoteRight,
  FaStar,
  FaRocket,
  FaGlobe,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaChartLine,
  FaUsers,
  FaAward,
  FaRegClock,
} from "react-icons/fa";
import {
  HiSparkles,
  HiStar,
  HiCursorClick,
  HiFire,
  HiTrendingUp,
} from "react-icons/hi";

// ===== Enhanced Floating Brand Orbs with Interactions =====
const InteractiveBrandOrb = ({
  position,
  color,
  size,
  delay,
  brand,
  isActive,
  onClick,
}) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.5 + delay) * 0.3;

      // Pulsing effect for active brand
      if (isActive) {
        meshRef.current.scale.x = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.y = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.z = 1 + Math.sin(time * 2) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={onClick}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={isActive ? 0.8 : 0.4}
        emissive={color}
        emissiveIntensity={isActive ? 0.5 : 0.1}
      />
    </mesh>
  );
};

// ===== Enhanced 3D Brand Constellation =====
const InteractiveBrandConstellation = ({ activeBrand, onBrandClick }) => {
  const brands = [
    {
      position: [2, 0, 0],
      color: "#4f46e5",
      size: 0.4,
      name: "TechNova",
      sector: "AI Technology",
    },
    {
      position: [-2, 1, 0],
      color: "#7c3aed",
      size: 0.3,
      name: "StellarMedia",
      sector: "Entertainment",
    },
    {
      position: [0, -1.5, 0],
      color: "#0369a1",
      size: 0.35,
      name: "QuantumLabs",
      sector: "Research",
    },
    {
      position: [3, 1.5, 0],
      color: "#c026d3",
      size: 0.25,
      name: "CosmicBrands",
      sector: "E-commerce",
    },
    {
      position: [-3, -1, 0],
      color: "#4f46e5",
      size: 0.3,
      name: "NebulaSoft",
      sector: "SaaS",
    },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
      {brands.map((brand, index) => (
        <InteractiveBrandOrb
          key={index}
          position={brand.position}
          color={brand.color}
          size={brand.size}
          delay={index * 0.5}
          brand={brand}
          isActive={activeBrand === index}
          onClick={() => onBrandClick(index)}
        />
      ))}
    </Canvas>
  );
};

// ===== Real-time Stats Dashboard =====
const StatsDashboard = () => {
  const stats = [
    {
      icon: FaUsers,
      value: "250+",
      label: "Happy Clients",
      color: "#4f46e5",
      change: "+25% this month",
    },
    {
      icon: FaAward,
      value: "98%",
      label: "Satisfaction Rate",
      color: "#7c3aed",
      change: "Industry leading",
    },
    {
      icon: FaRegClock,
      value: "24h",
      label: "Avg. Delivery",
      color: "#0369a1",
      change: "Fastest in galaxy",
    },
    {
      icon: HiTrendingUp,
      value: "300%",
      label: "Avg. Growth",
      color: "#c026d3",
      change: "Client results",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + index * 0.1 }}
          className="relative p-6 rounded-2xl backdrop-blur-sm border border-indigo-500/20 bg-gradient-to-br from-gray-900/50 to-indigo-900/20 group hover:border-indigo-500/40 transition-all duration-300"
          whileHover={{
            scale: 1.05,
            y: -5,
          }}
        >
          {/* Background Glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
            style={{
              background: `radial-gradient(circle, ${stat.color}20, transparent 70%)`,
            }}
          />

          <div className="relative z-10 text-center">
            <div className="flex justify-center mb-3">
              <div
                className="p-3 rounded-xl"
                style={{ background: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-gray-300 text-sm mb-2">{stat.label}</div>
            <div className="text-indigo-300 text-xs">{stat.change}</div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ===== Live Activity Feed =====
const LiveActivityFeed = () => {
  const activities = [
    {
      id: 1,
      client: "TechNova Inc.",
      action: "launched new campaign",
      time: "2 minutes ago",
      type: "launch",
      color: "#4f46e5",
    },
    {
      id: 2,
      client: "Stellar Media",
      action: "achieved 1M views",
      time: "1 hour ago",
      type: "milestone",
      color: "#7c3aed",
    },
    {
      id: 3,
      client: "Quantum Labs",
      action: "started new project",
      time: "3 hours ago",
      type: "project",
      color: "#0369a1",
    },
    {
      id: 4,
      client: "Cosmic Brands",
      action: "viral video trending",
      time: "5 hours ago",
      type: "viral",
      color: "#c026d3",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2 }}
      className="bg-gradient-to-br from-gray-900/40 to-indigo-900/20 rounded-2xl p-6 border border-indigo-500/20 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-6">
        <HiFire className="w-6 h-6 text-orange-400" />
        <h3 className="text-xl font-bold text-white">Live Activity</h3>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-sm">LIVE</span>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4 + index * 0.1 }}
            className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300 group"
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: activity.color }}
            />
            <div className="flex-1">
              <div className="text-white text-sm">
                <span className="font-semibold">{activity.client}</span>
                <span className="text-gray-400"> {activity.action}</span>
              </div>
              <div className="text-indigo-300 text-xs">{activity.time}</div>
            </div>
            {activity.type === "viral" && (
              <HiTrendingUp className="w-4 h-4 text-green-400" />
            )}
            {activity.type === "milestone" && (
              <FaAward className="w-4 h-4 text-yellow-400" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ===== Industry Recognition =====
const IndustryRecognition = () => {
  const awards = [
    {
      title: "Best Video Editing 2024",
      issuer: "Creative Awards",
      icon: FaAward,
      color: "#fbbf24",
    },
    {
      title: "Innovation Excellence",
      issuer: "Tech Galaxy",
      icon: HiSparkles,
      color: "#8b5cf6",
    },
    {
      title: "Client Choice Award",
      issuer: "Industry Peers",
      icon: FaUsers,
      color: "#06b6d4",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6 }}
      className="bg-gradient-to-br from-gray-900/40 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <FaAward className="w-6 h-6 text-yellow-400" />
        Industry Recognition
      </h3>

      <div className="space-y-4">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 + index * 0.1 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 group"
          >
            <div className="flex-shrink-0">
              <award.icon className="w-8 h-8" style={{ color: award.color }} />
            </div>
            <div className="flex-1">
              <div className="text-white font-semibold">{award.title}</div>
              <div className="text-purple-300 text-sm">{award.issuer}</div>
            </div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              className="text-yellow-400"
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// ===== Cosmic Review Card =====
const CosmicReviewCard = ({ review, index, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleAudioToggle = (e) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1 : 0.9,
        y: 0,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      className={`relative cursor-pointer transition-all duration-500 ${
        isActive ? "z-10" : "z-0"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Card Background */}
      <motion.div
        className={`relative rounded-3xl overflow-hidden border-2 backdrop-blur-xl ${
          isActive
            ? "border-indigo-500/50 bg-gradient-to-br from-indigo-900/30 to-purple-900/20"
            : "border-gray-700/30 bg-gray-900/20"
        }`}
        animate={{
          scale: isHovered ? 1.02 : 1,
          borderColor: isHovered ? "rgba(79, 70, 229, 0.7)" : undefined,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Cosmic Background Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10" />
        </div>

        {/* Active State Glow */}
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-3xl blur-xl"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${review.color}30, transparent 70%)`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Client Avatar */}
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {review.initials}
                </div>
                {/* Online Status */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900" />
              </motion.div>

              <div>
                <h3 className="text-xl font-bold text-white">{review.name}</h3>
                <p className="text-indigo-300 text-sm">{review.position}</p>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <FaGlobe className="w-3 h-3" />
                  {review.company}
                </p>
              </div>
            </div>

            {/* Audio Playback */}
            <motion.button
              onClick={handleAudioToggle}
              className={`p-3 rounded-xl backdrop-blur-sm border ${
                isPlaying
                  ? "bg-indigo-600/30 border-indigo-500/50"
                  : "bg-gray-800/30 border-gray-700/50"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <FaPause className="w-4 h-4 text-indigo-400" />
              ) : (
                <FaPlay className="w-4 h-4 text-indigo-400" />
              )}
            </motion.button>
            <audio ref={audioRef} src={review.audio} />
          </div>

          {/* Rating Stars */}
          <div className="flex items-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <HiStar
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                />
              </motion.div>
            ))}
            <span className="text-gray-400 text-sm ml-2">
              {review.rating}.0
            </span>
          </div>

          {/* Review Text */}
          <div className="relative">
            <FaQuoteLeft className="absolute -top-2 -left-2 w-6 h-6 text-indigo-400/30" />
            <p className="text-gray-300 leading-relaxed text-lg pl-6">
              {review.text}
            </p>
            <FaQuoteRight className="absolute -bottom-2 -right-2 w-6 h-6 text-indigo-400/30" />
          </div>

          {/* Project Highlights */}
          <div className="mt-6 flex flex-wrap gap-2">
            {review.highlights.map((highlight, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="px-3 py-1 bg-indigo-900/30 text-indigo-300 rounded-full text-xs border border-indigo-700/30"
              >
                {highlight}
              </motion.span>
            ))}
          </div>

          {/* Results Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-3 gap-4 text-center"
          >
            {review.metrics.map((metric, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-indigo-300 text-xs uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hover Effect */}
        {isHovered && !isActive && (
          <motion.div
            className="absolute inset-0 rounded-3xl border-2 border-indigo-400/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Selection Indicator */}
      {isActive && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <HiSparkles className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

// ===== Enhanced Cosmic Review Carousel =====
const CosmicReviewCarousel = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [activeBrand, setActiveBrand] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const carouselRef = useRef(null);

  const reviews = [
    {
      id: 1,
      name: "Alex Chen",
      initials: "AC",
      position: "Head of Marketing",
      company: "StellarTech Inc.",
      rating: 5,
      text: "The cosmic video editing transformed our product launches into cinematic experiences. Engagement skyrocketed by 300% across all platforms!",
      color: "#4f46e5",
      audio: "/audio/review1.mp3",
      highlights: [
        "4K Cinematic",
        "Social Media Ready",
        "30% Conversion Boost",
      ],
      metrics: [
        { value: "300%", label: "Engagement" },
        { value: "24h", label: "Turnaround" },
        { value: "4.8M", label: "Reach" },
      ],
    },
    {
      id: 2,
      name: "Sarah Martinez",
      initials: "SM",
      position: "Creative Director",
      company: "Nebula Studios",
      rating: 5,
      text: "Working with this team felt like harnessing the power of a supernova. The attention to detail and creative vision is truly out of this world.",
      color: "#7c3aed",
      audio: "/audio/review2.mp3",
      highlights: ["AI Enhancement", "Brand Consistency", "Multi-Platform"],
      metrics: [
        { value: "95%", label: "Satisfaction" },
        { value: "2.5x", label: "ROI" },
        { value: "1.2M", label: "Views" },
      ],
    },
    {
      id: 3,
      name: "Marcus Johnson",
      initials: "MJ",
      position: "CEO & Founder",
      company: "Quantum Labs",
      rating: 5,
      text: "The editing quality is stellar! They turned our complex technical content into engaging visual stories that even non-technical audiences love.",
      color: "#0369a1",
      audio: "/audio/review3.mp3",
      highlights: ["Technical Expertise", "Storytelling", "Global Audience"],
      metrics: [
        { value: "400%", label: "Growth" },
        { value: "50+", label: "Videos" },
        { value: "15M+", label: "Impressions" },
      ],
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      initials: "ER",
      position: "Social Media Manager",
      company: "Cosmic Brands",
      rating: 5,
      text: "Lightning-fast delivery without compromising quality. Our social media presence has never been stronger thanks to their stellar editing magic.",
      color: "#c026d3",
      audio: "/audio/review4.mp3",
      highlights: ["Fast Delivery", "Trend Integration", "Viral Content"],
      metrics: [
        { value: "500K", label: "Followers" },
        { value: "12x", label: "Shares" },
        { value: "48h", label: "Avg. Delivery" },
      ],
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
      setActiveBrand((prev) => (prev + 1) % 5); // 5 brands total
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, reviews.length]);

  return (
    <div className="relative">
      {/* Stats Dashboard */}
      <StatsDashboard />

      {/* Navigation Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <motion.button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`p-3 rounded-xl backdrop-blur-sm border flex items-center gap-2 ${
              autoPlay
                ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-400"
                : "bg-gray-800/30 border-gray-700/50 text-gray-400"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {autoPlay ? (
              <>
                <FaPause className="w-4 h-4" />
                <span className="text-sm">Pause</span>
              </>
            ) : (
              <>
                <FaPlay className="w-4 h-4" />
                <span className="text-sm">Play</span>
              </>
            )}
          </motion.button>

          <div className="text-indigo-300 text-sm">
            {activeReview + 1} / {reviews.length}
          </div>
        </div>

        <div className="flex gap-2">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setActiveReview(index);
                setActiveBrand(index % 5);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                activeReview === index
                  ? "bg-indigo-500 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Review Cards - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {reviews.map((review, index) => (
            <CosmicReviewCard
              key={review.id}
              review={review}
              index={index}
              isActive={activeReview === index}
              onClick={() => {
                setActiveReview(index);
                setActiveBrand(index % 5);
              }}
            />
          ))}
        </div>

        {/* Sidebar with Interactive Elements - Takes 1 column */}
        <div className="space-y-8">
          {/* 3D Brand Visualization */}
          <div className="relative h-80 rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-gray-900/50 to-indigo-900/30 backdrop-blur-xl">
            <InteractiveBrandConstellation
              activeBrand={activeBrand}
              onBrandClick={setActiveBrand}
            />

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  Trusted by Cosmic Brands
                </h3>
                <p className="text-indigo-300 text-sm">
                  Join {reviews.length * 50}+ satisfied clients across the
                  galaxy
                </p>
              </motion.div>
            </div>

            {/* Floating Elements */}
            <motion.div
              className="absolute top-6 right-6 w-4 h-4 bg-cyan-400 rounded-full blur-sm"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            />
          </div>

          {/* Live Activity Feed */}
          <LiveActivityFeed />

          {/* Industry Recognition */}
          <IndustryRecognition />
        </div>
      </div>
    </div>
  );
};

// ===== Main Client Reviews Section =====
export default function CosmicClientReviews() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden py-20">
      {/* Enhanced Space Background */}
      <div className="absolute inset-0">
        {/* Nebula Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-[60px]" />

        {/* Enhanced Shooting Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
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

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-indigo-400/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 text-indigo-400 text-lg font-medium tracking-widest mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
            COSMIC TESTIMONIALS & ANALYTICS
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-5 h-5" />
            </motion.div>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black text-white mb-6">
            <span
              style={{
                background: "linear-gradient(45deg, #4f46e5, #7c3aed, #0369a1)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              c
            >
              Stellar
            </span>
            <br />
            <span className="text-4xl md:text-5xl">Results Universe</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Explore real success stories from brands that have reached new
            heights with our cosmic video editing. Witness the impact through
            live metrics, client activities, and industry recognition.
          </p>
        </motion.div>

        {/* Enhanced Review Carousel with All New Elements */}
        <CosmicReviewCarousel />

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-bold text-lg hover:shadow-2xl transition-all group overflow-hidden relative"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(79, 70, 229, 0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaRocket className="w-5 h-5" />
                Launch Your Success
                <HiSparkles className="w-5 h-5" />
              </span>
            </motion.button>

            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl text-white font-bold text-lg hover:shadow-2xl transition-all group overflow-hidden relative border border-gray-700"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(79, 70, 229, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                <FaChartLine className="w-5 h-5" />
                View Case Studies
                <HiTrendingUp className="w-5 h-5" />
              </span>
            </motion.button>
          </div>

          {/* Additional Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm">Rated 5.0 by 250+ clients</span>
            </div>
            <div className="flex items-center gap-3">
              <FaAward className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Industry Award Winner 2024</span>
            </div>
            <div className="flex items-center gap-3">
              <HiTrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm">300% Average Client Growth</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
