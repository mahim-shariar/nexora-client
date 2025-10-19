import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FaLightbulb,
  FaEdit,
  FaVideo,
  FaImage,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const processSteps = [
  {
    id: 1,
    title: "Discovery & Strategy",
    icon: FaLightbulb,
    description:
      "We analyze your business goals and audience to create a winning content strategy that drives results",
    features: [
      "Market Research",
      "Audience Analysis",
      "Competitor Analysis",
      "Strategy Development",
    ],
    color: "#0084FF",
    duration: "2-3 days",
  },
  {
    id: 2,
    title: "Content Creation",
    icon: FaEdit,
    description:
      "Our team crafts engaging scripts and content frameworks optimized for maximum engagement",
    features: [
      "Script Writing",
      "Content Planning",
      "Storyboarding",
      "Framework Setup",
    ],
    color: "#0066CC",
    duration: "3-5 days",
  },
  {
    id: 3,
    title: "Video Production",
    icon: FaVideo,
    description:
      "High-quality video production with cinematic techniques and professional editing",
    features: [
      "4K Production",
      "Motion Graphics",
      "Color Grading",
      "Sound Design",
    ],
    color: "#0084FF",
    duration: "4-6 days",
  },
  {
    id: 4,
    title: "Thumbnail Design",
    icon: FaImage,
    description:
      "Creating thumbnails that drive clicks and engagement through proven design principles",
    features: [
      "CTR Optimization",
      "A/B Testing",
      "Design Principles",
      "Emotional Triggers",
    ],
    color: "#0066CC",
    duration: "1-2 days",
  },
  {
    id: 5,
    title: "Launch & Analytics",
    icon: FaRocket,
    description:
      "Strategic publishing and performance tracking to maximize your content's impact",
    features: [
      "Multi-platform Publishing",
      "Performance Analytics",
      "ROI Tracking",
      "Optimization",
    ],
    color: "#0084FF",
    duration: "Ongoing",
  },
];

// Ultra-smooth easing curves
const SMOOTH_EASE = [0.4, 0, 0.2, 1]; // Material Design's recommended easing
const GENTLE_EASE = [0.25, 0.1, 0.25, 1]; // Even smoother for subtle animations
const BOUNCE_EASE = [0.68, -0.55, 0.265, 1.55]; // Gentle bounce for icons

