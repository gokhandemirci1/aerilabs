"use client";

import { useEffect, useRef, useState } from "react";

export default function Supernova() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExploding, setIsExploding] = useState(false);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
  }>>([]);
  const explosionProgressRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Trigger explosion after a short delay
    const timer = setTimeout(() => {
      setIsExploding(true);
      
      // Create particles when explosion starts
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      particlesRef.current = [];
      for (let i = 0; i < 400; i++) {
        const angle = (Math.PI * 2 * i) / 400 + (Math.random() - 0.5) * 0.5;
        const speed = Math.random() * 10 + 3;
        particlesRef.current.push({
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: Math.random() * 80 + 60,
          size: Math.random() * 5 + 2,
          color: Math.random() > 0.6 
            ? `rgba(39, 224, 230, ${Math.random() * 0.8 + 0.2})`
            : Math.random() > 0.3
            ? `rgba(139, 92, 246, ${Math.random() * 0.8 + 0.2})`
            : `rgba(255, 255, 255, ${Math.random() * 0.6 + 0.4})`,
        });
      }
    }, 1500);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (isExploding && explosionProgressRef.current < 1.5) {
        explosionProgressRef.current += 0.015;

        // Draw expanding shockwave rings
        const ringCount = 6;
        for (let i = 0; i < ringCount; i++) {
          const progress = (explosionProgressRef.current - i * 0.2) * 1.1;
          if (progress > 0 && progress < 1.2) {
            const radius = progress * Math.min(canvas.width, canvas.height) * 0.9;
            const opacity = Math.max(0, (1 - progress) * 0.4);

            // Outer ring
            const gradient = ctx.createRadialGradient(
              centerX, centerY, radius * 0.7,
              centerX, centerY, radius
            );
            gradient.addColorStop(0, `rgba(39, 224, 230, ${opacity * 0.6})`);
            gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.4})`);
            gradient.addColorStop(1, "transparent");

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner bright core for first ring
            if (i === 0 && progress < 0.5) {
              const coreGradient = ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, radius * 0.4
              );
              coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 1})`);
              coreGradient.addColorStop(0.2, `rgba(39, 224, 230, ${opacity * 0.8})`);
              coreGradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.6})`);
              coreGradient.addColorStop(1, "transparent");

              ctx.fillStyle = coreGradient;
              ctx.beginPath();
              ctx.arc(centerX, centerY, radius * 0.6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }

        // Draw and update particles
        particlesRef.current.forEach((particle) => {
          if (particle.life < particle.maxLife) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.985;
            particle.vy *= 0.985;
            particle.life += 1;

            const lifeRatio = particle.life / particle.maxLife;
            const alpha = (1 - lifeRatio) * 0.9;
            const currentSize = particle.size * (1 - lifeRatio * 0.6);

            ctx.globalAlpha = alpha;
            ctx.fillStyle = particle.color.replace(/[\d\.]+\)$/g, `${alpha})`);
            ctx.shadowBlur = 20;
            ctx.shadowColor = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        });

        // Draw central explosion burst
        if (explosionProgressRef.current < 0.4) {
          const burstSize = explosionProgressRef.current * 300;
          const burstOpacity = (1 - explosionProgressRef.current * 2.5) * 1;
          const burstGradient = ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, burstSize
          );
          burstGradient.addColorStop(0, `rgba(255, 255, 255, ${burstOpacity})`);
          burstGradient.addColorStop(0.15, `rgba(39, 224, 230, ${burstOpacity * 0.8})`);
          burstGradient.addColorStop(0.4, `rgba(139, 92, 246, ${burstOpacity * 0.6})`);
          burstGradient.addColorStop(1, "transparent");

          ctx.fillStyle = burstGradient;
          ctx.beginPath();
          ctx.arc(centerX, centerY, burstSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isExploding]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-20"
      style={{ background: "transparent" }}
    />
  );
}

