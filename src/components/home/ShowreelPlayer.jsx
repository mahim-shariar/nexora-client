import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlay,
  FaPause,
  FaExpand,
  FaVolumeUp,
  FaVolumeMute,
  FaYoutube,
  FaMobile,
  FaChartLine,
  FaShoppingCart,
} from "react-icons/fa";

// Video data organized by categories
const videoCategories = [
  {
    id: "youtube",
    name: "YouTube",
    icon: FaYoutube,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    videos: [
      {
        id: 1,
        videoUrl: "/videos/youtube-1.mp4",
        aspect: "horizontal",
        duration: "2:45",
      },
      {
        id: 2,
        videoUrl: "/videos/youtube-2.mp4",
        aspect: "horizontal",
        duration: "4:20",
      },
      {
        id: 3,
        videoUrl: "/videos/youtube-3.mp4",
        aspect: "horizontal",
        duration: "3:15",
      },
      {
        id: 4,
        videoUrl: "/videos/youtube-4.mp4",
        aspect: "horizontal",
        duration: "5:30",
      },
    ],
  },
  {
    id: "shorts",
    name: "Shorts",
    icon: FaMobile,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    videos: [
      {
        id: 5,
        videoUrl: "/videos/short-1.mp4",
        aspect: "vertical",
        duration: "0:45",
      },
      {
        id: 6,
        videoUrl: "/videos/short-2.mp4",
        aspect: "vertical",
        duration: "0:58",
      },
      {
        id: 7,
        videoUrl: "/videos/short-3.mp4",
        aspect: "vertical",
        duration: "0:52",
      },
    ],
  },
  {
    id: "saas",
    name: "SaaS",
    icon: FaChartLine,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    videos: [
      {
        id: 8,
        videoUrl: "/videos/saas-1.mp4",
        aspect: "horizontal",
        duration: "1:30",
      },
      {
        id: 9,
        videoUrl: "/videos/saas-2.mp4",
        aspect: "horizontal",
        duration: "2:15",
      },
      {
        id: 10,
        videoUrl: "/videos/saas-3.mp4",
        aspect: "horizontal",
        duration: "3:45",
      },
      {
        id: 11,
        videoUrl: "/videos/saas-4.mp4",
        aspect: "horizontal",
        duration: "4:20",
      },
    ],
  },
  {
    id: "ads-vsl",
    name: "Ads & VSL",
    icon: FaShoppingCart,
    accentColor: "from-[#0084FF] to-[#0066CC]",
    videos: [
      {
        id: 12,
        videoUrl: "/videos/ad-1.mp4",
        aspect: "horizontal",
        duration: "0:30",
      },
      {
        id: 13,
        videoUrl: "/videos/ad-2.mp4",
        aspect: "horizontal",
        duration: "0:45",
      },
      {
        id: 14,
        videoUrl: "/videos/vsl-1.mp4",
        aspect: "horizontal",
        duration: "8:15",
      },
      {
        id: 15,
        videoUrl: "/videos/vsl-2.mp4",
        aspect: "horizontal",
        duration: "12:30",
      },
    ],
  },
];

// Custom Video Player Component
const CustomVideoPlayer = ({ video, category, isShort = false }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Comprehensive download protection
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "s" || e.key === "p" || e.key === "o" || e.key === "u") {
          e.preventDefault();
          return false;
        }
      }

      if (e.key === "F12") {
        e.preventDefault();
        return false;
      }
    };

    videoElement.controls = false;
    videoElement.setAttribute(
      "controlsList",
      "nodownload nofullscreen noremoteplayback"
    );
    videoElement.setAttribute("disablePictureInPicture", "true");
    videoElement.setAttribute("disableRemotePlayback", "true");

    videoElement.addEventListener("contextmenu", handleContextMenu);
    videoElement.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "controls"
        ) {
          if (videoElement.controls) {
            videoElement.controls = false;
          }
        }
      });
    });

    observer.observe(videoElement, {
      attributes: true,
      attributeFilter: ["controls"],
    });

    return () => {
      videoElement.removeEventListener("contextmenu", handleContextMenu);
      videoElement.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
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
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const seekVideo = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = percent * videoRef.current.duration;
      setProgress(percent * 100);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer ${
        video.aspect === "vertical" ? "aspect-[9/16]" : "aspect-video"
      } rounded-xl overflow-hidden border border-white/10 bg-black group select-none`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Video Element with comprehensive protection */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover pointer-events-none"
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        loop={false}
        preload="metadata"
        onClick={togglePlay}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      >
        <source src={video.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Progress Bar - Always Visible */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 cursor-pointer"
        onClick={seekVideo}
      >
        <div
          className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls Overlay - Always Visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none">
        {/* Central Play/Pause Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0.8 }}
            animate={{ opacity: isPlaying ? 0 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            {isPlaying ? (
              <FaPause className="w-4 h-4" />
            ) : (
              <FaPlay className="w-4 h-4 ml-0.5" />
            )}
          </motion.button>
        </div>

        {/* Bottom Control Buttons */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 pointer-events-none">
          <motion.button
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/20 pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? (
              <FaVolumeMute className="w-3 h-3" />
            ) : (
              <FaVolumeUp className="w-3 h-3" />
            )}
          </motion.button>

          <motion.button
            onClick={handleFullscreen}
            className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/20 pointer-events-auto"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaExpand className="w-3 h-3" />
          </motion.button>
        </div>
      </div>

      {/* Play Indicator */}
      {isPlaying && (
        <motion.div
          className="absolute top-3 left-3 px-2 py-1 rounded-full bg-black/60 border border-[#0084FF]/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-1 text-[#0084FF] text-xs">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse" />
            <span>PLAYING</span>
          </div>
        </motion.div>
      )}

      {/* Protection Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    </motion.div>
  );
};

// Category Section Component
const CategorySection = ({ category }) => {
  const isShort = category.id === "shorts";

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Videos Grid */}
      <div
        className={`grid grid-cols-1 ${
          isShort ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
        } gap-6`}
      >
        {category.videos.map((video) => (
          <CustomVideoPlayer
            key={video.id}
            video={video}
            category={category}
            isShort={isShort}
          />
        ))}
      </div>
    </motion.section>
  );
};

// Main Component
const ProtectedVideoShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("youtube");

  // Additional global protection
  useEffect(() => {
    const preventDevTools = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("keydown", preventDevTools);

    return () => {
      document.removeEventListener("keydown", preventDevTools);
    };
  }, []);

  return (
    <section
      className="py-20 px-4 select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-[#0084FF]/30 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-[#0084FF] font-medium text-sm">OUR WORK</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Some of our
            <br />
            <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
              featured projects
            </span>
          </h2>
        </motion.div>

        {/* Simplified Category Navigation */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex bg-gray-900/50 backdrop-blur-sm rounded-xl p-1 border border-white/10">
            {videoCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === category.id && (
                  <motion.div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${category.accentColor}`}
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {videoCategories.map((category) =>
              activeCategory === category.id ? (
                <CategorySection key={category.id} category={category} />
              ) : null
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProtectedVideoShowcase;
