import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
  FaExpand,
  FaFilm,
  FaVolumeUp,
  FaVolumeMute,
  FaRegClock,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

// Video data - replace with your actual video URLs
const videoSlides = [
  {
    id: 1,
    title: "Cinematic Brand Stories",
    description: "Immersive narrative experiences that captivate audiences",
    videoUrl: "/videos/cinematic-showreel.mp4",
    thumbnail: "/thumbnails/cinematic.jpg",
    category: "Commercial",
    duration: "2:45",
    features: ["4K Resolution", "Color Grading", "Sound Design"],
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Motion Graphics Mastery",
    description: "Dynamic animations that bring ideas to life",
    videoUrl: "/videos/motion-graphics.mp4",
    thumbnail: "/thumbnails/motion-graphics.jpg",
    category: "Animation",
    duration: "1:52",
    features: ["After Effects", "3D Animation", "Visual Effects"],
    accentColor: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Product Visualizations",
    description: "Stunning product showcases that drive conversions",
    videoUrl: "/videos/product-visualization.mp4",
    thumbnail: "/thumbnails/product.jpg",
    category: "Commercial",
    duration: "3:15",
    features: ["360° Rotation", "Macro Shots", "Lifestyle Integration"],
    accentColor: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Corporate Documentaries",
    description: "Authentic stories that build brand trust",
    videoUrl: "/videos/corporate-doc.mp4",
    thumbnail: "/thumbnails/corporate.jpg",
    category: "Documentary",
    duration: "4:20",
    features: ["Interview Style", "B-Roll Footage", "Story Narrative"],
    accentColor: "from-amber-500 to-orange-500",
  },
  {
    id: 5,
    title: "Event Highlights",
    description: "Energetic recaps that capture the moment",
    videoUrl: "/videos/event-highlights.mp4",
    thumbnail: "/thumbnails/event.jpg",
    category: "Events",
    duration: "2:30",
    features: ["Multi-Camera", "Live Sound", "Fast Paced Editing"],
    accentColor: "from-rose-500 to-red-500",
  },
  {
    id: 6,
    title: "Social Media Content",
    description: "Scroll-stopping content optimized for platforms",
    videoUrl: "/videos/social-media.mp4",
    thumbnail: "/thumbnails/social.jpg",
    category: "Social Media",
    duration: "1:15",
    features: ["Vertical Format", "Captions", "Platform Optimized"],
    accentColor: "from-violet-500 to-indigo-500",
  },
  {
    id: 7,
    title: "Visual Effects Magic",
    description: "Seamless VFX that transforms reality",
    videoUrl: "/videos/vfx-reel.mp4",
    thumbnail: "/thumbnails/vfx.jpg",
    category: "VFX",
    duration: "3:45",
    features: ["CGI Integration", "Compositing", "Particle Effects"],
    accentColor: "from-cyan-500 to-blue-500",
  },
  {
    id: 8,
    title: "Color Grading Excellence",
    description: "Mood-setting color that tells emotional stories",
    videoUrl: "/videos/color-grading.mp4",
    thumbnail: "/thumbnails/color.jpg",
    category: "Color",
    duration: "2:20",
    features: ["DaVinci Resolve", "LUT Creation", "Style Development"],
    accentColor: "from-orange-500 to-yellow-500",
  },
];

