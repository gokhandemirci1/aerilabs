"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import logoImage from "@/app/images/logo.jpg";
import SpaceBackground from "./SpaceBackground";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <SpaceBackground />
      
      {/* Ambient Glow Background - Nebula Effects */}
      <div className="ambient-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="ambient-glow top-1/4 right-1/4 opacity-50" style={{ animationDelay: "2s" }} />
      <div className="ambient-glow bottom-1/4 left-1/4 opacity-40" style={{ animationDelay: "4s" }} />
      
      <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="mb-8 md:mb-10 lg:mb-12 flex items-center justify-center relative z-20"
        >
          <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-64 xl:h-64 mx-auto">
            {/* Subtle glow effect - more professional */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-electric-purple/10 blur-2xl md:blur-3xl animate-pulse" />
            
            {/* Logo container */}
            <div
              className="relative w-full h-full z-10 rounded-full overflow-hidden"
            >
              <Image
                src={logoImage}
                alt="Aeri Labs Logo"
                fill
                className="object-cover rounded-full drop-shadow-[0_0_30px_rgba(39,224,230,0.3)] md:drop-shadow-[0_0_40px_rgba(39,224,230,0.4)]"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 176px, (max-width: 1024px) 208px, (max-width: 1280px) 240px, 256px"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-soft-white/70 mb-12 max-w-2xl mx-auto"
        >
          Exploring the digital universe with experimental products & scalable software solutions.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection("contact")}
          className="group px-8 py-4 bg-signature-gradient text-void-black font-semibold rounded-full hover:shadow-lg hover:shadow-neon-cyan/50 transition-all duration-300 flex items-center gap-2 mx-auto relative overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Launch Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </motion.button>
      </div>
    </section>
  );
}




