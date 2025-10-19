import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRocket,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserAstronaut,
  FaVideo,
  FaMagic,
  FaStar,
} from "react-icons/fa";
import { HiSparkles, HiCursorClick } from "react-icons/hi";

// ===== Floating Particles for Navbar =====
const NavbarParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#0084FF]/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

// ===== Mobile Menu Component =====
const MobileMenu = ({ isOpen, onClose, navigation }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black border-l border-[#0084FF]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-8 h-8 bg-gradient-to-br from-[#0084FF] to-[#0066CC] rounded-lg flex items-center justify-center"
                >
                  <FaRocket className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-white font-bold text-lg">COSMIC</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 text-white hover:bg-[#0084FF]/30 transition-all duration-300 group"
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 text-[#0084FF] group-hover:text-[#66B5FF]" />
                  <span className="font-medium">{item.name}</span>
                  <HiSparkles className="w-4 h-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                </motion.a>
              ))}
            </nav>

            {/* CTA Section */}
            <div className="absolute bottom-6 left-6 right-6">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="w-full py-3 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaRocket className="w-4 h-4" />
                Launch Project
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ===== Main Navbar Component =====
export default function CosmicNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navigation = [
    { name: "Home", href: "#", icon: FaRocket },
    { name: "Services", href: "#services", icon: FaVideo },
    { name: "Work", href: "#work", icon: FaStar },
    { name: "About", href: "#about", icon: FaUserAstronaut },
    { name: "Contact", href: "#contact", icon: FaMagic },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-[#0084FF]/20"
            : "bg-transparent"
        }`}
      >
        {/* Background Effects */}
        <NavbarParticles />

        {/* Top Gradient Bar */}
        <div className="h-1 bg-gradient-to-r from-[#0084FF] via-[#0066CC] to-[#66B5FF]" />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-br from-[#0084FF] to-[#0066CC] rounded-xl flex items-center justify-center relative"
              >
                <FaRocket className="w-5 h-5 text-white" />
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-[#0084FF]/30 blur-sm"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-white">COSMIC</h1>
                <p className="text-[#0084FF] text-xs -mt-1">STUDIO</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    activeLink === item.name
                      ? "text-white bg-[#0084FF]/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/30"
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveLink(item.name)}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </span>

                  {/* Active Indicator */}
                  {activeLink === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#0084FF] rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-[#0084FF]/30 opacity-0 group-hover:opacity-100"
                    initial={false}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <motion.button
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/30 text-gray-300 hover:text-white hover:bg-gray-700/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSearch className="w-4 h-4" />
                <span className="text-sm">Search...</span>
              </motion.button>

              {/* CTA Button */}
              <motion.button
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-xl text-white font-semibold text-sm hover:shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(0, 132, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRocket className="w-4 h-4" />
                <span>Launch Project</span>
                <HiCursorClick className="w-4 h-4" />
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden p-2 rounded-xl bg-gray-800/30 text-gray-300 hover:text-white hover:bg-gray-700/30 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <FaBars className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scrolling Progress Bar */}
        <motion.div
          className="h-0.5 bg-gradient-to-r from-[#0084FF] to-[#0066CC]"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isScrolled
              ? window.scrollY /
                (document.body.scrollHeight - window.innerHeight)
              : 0,
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