// Enhanced Video Player Component with responsive design
const VideoPlayer = ({ video, onVideoEnd, isPlaying, onTogglePlay }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch(console.error);
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleVideoEnd = () => {
    onTogglePlay(false);
    setProgress(0);
    onVideoEnd();
  };

  const seekVideo = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  };

  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(false)}
      onMouseMove={() => setShowControls(true)}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        muted={isMuted}
        loop={false}
        preload="metadata"
        onClick={onTogglePlay}
      >
        <source src={video.videoUrl} type="video/mp4" />
      </video>

      {/* Enhanced Controls Bar - Responsive */}
      <motion.div
        className={`absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300 ${
          showControls
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Progress Bar */}
        <div
          className="relative h-1.5 bg-white/20 rounded-full mb-3 md:mb-4 cursor-pointer group/progress"
          onClick={seekVideo}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 relative"
            style={{ width: `${progress}%` }}
          >
            <motion.div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity duration-300"
              whileHover={{ scale: 1.3 }}
            />
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <motion.button
              onClick={onTogglePlay}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <FaPause className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                <FaPlay className="w-3 h-3 md:w-4 md:h-4" />
              )}
              <span className="text-xs md:text-sm font-medium hidden sm:block">
                {isPlaying ? "Pause" : "Play"}
              </span>
            </motion.button>

            <motion.button
              onClick={toggleMute}
              className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? (
                <FaVolumeMute className="w-3 h-3 md:w-4 md:h-4" />
              ) : (
                <FaVolumeUp className="w-3 h-3 md:w-4 md:h-4" />
              )}
            </motion.button>

            <div className="text-xs md:text-sm text-gray-300 font-medium">
              {Math.floor(progress)}%
            </div>
          </div>

          <motion.button
            onClick={() => videoRef.current?.requestFullscreen()}
            className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExpand className="w-3 h-3" />
            <span className="text-xs md:text-sm font-medium hidden sm:block">
              Expand
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Playback Indicator - Responsive */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            className="absolute top-4 left-4 md:top-6 md:left-6 px-2 py-1 md:px-3 md:py-2 rounded-full bg-black/60 backdrop-blur-md border border-green-500/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="flex items-center gap-1 md:gap-2 text-green-400 text-xs md:text-sm font-medium">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-green-400 rounded-full"
              />
              <span className="hidden xs:inline">Now Playing</span>
              <span className="xs:hidden">Playing</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Enhanced Video Thumbnail Component with responsive design
const VideoThumbnail = ({ video, onPlay }) => {
  return (
    <motion.div
      className="relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer"
      onClick={onPlay}
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${video.accentColor} opacity-20`}
      />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <HiSparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
      </motion.div>

      {/* Content - Responsive */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6 lg:p-8">
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
          <motion.div
            className="inline-flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <HiSparkles className="w-2 h-2 md:w-3 md:h-3 text-white" />
            <span className="text-white text-xs font-semibold tracking-wide">
              {video.category}
            </span>
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full bg-black/50 backdrop-blur-md"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <FaRegClock className="w-2 h-2 md:w-2.5 md:h-2.5 text-gray-300" />
            <span className="text-gray-300 text-xs font-medium">
              {video.duration}
            </span>
          </motion.div>
        </div>

        <motion.h3
          className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {video.title}
        </motion.h3>

        <motion.p
          className="text-gray-200 text-sm md:text-base max-w-2xl mb-3 md:mb-4 leading-relaxed"
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {video.description}
        </motion.p>

        {/* Features Tags - Responsive */}
        <motion.div
          className="flex flex-wrap gap-1 md:gap-1.5"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {video.features.map((feature, index) => (
            <motion.span
              key={index}
              className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-xs"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              transition={{ duration: 0.2 }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>

        {/* Enhanced Play Button Overlay - Responsive */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(255,255,255,0.25)",
            boxShadow: "0 0 40px rgba(255,255,255,0.4)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FaPlay className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white ml-0.5 md:ml-1" />
          </motion.div>
        </motion.div>

        {/* Hover Text - Responsive */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-12 md:translate-y-14 lg:translate-y-16 text-white font-semibold text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          Click to experience
        </motion.div>
      </div>

      {/* Scanning Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100"
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
      />
    </motion.div>
  );
};

// Enhanced Floating Particles
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1})`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 6,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced Video Showreel Section with full responsiveness
const VideoShowreelSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [direction, setDirection] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const nextSlide = () => {
    setDirection(0);
    setCurrentSlide((prev) => (prev + 1) % videoSlides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setDirection(1);
    setCurrentSlide(
      (prev) => (prev - 1 + videoSlides.length) % videoSlides.length
    );
    setIsPlaying(false);
  };

  // Enhanced Auto-advance with smooth timing
  useEffect(() => {
    if (!autoPlay || !inView || isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [autoPlay, inView, currentSlide, isPlaying]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 0 : 1);
    setCurrentSlide(index);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Enhanced slide variants for smoother transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction === 0 ? 300 : -300,
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction) => ({
      x: direction === 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  // Mobile swipe detection
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section
      id="showreel"
      className="relative py-16 md:py-24 lg:py-32 px-4 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="grid grid-cols-8 md:grid-cols-12 gap-2 md:gap-4 h-full transform rotate-1 md:rotate-2">
            {Array.from({ length: 96 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-indigo-500 rounded"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.01 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Enhanced Scanning Laser Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/2 to-transparent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />

        {/* Multiple Pulsing Orbs - Responsive */}
        <motion.div
          className="absolute top-1/4 -left-16 md:-left-32 w-32 h-32 md:w-64 md:h-64 rounded-full bg-indigo-500/3 blur-[50px] md:blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 -right-16 md:-right-32 w-24 h-24 md:w-48 md:h-48 rounded-full bg-purple-500/3 blur-[40px] md:blur-[80px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header - Responsive */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-indigo-500/30 mb-4 md:mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
            </motion.div>
            <span className="text-indigo-300 font-medium tracking-widest text-xs md:text-sm uppercase">
              Portfolio Showcase
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Visual{" "}
            <span
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Excellence
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-md md:max-w-2xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Experience the pinnacle of video production through our curated
            collection of{" "}
            <span className="text-indigo-300">award-winning projects</span>
          </motion.p>
        </motion.div>

        {/* Enhanced Main Video Carousel - Responsive */}
        <div className="relative mb-8 md:mb-12 lg:mb-16">
          <div
            className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/5 border border-white/10"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full absolute inset-0"
              >
                {isPlaying ? (
                  <VideoPlayer
                    video={videoSlides[currentSlide]}
                    onVideoEnd={nextSlide}
                    isPlaying={isPlaying}
                    onTogglePlay={togglePlay}
                  />
                ) : (
                  <VideoThumbnail
                    video={videoSlides[currentSlide]}
                    onPlay={togglePlay}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Navigation Arrows - Responsive */}
          <motion.button
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group cursor-pointer z-20"
            onClick={prevSlide}
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform duration-200" />
          </motion.button>

          <motion.button
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-xl md:rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group cursor-pointer z-20"
            onClick={nextSlide}
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaChevronRight className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform duration-200" />
          </motion.button>

          {/* Enhanced Slide Counter - Responsive */}
          <motion.div
            className="absolute top-3 md:top-4 right-3 md:right-4 px-2 py-1 md:px-3 md:py-2 rounded-xl md:rounded-2xl bg-black/70 backdrop-blur-xl border border-white/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-1 md:gap-2 text-white">
              <FaFilm className="w-2 h-2 md:w-3 md:h-3 text-indigo-400" />
              <span className="font-semibold text-xs md:text-sm">
                {currentSlide + 1} / {videoSlides.length}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Thumbnail Navigation - Responsive */}
        <motion.div
          className="flex justify-center gap-1 md:gap-2 mb-8 md:mb-12 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {videoSlides.map((slide, index) => (
            <motion.button
              key={slide.id}
              className={`relative flex-1 max-w-16 h-10 md:max-w-20 md:h-12 lg:max-w-24 lg:h-14 rounded-lg md:rounded-xl overflow-hidden border transition-all duration-300 group/thumbnail cursor-pointer ${
                index === currentSlide
                  ? "border-indigo-500 scale-105 shadow-lg shadow-indigo-500/20"
                  : "border-white/10 hover:border-white/30"
              }`}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`w-full h-full bg-gradient-to-br ${slide.accentColor} opacity-60 relative`}
              >
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-indigo-500/20"
                      : "bg-black/40 group-hover/thumbnail:bg-black/20"
                  }`}
                />

                <div className="absolute bottom-0 left-0 right-0 p-0.5 md:p-1 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="text-[8px] md:text-[10px] font-semibold text-white text-center truncate px-0.5">
                    {slide.title.split(" ")[0]}
                  </div>
                </div>

                {index === currentSlide && (
                  <motion.div
                    className="absolute top-1 right-1 w-1 h-1 md:w-1.5 md:h-1.5 bg-indigo-400 rounded-full shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Enhanced Controls - Responsive */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-gray-900/80 backdrop-blur-xl border border-gray-700 text-white hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer w-full sm:w-auto justify-center"
            onClick={() => setAutoPlay(!autoPlay)}
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                autoPlay
                  ? "bg-green-500 shadow shadow-green-500/50"
                  : "bg-red-500 shadow shadow-red-500/50"
              }`}
            />
            <span className="text-sm font-medium">
              Auto {autoPlay ? "On" : "Off"}
            </span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 md:gap-3 px-5 py-2 md:px-7 md:py-3 lg:px-8 lg:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:shadow-2xl transition-all duration-300 group cursor-pointer w-full sm:w-auto justify-center"
            whileHover={{
              scale: 1.05,
              y: -1,
              boxShadow: "0 10px 40px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FaExpand className="w-3 h-3 md:w-4 md:h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm">Full Portfolio</span>
            <HiSparkles className="w-3 h-3 md:w-4 md:h-4 group-hover:rotate-180 transition-transform duration-500" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowreelSection;
