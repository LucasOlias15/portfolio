import { motion, useMotionValue, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import CascadeText from "./animations/CascadeText";
import InkBlob from "./InkBlob";

const Hero = () => {
  const nameLines = ["Donde la", "estética", "encuentra", "su función."];
  const letterRefs = useRef([]);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex flex-col items-center justify-center relative w-full max-w-7xl mx-auto px-6 md:px-16"
    >
      {/* Partículas de fondo solo en Móvil*/}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-ember/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-6 md:gap-20">
        <div className="flex-1 relative">
          {/* GLOW DETRÁS DE LA FRASE (SOLO MÓVIL) */}

          <motion.div
            className="md:hidden absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(208,0,0,0.15) 0%, transparent 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* FRASE PRINCIPAL */}
          <motion.h1
            className="font-display text-[2em] sm:text-[2.5em] md:text-[3.6em] lg:text-[4.2em] font-bold leading-tight text-ember mb-6 select-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onMouseMove={(e) => {
              if (isMobile) return;
              letterRefs.current.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const letterCenterX = rect.left + rect.width / 2;
                const letterCenterY = rect.top + rect.height / 2;
                const dx = e.clientX - letterCenterX;
                const dy = e.clientY - letterCenterY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 120;

                if (distance < maxDistance) {
                  const strength = 1 - distance / maxDistance;
                  animate(
                    el,
                    {
                      x: -dx * 0.08 * strength,
                      y: -dy * 0.08 * strength,
                      rotate: -dx * 0.02 * strength,
                      scale: 1 + strength * 0.15,
                      textShadow: `0 0 ${10 + strength * 25}px rgba(208,0,0,${0.25 + strength * 0.4})`,
                    },
                    {
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    },
                  );
                } else {
                  animate(
                    el,
                    {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      scale: 1,
                      textShadow: "0 0 0px rgba(0,0,0,0)",
                    },
                    {
                      type: "spring",
                      stiffness: 200,
                      damping: 18,
                    },
                  );
                }
              });
            }}
            onMouseEnter={() => {
              if (!isMobile) setIsNameHovered(true);
            }}
            onMouseLeave={() => {
              if (!isMobile) setIsNameHovered(false);
              letterRefs.current.forEach((el) => {
                if (!el) return;
                animate(
                  el,
                  {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    textShadow: "0 0 0px rgba(0,0,0,0)",
                  },
                  {
                    type: "spring",
                    stiffness: 200,
                    damping: 18,
                  },
                );
              });
            }}
          >
            {nameLines.map((line, lineIndex) => (
              <div key={lineIndex} className="block">
                {line.split("").map((letter, letterIndex) => {
                  const globalIndex =
                    nameLines
                      .slice(0, lineIndex)
                      .reduce((acc, l) => acc + l.length, 0) + letterIndex;

                  return (
                    <motion.span
                      key={`${lineIndex}-${letterIndex}`}
                      ref={(el) => {
                        if (el) letterRefs.current[globalIndex] = el;
                      }}
                      variants={letterVariants}
                      className="inline-block cursor-default"
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </motion.h1>

          {/* LÍNEA DECORATIVA */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: isMobile ? "220px" : isNameHovered ? "380px" : "220px",
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="h-0.5 bg-fire mb-4 origin-left"
          />

          {/* SUBTÍTULO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.6 }}
            className="flex items-center gap-2 mb-4"
          >
            <CascadeText
              text="Diseño & Código"
              className="text-xl md:text-2xl font-light tracking-wide text-red-500/80"
            />
          </motion.div>

          {/* TAGS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="
    flex flex-wrap
    gap-3 md:gap-5
    justify-center md:justify-start
    max-w-sm md:max-w-none
  "
          >
            {["Full-Stack", "React", "Node.js", "UI/UX"].map((tag) => (
              <span
                key={tag}
                className="
        flex justify-center
        w-[calc(50%-0.375rem)]   
        sm:w-auto                
      "
              >
                <CascadeText
                  text={tag}
                  className="
          block w-full sm:w-auto
          text-center
          font-mono text-xs
          text-ash
          border border-ash/30
          px-4 py-2
          tracking-wider
          uppercase
          hover:border-fire/50
          hover:text-ember
          transition-colors duration-300
        "
                />
              </span>
            ))}
          </motion.div>
        </div>

        <div className="hidden md:flex flex-1 justify-center items-center">
          <InkBlob />
        </div>
      </div>
      {/* INDICADOR DE SCROLL */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[11px] tracking-[0.20em] uppercase text-ash/80">
          Desliza para explorar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="w-5 h-5 text-ember/70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
