import { motion } from "framer-motion";
import { useState } from "react";

const ProfilePhoto = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-64 h-64 lg:w-72 lg:h-72"
      style={{ perspective: "800px" }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ============================================ */}
        {/* CARA FRONTAL: FOTO EN ROMBO                  */}
        {/* ============================================ */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Rombo exterior (marco) */}
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            <polygon
              points="100,10 190,100 100,190 10,100"
              stroke="#F48C06"
              strokeWidth="1.5"
              strokeOpacity="0.6"
              fill="none"
            />
            <polygon
              points="100,22 178,100 100,178 22,100"
              stroke="#D00000"
              strokeWidth="1"
              strokeOpacity="0.7"
              fill="none"
            />
          </svg>

          {/* Foto */}
          <div
            className="absolute"
            style={{
              top: "11%",
              left: "11%",
              right: "11%",
              bottom: "11%",
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              overflow: "hidden",
            }}
          >
            <img
              src="/LucasOlíasMorilla.jpg"
              alt="Lucas Olías"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
          </div>

          {/* Brillo */}
          <div className="absolute -inset-2 rounded-full bg-fire/5 blur-xl -z-10" />
        </div>

        {/* ============================================ */}
        {/* CARA TRASERA: CUADRADO CON INFO              */}
        {/* ============================================ */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-2 border border-ember/30 bg-ink-light/80"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="font-display text-xl lg:text-2xl text-ember font-bold tracking-wide">
            Lucas Olías Morilla
          </span>
          
          <div className="h-0.5 w-16 bg-fire" />
          
          <span className="font-mono text-sm text-ash tracking-[0.2em] uppercase text-center">
            Full-Stack Developer
          </span>
          
          <div className="flex flex-col gap-1 mt-2 text-center">
            <span className="font-mono text-xs text-ash/80 tracking-wider ">
              📍 Alcalá de Guadaíra, Sevilla, España.
            </span>
            <span className="font-mono text-xs text-ash/80 tracking-wider ">
              🎓 GS Desarrollo Web
            </span>
            <span className="font-mono text-xs text-ember/60 tracking-wider ">
              ✓ Disponible
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePhoto;