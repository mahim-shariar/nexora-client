import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaPlay,
  FaFilm,
  FaMagic,
  FaRocket,
  FaAward,
  FaUsers,
  FaGlobeAmericas,
} from "react-icons/fa";
import { HiSparkles, HiGlobeAlt } from "react-icons/hi";

// Enhanced Glitch Text Component
const GlitchText = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        initial={{ opacity: 1 }}
        whileInView={{
          opacity: [1, 0.8, 1, 0.9, 1],
          x: [0, -2, 2, -1, 0],
        }}
        transition={{
          duration: 0.3,
          times: [0, 0.2, 0.4, 0.6, 1],
        }}
        viewport={{ once: true }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-indigo-400 opacity-70 z-0"
        initial={{ opacity: 0, x: 0 }}
        whileInView={{
          opacity: [0, 0.6, 0],
          x: [0, -3, 0],
        }}
        transition={{
          duration: 0.4,
          times: [0, 0.5, 1],
          delay: 0.1,
        }}
        viewport={{ once: true }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 text-purple-400 opacity-70 z-0"
        initial={{ opacity: 0, x: 0 }}
        whileInView={{
          opacity: [0, 0.5, 0],
          x: [0, 3, 0],
        }}
        transition={{
          duration: 0.4,
          times: [0, 0.5, 1],
          delay: 0.2,
        }}
        viewport={{ once: true }}
      >
        {text}
      </motion.span>
    </div>
  );
};

// Enhanced Animated Number Counter
const AnimatedNumber = ({ value, suffix = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += stepValue;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return (
    <motion.span
      ref={ref}
      className="font-bold "
      whileInView={{ scale: [0.8, 1.1, 1] }}
      transition={{ duration: 0.5, delay: 0.2 }}
      viewport={{ once: true }}
      style={{
        background: "linear-gradient(45deg, #4f46e5, #7c3aed, #0369a1)",
        backgroundSize: "200% 200%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};

// Cosmic Floating Element
const CosmicFloatingElement = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{
      y: [-15, 15, -15],
      rotateZ: [0, 2, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay,
      ease: "easeInOut",
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Particle Orb
const ParticleOrb = ({ size = 100, color = "indigo", delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-br from-${color}-500/20 to-${color}-400/10 blur-[40px]`}
    style={{ width: size, height: size }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay,
    }}
  />
);

const AboutSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { icon: FaFilm, number: 500, suffix: "+", label: "Projects Completed" },
    { icon: FaAward, number: 50, suffix: "+", label: "Industry Awards" },
    { icon: FaUsers, number: 100, suffix: "+", label: "Creative Experts" },
    {
      icon: FaGlobeAmericas,
      number: 25,
      suffix: "+",
      label: "Countries Served",
    },
  ];

  const values = [
    {
      icon: FaMagic,
      title: "Innovation First",
      description:
        "Pushing boundaries with cutting-edge technology and creative solutions.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: FaRocket,
      title: "Lightning Fast",
      description: "Delivering exceptional quality at unprecedented speeds.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: HiSparkles,
      title: "Pixel Perfect",
      description: "Meticulous attention to detail in every frame we produce.",
      color: "from-cyan-500 to-blue-500",
    },
  ];

  return (
    <section id="about" className="relative py-32 px-4 overflow-hidden">
      {/* Enhanced Cosmic Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Galactic Core */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-600/10 via-purple-600/15 to-blue-600/20 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />

        {/* Floating Particle Orbs */}
        <CosmicFloatingElement delay={0} className="absolute top-20 left-10">
          <ParticleOrb size={120} color="indigo" />
        </CosmicFloatingElement>

        <CosmicFloatingElement
          delay={2}
          className="absolute bottom-32 right-16"
        >
          <ParticleOrb size={80} color="purple" />
        </CosmicFloatingElement>

        <CosmicFloatingElement delay={4} className="absolute top-40 right-1/4">
          <ParticleOrb size={60} color="cyan" />
        </CosmicFloatingElement>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="grid grid-cols-12 gap-6 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-indigo-500 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.02 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>

        {/* Scanning Laser Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/8 to-transparent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-900/50 backdrop-blur-xl border border-indigo-500/30 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-6 h-6 text-indigo-400" />
            </motion.div>
            <span className="text-indigo-300 font-medium tracking-widest text-sm">
              THE NEXORA DIFFERENCE
            </span>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <HiSparkles className="w-6 h-6 text-indigo-400" />
            </motion.div>
          </motion.div>

          <motion.h2
            className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Redefining{" "}
            <span
              style={{
                background: "linear-gradient(45deg, #4f46e5, #7c3aed, #0369a1)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Video
            </span>{" "}
            Excellence
          </motion.h2>

          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-12 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Enhanced Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h3
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              Where{" "}
              <span
                style={{
                  background:
                    "linear-gradient(45deg, #4f46e5, #7c3aed, #0369a1)",
                  backgroundSize: "200% 200%",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Creativity
              </span>{" "}
              Meets <span className="text-purple-400">Technology</span>
            </motion.h3>

            <motion.p
              className="text-xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              At <span className="text-indigo-300 font-semibold">Nexora</span>,
              we're not just video editors—we're visual architects powered by
              next-generation AI and decades of cinematic mastery. We transform
              your vision into immersive visual experiences that captivate and
              convert.
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Our mission is to democratize professional-grade video production,
              making studio-quality content accessible to brands, creators, and
              businesses worldwide. Through innovative technology and artistic
              mastery, we're shaping the future of visual storytelling.
            </motion.p>

            {/* Mission Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl border border-indigo-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
              <p className="text-white text-xl font-medium italic relative z-10">
                "Transforming ideas into immersive visual narratives that
                inspire action and drive measurable results."
              </p>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  borderColor: "rgba(99, 102, 241, 0.5)",
                }}
                className="relative p-6 rounded-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700 text-center group hover:border-indigo-500/50 transition-all duration-500 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-500" />

                <div className="flex justify-center mb-4 relative z-10">
                  <motion.div
                    className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-8 h-8 text-indigo-300" />
                  </motion.div>
                </div>
                <div className="text-4xl font-black mb-2 relative z-10">
                  <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm font-medium relative z-10">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.h3
            className="text-5xl md:text-7xl font-black text-white mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <GlitchText
              text="Our Vision"
              className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            />
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
          >
            To create a world where every brand, creator, and storyteller can
            produce{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent font-semibold">
              cinematic-quality content
            </span>{" "}
            with the power of AI and the touch of human creativity.
          </motion.p>
        </motion.div>

        {/* Enhanced Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{
                y: -12,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl border border-gray-700 h-full transition-all duration-500 group-hover:border-indigo-500/50 overflow-hidden">
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0  bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-cyan-500/10 transition-all duration-500`}
                />

                {/* Floating Icon */}
                <motion.div
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-8 group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 relative z-10"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <value.icon className="w-10 h-10 text-indigo-300" />
                </motion.div>

                <h4 className="text-2xl font-bold text-white mb-4 relative z-10">
                  {value.title}
                </h4>
                <p className="text-gray-400 leading-relaxed relative z-10">
                  {value.description}
                </p>

                {/* Hover Effect Line */}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-500"
                  initial={false}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(79, 70, 229, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-6 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl text-white font-bold text-xl hover:shadow-2xl transition-all group overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <FaPlay className="w-5 h-5" />
              See Our Work in Action
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <HiSparkles className="w-5 h-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
