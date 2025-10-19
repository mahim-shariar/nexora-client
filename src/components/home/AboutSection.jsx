import React, { memo, useMemo, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPlay,
  FaChartLine,
  FaUsers,
  FaRocket,
  FaPause,
  FaVolumeMute,
  FaVolumeUp,
  FaStar,
  FaEye,
  FaUserPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

// Enhanced Balloon Tag Component
const BalloonTag = memo(({ text, delay = 0, direction }) => {
  const positions = useMemo(() => {
    const pos = {
      topLeft: "top-2 left-2",
      topRight: "top-2 right-2",
      topCenter: "top-2 left-1/2 -translate-x-1/2",
      bottomLeft: "bottom-2 left-2",
      bottomRight: "bottom-2 right-2",
      bottomCenter: "bottom-2 left-1/2 -translate-x-1/2",
      middleLeft: "top-1/2 left-2 -translate-y-1/2",
      middleRight: "top-1/2 right-2 -translate-y-1/2",
    };
    return pos[direction] || pos.topCenter;
  }, [direction]);

  const balloonVariants = useMemo(() => {
    const baseVariants = {
      topLeft: {
        x: [0, -1, -2],
        y: [0, -1, -2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 5, 10],
      },
      topCenter: {
        x: [0, 0, 0],
        y: [0, -2, -3],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 0, 0],
      },
      topRight: {
        x: [0, 1, 2],
        y: [0, -1, -2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, -5, -10],
      },
      bottomLeft: {
        x: [0, -1, -2],
        y: [0, 1, 2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, -5, -10],
      },
      bottomCenter: {
        x: [0, 0, 0],
        y: [0, 2, 3],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 0, 0],
      },
      bottomRight: {
        x: [0, 1, 2],
        y: [0, 1, 2],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 5, 10],
      },
      middleLeft: {
        x: [0, -2, -3],
        y: [0, 0, 0],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, -3, -5],
      },
      middleRight: {
        x: [0, 2, 3],
        y: [0, 0, 0],
        scale: [0, 1.1, 1],
        opacity: [0, 1, 1],
        rotateZ: [0, 3, 5],
      },
    };
    return baseVariants[direction] || baseVariants.topCenter;
  }, [direction]);

  const stringVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 0.4,
        delay: delay + 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const getStringPath = () => {
    let endX = 0;
    let endY = 0;

    switch (direction) {
      case "topLeft":
        endX = -15;
        endY = -15;
        break;
      case "topCenter":
        endX = 0;
        endY = -20;
        break;
      case "topRight":
        endX = 15;
        endY = -15;
        break;
      case "bottomLeft":
        endX = -15;
        endY = 15;
        break;
      case "bottomCenter":
        endX = 0;
        endY = 20;
        break;
      case "bottomRight":
        endX = 15;
        endY = 15;
        break;
      case "middleLeft":
        endX = -25;
        endY = 0;
        break;
      case "middleRight":
        endX = 25;
        endY = 0;
        break;
      default:
        endX = 0;
        endY = -20;
    }

    return `M 0 0 Q ${endX / 2} ${endY / 2} ${endX} ${endY}`;
  };

  return (
    <motion.div
      className={`absolute ${positions} z-20`}
      initial={{
        opacity: 0,
        x: balloonVariants.x[0],
        y: balloonVariants.y[0],
        scale: balloonVariants.scale[0],
        rotateZ: balloonVariants.rotateZ[0],
      }}
      whileInView={{
        opacity: balloonVariants.opacity[2],
        x: balloonVariants.x[2],
        y: balloonVariants.y[2],
        scale: balloonVariants.scale[2],
        rotateZ: balloonVariants.rotateZ[2],
      }}
      whileHover={{
        scale: 1.1,
        y: balloonVariants.y[2] - 0.5,
        rotateZ: balloonVariants.rotateZ[2] + 2,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 60,
        damping: 12,
        mass: 0.8,
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none"
        width="30"
        height="30"
        style={{ marginTop: "-1px" }}
      >
        <motion.path
          d={getStringPath()}
          stroke="rgba(0, 132, 255, 0.3)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="2,2"
          variants={stringVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        />
      </svg>

      <motion.div
        className="px-4 py-2 rounded-full bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20 backdrop-blur-sm border border-[#0084FF]/30 text-white font-medium text-sm shadow-lg"
        whileHover={{
          background:
            "linear-gradient(135deg, rgba(0, 132, 255, 0.25), rgba(0, 102, 204, 0.25))",
          borderColor: "rgba(0, 132, 255, 0.5)",
          boxShadow: "0 6px 20px rgba(0, 132, 255, 0.25)",
          transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          },
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              y: [0, -1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: Math.random() * 1.5,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-[#0084FF] rounded-full"
          />
          <span className="text-sm font-semibold whitespace-nowrap">
            {text}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
});

// Enhanced Compact Stat Cards
const StatCard = memo(({ icon: Icon, number, caption, delay = 0 }) => {
  return (
    <motion.div
      className="group relative p-5 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-lg border border-gray-700/50 hover:border-[#0084FF]/50 transition-all duration-500"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20 border border-[#0084FF]/30 flex items-center justify-center group-hover:from-[#0084FF]/30 group-hover:to-[#0066CC]/30 transition-all duration-300"
          whileHover={{
            scale: 1.05,
            rotate: 5,
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
        >
          <Icon className="w-4 h-4 text-[#0084FF] group-hover:text-[#66B5FF] transition-colors duration-300" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-white mb-0.5">{number}</h3>
          <p className="text-gray-400 text-xs transition-colors duration-300 group-hover:text-gray-300">
            {caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

// Enhanced Single Customer Review Card Component
const CustomerReviewCard = memo(({ review, isActive, onPlayToggle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
    onPlayToggle && onPlayToggle(!isPlaying);
  }, [isPlaying, onPlayToggle]);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
  }, [isMuted]);

  return (
    <motion.div
      className={`bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-500 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-60"
      }`}
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      layout
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Reel-sized Video Section */}
        <div className="relative p-6 flex items-center justify-center">
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-black border-2 border-gray-700"
            style={{ width: "280px", height: "500px" }}
            whileHover={{
              borderColor: "rgba(0, 132, 255, 0.5)",
              transition: { duration: 0.3 },
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <div className="text-center text-white">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20 rounded-2xl flex items-center justify-center mb-3 mx-auto border border-[#0084FF]/30"
                      animate={{ rotateY: [0, 360] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <span className="text-2xl">🎬</span>
                    </motion.div>
                    <p className="text-sm font-semibold">Success Story</p>
                  </div>
                </motion.div>
              )}

              {!isPlaying && (
                <motion.div
                  className="text-center text-white cursor-pointer flex flex-col items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <motion.button
                    onClick={togglePlay}
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition-all duration-300"
                    whileHover={{
                      scale: 1.1,
                      transition: {
                        duration: 0.3,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      },
                    }}
                    whileTap={{
                      scale: 0.95,
                      transition: {
                        duration: 0.1,
                      },
                    }}
                  >
                    <FaPlay className="w-4 h-4 text-black ml-0.5" />
                  </motion.button>
                  <p className="text-xs text-gray-300 mt-3">Watch story</p>
                </motion.div>
              )}
            </div>

            <motion.div
              className="absolute bottom-3 left-3 right-3 flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <motion.button
                onClick={togglePlay}
                className="w-10 h-10 bg-black/80 rounded-xl flex items-center justify-center border border-white/20 hover:bg-black transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: {
                    duration: 0.1,
                  },
                }}
              >
                {isPlaying ? (
                  <FaPause className="w-3 h-3 text-white" />
                ) : (
                  <FaPlay className="w-3 h-3 text-white ml-0.5" />
                )}
              </motion.button>

              <motion.button
                onClick={toggleMute}
                className="w-10 h-10 bg-black/80 rounded-xl flex items-center justify-center border border-white/20 hover:bg-black transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  transition: {
                    duration: 0.2,
                  },
                }}
                whileTap={{
                  scale: 0.9,
                  transition: {
                    duration: 0.1,
                  },
                }}
              >
                {isMuted ? (
                  <FaVolumeMute className="w-3 h-3 text-white" />
                ) : (
                  <FaVolumeUp className="w-3 h-3 text-white" />
                )}
              </motion.button>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
                animate={{ width: isPlaying ? "70%" : "0%" }}
                transition={{
                  duration: isPlaying ? 10 : 0.3,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Compact Review Content */}
        <div className="p-6 flex flex-col justify-center">
          {/* Customer Info - Compact */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0084FF] to-[#0066CC] flex items-center justify-center text-white font-bold text-sm border border-[#0084FF]/30"
              whileHover={{
                scale: 1.05,
                rotate: 5,
                transition: {
                  duration: 0.3,
                },
              }}
            >
              {review.initials}
            </motion.div>
            <div>
              <h3 className="font-bold text-white text-base mb-0.5">
                {review.name}
              </h3>
              <p className="text-gray-400 text-xs">{review.position}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <FaStar className="w-2.5 h-2.5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Review Text - Compact */}
          <motion.blockquote
            className="text-gray-200 leading-relaxed mb-4 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {review.quote}
          </motion.blockquote>

          {/* Compact Metrics - Small and Attractive */}
          <motion.div
            className="flex items-center gap-3 py-3 border-t border-gray-800"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Views */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#0084FF]/10 flex items-center justify-center border border-[#0084FF]/20">
                <FaEye className="w-3 h-3 text-[#0084FF]" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  {review.views}
                </div>
                <div className="text-gray-400 text-xs">Views</div>
              </div>
            </motion.div>

            {/* Subscribers */}
            <motion.div
              className="flex items-center gap-2"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <FaUserPlus className="w-3 h-3 text-green-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">
                  {review.subscribers}
                </div>
                <div className="text-gray-400 text-xs">Subscribers</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline - Compact */}
          <motion.div
            className="flex items-center justify-between text-xs text-gray-500 mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <span>Joined: {review.joined}</span>
            <span>Results: {review.results}</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

// Enhanced Customer Reviews Carousel Component
const CustomerReviewsCarousel = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const reviews = useMemo(
    () => [
      {
        id: 1,
        name: "John Smith",
        initials: "JS",
        position: "Creative Agency",
        quote:
          "This service completely transformed our content strategy. We went from struggling to get views to consistently going viral!",
        views: "1M+",
        subscribers: "50K+",
        joined: "Mar 2024",
        results: "3 months",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        initials: "SJ",
        position: "Media Company",
        quote:
          "The viral editing techniques helped us grow our audience exponentially. Best investment we've made!",
        views: "2.5M+",
        subscribers: "75K+",
        joined: "Feb 2024",
        results: "4 months",
      },
      {
        id: 3,
        name: "Mike Chen",
        initials: "MC",
        position: "Tech Startup",
        quote:
          "Our engagement rates skyrocketed after implementing their strategies. Absolutely phenomenal results!",
        views: "3.2M+",
        subscribers: "120K+",
        joined: "Jan 2024",
        results: "5 months",
      },
    ],
    []
  );

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviews.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, reviews.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  return (
    <motion.div
      ref={ref}
      className="mx-auto max-w-6xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Section Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Hear what they're Saying about us
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          See how businesses like yours achieved incredible results with our
          viral content strategies
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center border border-gray-600 hover:bg-black/70 transition-all duration-300"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(0,0,0,0.7)",
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft className="w-4 h-4 text-white" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center border border-gray-600 hover:bg-black/70 transition-all duration-300"
          whileHover={{
            scale: 1.1,
            backgroundColor: "rgba(0,0,0,0.7)",
            transition: {
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight className="w-4 h-4 text-white" />
        </motion.button>

        {/* Carousel Slides */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            {reviews.map((review, index) => (
              <div key={review.id} className="w-full flex-shrink-0 px-4">
                <CustomerReviewCard
                  review={review}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#0084FF]"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: index === currentIndex ? 1.2 : 1,
                opacity: index === currentIndex ? 1 : 0.7,
              }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
});

const AboutSection = memo(() => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const balloons = useMemo(
    () => [
      { text: "Podcast", direction: "topLeft", delay: 0.2 },
      { text: "Short Form", direction: "topRight", delay: 0.3 },
      { text: "Social Media", direction: "bottomLeft", delay: 0.4 },
      { text: "Viral Edits", direction: "bottomRight", delay: 0.5 },
    ],
    []
  );

  // Compact stats
  const stats = useMemo(
    () => [
      {
        icon: FaChartLine,
        number: "200% Growth",
        caption: "Engagement",
        delay: 0.8,
      },
      {
        icon: FaUserPlus,
        number: "5x More Reach",
        caption: "Strategic Distribution",
        delay: 0.7,
      },
      {
        icon: FaEye,
        number: "50% More Leads",
        caption: "Automated Systems",
        delay: 0.6,
      },
    ],
    []
  );

  return (
    <section
      id="about"
      className="relative py-20 px-4 overflow-hidden min-h-screen flex items-center"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0084FF]/10 rounded-full blur-[60px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#0066CC]/5 rounded-full blur-[40px]"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl relative z-10 w-full">
        <div className="relative flex items-center justify-center mb-16">
          {balloons.map((balloon, index) => (
            <BalloonTag
              key={index}
              text={balloon.text}
              direction={balloon.direction}
              delay={balloon.delay}
            />
          ))}

          <motion.div
            ref={ref}
            className="text-center relative z-30 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 backdrop-blur-sm border border-[#0084FF]/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <HiSparkles className="w-4 h-4 text-[#0084FF]" />
              </motion.div>
              <span className="text-[#0084FF] font-medium text-sm">
                EXPLODE YOUR REACH
              </span>
            </motion.div>

            <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                Tired of boring video content
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                that doesn't stand out?
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              It's time to{" "}
              <span className="text-[#0084FF] font-semibold">
                upgrade the game
              </span>{" "}
              with us!
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 py-8 border-b-2 border-b-[#0084FF]/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              number={stat.number}
              caption={stat.caption}
              delay={stat.delay}
            />
          ))}
        </motion.div>

        {/* Customer Reviews Carousel */}
        <div className="mb-12">
          <CustomerReviewsCarousel />
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.button
            whileHover={{
              scale: 1.02,
              background: "linear-gradient(135deg, #0084FF, #0066CC)",
              boxShadow: "0 10px 30px rgba(0, 132, 255, 0.3)",
              transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: {
                duration: 0.1,
              },
            }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto text-base border border-[#0084FF]/30"
          >
            <motion.div
              animate={{
                x: [0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FaPlay className="w-3 h-3" />
            </motion.div>
            Start Your Transformation
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
