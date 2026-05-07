import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Sobre mí", href: "sobre-mí" },
  { name: "Stack", href: "stack" },
  { name: "Proyectos", href: "proyectos" },
  { name: "Contacto", href: "contacto" },
];

const NavSection = () => {
  const [hovered, setHovered] = useState(null);

  const handleClick = (href) => {
    const element = document.getElementById(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

return (
  <>
    {/* LÍNEA SUPERIOR SUTIL */}
    <div className="hidden md:block w-full h-px bg-gradient-to-r from-transparent via-ember/10 to-transparent" />

    {/* CONTENEDOR STICKY*/}
    <div className="hidden md:block sticky top-0 z-50 backdrop-blur-xl bg-ink/75 border-y border-white/5">
      <div className="max-w-[1700px] mx-auto px-8 md:px-16 py-5 flex justify-center items-center gap-12 md:gap-16 lg:gap-20">
        {navLinks.map((link, index) => {
          const isActive = hovered === index;
          return (
              <motion.button
                key={link.name}
                onClick={() => handleClick(link.href)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* DOBLE FONDO / SHADOW PLATE */}
                <motion.div
                  animate={{
                    x: isActive ? 6 : 3,
                    y: isActive ? 6 : 3,
                    opacity: isActive ? 1 : 0.35,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                    background: "rgba(244,140,6,0.12)",
                    border: "1px solid rgba(244,140,6,0.2)",
                  }}
                />

                {/* HEXAGONO PRINCIPAL */}
                <motion.div
                  animate={{
                    borderColor: isActive
                      ? "rgba(255,186,8,0.7)"
                      : "rgba(244,140,6,0.35)",
                    backgroundColor: isActive
                      ? "rgba(255,186,8,0.25)"
                      : "rgba(244,140,6,0.18)",
                  }}
                  transition={{ duration: 0.25 }}
                  className="relative px-12 md:px-16 py-1 cursor-pointer"
                  style={{
                    clipPath:
                      "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                    border: "1px solid rgba(244,140,6,0.35)",
                    minWidth: "150px",
                  }}
                >
                  {/* BRILLO INTERNO */}
                  <div
                    className="absolute inset-px opacity-20 pointer-events-none"
                    style={{
                      clipPath:
                        "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                      background:
                        "linear-gradient(135deg, rgba(255,186,8,0.08), rgba(208,0,0,0.04))",
                    }}
                  />

                  <span className="relative font-mono uppercase tracking-[0.28em] text-xs md:text-sm text-ember group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* LINEA INFERIOR SUTIL */}
      <div className="w-full h-px bg-linear-to-r from-transparent via-ember/10 to-transparent" />
      </>
  );
};

export default NavSection;