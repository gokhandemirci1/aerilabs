"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";

const projects = [
  {
    name: "Project Alpha",
    tech: "Next.js • TypeScript",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    glowColor: "rgba(39, 224, 230, 0.6)",
    size: "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
  },
  {
    name: "Project Beta",
    tech: "React • Python",
    gradient: "from-purple-500 via-pink-500 to-cyan-400",
    glowColor: "rgba(139, 92, 246, 0.6)",
    size: "w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22",
  },
  {
    name: "Project Gamma",
    tech: "Vue.js • Node.js",
    gradient: "from-blue-400 via-cyan-400 to-purple-500",
    glowColor: "rgba(39, 224, 230, 0.5)",
    size: "w-18 h-18 md:w-22 md:h-22 lg:w-26 lg:h-26",
  },
  {
    name: "Project Delta",
    tech: "React Native • GraphQL",
    gradient: "from-purple-600 via-cyan-500 to-blue-400",
    glowColor: "rgba(139, 92, 246, 0.5)",
    size: "w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24",
  },
];

export default function GalaxyOrbit() {
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 1920, 
    height: typeof window !== 'undefined' ? window.innerHeight : 1080 
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate safe orbit radius based on viewport size - memoized for performance
  const orbitConfig = useMemo(() => {
    const planetSize = isMobile ? 72 : 104;
    const padding = 40;
    const maxSafeRadius = (Math.min(windowSize.width, windowSize.height) - planetSize - padding) / 2;
    
    return isMobile
      ? [
          { radius: Math.min(80, maxSafeRadius * 0.5), speed: 30, startAngle: 0 },
          { radius: Math.min(100, maxSafeRadius * 0.65), speed: -22, startAngle: 90 },
          { radius: Math.min(115, maxSafeRadius * 0.8), speed: 18, startAngle: 180 },
          { radius: Math.min(130, maxSafeRadius * 0.95), speed: -15, startAngle: 270 },
        ]
      : [
          { radius: Math.min(120, maxSafeRadius * 0.55), speed: 25, startAngle: 0 },
          { radius: Math.min(150, maxSafeRadius * 0.7), speed: -20, startAngle: 45 },
          { radius: Math.min(170, maxSafeRadius * 0.85), speed: 15, startAngle: 90 },
          { radius: Math.min(190, maxSafeRadius), speed: -12, startAngle: 135 },
        ];
  }, [isMobile, windowSize.width, windowSize.height]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Galaxy spiral particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: isMobile ? 30 : 50 }).map((_, i) => {
          const angle = (i / (isMobile ? 30 : 50)) * Math.PI * 2;
          const maxParticleRadius = Math.min(windowSize.width, windowSize.height) * 0.3;
          const radius = maxParticleRadius * 0.5 + (i % 3) * (maxParticleRadius * 0.2);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const delay = i * 0.1;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-neon-cyan rounded-full opacity-30"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: delay,
              }}
            />
          );
        })}
      </div>

      {/* Orbiting projects */}
      {projects.map((project, index) => {
        const config = orbitConfig[index % orbitConfig.length];
        const angle = (config.startAngle * Math.PI) / 180;
        
        return (
          <motion.div
            key={project.name}
            className="absolute pointer-events-auto group"
            style={{
              left: "50%",
              top: "50%",
              willChange: "transform",
            }}
            animate={{
              x: [
                Math.cos(angle) * config.radius,
                Math.cos(angle + Math.PI) * config.radius,
                Math.cos(angle + Math.PI * 2) * config.radius,
              ],
              y: [
                Math.sin(angle) * config.radius,
                Math.sin(angle + Math.PI) * config.radius,
                Math.sin(angle + Math.PI * 2) * config.radius,
              ],
            }}
            transition={{
              duration: Math.abs(config.speed),
              repeat: Infinity,
              ease: "linear",
            }}
            whileHover={{ scale: 1.15, zIndex: 50 }}
          >
            <div
              className="relative"
              style={{
                willChange: "transform",
              }}
            >
              {/* Trail particles - space themed trail behind planet - reduced for performance */}
              {Array.from({ length: isMobile ? 6 : 10 }).map((_, trailIndex) => {
                // Calculate trail position - behind planet in orbit
                const trailOffset = (trailIndex + 1) * 0.12; // Angular offset behind planet
                const trailAngleOffset = config.speed > 0 ? -trailOffset : trailOffset;
                const trailAngle = angle + trailAngleOffset;
                
                // Trail gets further from planet center as index increases
                const trailRadiusOffset = (trailIndex + 1) * (config.radius * 0.08);
                const trailRadius = config.radius - trailRadiusOffset;
                
                const trailX = Math.cos(trailAngle) * trailRadius;
                const trailY = Math.sin(trailAngle) * trailRadius;
                
                // Fade out as trail gets longer
                const trailOpacity = Math.max(0.1, 0.7 - (trailIndex * 0.04));
                const trailSize = Math.max(1, (isMobile ? 2.5 : 3.5) - (trailIndex * 0.12));
                
                return (
                  <motion.div
                    key={`trail-${index}-${trailIndex}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      width: `${trailSize}px`,
                      height: `${trailSize}px`,
                      left: "50%",
                      top: "50%",
                      x: trailX,
                      y: trailY,
                      background: `radial-gradient(circle, ${project.glowColor.replace(/[\d\.]+\)$/g, `${trailOpacity})`)}, transparent)`,
                      boxShadow: `0 0 ${trailSize * 3}px ${project.glowColor.replace(/[\d\.]+\)$/g, `${trailOpacity * 0.8})`)}`,
                      transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                      opacity: [trailOpacity * 0.6, trailOpacity, trailOpacity * 0.6],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 1.5 + (trailIndex * 0.15),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: trailIndex * 0.08,
                    }}
                  />
                );
              })}
              
              {/* Continuous trail glow line - rotates with planet */}
              <motion.div
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "50%",
                  width: `${config.radius * 0.3}px`,
                  height: "3px",
                  background: `linear-gradient(90deg, transparent 0%, ${project.glowColor} 50%, transparent 100%)`,
                  transformOrigin: "left center",
                  x: config.radius * 0.7,
                  y: 0,
                  filter: `blur(2px)`,
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scaleX: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Planet */}
              <div className={`relative ${project.size} -translate-x-1/2 -translate-y-1/2 group/planet z-10`}>
                {/* Outer glow */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-full blur-xl opacity-40 group-hover/planet:opacity-70 transition-opacity`}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3 + (index * 0.5),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    boxShadow: `0 0 30px ${project.glowColor}`,
                  }}
                />
                
                {/* Middle glow ring */}
                <div 
                  className={`absolute inset-2 md:inset-3 bg-gradient-to-br ${project.gradient} rounded-full blur-lg opacity-30`}
                />
                
                {/* Planet sphere */}
                <div className={`relative w-full h-full rounded-full bg-gradient-to-br ${project.gradient} shadow-2xl overflow-hidden`}>
                  {/* Planet surface pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full blur-sm" />
                    <div className="absolute bottom-1/3 right-1/4 w-1.5 h-1.5 bg-white/20 rounded-full blur-sm" />
                    <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white/40 rounded-full blur-sm" />
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-full" />
                </div>
                
                {/* Hover tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 pointer-events-none z-50 whitespace-nowrap"
                >
                  <div className="bg-void-black/90 backdrop-blur-sm border border-neon-cyan/30 rounded-lg px-3 py-2 shadow-lg">
                    <h3 className="text-xs md:text-sm font-semibold text-gradient mb-1">
                      {project.name}
                    </h3>
                    <p className="text-[10px] md:text-xs text-soft-white/70">
                      {project.tech}
                    </p>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-void-black/90 border-l border-t border-neon-cyan/30 rotate-45" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Orbital rings (visual guides) - hidden on mobile */}
      {!isMobile && orbitConfig.map((config, index) => (
        <motion.div
          key={`ring-${index}`}
          className="absolute border border-white/5 rounded-full pointer-events-none"
          style={{
            width: config.radius * 2,
            height: config.radius * 2,
            left: `calc(50% - ${config.radius}px)`,
            top: `calc(50% - ${config.radius}px)`,
          }}
          animate={{
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        />
      ))}
    </div>
  );
}

