"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Sparkles, Satellite } from "lucide-react";

const services = [
  {
    title: "Product Development",
    description: "From concept to launch, we build products that users love and businesses scale with.",
    icon: Rocket,
  },
  {
    title: "AI & Automation",
    description: "Leverage cutting-edge AI to automate workflows and unlock new capabilities.",
    icon: Sparkles,
  },
  {
    title: "Custom Software",
    description: "Tailored solutions that fit your unique business needs and technical requirements.",
    icon: Satellite,
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={ref}
      className="py-32 px-6 relative overflow-hidden"
    >
      {/* Space background elements */}
      <div className="nebula w-96 h-96 bg-neon-cyan/10 -top-48 -right-48" style={{ animationDelay: "0s" }} />
      <div className="nebula w-80 h-80 bg-electric-purple/10 -bottom-40 -left-40" style={{ animationDelay: "5s" }} />
      
      <div className="container mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Our Services</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center p-8 rounded-lg border border-white/5 hover:border-neon-cyan/30 hover:bg-white/5 transition-all duration-300 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 to-electric-purple/0 group-hover:from-neon-cyan/10 group-hover:to-electric-purple/10 rounded-lg transition-all duration-300" />
                <div className="relative z-10">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-neon-cyan/20 to-electric-purple/20 border border-neon-cyan/30"
                  >
                    <Icon className="w-8 h-8 text-neon-cyan" />
                  </motion.div>
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 relative inline-block group-hover:text-gradient transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-soft-white/60 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

