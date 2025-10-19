import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Play,
  ArrowUpRight,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Star,
  Calendar,
  TrendingUp,
  Target,
} from "lucide-react";

export default function CaseStudyCardLayout() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(false);

  // Video protection
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleContextMenu = (e) => e.preventDefault();
    const handleDragStart = (e) => e.preventDefault();

    videoElement.controls = false;
    videoElement.setAttribute(
      "controlsList",
      "nodownload nofullscreen noremoteplayback"
    );
    videoElement.setAttribute("disablePictureInPicture", "true");

    videoElement.addEventListener("contextmenu", handleContextMenu);
    videoElement.addEventListener("dragstart", handleDragStart);

    return () => {
      videoElement.removeEventListener("contextmenu", handleContextMenu);
      videoElement.removeEventListener("dragstart", handleDragStart);
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
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Title Section - Outside the card */}
      <div className="text-center mb-12">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-[#0084FF]/30 mb-6">
          <span className="text-[#0084FF] font-medium text-sm">
            CASE STUDIES
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Some solid
          <br />
          <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
            Case studies
          </span>
        </h1>
      </div>

      {/* Card - Exactly as it was */}
      <section className="bg-gradient-to-br from-gray-900 to-black text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/10 max-w-6xl mx-auto">
        {/* Header Section - Original card header */}
        <div className="text-left mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <div className="w-2 h-2 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/80">
              CASE STUDY #01
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            "With just 5,000 subscribers, Spencer now generates $350K per month"
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                alt="Neel Nafis"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#0084FF]"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full flex items-center justify-center border-2 border-gray-900">
                <Star className="w-3 h-3 text-white" fill="currentColor" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg">Neel Nafis</h3>
              <p className="text-white/60 text-sm">Founder & CEO</p>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs">Verified Success</span>
              </div>
            </div>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-2xl p-6 font-bold hover:shadow-[0_0_40px_#0084FF] transition-all duration-300 group relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="relative flex items-center justify-center gap-3">
              <Calendar className="w-5 h-5" />
              <div className="text-left">
                <div className="text-sm md:text-base">Book Free Call</div>
                <div className="text-white/80 text-xs">Limited Spots</div>
              </div>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.button>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 my-10">
          {/* Left Column - Stats & Info */}
          <div className="space-y-8">
            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid gap-6">
                {/* Revenue Growth */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0084FF]/20 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#0084FF]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">250%</div>
                        <div className="text-white/60 text-sm">
                          Revenue Growth
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, delay: 0.7 }}
                    />
                  </div>
                </div>

                {/* Ad Efficiency */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#66B5FF]/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-[#66B5FF]" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold">200%</div>
                        <div className="text-white/60 text-sm">
                          Ad Efficiency
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0084FF] to-[#66B5FF] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "80%" }}
                      transition={{ duration: 2, delay: 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6 flex flex-col items-center justify-end"
          >
            {/* Video Player */}
            <motion.div
              ref={containerRef}
              className="relative cursor-pointer aspect-video rounded-2xl overflow-hidden border-2 border-white/10 bg-gray-900 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onContextMenu={(e) => e.preventDefault()}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                loop={false}
                preload="metadata"
                onClick={togglePlay}
                poster="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              >
                <source src="/videos/case-study.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Progress Bar */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 cursor-pointer z-20"
                onClick={seekVideo}
              >
                <div
                  className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Play/Pause Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-2xl"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{ opacity: isPlaying ? 0 : 1 }}
                  >
                    {isPlaying ? (
                      <Pause size={24} fill="white" />
                    ) : (
                      <Play size={24} fill="white" />
                    )}
                  </motion.button>
                </div>

                {/* Control Buttons */}
                <motion.div
                  className="absolute bottom-4 right-4 flex items-center gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: showControls ? 1 : 0,
                    y: showControls ? 0 : 10,
                  }}
                >
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/20 backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <button
                    onClick={handleFullscreen}
                    className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/20 backdrop-blur-sm hover:scale-110 transition-transform"
                  >
                    <Maximize size={16} />
                  </button>
                </motion.div>

                {/* Video Info */}
                <div className="absolute top-4 left-4">
                  <div className="bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-sm border border-white/10">
                    Case Study Video
                  </div>
                </div>
              </div>

              {/* Play Indicator */}
              {isPlaying && (
                <motion.div
                  className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm border border-[#0084FF]/30"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="flex items-center gap-2 text-[#0084FF] font-medium">
                    <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse" />
                    <span>PLAYING</span>
                  </div>
                </motion.div>
              )}

              {/* Duration */}
              <div className="absolute top-14 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs border border-white/10">
                7:33
              </div>
            </motion.div>

            {/* Video Description */}
            <div className="text-center">
              <p className="text-white/60 text-sm">
                See the complete transformation journey in under 8 minutes
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
