import { useRef, useState } from "react";
import { motion } from "framer-motion";
import MagneticPhrase from "./MagneticPhrase";

const InkBlob = () => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-center justify-center transition-transform duration-500"
      style={{ willChange: "transform, filter" }}
    >
      {/* FILTRO SVG GOOEY (Sin cambios) */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="12"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* CAPA CON FILTRO LÍQUIDO */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ filter: "url(#goo)" }}
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* MANCHA CENTRAL */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-65 h-65 md:w-85 md:h-85 lg:w-100 lg:h-100 bg-fire rounded-full mix-blend-screen opacity-80"
          animate={{
            scale: [1, 1.1, 0.95, 1],
            rotate: isHovered ? [0, 45] : [0, 360],
            borderRadius: [
              "50% 50% 50% 50%",
              "55% 45% 38% 62%",
              "38% 62% 62% 38%",
              "50% 50% 50% 50%",
            ],
          }}
          transition={{
            duration: isHovered ? 4 : 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* MANCHA EXTERNA ROJA */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-38 h-38 md:w-45 md:h-45 lg:w-45 lg:h-45 bg-fire rounded-full mix-blend-screen opacity-60"
          animate={{
            // Distancias de movimiento mucho más largas para cubrir el nuevo contenedor
            x: [0, 150, -100, 180, 0],
            y: [0, -120, 150, -80, 0],
            scale: [0.8, 1.2, 0.9, 1.1, 0.8],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* MANCHA SECUNDARIA INTERNA (Escalada)[cite: 20] */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 md:w-65 md:h-65 lg:w-65 lg:h-65 bg-glow rounded-full mix-blend-screen opacity-70"
          animate={{
            x: [0, 80, -60, 0],
            y: [-60, 0, 80, -60],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* 2. CONTENEDOR DEL TEXTO POSICIONADO EN LA PARTE SUPERIOR */}
<div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        <MagneticPhrase isHovered={isHovered} text="Bienvenido" />
        <MagneticPhrase isHovered={isHovered} text="a mi" />
        <MagneticPhrase isHovered={isHovered} text="portfolio" />
      </div>
    </div>
  );
};

export default InkBlob;
