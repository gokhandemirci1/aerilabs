"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "KISIR App",
    description: "KISIR is a women-only social app that helps women meet nearby, connect naturally, and build real-life friendships. From chat to real gatherings.",
  },
  {
    name: "IW Project",
    description: "IW is a unified real estate ecosystem that connects buyers, developers, and advisors on a smart, data-driven platform, simplifying property discovery, investment decisions, and transaction management worldwide.",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="work"
      ref={ref}
      className="py-32 px-6 bg-deep-space-blue relative overflow-hidden"
    >
      {/* Space elements */}
      <div className="nebula w-[500px] h-[500px] bg-neon-cyan/5 top-0 right-0" style={{ animationDelay: "1s" }} />
      <div className="nebula w-[400px] h-[400px] bg-electric-purple/5 bottom-0 left-0" style={{ animationDelay: "3s" }} />
      
      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Mission Portfolio</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative p-8 border border-white/5 rounded-lg hover:border-neon-cyan/30 hover:shadow-lg hover:shadow-neon-cyan/10 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl md:text-3xl font-semibold text-gradient">
                  {project.name}
                </h3>
                <ExternalLink className="w-5 h-5 text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-soft-white/70 text-lg">
                {project.description}
              </p>
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-electric-purple/0 group-hover:from-neon-cyan/5 group-hover:to-electric-purple/5 rounded-lg transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}




