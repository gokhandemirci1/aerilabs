"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import logoImage from "@/app/images/logo.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-12 h-12 cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              <Image
                src={logoImage}
                alt="Aeri Labs Logo"
                fill
                className="object-contain rounded-lg"
              />
            </motion.div>
            <p className="text-soft-white/50 text-sm text-center md:text-left">
              © {currentYear} Aeri Labs. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#27E0E6" }}
              whileTap={{ scale: 0.9 }}
              className="text-soft-white/50 hover:text-neon-cyan transition-colors"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#27E0E6" }}
              whileTap={{ scale: 0.9 }}
              className="text-soft-white/50 hover:text-neon-cyan transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}




