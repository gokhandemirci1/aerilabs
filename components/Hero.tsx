"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import logoImage from "@/app/images/logo.jpg";
import SpaceBackground from "./SpaceBackground";
import GalaxyOrbit from "./GalaxyOrbit";

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
      
      {/* Floating Planets */}
      <div className="planet w-32 h-32 bg-gradient-to-br from-neon-cyan/20 to-electric-purple/20 top-20 right-20" style={{ animationDelay: "0s" }} />
      <div className="planet w-24 h-24 bg-gradient-to-br from-electric-purple/20 to-neon-cyan/20 bottom-32 left-16" style={{ animationDelay: "3s" }} />
      <div className="planet w-16 h-16 bg-gradient-to-br from-neon-cyan/15 to-transparent top-1/3 left-1/4" style={{ animationDelay: "6s" }} />
      
      <GalaxyOrbit />
      
      <div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, type: "spring" }}
          className="mb-8 md:mb-10 lg:mb-12 flex items-center justify-center relative z-20"
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 mx-auto">
            {/* Outer glow effect - responsive */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/30 to-electric-purple/30 rounded-full blur-xl md:blur-2xl animate-pulse" />
            {/* Middle glow ring */}
            <div className="absolute inset-2 md:inset-4 bg-gradient-to-br from-neon-cyan/20 to-electric-purple/20 rounded-full blur-lg md:blur-xl" />
            {/* Logo container with rotation - CSS animation for better performance */}
            <div
              className="relative w-full h-full z-10"
              style={{
                animation: "logoRotate 20s linear infinite",
                willChange: "transform",
              }}
            >
              <Image
                src={logoImage}
                alt="Aeri Labs Logo"
                fill
                className="object-contain rounded-full p-3 sm:p-4 md:p-5 lg:p-6 bg-void-black/50 backdrop-blur-sm border-2 md:border-[3px] lg:border-4 border-neon-cyan/30 shadow-[0_0_40px_rgba(39,224,230,0.5)] md:shadow-[0_0_60px_rgba(39,224,230,0.6)] lg:shadow-[0_0_80px_rgba(39,224,230,0.7)]"
                priority
                sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 256px, 288px"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6"
        >
          <span className="text-gradient drop-shadow-[0_0_30px_rgba(39,224,230,0.5)]">Aeri Labs</span>
        </motion.h1>
        
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




