import { motion } from "framer-motion";
import { useMemo } from "react";

const MagneticPhrase = ({ isHovered, text }) => {
  const phrase = text || "Bienvenido a mi portfolio";
  const letters = phrase.split("");

  const floatingPositions = useMemo(() => {
    return letters.map((_, i) => ({
      x: Math.sin(i * 0.7) * 50 + (Math.random() - 0.5) * 40,
      y: Math.cos(i * 0.7) * 50 + (Math.random() - 0.5) * 40,
      rotate: Math.random() * 40 - 20,
    }));
  }, [phrase]);

  const letterVariants = {
    floating: (i) => ({
      x: floatingPositions[i].x,
      y: floatingPositions[i].y,
      rotate: floatingPositions[i].rotate,
      opacity: 0.7,
      scale: 0.9,
      filter: "blur(1.5px)",
      transition: {
        duration: 3 + (i % 3) * 0.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    }),
    ordered: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 18,
      },
    },
  };

  return (
    <div className="flex flex-wrap justify-center max-w-[200px] md:max-w-xs px-2 pointer-events-none">
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          animate={isHovered ? "ordered" : "floating"}
          className={`inline-block font-display text-lg md:text-xl lg:text-2xl font-bold tracking-tight ${
            char === " " ? "mr-2 md:mr-3" : ""
          }`}
          style={{
            color: isHovered ? "#FFBA08" : "#F48C06",
            textShadow: isHovered
              ? "0 0 10px rgba(244, 140, 6, 0.4)"
              : "0 0 4px rgba(208, 0, 0, 0.3)",
            transition: "color 0.3s ease, textShadow 0.3s ease",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default MagneticPhrase;