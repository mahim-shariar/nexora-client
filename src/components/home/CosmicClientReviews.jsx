import React from "react";
import { FaStar, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { motion } from "framer-motion";

const ClientReviews = () => {
  // Reviews data
  const reviews = [
    {
      name: "Alex Chen",
      position: "Marketing Director, TechNova",
      rating: 5,
      review:
        "The video editing transformed our product launches into cinematic experiences. Engagement skyrocketed by 300%!",
      initials: "AC",
    },
    {
      name: "Sarah Martinez",
      position: "Creative Director, StellarMedia",
      rating: 5,
      review:
        "Working with this team felt like harnessing the power of a supernova. Truly out of this world creativity!",
      initials: "SM",
    },
    {
      name: "Marcus Johnson",
      position: "CEO, QuantumLabs",
      rating: 5,
      review:
        "Turned our complex technical content into engaging visual stories that audiences love. Exceptional quality!",
      initials: "MJ",
    },
    {
      name: "Elena Rodriguez",
      position: "Social Media Manager, CosmicBrands",
      rating: 5,
      review:
        "Lightning-fast delivery without compromising quality. Our social media presence has never been stronger!",
      initials: "ER",
    },
    {
      name: "David Kim",
      position: "Brand Manager, NebulaSoft",
      rating: 5,
      review:
        "The AI-powered editing and color grading took our content to professional cinematic levels. Absolutely stellar!",
      initials: "DK",
    },
    {
      name: "Jessica Wang",
      position: "Content Director, StellarTech",
      rating: 5,
      review:
        "From 4K production to multi-platform distribution, they handled everything seamlessly. Highly recommended!",
      initials: "JW",
    },
    {
      name: "Michael Brown",
      position: "VP Marketing, GalaxyEnterprises",
      rating: 5,
      review:
        "The results-driven approach delivered measurable ROI. Our video performance metrics speak for themselves!",
      initials: "MB",
    },
    {
      name: "Olivia Taylor",
      position: "Creative Lead, UniverseStudios",
      rating: 5,
      review:
        "Exceptional attention to detail and creative vision. Every frame is perfectly crafted for maximum impact.",
      initials: "OT",
    },
  ];

  const marqueeReviews = [...reviews, ...reviews];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#0084FF] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[#66B5FF] rounded-full opacity-30 animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#0084FF] rounded-full opacity-25 animate-bounce"></div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-[#0084FF]/10 to-[#66B5FF]/10 backdrop-blur-sm border border-[#0084FF]/20 mb-8 shadow-lg shadow-[#0084FF]/5">
            <div className="w-1.5 h-1.5 bg-[#0084FF] rounded-full animate-pulse"></div>
            <span className="text-[#0084FF] font-semibold text-sm tracking-wider">
              CLIENT TESTIMONIALS
            </span>
            <div className="w-1.5 h-1.5 bg-[#66B5FF] rounded-full animate-pulse"></div>
          </div>

          {/* Enhanced Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            Client
            <span className="bg-gradient-to-r from-[#66B5FF] via-[#0084FF] to-[#66B5FF] bg-clip-text text-transparent bg-size-200 animate-gradient block mt-2">
              Success Stories
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-lg text-gray-300/80 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
            Hear from brands that have achieved stellar results with our cosmic
            video editing services
          </p>
        </div>

        {/* Marquee Section */}
        <div className="relative overflow-hidden py-12">
          {/* Top Marquee - Moving Right */}
          <div className="flex mb-6">
            <div className="animate-marquee-right flex space-x-5">
              {marqueeReviews.slice(0, 8).map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* Review Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Avatar and Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-[#0084FF]/20 to-[#66B5FF]/10 rounded-xl shadow-lg shadow-[#0084FF]/5 flex-shrink-0">
                          <div className="text-white font-bold text-sm">
                            {review.initials}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-1 tracking-tight">
                            {review.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {review.position}
                          </p>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-gray-400 text-sm ml-2">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Review Text */}
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute -top-2 -left-1 w-4 h-4 text-[#0084FF]/30" />
                        <p className="text-gray-300/80 text-sm leading-relaxed font-light pl-4">
                          {review.review}
                        </p>
                        <FaQuoteRight className="absolute -bottom-2 -right-1 w-4 h-4 text-[#0084FF]/30" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Marquee - Moving Left */}
          <div className="flex">
            <div className="animate-marquee-left flex space-x-5">
              {marqueeReviews.slice(4, 12).map((review, index) => (
                <div key={index} className="flex-shrink-0 w-[380px]">
                  <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl shadow-black/30 relative overflow-hidden h-full min-h-[220px] flex flex-col">
                    {/* Review Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header with Avatar and Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-gradient-to-br from-[#66B5FF]/20 to-[#0084FF]/10 rounded-xl shadow-lg shadow-[#66B5FF]/5 flex-shrink-0">
                          <div className="text-white font-bold text-sm">
                            {review.initials}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-bold text-lg mb-1 tracking-tight">
                            {review.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {review.position}
                          </p>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="text-gray-400 text-sm ml-2">
                          {review.rating}.0
                        </span>
                      </div>

                      {/* Review Text */}
                      <div className="relative flex-1">
                        <FaQuoteLeft className="absolute -top-2 -left-1 w-4 h-4 text-[#66B5FF]/30" />
                        <p className="text-gray-300/80 text-sm leading-relaxed font-light pl-4">
                          {review.review}
                        </p>
                        <FaQuoteRight className="absolute -bottom-2 -right-1 w-4 h-4 text-[#66B5FF]/30" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Gradient Overlays - Perfectly blended with black background */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute left-0 bottom-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 bottom-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-20 pointer-events-none"></div>
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

export default ClientReviews;
