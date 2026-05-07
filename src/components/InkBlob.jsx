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
      // 1. EL CONTENEDOR ES GIGANTE: Pasamos de w-72 a medidas colosales para ocupar la zona derecha
      className="relative max-w-60 h-70 md:w-150 md:h-150 lg:w-200 lg:h-200 flex items-center justify-center transition-transform duration-500 xl:scale-125"
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-55 h-55 md:w-75 md:h-75 lg:w-85 lg:h-85 bg-fire rounded-full mix-blend-screen opacity-80"
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-34 h-34 md:w-40 md:h-40 lg:w-40 lg:h-40 bg-fire rounded-full mix-blend-screen opacity-60"
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-45 h-45 md:w-60 md:h-60 lg:w-60 lg:h-60 bg-glow rounded-full mix-blend-screen opacity-70"
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
<div className="absolute md:top-[40%] left-25 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <MagneticPhrase isHovered={isHovered} text="Bienvenido" />
        <MagneticPhrase isHovered={isHovered} text="a mi" />
        <MagneticPhrase isHovered={isHovered} text="portfolio" />
      </div>

     
    </div>
  );
};

export default InkBlob;
