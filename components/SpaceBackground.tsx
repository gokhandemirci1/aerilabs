"use client";

import { useEffect, useRef, useState } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const targetMousePosRef = useRef({ x: 0, y: 0 });

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

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      targetMousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create stars - only white and cyan tones
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      speed: number;
      opacity: number;
      baseX: number;
      baseY: number;
      isCyan: boolean;
    }> = [];

    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        baseX: 0,
        baseY: 0,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        isCyan: Math.random() > 0.7, // 30% cyan, 70% white
      });
      stars[i].baseX = stars[i].x;
      stars[i].baseY = stars[i].y;
    }

    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      // Smooth mouse position interpolation
      mousePosRef.current.x += (targetMousePosRef.current.x - mousePosRef.current.x) * 0.05;
      mousePosRef.current.y += (targetMousePosRef.current.y - mousePosRef.current.y) * 0.05;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;

      // Calculate mouse offset from center
      const offsetX = (mouseX - centerX) / centerX;
      const offsetY = (mouseY - centerY) / centerY;

      // Draw stars with parallax effect
      stars.forEach((star) => {
        star.opacity = 0.3 + Math.sin(time + star.x * 0.01) * 0.3;
        
        // Calculate star trail based on mouse position
        const parallaxStrength = 0.3; // How much stars move
        const trailLength = 15; // Length of star trail
        
        // Base position
        const baseX = star.baseX;
        const baseY = star.baseY;
        
        // Offset based on mouse position (parallax)
        const parallaxX = offsetX * parallaxStrength * (star.radius * 10);
        const parallaxY = offsetY * parallaxStrength * (star.radius * 10);
        
        // Current star position
        const starX = baseX + parallaxX;
        const starY = baseY + parallaxY;
        
        // Calculate trail direction (opposite to mouse movement)
        const trailDirX = -offsetX;
        const trailDirY = -offsetY;
        const trailMagnitude = Math.sqrt(trailDirX * trailDirX + trailDirY * trailDirY);
        const normalizedTrailX = trailMagnitude > 0 ? trailDirX / trailMagnitude : 0;
        const normalizedTrailY = trailMagnitude > 0 ? trailDirY / trailMagnitude : 0;
        
        // Draw star trail
        const trailSteps = 8;
        for (let i = 0; i < trailSteps; i++) {
          const trailProgress = i / trailSteps;
          const trailX = starX + normalizedTrailX * trailLength * trailProgress * Math.abs(offsetX + offsetY);
          const trailY = starY + normalizedTrailY * trailLength * trailProgress * Math.abs(offsetX + offsetY);
          const trailOpacity = star.opacity * (1 - trailProgress) * 0.5;
          const trailRadius = star.radius * (1 - trailProgress * 0.5);
          
          ctx.beginPath();
          ctx.arc(trailX, trailY, trailRadius, 0, Math.PI * 2);
          const trailColor = star.isCyan 
            ? `rgba(39, 224, 230, ${trailOpacity})`
            : `rgba(255, 255, 255, ${trailOpacity})`;
          ctx.fillStyle = trailColor;
          ctx.fill();
        }
        
        // Draw main star
        ctx.beginPath();
        ctx.arc(starX, starY, star.radius, 0, Math.PI * 2);
        const starColor = star.isCyan 
          ? `rgba(39, 224, 230, ${star.opacity})`
          : `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillStyle = starColor;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = starColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw nebula clouds
      const nebulaCount = 3;
      for (let i = 0; i < nebulaCount; i++) {
        const x = (canvas.width / nebulaCount) * i + canvas.width / (nebulaCount * 2);
        const y = canvas.height * (0.3 + i * 0.2);
        const size = 300 + Math.sin(time + i) * 50;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        if (i === 0) {
          gradient.addColorStop(0, "rgba(39, 224, 230, 0.1)");
          gradient.addColorStop(0.5, "rgba(39, 224, 230, 0.05)");
          gradient.addColorStop(1, "transparent");
        } else if (i === 1) {
          gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)");
          gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)");
          gradient.addColorStop(1, "transparent");
        } else {
          gradient.addColorStop(0, "rgba(39, 224, 230, 0.08)");
          gradient.addColorStop(0.5, "rgba(139, 92, 246, 0.05)");
          gradient.addColorStop(1, "transparent");
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}



