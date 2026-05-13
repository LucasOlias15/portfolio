import { motion } from "framer-motion";
import { useState } from "react";
import { FiSmartphone, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import CodeField from "./CodeField";

const Contact = () => {
  const [showPhone, setShowPhone] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí irá la lógica de envío (FormSubmit, EmailJS, etc.)
  };

  return (
    <section
      id="contacto"
      className="relative bg-ink py-20 md:py-32 border-t border-ember/5 overflow-hidden"
    >
      {/* ── FONDO: partículas — sin blur, sin pointer-events sobre el form ── */}
      <div className="absolute inset-0 z-0">
        <CodeField />
      </div>

      {/* ── OVERLAY: solo oscurece, sin backdrop-blur para no matar las partículas ── */}
      <div className="absolute inset-0 z-1 bg-ink/55" />

      {/* ── CONTENIDO ── */}
      <div className="relative z-10 max-w-xl mx-auto px-6">
        {/* ETIQUETA */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs md:text-sm text-fire/80 tracking-[0.4em] uppercase block mb-12 text-center"
        >
          Contacto
        </motion.span>

        {/* CARD glassmorphism que hace flotar el form sobre las partículas */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl px-8 py-10"
          style={{
            background: "rgba(10, 10, 46, 0.55)",
            border: "1px solid rgba(255, 186, 8, 0.08)",
            boxShadow:
              "0 0 60px rgba(255,186,8,0.04), 0 24px 64px rgba(0,0,0,0.4)",
            // El form captura eventos; el canvas queda libre alrededor
            pointerEvents: "auto",
          }}
        >
          {/* TÍTULO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display text-4xl md:text-6xl text-ember mb-3 text-center"
          >
            ¿Hablamos?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-ash text-base md:text-lg mb-10 text-center"
          >
            Cuéntame tu proyecto, idea o simplemente saluda.
          </motion.p>

          {/* FORMULARIO */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5 mb-10"
          >
            <input
              type="text"
              name="name"
              placeholder="Tu nombre"
              required
              className="w-full bg-white/4 border border-ember/15 rounded-lg px-4 py-3 font-body text-ember placeholder:text-ash/40 focus:outline-none focus:border-ember/50 focus:bg-white/[0.07] transition-all duration-300"
            />
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              required
              className="w-full bg-white/4 border border-ember/15 rounded-lg px-4 py-3 font-body text-ember placeholder:text-ash/40 focus:outline-none focus:border-ember/50 focus:bg-white/[0.07] transition-all duration-300"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="¿En qué estás pensando?"
              required
              className="w-full bg-white/4 border border-ember/15 rounded-lg px-4 py-3 font-body text-ember placeholder:text-ash/40 focus:outline-none focus:border-ember/50 focus:bg-white/[0.07] transition-all duration-300 resize-none"
            />
            <div className="pt-1 text-center">
              <button
                type="submit"
                className="px-8 py-3 font-mono text-sm uppercase tracking-[0.2em] text-ember border border-ember/30 bg-ember/10 hover:bg-ember/25 hover:border-ember/50 transition-all duration-300 rounded-lg"
              >
                Enviar mensaje
              </button>
            </div>
          </motion.form>

          {/* EMAIL DIRECTO + REDES */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            {/* Separador */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-ash/40" />
              <p className="font-mono text-xs text-ash/60 tracking-wider uppercase whitespace-nowrap">
                También puedes escribirme
              </p>
              <div className="flex-1 h-px bg-ash/40" />
            </div>

            <a
              href="mailto:lucasolias15@gmail.com"
              className="font-mono text-sm text-ember/55 hover:text-ember transition-colors duration-300 block mb-8"
            >
              lucasolias15@gmail.com
            </a>

            {/* DESCARGAR CV */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-ash/40" />
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-mono text-xs text-ash/60 tracking-wider uppercase">
                  O descarga mi CV
                </span>
                <a
                  href="/Lucas Olías Morilla CV.pdf"
                  download
                  className="font-mono text-xs text-ember/60 hover:text-ember transition-colors duration-300 uppercase tracking-wider flex items-center gap-1"
                >
                  aquí
                  <FiDownload size={14} />
                </a>
              </div>
              <div className="flex-1 h-px bg-ash/40" />
            </div>

            <div className="flex justify-center gap-6">
              {/* Teléfono con tooltip */}
              <div className="relative">
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="text-ash/35 hover:text-fire/60 transition-colors duration-300"
                >
                  <FiSmartphone size={22} />
                </button>

                {/* Tooltip */}
                {showPhone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-ink-light/95 backdrop-blur-lg border border-ember/20 rounded-xl px-4 py-3 shadow-2xl z-50"
                  >
                    {/* Flechita */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-ink-light border-r border-b border-ember/20 rotate-45" />

                    <div className="flex flex-col gap-2 whitespace-nowrap">
                      <span className="font-mono text-xs text-ember/80 tracking-wider text-center">
                        +34 640 799 835
                      </span>
                      <div className="flex gap-3 justify-center">
                        <a
                          href="tel:+34640799835"
                          className="font-mono text-[10px] text-ash/60 hover:text-ember transition-colors uppercase tracking-wider"
                        >
                          Llamar
                        </a>
                        <span className="text-ash/20">|</span>
                        <a
                          href="https://wa.me/346040799835"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[10px] text-ash/60 hover:text-ember transition-colors uppercase tracking-wider"
                        >
                          WhatsApp
                        </a>
                        <span className="text-ash/20">|</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText("+34640799835 ");
                            setShowPhone(false);
                          }}
                          className="font-mono text-[10px] text-ash/60 hover:text-ember transition-colors uppercase tracking-wider"
                        >
                          Copiar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
              <a
                href="https://www.linkedin.com/in/lucas-olias-morilla-852336258/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash/35 hover:text-fire/60 transition-colors duration-300"
              >
                <FiLinkedin size={22} />
              </a>
              <a
                href="mailto:lucasolias15@gmail.com"
                className="text-ash/35 hover:text-fire/60 transition-colors duration-300"
              >
                <FiMail size={22} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Label "hover to interact" — fuera de la card, esquina inferior derecha */}
      <div className="absolute bottom-5 right-6 z-10 pointer-events-none">
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,186,8,0.28)",
          }}
        >
          hover to interact
        </span>
      </div>
    </section>
  );
};

export default Contact;
