import { useRef } from "react";
import { motion } from "framer-motion";

const chars = "!@#$%&*?/\\";

const ScrambleOnHover = ({ text, className = "" }) => {
  const letterRefs = useRef([]);
  const lastUpdate = useRef(0);
  const timeouts = useRef([]);

  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastUpdate.current < 60) return; // 60ms entre barridos
    lastUpdate.current = now;

    letterRefs.current.forEach((el) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const letterCenterX = rect.left + rect.width / 2;
      const letterCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - letterCenterX;
      const dy = e.clientY - letterCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 60;

      if (distance < maxDistance && Math.random() < 0.4) {
        // Limpiar timeout anterior de esta letra
        if (el.dataset.timeoutId) {
          clearTimeout(parseInt(el.dataset.timeoutId));
        }

        // Cambiar a símbolo aleatorio
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        el.textContent = randomChar;

        // Programar restauración suave (200ms después)
        const timeoutId = setTimeout(() => {
          el.textContent =
            el.dataset.original === " " ? "\u00A0" : el.dataset.original;
        }, 200);

        el.dataset.timeoutId = timeoutId;
      }
    });
  };

  const handleMouseLeave = () => {
    letterRefs.current.forEach((el) => {
      if (!el) return;
      if (el.dataset.timeoutId) {
        clearTimeout(parseInt(el.dataset.timeoutId));
      }
      el.textContent =
        el.dataset.original === " " ? "\u00A0" : el.dataset.original;
    });
  };

  const lines = text.split("\n");

  return (
    <motion.span
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {lines.map((line, lineIndex) => (
<span key={lineIndex} className="block whitespace-nowrap">
          {line.split("").map((char, charIndex) => {
            const globalIndex =
              lines.slice(0, lineIndex).reduce((acc, l) => acc + l.length, 0) +
              charIndex;

            return (
              <span
                key={charIndex}
                ref={(el) => {
                  if (el) {
                    letterRefs.current[globalIndex] = el;
                    // Guardar el carácter original tal cual (espacio normal)
                    el.dataset.original = char;
                  }
                }}
className="inline-block transition-all duration-150 whitespace-nowrap"
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
};

export default ScrambleOnHover;
