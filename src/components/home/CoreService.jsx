import React from "react";
import {
  FaVideo,
  FaEdit,
  FaPhotoVideo,
  FaFilm,
  FaYoutube,
  FaMagic,
  FaRocket,
  FaPalette,
  FaCube,
  FaGlobe,
  FaMobile,
  FaRegGem,
  FaRegLightbulb,
} from "react-icons/fa";
import { FaWandSparkles } from "react-icons/fa6";
import { GiFilmSpool, GiVideoCamera } from "react-icons/gi";

const CoreServices = () => {
  // Services data
  const services = [
    {
      icon: <FaVideo className="w-6 h-6" />,
      title: "4K Video Production",
      description:
        "Cinematic footage captured with professional cinema cameras and expert lighting setups",
    },
    {
      icon: <FaEdit className="w-6 h-6" />,
      title: "AI-Powered Editing",
      description:
        "Intelligent editing workflows enhanced by artificial intelligence for precision cutting",
    },
    {
      icon: <FaPhotoVideo className="w-6 h-6" />,
      title: "3D Motion Design",
      description:
        "Immersive animations and visual storytelling that brings your brand to life",
    },
    {
      icon: <GiFilmSpool className="w-6 h-6" />,
      title: "Short Form Mastery",
      description:
        "Viral-optimized content designed for TikTok, Reels, and Shorts with engagement hooks",
    },
    {
      icon: <FaYoutube className="w-6 h-6" />,
      title: "YT Algorithm Optimization",
      description:
        "Data-driven strategies that maximize visibility through YouTube's recommendation algorithm",
    },
    {
      icon: <FaMagic className="w-6 h-6" />,
      title: "Neural Color Grading",
      description:
        "AI-enhanced color science that creates cinematic looks and consistent color palettes",
    },
    {
      icon: <FaRocket className="w-6 h-6" />,
      title: "Performance Ads",
      description:
        "Conversion-optimized video advertisements designed to drive results and maximize ROI",
    },
    {
      icon: <FaPalette className="w-6 h-6" />,
      title: "Visual Identity",
      description:
        "Cohesive branding systems that maintain visual consistency across all video assets",
    },
    {
      icon: <FaWandSparkles className="w-6 h-6" />,
      title: "VFX & Compositing",
      description:
        "Seamless visual effects and green screen work that transforms ordinary footage",
    },
    {
      icon: <FaCube className="w-6 h-6" />,
      title: "Spatial Video",
      description:
        "Immersive content creation for next-generation platforms including VR and AR",
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "Multi-Platform Distribution",
      description:
        "Optimized delivery across all channels with platform-specific formatting",
    },
    {
      icon: <FaMobile className="w-6 h-6" />,
      title: "Interactive Video",
      description:
        "Engaging experiences featuring interactive elements and branching narratives",
    },
  ];

  const marqueeServices = [...services, ...services];

  return (
    <section
      id="services"
      className="relative px-4 py-20 overflow-hidden bg-black sm:px-6 lg:px-8"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
            <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
              PREMIUM SERVICES
            </span>
            <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Main Title */}
          <h1 className="mb-8 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Video
            <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
              Excellence
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="max-w-2xl mx-auto text-lg font-light leading-relaxed tracking-wide text-gray-300/80">
            Next-generation video solutions powered by cutting-edge technology
            and creative innovation
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative py-12 overflow-hidden">
          {/* Top Marquee - Moving Right */}
          <div className="flex mb-6">
            <div className="flex space-x-5 animate-marquee-right">
              {marqueeServices.slice(0, 12).map((service, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* New Card Layout - Centered Content */}
                    <div className="relative z-10 flex flex-col items-center h-full text-center">
                      {/* Icon Container */}
                      <div className="p-4 bg-gradient-to-br from-[#0084FF]/20 to-[#66B5FF]/10 rounded-2xl shadow-lg shadow-[#0084FF]/5 mb-4">
                        <div className="text-[#66B5FF]">{service.icon}</div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-white">
                        {service.title}
                      </h3>

                      {/* Accent Line */}
                      <div className="w-16 h-1 bg-gradient-to-r from-[#0084FF] to-[#66B5FF] rounded-full mb-4"></div>

                      {/* Description */}
                      <p className="flex-1 text-sm font-light leading-relaxed text-gray-300/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee - Moving Left */}
          <div className="flex">
            <div className="flex space-x-5 animate-marquee-left">
              {marqueeServices.slice(6, 18).map((service, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* New Card Layout - Centered Content */}
                    <div className="relative z-10 flex flex-col items-center h-full text-center">
                      {/* Icon Container */}
                      <div className="p-4 bg-gradient-to-br from-[#66B5FF]/20 to-[#0084FF]/10 rounded-2xl shadow-lg shadow-[#66B5FF]/5 mb-4">
                        <div className="text-[#0084FF]">{service.icon}</div>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 text-xl font-bold leading-tight tracking-tight text-white">
                        {service.title}
                      </h3>

                      {/* Accent Line */}
                      <div className="w-16 h-1 bg-gradient-to-r from-[#66B5FF] to-[#0084FF] rounded-full mb-4"></div>

                      {/* Description */}
                      <p className="flex-1 text-sm font-light leading-relaxed text-gray-300/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Gradient Overlays - Perfectly blended with black background */}
          <div className="absolute top-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute top-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
          <div className="absolute bottom-0 left-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-r from-black to-transparent"></div>
          <div className="absolute bottom-0 right-0 z-20 w-32 h-full pointer-events-none bg-gradient-to-l from-black to-transparent"></div>
        </div>
      </div>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-marquee-right {
          animation: marquee-right 60s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 60s linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </section>
  );
};

export default CoreServices;
