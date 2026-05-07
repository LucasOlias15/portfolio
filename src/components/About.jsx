import { motion } from "framer-motion";
import { useState } from "react";
import ScrambleOnHover from "./animations/ScrambleOnHover";

const ribbonTexts = [
  "REACT — NODE.JS — PHP — MYSQL — TAILWIND — FRAMER MOTION —",
  "FULL-STACK — FRONTEND — BACKEND — DATABASE — UI/UX —",
  "JAVASCRIPT — JAVA — PYTHON — GIT — FIGMA — RESPONSIVE —",
  "CLEAN CODE — PERFORMANCE — ACCESSIBILITY — SEO —",
  "DESIGN — DEVELOPMENT — CREATIVITY — LOGIC —",
];

const About = () => {
  const [isNameHovered, setIsNameHovered] = useState(false);
  return (
    <section
      id="sobre-mí"
      className="relative min-h-[70vh] overflow-hidden flex items-center px-6 md:px-20 py-20 mb-20"
    >
      {/* ============================================ */}
      {/* FONDO: CINTAS DE TEXTO ANIMADAS              */}
      {/* ============================================ */}
      <div className="absolute inset-0 flex flex-col justify-center gap-6 rotate-6 scale-110 pointer-events-none select-none">
        {ribbonTexts.map((text, index) => (
          <motion.div
            key={index}
            className={`
              whitespace-nowrap font-mono uppercase tracking-[0.3em]
              text-xl md:text-3xl lg:text-4xl font-bold
              py-5
              ${
                index % 2 === 0
                  ? "text-fire/30 border-y border-fire/10" // Rojo visible
                  : "text-ember/25 border-y border-ember/8" // Ámbar visible
              }
            `}
            animate={{
              x: index % 2 === 0 ? ["-25%", "0%"] : ["0%", "-25%"],
            }}
            transition={{
              duration: 20 + index * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {text} {text} {text}
          </motion.div>
        ))}
      </div>

      {/* ============================================ */}
      {/* DEGRADADO MÁS SUAVE                           */}
      {/* ============================================ */}
      <div className="absolute inset-0 bg-linear-to-r from-ink/60 via-ink/30 to-ink/60" />

      {/* ============================================ */}
      {/* CONTENIDO PRINCIPAL                           */}
      {/* ============================================ */}
      <div className="relative z-10 w-full flex justify-end">
        <div className="max-w-4xl text-right">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs md:text-sm text-fire/60 tracking-[0.4em] uppercase block mb-6"
          >
            Sobre mí
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.8 }}
            onMouseEnter={() => setIsNameHovered(true)}
            onMouseLeave={() => {
              setIsNameHovered(false);
            }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-ember mb-8 mix-blend-lighten"
          >
            <ScrambleOnHover text={"Código\nque se siente."} className="" />
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            viewport={{ once: true }}
            animate={{
              width: isNameHovered ? "590px" : "280px",
            }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="h-0.5 bg-fire mb-10 ml-auto"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-xl text-base md:text-lg text-ember-dim leading-relaxed ml-auto"
          >
            Estudiante de Desarrollo de Aplicaciones Web. Construyo experiencias
            digitales donde el diseño, la interacción y una arquitectura sólida
            forman parte del mismo sistema.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;
