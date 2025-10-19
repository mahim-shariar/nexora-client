import React from "react";
import logo from "../../assets/main-log.png";
import lightEffect from "../../assets/effect-bg.png";
import { RxCross2 } from "react-icons/rx";
import { GoCheck } from "react-icons/go";

const WhyChooseUs = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1150px] mx-auto">
        {/* Header Section - Adopted from video showcase */}
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/80 backdrop-blur-sm border border-[#0084FF]/30 mb-6">
            <span className="text-[#0084FF] font-medium text-sm">
              WHY CHOOSE US
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Know what
            <br />
            <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
              we do differently
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8">
            From Videos to High-Ticket Leads
          </p>

          {/* Pill Badges */}
          <div className="flex justify-center flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
              ✅ 48-hour turnaround
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#0084FF]/10 text-[#0084FF] border border-[#0084FF]/20">
              🎯 Results-driven
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
              👥 20+ experts
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div className=" text-white rounded-3xl p-6 md:p-8  relative ">
          {/* Light Effect on Top-Right Corner */}
          <img
            src={lightEffect}
            alt="Light Effect"
            className="absolute top-0 left-0 w-[900px] max-w-none -ml-85 -mt-82 pointer-events-none"
            draggable="false"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 relative z-10">
            {/* Left Column - Features */}
            <div className=" bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 backdrop-blur-sm relative overflow-hidden">
              {/* Logo Section */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={logo}
                  alt="Company Logo"
                  className="w-50 object-contain"
                />
              </div>

              <div className="space-y-4 relative z-10">
                {[
                  "Full-service content team of 20+ experts – From script to upload, we handle everything.",
                  "Results-driven approach – We focus on 10X watch time, viral growth, and high engagement.",
                  "Proven YouTube growth strategy – 100+ successful videos and channels scaled.",
                  "Done-for-you content funnels – Videos designed to convert viewers into clients.",
                  "Personalized multi-platform distribution – YouTube, Facebook, TikTok, Instagram.",
                  "48-hour fast turnaround with unlimited revisions – Your satisfaction guaranteed.",
                  "Dedicated support anytime – We're available 24/7 to help your channel grow.",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group hover:bg-white/5 rounded-lg p-2 -mx-2 transition-colors"
                  >
                    <GoCheck className="w-5 h-5 text-[#0084FF] mt-1" />
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-white group-hover:text-[#0084FF] transition-colors">
                        {feature.split(" – ")[0]}
                      </span>
                      <span className="text-gray-300">
                        {" "}
                        – {feature.split(" – ")[1]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Micro-copy */}
              <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited revisions
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Dedicated support
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Multi-platform distribution
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Comparison Cards */}
            <div className="space-y-6">
              {/* Other Agencies Card */}
              <div className=" bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border  border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-red-400">⚠️</span>
                  Other Agencies
                </h3>
                <ul className="space-y-3">
                  {[
                    "Slow freelancers with inconsistent results",
                    "Videos that fail to convert or retain viewers",
                    "Poor thumbnails, titles, and no CTR strategy",
                    "Limited expertise in YouTube growth or lead capture",
                    "Revisions capped with a little client-focused approach",
                    "Guesswork instead of data-driven strategies",
                    "Delayed responses, lack of transparency",
                  ].map((issue, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="flex-shrink-0 flex items-center w-5 h-5 text-white/30">
                        <RxCross2 />
                      </span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bonuses Card - Moved below Other Agencies */}
              <div className="bg-white/5 rounded-2xl p-6 border border-[#0084FF]/30 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-[#0084FF]">🎁</span>
                  Bonuses You Get With Us
                </h3>
                <ul className="space-y-3">
                  {[
                    "Free content audit and strategy session",
                    "Free thumbnail and SEO optimization for maximum CTR",
                    "Access to exclusive viral hooks and engagement templates",
                  ].map((bonus, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="flex-shrink-0 w-2 h-2 bg-[#0084FF] rounded-full"></span>
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Section */}
              <div className="bg-white/5 rounded-2xl p-6 border border-green-500/30 backdrop-blur-sm">
                <div className="text-center">
                  <button
                    className="w-full bg-gradient-to-r from-[#0084FF] to-[#0066CC] hover:from-[#0066CC] hover:to-[#0055AA] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-[0_0_40px_#0084FF] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:ring-offset-2 focus:ring-offset-gray-900 mb-4"
                    aria-label="Get started with our video marketing services"
                  >
                    Get Started
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <a
                      href="#"
                      className="text-[#0084FF] hover:text-[#66B5FF] font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0084FF] focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
                      aria-label="Schedule your free video marketing audit"
                    >
                      Schedule your free audit →
                    </a>
                    <span className="text-xs text-gray-400">
                      No credit card required
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
