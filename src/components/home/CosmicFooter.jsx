import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa";
import { HiSparkles, HiMail } from "react-icons/hi";

// ===== Back to Top Button =====
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-br from-[#0084FF] to-[#0066CC] rounded-xl text-white shadow-2xl backdrop-blur-sm border border-[#0084FF]/30"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaArrowUp className="w-4 h-4" />
    </motion.button>
  );
};

// ===== Simplified Cosmic Footer =====
export default function CosmicFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const socials = [
    { icon: FaTwitter, href: "#", color: "#1DA1F2", label: "Twitter" },
    { icon: FaLinkedin, href: "#", color: "#0077B5", label: "LinkedIn" },
    { icon: FaInstagram, href: "#", color: "#E4405F", label: "Instagram" },
    { icon: FaGithub, href: "#", color: "#333", label: "GitHub" },
  ];

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#" },
    { name: "Work", href: "#" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setEmail("");
      // Add your subscription logic here
    }
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/30">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-black" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0084FF]/50 to-transparent" />

        {/* Floating Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0084FF]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 50}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-br from-[#0084FF] to-[#0066CC] rounded-xl flex items-center justify-center"
              >
                <FaRocket className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="text-xl font-black text-white">COSMIC</h3>
                <p className="text-[#0084FF] text-sm">STUDIO</p>
              </div>
            </motion.div>

            <p className="text-gray-400 text-sm">
              Next-generation video editing and creative solutions for the
              digital universe.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300"
                >
                  <social.icon
                    className="w-4 h-4"
                    style={{ color: social.color }}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold flex items-center gap-2">
              <HiSparkles className="w-4 h-4 text-[#0084FF]" />
              Explore
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="text-gray-400 hover:text-[#0084FF] text-sm transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <h4 className="text-white font-semibold flex items-center gap-2">
              <HiMail className="w-4 h-4 text-[#0084FF]" />
              Stay Updated
            </h4>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 outline-none focus:border-[#0084FF] transition-all duration-300"
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#0084FF] to-[#0066CC] rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaRocket className="w-4 h-4" />
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-4">
              <span>© {currentYear} Cosmic Studio</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#0084FF] transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-[#0084FF] transition-colors">
                  Terms
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />

      {/* Floating Accents */}
      <motion.div
        className="absolute bottom-1/4 left-10 w-2 h-2 bg-[#0084FF]/40 rounded-full blur-sm"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />
      <motion.div
        className="absolute top-1/3 right-20 w-1 h-1 bg-[#0066CC]/30 rounded-full blur-sm"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
        }}
      />
    </footer>
  );
}
