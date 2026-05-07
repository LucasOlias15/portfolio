import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Sobre mí", href: "sobre-mí" },
  { name: "Stack", href: "stack" },
  { name: "Tecnologías", href: "tecnologiasSecundarias" },
  { name: "Proyectos", href: "proyectos" },
  { name: "Contacto", href: "contacto" },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (href) => {
    setIsOpen(false);
    const element = document.getElementById(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* BARRA SUPERIOR FIJA */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-ink/90 backdrop-blur-lg border-b border-ember/5">
        <div className="flex items-center justify-between px-5 py-4">
          {/* Logo */}
          <img src="/LogoLO.svg" alt="Lucas Olías" className="h-10 w-10" />

          {/* Botón hamburguesa */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-glow hover:text-ember transition-colors"
            aria-label="Menú"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-glow origin-left"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-fire"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-ember origin-left"
              />
            </div>
          </button>
        </div>
      </div>

      {/* PANEL DESPLEGABLE - PANTALLA COMPLETA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed top-[73px] left-0 right-0 bottom-0 z-40 bg-ink/98 backdrop-blur-lg flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleClick(link.href)}
                  className="font-mono text-lg tracking-[0.3em] uppercase text-ash hover:text-ember transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href="/cv-lucas-olias.pdf"
                download
                className="font-mono text-sm tracking-[0.3em] uppercase text-ember border border-ember/40 px-6 py-3 mt-4"
              >
                Descargar CV
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNav;