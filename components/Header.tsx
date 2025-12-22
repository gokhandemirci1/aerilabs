"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import logoImage from "@/app/images/logo.jpg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void-black/80 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src={logoImage}
                alt="Aeri Labs Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-gradient hidden sm:block">
              Aeri Labs
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("work")}
              className="text-soft-white/80 hover:text-neon-cyan transition-colors duration-300"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-soft-white/80 hover:text-neon-cyan transition-colors duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("collab")}
              className="text-soft-white/80 hover:text-neon-cyan transition-colors duration-300"
            >
              Collab
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-soft-white/80 hover:text-neon-cyan transition-colors duration-300"
            >
              Contact
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2 bg-signature-gradient text-void-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
            >
              Build with us
            </motion.button>
          </div>
          
          <button
            className="md:hidden text-soft-white/80 hover:text-neon-cyan transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-void-black/95 backdrop-blur-md border-t border-white/10"
          >
            <div className="container mx-auto px-6 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("work")}
                className="block w-full text-left text-soft-white/80 hover:text-neon-cyan transition-colors duration-300 py-2"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-soft-white/80 hover:text-neon-cyan transition-colors duration-300 py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("collab")}
                className="block w-full text-left text-soft-white/80 hover:text-neon-cyan transition-colors duration-300 py-2"
              >
                Collab
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-soft-white/80 hover:text-neon-cyan transition-colors duration-300 py-2"
              >
                Contact
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("contact")}
                className="w-full px-6 py-2 bg-signature-gradient text-void-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300"
              >
                Build with us
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