export default function ScrollDrivenProcess() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const stepRefs = useRef([]);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smoother scroll direction tracking with throttling
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY) > 5) {
            // Add threshold
            if (currentScrollY > lastScrollY) {
              setScrollDirection("down");
            } else if (currentScrollY < lastScrollY) {
              setScrollDirection("up");
            }
            setLastScrollY(currentScrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Smoother step progression
  const activeStepProgress = useTransform(
    scrollYProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 1],
    [0, 1, 2, 3, 4, 4]
  );

  useEffect(() => {
    const unsubscribe = activeStepProgress.on("change", (latest) => {
      const step = Math.floor(latest);
      if (step !== activeStep) {
        setActiveStep(step);
      }
    });
    return () => unsubscribe();
  }, [activeStepProgress, activeStep]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced animation variants with ultra-smooth transitions
  const containerVariants = {
    down: {
      hidden: {
        opacity: 0,
        y: 80,
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: SMOOTH_EASE,
        },
      },
    },
    up: {
      hidden: {
        opacity: 0,
        y: -80,
        scale: 0.98,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 1.2,
          ease: SMOOTH_EASE,
        },
      },
    },
  };

  const iconVariants = {
    down: {
      hidden: {
        scale: 0,
        rotate: -180,
        opacity: 0,
      },
      visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 60,
          damping: 15,
          delay: 0.4,
        },
      },
    },
    up: {
      hidden: {
        scale: 0,
        rotate: 180,
        opacity: 0,
      },
      visible: {
        scale: 1,
        rotate: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 60,
          damping: 15,
          delay: 0.3,
        },
      },
    },
  };

  const featureVariants = {
    down: {
      hidden: {
        opacity: 0,
        x: -30,
        scale: 0.9,
      },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          delay: i * 0.08 + 0.5,
          duration: 0.7,
          ease: GENTLE_EASE,
        },
      }),
    },
    up: {
      hidden: {
        opacity: 0,
        x: 30,
        scale: 0.9,
      },
      visible: (i) => ({
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          delay: i * 0.08 + 0.4,
          duration: 0.7,
          ease: GENTLE_EASE,
        },
      }),
    },
  };

  const contentVariants = {
    down: {
      hidden: {
        opacity: 0,
        x: 80,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 1,
          delay: 0.3,
          ease: SMOOTH_EASE,
        },
      },
    },
    up: {
      hidden: {
        opacity: 0,
        x: -80,
        scale: 0.95,
      },
      visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 1,
          delay: 0.3,
          ease: SMOOTH_EASE,
        },
      },
    },
  };

  // Background glow variants
  const backgroundVariants = {
    inactive: {
      opacity: 0.1,
      scale: 1,
    },
    active: {
      opacity: 0.3,
      scale: 1.02,
      transition: {
        duration: 1.5,
        ease: GENTLE_EASE,
      },
    },
  };

  return (
    <section className="min-h-screen py-12 md:py-24 bg-black text-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#0084FF]/10 blur-3xl -z-10"
        animate={{
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: GENTLE_EASE,
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-20 w-40 h-40 rounded-full bg-[#0066CC]/10 blur-3xl -z-10"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: GENTLE_EASE,
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0084FF]/5 blur-3xl -z-10"
        animate={{
          opacity: [0.05, 0.08, 0.05],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: GENTLE_EASE,
          delay: 2,
        }}
      />

      {/* Fixed Progress Indicator */}
      <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col items-center">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center"
              initial={false}
              animate={{
                scale: activeStep === index ? 1.3 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: GENTLE_EASE,
              }}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index
                    ? "bg-[#0084FF] shadow-lg shadow-[#0084FF]/50"
                    : index < activeStep
                    ? "bg-[#0084FF]/60"
                    : "bg-white/30"
                }`}
                animate={{
                  scale: activeStep === index ? [1, 1.4, 1] : 1,
                }}
                transition={{
                  duration: 2.5,
                  repeat: activeStep === index ? Infinity : 0,
                  ease: GENTLE_EASE,
                }}
              />
              {index < processSteps.length - 1 && (
                <motion.div
                  className={`w-0.5 h-8 ${
                    index < activeStep ? "bg-[#0084FF]" : "bg-white/20"
                  }`}
                  animate={{
                    height: index < activeStep ? "2rem" : "2rem",
                    opacity: index < activeStep ? 1 : 0.3,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: GENTLE_EASE,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="fixed top-4 left-4 right-4 z-30 lg:hidden">
        <div className="flex items-center justify-between gap-2">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex-1 flex flex-col items-center"
              initial={false}
              animate={{
                scale: activeStep === index ? 1.2 : 1,
              }}
              transition={{
                duration: 0.4,
                ease: GENTLE_EASE,
              }}
            >
              <motion.div
                className={`w-2 h-2 rounded-full mb-1 ${
                  activeStep === index
                    ? "bg-[#0084FF]"
                    : index < activeStep
                    ? "bg-[#0084FF]/60"
                    : "bg-white/30"
                }`}
                animate={{
                  scale: activeStep === index ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 2,
                  repeat: activeStep === index ? Infinity : 0,
                  ease: GENTLE_EASE,
                }}
              />
              <div
                className={`text-xs transition-all duration-300 ${
                  activeStep === index
                    ? "text-[#0084FF] font-bold"
                    : "text-white/50"
                }`}
              >
                {index + 1}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="w-full h-0.5 bg-white/20 mt-2 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
            animate={{
              width: `${((activeStep + 1) / processSteps.length) * 100}%`,
            }}
            transition={{
              duration: 0.8,
              ease: SMOOTH_EASE,
            }}
          />
        </div>
      </div>

      <div ref={containerRef} className="container mx-auto px-4 relative z-20">
        {/* Header */}
        <motion.div
          className="text-center mb-20 md:mb-32 pt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: SMOOTH_EASE,
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-[#0084FF]/30 mb-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            <HiSparkles className="w-5 h-5 text-[#0084FF]" />
            <span className="text-[#0084FF] font-semibold tracking-widest text-sm uppercase">
              Scroll to Explore
            </span>
            <HiSparkles className="w-5 h-5 text-[#0084FF]" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400">Watch our process</span>
            <br />
            <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
              unfold as you scroll
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            Scroll down to see each step of our content creation process come to
            life. Scroll up to see them in reverse!
          </motion.p>
        </motion.div>

        {/* Process Steps */}
        <div className="max-w-6xl mx-auto space-y-32 md:space-y-48">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 md:gap-16 min-h-screen lg:min-h-[80vh]`}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-150px" }}
              custom={scrollDirection}
            >
              {/* Visual Side */}
              <div className="flex-1 w-full">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    ease: SMOOTH_EASE,
                  }}
                  viewport={{ once: true }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0084FF]/20 to-[#0066CC]/20"
                    variants={backgroundVariants}
                    animate={activeStep === index ? "active" : "inactive"}
                  />

                  {/* Step Icon */}
                  <motion.div
                    className="relative z-10 w-32 h-32 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#0084FF] to-[#0066CC] flex items-center justify-center shadow-2xl shadow-[#0084FF]/30"
                    variants={iconVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={scrollDirection}
                    animate={{
                      scale: activeStep === index ? [1, 1.08, 1] : 1,
                      rotate: activeStep === index ? [0, 2, -2, 0] : 0,
                      y: activeStep === index ? [0, -3, 0] : 0,
                    }}
                    transition={{
                      duration: 3,
                      repeat: activeStep === index ? Infinity : 0,
                      repeatType: "reverse",
                      ease: GENTLE_EASE,
                    }}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </motion.div>

                  {/* Feature Dots */}
                  <div className="relative z-10 grid grid-cols-2 gap-4">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={featureIndex}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2, ease: GENTLE_EASE },
                        }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-[#0084FF] flex-shrink-0"
                          animate={{
                            scale: activeStep === index ? [1, 1.4, 1] : 1,
                            opacity: activeStep === index ? [1, 0.7, 1] : 1,
                          }}
                          transition={{
                            duration: 2,
                            delay: featureIndex * 0.15,
                            repeat: activeStep === index ? Infinity : 0,
                            ease: GENTLE_EASE,
                          }}
                        />
                        <span className="text-white/90 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Duration Badge */}
                  <motion.div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-[#0084FF]/30 text-[#0084FF] text-sm font-medium"
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: scrollDirection === "down" ? 0.7 : 0.5,
                      ease: SMOOTH_EASE,
                    }}
                    viewport={{ once: true }}
                  >
                    ⏱️ {step.duration}
                  </motion.div>
                </motion.div>
              </div>

              {/* Content Side */}
              <div className="flex-1 w-full">
                <motion.div
                  className="text-center lg:text-left"
                  variants={contentVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={scrollDirection}
                >
                  {/* Step Number */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: scrollDirection === "down" ? 0.4 : 0.3,
                      ease: SMOOTH_EASE,
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.span
                      className="w-2 h-2 rounded-full bg-[#0084FF]"
                      animate={{
                        scale: activeStep === index ? [1, 1.6, 1] : 1,
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: activeStep === index ? Infinity : 0,
                        ease: GENTLE_EASE,
                      }}
                    />
                    STEP {index + 1} of {processSteps.length}
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-3xl md:text-5xl font-bold text-white mb-6"
                    animate={{
                      color: activeStep === index ? "#FFFFFF" : "#666666",
                      x: activeStep === index ? [0, -2, 2, 0] : 0,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: activeStep === index ? 1 : 0,
                      ease: GENTLE_EASE,
                    }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-xl text-white/80 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: scrollDirection === "down" ? 0.5 : 0.4,
                      ease: SMOOTH_EASE,
                    }}
                    viewport={{ once: true }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Progress Indicator for this step */}
                  <motion.div
                    className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-8"
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: scrollDirection === "down" ? 0.6 : 0.5,
                      ease: SMOOTH_EASE,
                    }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
                      animate={{
                        width: activeStep >= index ? "100%" : "0%",
                      }}
                      transition={{
                        duration: 1.2,
                        ease: SMOOTH_EASE,
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: SMOOTH_EASE,
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3
            className="text-2xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            Ready to Start Your Journey?
          </motion.h3>

          <motion.button
            whileHover={{
              scale: isMobile ? 1 : 1.05,
              boxShadow: "0 0 50px rgba(0, 132, 255, 0.5)",
              y: -2,
            }}
            whileTap={{ scale: 0.98, y: 0 }}
            transition={{
              duration: 0.3,
              ease: GENTLE_EASE,
            }}
            className="px-12 py-4 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-2xl text-white font-bold text-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3 mx-auto mb-4"
          >
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 3 }}
              transition={{ duration: 0.2 }}
            >
              Begin Your Project
            </motion.span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <FaArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.p
            className="text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            Join 500+ creators who transformed their content strategy
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
