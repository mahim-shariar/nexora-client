import { useRef, useState, useCallback, useMemo, memo } from "react";
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

import bg from "../../assets/bg.jpg";

// ===== User Avatars Component =====
const UserAvatars = memo(() => {
  const users = useMemo(
    () => [
      { id: 1, bg: "bg-gradient-to-r from-blue-500 to-cyan-500" },
      { id: 2, bg: "bg-gradient-to-r from-purple-500 to-pink-500" },
      { id: 3, bg: "bg-gradient-to-r from-green-500 to-emerald-500" },
      { id: 4, bg: "bg-gradient-to-r from-orange-500 to-red-500" },
      { id: 5, bg: "bg-gradient-to-r from-indigo-500 to-blue-500" },
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="flex items-center justify-center gap-6 mb-8"
    >
      {/* Avatars */}
      <div className="flex -space-x-3">
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + index * 0.1 }}
            className={`w-12 h-12 rounded-full border-2 border-white/20 ${user.bg} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
          >
            {index === users.length - 1 ? "+" : ""}
          </motion.div>
        ))}
      </div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 }}
        className="text-left"
      >
        <p className="text-white font-semibold text-lg mb-1">
          Loved by 500+ Businesses worldwide.
        </p>
        <p className="text-gray-300 text-sm">Our Clients Speak for Us</p>
      </motion.div>
    </motion.div>
  );
});

UserAvatars.displayName = "UserAvatars";

// ===== Smooth Text Animation =====
const AnimatedText = memo(
  ({ text, delay = 0, className = "", size = "xl", color = "blue" }) => {
    const sizeClasses = useMemo(
      () => ({
        xl: "text-6xl md:text-8xl lg:text-9xl font-black",
        lg: "text-5xl md:text-7xl lg:text-8xl font-bold",
        md: "text-4xl md:text-6xl lg:text-7xl font-semibold",
        sm: "text-xl md:text-2xl lg:text-3xl font-medium",
      }),
      []
    );

    const transitionConfig = useMemo(
      () => ({
        delay: delay,
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }),
      [delay]
    );

    const hoverTransition = useMemo(
      () => ({
        duration: 0.3,
      }),
      []
    );

    const gradientStyles = useMemo(() => {
      if (color === "white") {
        return {
          background: "white",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        };
      }
      return {
        background: "linear-gradient(45deg, #0084FF, #0066CC, #0099FF)",
        backgroundSize: "200% 200%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };
    }, [color]);

    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionConfig}
        className={className}
      >
        <motion.span
          className={`inline-block ${sizeClasses[size]} tracking-tighter`}
          whileHover={{
            scale: 1.02,
            transition: hoverTransition,
          }}
          style={gradientStyles}
        >
          {text}
        </motion.span>
      </motion.div>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

// ===== Enhanced Video Player =====
const VideoPlayer = memo(() => {
  const videoRef = useRef(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showCentralButton, setShowCentralButton] = useState(true);

  const handlePlayPause = useCallback(() => {
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
  }, []);

  const videoSource = useMemo(
    () => "https://assets.codepen.io/3364143/sample.mp4",
    []
  );
  const videoPoster = useMemo(
    () =>
      "data:image/gif,base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    []
  );

  const videoTransition = useMemo(
    () => ({
      delay: 1.2,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    }),
    []
  );

  const buttonTransition = useMemo(
    () => ({
      type: "spring",
      stiffness: 300,
      damping: 20,
    }),
    []
  );

  const glowRingTransitions = useMemo(
    () => [
      {
        animate: { scale: [1, 1.5, 1], opacity: [0.3, 0.5, 0.3] },
        transition: { duration: 2, repeat: Infinity, repeatType: "loop" },
      },
      {
        animate: { scale: [1, 1.8, 1], opacity: [0.2, 0.4, 0.2] },
        transition: {
          duration: 2.5,
          repeat: Infinity,
          repeatType: "loop",
          delay: 0.5,
        },
      },
    ],
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={videoTransition}
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
          className="text-[#0084FF] text-sm font-light tracking-widest"
        >
          EXPERIENCE OUR WORK IN MOTION
        </motion.div>
      </motion.div>

      <motion.div
        className="w-full h-[400px] lg:h-[500px] relative overflow-hidden rounded-2xl border border-[#0084FF]/40 shadow-2xl shadow-[#0084FF]/30 bg-black/80 backdrop-blur-sm"
        whileHover={{
          scale: 1.02,
          borderColor: "rgba(0, 132, 255, 0.6)",
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

        {/* Minimal Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-10" />

        {/* Video Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-lg text-sm font-mono z-20 backdrop-blur-sm text-[#0084FF] border border-[#0084FF]/50 flex items-center gap-2"
        >
          <FaVideo className="text-[#0084FF]" />
          <span>INTRODUCTION_2025.MP4</span>
        </motion.div>

        {/* Central Play Button */}
        <AnimatePresence>
          {showCentralButton && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={buttonTransition}
              className="absolute inset-0 flex items-center justify-center cursor-pointer z-20"
            >
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                {/* Pulsing Glow Rings */}
                {glowRingTransitions.map((ring, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 rounded-full bg-[#0084FF]/30"
                    animate={ring.animate}
                    transition={ring.transition}
                  />
                ))}

                {/* Main Button */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-[#0066CC] via-[#0084FF] to-[#0099FF] rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm border-2 border-white/10">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent" />
                  <HiPlay className="w-10 h-10 text-white " />
                </div>

                {/* Text Label */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 flex items-center gap-2"
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
});

VideoPlayer.displayName = "VideoPlayer";

// ===== Enhanced HeroSection with Very Blurry Overlay =====
const HeroSection = memo(() => {
  const ctaButtonHover = useMemo(
    () => ({
      scale: 1.05,
      boxShadow: "0 0 40px rgba(0, 132, 255, 0.4)",
    }),
    []
  );

  const arrowAnimation = useMemo(
    () => ({
      x: [0, 5, 0],
    }),
    []
  );

  const arrowTransition = useMemo(
    () => ({
      duration: 1.5,
      repeat: Infinity,
    }),
    []
  );

  return (
    <div
      className="relative w-full overflow-hidden flex flex-col justify-center min-h-screen"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Very Blurry Overlay - background barely visible */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[20px] z-0" />

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
            <div className="text-[#0084FF] text-lg md:text-xl font-medium tracking-widest flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <HiSparkles className="w-5 h-5 text-[#0084FF]" />
              </motion.div>
              NEXT-GENERATION VIDEO PLATFORM
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <HiSparkles className="w-5 h-5 text-[#0084FF]" />
              </motion.div>
            </div>
          </motion.div>

          <div className="mb-6">
            <AnimatedText
              text="Get More Qualified"
              color="white"
              delay={0.3}
              size="xl"
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <AnimatedText
              text="Leads Through Video Content"
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
          className="mb-8 max-w-2xl mx-auto text-center"
        >
          <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light">
            Transform raw footage into professional-grade videos in minutes.
            Experience the future of video editing with advanced processing and
            cinematic rendering.
          </p>
        </motion.div>

        {/* User Avatars Section */}
        <UserAvatars />

        {/* Single CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mb-16 flex justify-center"
        >
          <motion.button
            whileHover={ctaButtonHover}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 bg-gradient-to-r from-[#0066CC] to-[#0084FF] rounded-2xl text-white font-bold text-xl hover:shadow-2xl transition-all group overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-10 flex items-center">
              <FaRocket className="w-5 h-5 mr-2" />
              Book a Call
              <motion.span
                className="ml-3"
                animate={arrowAnimation}
                transition={arrowTransition}
              >
                <HiArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#0055AA] to-[#0077DD]"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Video Player */}
        <VideoPlayer />

        {/* Enhanced Scroll Indicator */}
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
              className="text-[#0084FF] text-sm mb-3 tracking-widest font-light flex items-center gap-2"
            >
              <FaChevronDown className="w-3 h-3" />
              SCROLL TO EXPLORE
              <FaChevronDown className="w-3 h-3" />
            </motion.span>
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-[#0084FF] to-transparent"
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
    </div>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
