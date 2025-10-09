import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaVideo,
  FaRocket,
  FaDiscord,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaTelegram,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import {
  HiSparkles,
  HiCursorClick,
  HiGlobe,
  HiMail,
  HiPhone,
  HiCalendar,
} from "react-icons/hi";

// ===== TidyCal Modal Component =====
const TidyCalModal = ({ isOpen, onClose, bookingUrl }) => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
      style={{ overflow: "auto" }} // Enable scrolling for the modal overlay
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-6xl h-auto my-8 rounded-3xl overflow-hidden border border-indigo-500/30 bg-gray-900"
      >
        {/* Modal Header */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-6 bg-gradient-to-b from-black/80 to-transparent">
          <motion.button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/80 text-white hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowLeft className="w-4 h-4" />
            Back to Site
          </motion.button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-indigo-300">
              <HiSparkles className="w-4 h-4" />
              <span className="text-sm">Live Booking</span>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* TidyCal Iframe */}
        <div className="w-full h-[80vh] pt-16">
          <iframe
            ref={iframeRef}
            src={bookingUrl}
            className="w-full h-full border-0"
            title="TidyCal Booking"
            loading="eager"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            allow="camera; microphone; fullscreen;"
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <HiSparkles className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">
                Loading Cosmic Calendar
              </h3>
              <p className="text-indigo-300">
                Preparing your booking experience...
              </p>
            </motion.div>
          </div>
        )}

        {/* Error State */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTimes className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Booking Unavailable
              </h3>
              <p className="text-red-300 mb-4">
                Unable to load the booking system.
              </p>
              <motion.button
                onClick={() => window.open(bookingUrl, "_blank")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white font-semibold flex items-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="w-4 h-4" />
                Open in New Tab
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ===== Floating Calendar Orbs =====
const CalendarOrb = ({ position, color, size, delay, type }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.y = time * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.8 + delay) * 0.4;

      if (type === "meeting") {
        meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2;
      } else if (type === "consultation") {
        meshRef.current.scale.x = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.y = 1 + Math.sin(time * 2) * 0.1;
        meshRef.current.scale.z = 1 + Math.sin(time * 2) * 0.1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.7}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

// ===== 3D Calendar Scene =====
const CalendarScene = () => {
  const orbs = [
    {
      position: [3, 1, 0],
      color: "#4f46e5",
      size: 0.3,
      delay: 0,
      type: "meeting",
    },
    {
      position: [-2, 2, 0],
      color: "#7c3aed",
      size: 0.25,
      delay: 1,
      type: "consultation",
    },
    {
      position: [0, -2, 0],
      color: "#0369a1",
      size: 0.35,
      delay: 2,
      type: "meeting",
    },
    {
      position: [-3, 0, 0],
      color: "#c026d3",
      size: 0.2,
      delay: 3,
      type: "consultation",
    },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
      {orbs.map((orb, index) => (
        <CalendarOrb key={index} {...orb} />
      ))}

      {/* Central Calendar Hub */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#4f46e5"
          transparent
          opacity={0.6}
          emissive="#4f46e5"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Canvas>
  );
};

// ===== TidyCal Booking Options =====
const TidyCalBooking = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookingUrl, setCurrentBookingUrl] = useState("");

  const bookingOptions = [
    {
      id: "discovery",
      title: "Cosmic Discovery Call",
      duration: "15 mins",
      description:
        "Explore your project needs and see if we're the right fit for your cosmic vision",
      price: "FREE",
      color: "#4f46e5",
      icon: HiSparkles,
      url: "https://tidycal.com/mdmahim924214/15-minute-meeting",
    },
    {
      id: "strategy",
      title: "Galaxy Strategy Session",
      duration: "30 mins",
      description:
        "Deep dive into your project with comprehensive planning and roadmap creation",
      price: "FREE",
      color: "#7c3aed",
      icon: FaRocket,
      url: "https://tidycal.com/mdmahim924214/30-minute-meeting",
    },
    {
      id: "emergency",
      title: "Emergency Launch Support",
      duration: "60 mins",
      description:
        "Urgent support for time-sensitive projects that need immediate attention",
      price: "FREE",
      color: "#c026d3",
      icon: FaClock,
      url: "https://tidycal.com/mdmahim924214/60-minute-meeting",
    },
    {
      id: "enterprise",
      title: "Enterprise Universe Plan",
      duration: "75 mins",
      description:
        "Comprehensive planning for large-scale projects with ongoing support",
      price: "FREE",
      color: "#0369a1",
      icon: HiGlobe,
      url: "https://tidycal.com/mdmahim924214/75-minute-meeting",
    },
  ];

  const handleBookNow = (url) => {
    setCurrentBookingUrl(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBookingUrl("");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center gap-3">
            <HiCalendar className="w-7 h-7 text-indigo-400" />
            Book Your Cosmic Session
          </h3>
          <p className="text-indigo-300">
            Choose your preferred session and book directly on our site
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {bookingOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl backdrop-blur-sm border-2 p-6 cursor-pointer transition-all duration-300 ${
                selectedOption === option.id
                  ? "border-indigo-400 bg-indigo-900/30"
                  : "border-gray-700/50 bg-gray-900/20 hover:border-indigo-500/50"
              }`}
              whileHover={{
                scale: 1.02,
                y: -5,
              }}
              onClick={() => setSelectedOption(option.id)}
            >
              {/* Selection Glow */}
              {selectedOption === option.id && (
                <motion.div
                  className="absolute inset-0 rounded-2xl blur-md"
                  style={{ backgroundColor: `${option.color}20` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{ background: `${option.color}20` }}
                    >
                      <option.icon
                        className="w-5 h-5"
                        style={{ color: option.color }}
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">
                        {option.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <FaClock className="w-3 h-3 text-indigo-400" />
                        <span className="text-indigo-300 text-sm">
                          {option.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{
                      background: `${option.color}20`,
                      color: option.color,
                    }}
                  >
                    {option.price}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {option.description}
                </p>

                {/* Book Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookNow(option.url);
                  }}
                  className="w-full py-3 rounded-xl backdrop-blur-sm border border-indigo-500/50 bg-indigo-900/20 text-white font-semibold flex items-center justify-center gap-2 group hover:bg-indigo-900/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <HiCalendar className="w-4 h-4" />
                  <span>Book Now</span>
                  <HiSparkles className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                whileHover={{
                  borderColor: `${option.color}50`,
                  boxShadow: `0 0 20px ${option.color}30`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Quick Booking Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center p-6 rounded-2xl backdrop-blur-sm border border-indigo-500/20 bg-gradient-to-r from-indigo-900/10 to-purple-900/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-indigo-300">
            <div className="flex items-center gap-2">
              <HiSparkles className="w-4 h-4 text-green-400" />
              <span>Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-4 h-4 text-blue-400" />
              <span>Calendar Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <FaVideo className="w-4 h-4 text-purple-400" />
              <span>Video Call Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <HiCursorClick className="w-4 h-4 text-yellow-400" />
              <span>In-Site Booking</span>
            </div>
          </div>
        </motion.div>

        {/* Fallback Direct Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm mb-3">
            Having issues with the booking system?
          </p>
          <motion.button
            onClick={() =>
              window.open("https://tidycal.com/mdmahim924214", "_blank")
            }
            className="px-6 py-2 rounded-xl bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Open TidyCal Directly
          </motion.button>
        </motion.div>
      </motion.div>

      {/* TidyCal Modal */}
      <AnimatePresence>
        <TidyCalModal
          isOpen={isModalOpen}
          onClose={closeModal}
          bookingUrl={currentBookingUrl}
        />
      </AnimatePresence>
    </>
  );
};

// ===== Social Links =====
const SocialLinks = () => {
  const socials = [
    { icon: FaDiscord, href: "#", color: "#5865F2", label: "Discord" },
    { icon: FaTwitter, href: "#", color: "#1DA1F2", label: "Twitter" },
    { icon: FaLinkedin, href: "#", color: "#0077B5", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", color: "#E4405F", label: "Instagram" },
    { icon: FaTelegram, href: "#", color: "#0088CC", label: "Telegram" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-center"
    >
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center justify-center gap-2">
        <HiSparkles className="w-5 h-5 text-indigo-400" />
        Connect Across the Cosmos
      </h3>

      <div className="flex justify-center gap-4">
        {socials.map((social, index) => (
          <motion.a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative p-4 rounded-2xl backdrop-blur-sm border border-gray-700/50 bg-gray-900/20 group"
            whileHover={{
              scale: 1.2,
              y: -5,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl blur-md opacity-0 group-hover:opacity-100"
              style={{ backgroundColor: `${social.color}30` }}
              transition={{ duration: 0.3 }}
            />

            <social.icon
              className="w-6 h-6 relative z-10"
              style={{ color: social.color }}
            />

            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              {social.label}
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

// ===== Main Contact Section =====
export default function CosmicContactSection() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden py-20">
      {/* Space Background */}
      <div className="absolute inset-0">
        {/* Nebula Effects */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />

        {/* Shooting Stars */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, -800],
                y: [0, 400],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 15,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
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
            IN-SITE COSMIC BOOKING
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
            >
              Book
            </span>
            <br />
            <span className="text-4xl md:text-5xl">Your Session</span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Schedule your cosmic session directly on our site with seamless
            TidyCal integration. No new tabs, no distractions - just pure
            booking experience.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* TidyCal Booking Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-gray-900/50 to-indigo-900/20 backdrop-blur-xl p-8">
              <TidyCalBooking />
            </div>
          </motion.div>

          {/* 3D Visualization & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* 3D Calendar Scene */}
            <div className="relative h-80 rounded-3xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-gray-900/50 to-purple-900/20 backdrop-blur-xl">
              <CalendarScene />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    Embedded Calendar Hub
                  </h3>
                  <p className="text-indigo-300 text-sm">
                    Seamless booking experience within our site
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 gap-4"
            >
              {[
                {
                  icon: HiMail,
                  label: "Email",
                  value: "hello@cosmicstudio.com",
                  color: "#4f46e5",
                },
                {
                  icon: HiPhone,
                  label: "Phone",
                  value: "+1 (555) 123-4567",
                  color: "#7c3aed",
                },
                {
                  icon: FaMapMarkerAlt,
                  label: "Location",
                  value: "Digital Universe, Remote",
                  color: "#0369a1",
                },
                {
                  icon: FaClock,
                  label: "Response Time",
                  value: "Within 24 hours",
                  color: "#c026d3",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl backdrop-blur-sm border border-indigo-500/20 bg-gradient-to-r from-gray-900/30 to-indigo-900/10 hover:border-indigo-500/40 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, x: 5 }}
                >
                  <div
                    className="p-3 rounded-xl"
                    style={{ background: `${item.color}20` }}
                  >
                    <item.icon
                      className="w-5 h-5"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.label}</div>
                    <div className="text-indigo-300 text-sm">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Social Links */}
            <SocialLinks />
          </motion.div>
        </div>

        {/* Additional Trust Elements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-3">
              <HiCursorClick className="w-5 h-5 text-green-400" />
              <span className="text-sm">In-Site Booking Experience</span>
            </div>
            <div className="flex items-center gap-3">
              <HiSparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">No External Tabs</span>
            </div>
            <div className="flex items-center gap-3">
              <FaVideo className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Seamless Integration</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
