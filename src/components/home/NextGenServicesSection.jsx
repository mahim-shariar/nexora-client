import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  FaCrown,
  FaEdit,
  FaVideo,
  FaImage,
  FaRocket,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const processSteps = [
  {
    id: 1,
    title: "Positioning",
    icon: FaCrown,
    description:
      "Craft authority-focused content to attract dream clients and make you the go-to expert.",
    features: [
      "Authority Content",
      "Dream Client Targeting",
      "Expert Positioning",
      "Brand Messaging",
    ],
    color: "#0084FF",
    duration: "1-2 weeks",
  },
  {
    id: 2,
    title: "Scripts",
    icon: FaEdit,
    description:
      "Write conversion-driven scripts blending storytelling, social proof, and subtle CTAs for leads.",
    features: [
      "Storytelling Framework",
      "Social Proof Integration",
      "Subtle CTAs",
      "Conversion Optimization",
    ],
    color: "#0066CC",
    duration: "2-3 days",
  },
  {
    id: 3,
    title: "Edits",
    icon: FaVideo,
    description:
      "Create trending, attention-grabbing videos that hold viewers and convert them into buyers.",
    features: [
      "Trend Integration",
      "Attention Hooks",
      "Viewer Retention",
      "Conversion Editing",
    ],
    color: "#0084FF",
    duration: "3-5 days",
  },
  {
    id: 4,
    title: "Thumbnails",
    icon: FaImage,
    description:
      "Design high-CTR thumbnails and titles that stand out and force clicks on every video.",
    features: [
      "High CTR Design",
      "Click Psychology",
      "A/B Testing",
      "Brand Consistency",
    ],
    color: "#0066CC",
    duration: "1-2 days",
  },
  {
    id: 5,
    title: "Publishing",
    icon: FaRocket,
    description:
      "Upload and distribute content strategically across platforms for maximum visibility and engagement.",
    features: [
      "Multi-platform Strategy",
      "Optimal Timing",
      "Platform Optimization",
      "Content Distribution",
    ],
    color: "#0084FF",
    duration: "Ongoing",
  },
  {
    id: 6,
    title: "Optimization",
    icon: FaChartLine,
    description:
      "Track, analyze, and improve every video to generate more qualified leads consistently.",
    features: [
      "Performance Analytics",
      "Lead Tracking",
      "Continuous Improvement",
      "ROI Optimization",
    ],
    color: "#0066CC",
    duration: "Ongoing",
  },
];

// Ultra-smooth easing curves
const SMOOTH_EASE = [0.4, 0, 0.2, 1];
const GENTLE_EASE = [0.25, 0.1, 0.25, 1];
const BOUNCE_EASE = [0.68, -0.55, 0.265, 1.55];

export default function ClientGettingProcess() {
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

  // Smoother scroll direction tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (Math.abs(currentScrollY - lastScrollY) > 5) {
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
    processSteps.map((_, index) => index / (processSteps.length - 1)),
    processSteps.map((_, index) => index)
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

  // Animation variants
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
    <section
      id="proses"
      className="relative min-h-screen py-12 overflow-hidden text-white bg-black md:py-24"
    >
      {/* Background Elements */}
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
      <div className="fixed z-30 hidden transform -translate-y-1/2 top-1/2 right-8 lg:block">
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
      <div className="fixed z-30 top-4 left-4 right-4 lg:hidden">
        <div className="flex items-center justify-between gap-2">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center flex-1"
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

      <div ref={containerRef} className="container relative z-20 px-4 mx-auto">
        {/* Header */}
        <motion.div
          className="pt-16 mb-20 text-center md:mb-32"
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
              The Proven System
            </span>
            <HiSparkles className="w-5 h-5 text-[#0084FF]" />
          </motion.div>

          <motion.h2
            className="mb-6 text-3xl font-bold text-white md:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400">Our Strategy to get</span>
            <br />
            <span className="bg-gradient-to-r from-[#66B5FF] to-[#0084FF] bg-clip-text text-transparent">
              You leads through content
            </span>
          </motion.h2>

          <motion.p
            className="max-w-3xl mx-auto text-xl text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            Scroll to explore our proven 6-step system that transforms coaches
            into client-attracting powerhouses through strategic content
            creation.
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
                        className="flex items-center gap-3 p-4 transition-colors duration-300 border rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
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
                        <span className="text-sm text-white/90">{feature}</span>
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
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm border rounded-full bg-white/5 border-white/10 text-white/60"
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
                    className="mb-6 text-3xl font-bold text-white md:text-5xl"
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
                    className="mb-8 text-xl leading-relaxed text-white/80"
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

                  {/* Progress Indicator */}
                  <motion.div
                    className="w-full h-1 mb-8 overflow-hidden rounded-full bg-white/10"
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
          className="mt-32 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: SMOOTH_EASE,
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h3
            className="mb-6 text-2xl font-bold text-white md:text-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            Ready to Become a Client-Getting Machine?
          </motion.h3>

          <motion.p
            className="text-sm text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: SMOOTH_EASE,
            }}
            viewport={{ once: true }}
          >
            Join 250+ coaches who transformed their client acquisition
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
