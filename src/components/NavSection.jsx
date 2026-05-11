import { useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Sobre mí", href: "sobre-mí" },
  { name: "Stack", href: "stack" },
  { name: "Other Skills", href: "tecnologiasSecundarias" },
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
      {/* NAV STICKY */}
      <div className="hidden md:block sticky top-0 z-50">
        {/* Línea superior */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-ember/40 to-transparent" />

        <div className="relative bg-ink">
          {/* Glow interior */}
          <div className="absolute inset-0 pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-8 py-5 flex justify-center items-center gap-20">
            {navLinks.map((link, index) => {
              const isActive = hovered === index;

              return (
                <motion.button
                  key={link.name}
                  onClick={() => handleClick(link.href)}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group"
                >
                  {/* SOMBRA */}
                  <div
                    className={`
                absolute inset-0 rounded-[14px]
                transition-all duration-500
                translate-y-1
                ${isActive ? "bg-fire/30 blur-md" : "bg-transparent"}
              `}
                  />

                  {/* BOTÓN */}
                  <div
                    className={`
                relative overflow-hidden
                px-7 py-3.5
                rounded-[14px]
                border
                transition-all duration-500
                backdrop-blur-xl
                cursor-pointer
                ${
                  isActive
                    ? "border-fire/40 bg-fire/8"
                    : "border-ember/30 bg-ember/4"
                }
              `}
                  >
                    {/* Línea lateral */}
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-fire"
                      initial={{ scaleY: 0 }}
                      animate={{
                        scaleY: isActive ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: [0.19, 1, 0.22, 1],
                      }}
                      style={{
                        originY: 0,
                      }}
                    />

                    {/* Glow */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,186,8,0.08), transparent 75%)",
                      }}
                    />

                    {/* Texto */}
                    <div className="relative flex items-center gap-4 whitespace-nowrap">
                      <span
                        className={`
                    font-mono text-xs uppercase
                    tracking-wider
                    transition-all duration-500
                    ${isActive ? "text-ember" : "text-glow/50"}
                  `}
                      >
                        {link.name}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Línea inferior */}
        <div className="w-full h-px bg-linear-to-r from-transparent via-ember/40 to-transparent" />
      </div>
    </>
  );
};

export default NavSection;
