import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiPhp,
  SiXml,
  SiJavascript,
  SiOpenjdk,
  SiHtml5,
  SiCss
} from "react-icons/si";

// =============================================
// DATOS DE LAS TARJETAS
// Cada tecnología con su color de marca real
// =============================================
const techCards = [
  {
    name: "REACT",
    category: "Frontend Library",
    accent: "#61DAFB",
    icon: SiReact,
  },
  {
    name: "NODE.JS",
    category: "Backend Runtime",
    accent: "#339933",
    icon: SiNodedotjs,
  },
  {
    name: "MYSQL",
    category: "Database Engine",
    accent: "#4479A1",
    icon: SiMysql,
  },
  { name: "PHP", category: "Server Logic", accent: "#777BB4", icon: SiPhp },
  {
    name: "XML",
    category: "Data Format",
    accent: "#0060A8",
    icon: SiXml,
  },
  {
    name: "JAVASCRIPT",
    category: "Core Language",
    accent: "#F7DF1E",
    icon: SiJavascript,
  },
  {
    name: "JAVA",
    category: "Application Logic",
    accent: "#ED8B00",
    icon: SiOpenjdk,
  },
  { name: "HTML", category: "Markup Language", accent: "#F05032", icon: SiHtml5 },
  { name: "CSS", category: "Styling Language", accent: "#1572B6", icon: SiCss },
];

const IntroCard = ({ scrollYProgress }) => {
  const localProgress = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  const opacity = useTransform(
    localProgress,
    [0, 0.15, 0.85, 1],
    [1, 1, 1, 0]
  );

  const scale = useTransform(
    localProgress,
    [0, 1],
    [1, 0.92]
  );

  const y = useTransform(
    localProgress,
    [0, 1],
    [0, -80]
  );

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
      }}
      className="absolute flex items-center justify-center"
    >
      <div className="text-center max-w-2xl px-6">
        <span className="font-mono text-xs md:text-sm uppercase tracking-[0.45em] text-fire/50 block mb-6">
          tech - Stack
        </span>

        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-ember mb-8">
          Tecnologías que impulsan
          <br />
          <span className="text-ember-dim">mi desarrollo.</span>
        </h2>

        <p className="text-ash text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            Las tecnologías aparecen dinámicamente al hacer scroll.
        </p>

        <div className="h-[1px] w-[180px] bg-fire/50 mx-auto mt-10" />
      </div>
    </motion.div>
  );
};

// =============================================
// COMPONENTE DE CADA TARJETA
// =============================================
const TechCard = ({ tech, index, total, scrollYProgress }) => {
  const introOffset = 0.12;

  const segment = (1 - introOffset) / total;

  const start = introOffset + index * segment;
  const isLast = index === total - 1;
  const end = isLast ? 1 : start + segment;

  const localProgress = useTransform(scrollYProgress, [start, end], [0, 1]);

  const opacity = useTransform(
    localProgress,
    isLast ? [0, 0.15, 1] : [0, 0.15, 0.85, 1],
    isLast ? [0, 1, 1] : [0, 1, 1, 0],
  );

  const scale = useTransform(localProgress, [0, 0.5, 1], [0.75, 1, 0.75]);

  const isLeft = index % 2 === 0;
  const x = useTransform(
    localProgress,
    isLast ? [0, 0.5, 0.85, 1] : [0, 0.5, 1],
    isLast
      ? [isLeft ? -120 : 120, 0, 0, 0]
      : [isLeft ? -120 : 120, 0, isLeft ? 120 : -120],
  );

  const y = useTransform(
    localProgress,
    isLast ? [0, 0.5, 0.85, 1] : [0, 0.5, 1],
    isLast ? [40, 0, 0, 0] : [40, 0, -40],
  );

  const blur = useTransform(
    localProgress,
    isLast ? [0, 0.2, 1] : [0, 0.2, 0.8, 1],
    isLast ? [6, 0, 0] : [6, 0, 0, 6],
  );
  const filterBlur = useTransform(blur, (b) => `blur(${b}px)`);

  const Icon = tech.icon;

  return (
    <motion.div
      style={{
        opacity,
        scale,
        x,
        y,
        filter: filterBlur,
      }}
      className="absolute flex items-center justify-center"
    >
      <div
        className="relative w-[280px] h-[340px] md:w-[380px] md:h-[440px] border overflow-hidden flex flex-col justify-between p-8 md:p-10"
        style={{
          borderColor: `${tech.accent}60`,
          background: "rgba(3,7,30,0.85)",
          boxShadow: `0 0 50px ${tech.accent}12`,
        }}
      >
        <span
          className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase"
          style={{ color: tech.accent }}
        >
          Technology Module
        </span>

        <div className="flex flex-col items-center justify-center gap-5">
          <Icon size={72} color={tech.accent} />
          <h2
            className="font-display text-3xl md:text-5xl leading-none text-center"
            style={{ color: tech.accent }}
          >
            {tech.name}
          </h2>
          <div
            className="h-0.5 w-16"
            style={{ backgroundColor: tech.accent }}
          />
          <p className="font-mono uppercase tracking-[0.3em] text-ash text-[10px] md:text-xs text-center">
            {tech.category}
          </p>
        </div>

        <div className="flex justify-between text-[10px] md:text-xs font-mono text-ash/60 tracking-[0.25em] uppercase">
          <span>Stack</span>
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div
          className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: `${tech.accent}12` }}
        />
      </div>
    </motion.div>
  );
};

// =============================================
// SECCIÓN PRINCIPAL: TECH STACK
// =============================================
const TechStack = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative bg-ink"
      style={{ height: "400vh" }}
    >
      {/* ============================================ */}
      {/* STICKY CON LAS TARJETAS                       */}
      {/* ============================================ */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Grid decorativa de fondo */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:80px_80px]" />

        <IntroCard scrollYProgress={scrollYProgress} />
        {/* Tarjetas animadas */}
        <div className="relative w-full h-full flex items-center justify-center">
          {techCards.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              total={techCards.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Barra de progreso inferior */}
        <div className="absolute bottom-10 left-6 md:left-20 right-6 md:right-20 h-[2px] bg-fire/10">
          <motion.div
            className="h-full bg-fire"
            style={{
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TechStack;
