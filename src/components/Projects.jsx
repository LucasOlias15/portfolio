import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiSettings } from "react-icons/fi";

const Projects = () => {
  return (
    <section
      id="proyectos"
      className="relative bg-ink py-24 md:py-32 border-t border-ember/5"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-20">
        {/* ============================================ */}
        {/* ETIQUETA DE SECCIÓN                           */}
        {/* ============================================ */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs md:text-sm text-fire/60 tracking-[0.4em] uppercase block mb-6"
        >
          Proyectos
        </motion.span>

        {/* ============================================ */}
        {/* TÍTULO                                        */}
        {/* ============================================ */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl text-ember mb-16 font-bold"
        >
          Proyectos y más
        </motion.h2>

        {/* ============================================ */}
        {/* PROYECTO PRINCIPAL: LOCALMARKT                */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative group"
        >
          {/* Contenedor principal */}
          <div className="relative overflow-hidden rounded-2xl border border-ember/10 bg-ink-light/30 backdrop-blur-sm">
            {/* Imagen del proyecto */}
            <div className="relative overflow-hidden">
              {/* Aquí irá tu captura. Cambia el src por la ruta real */}
              <img

              />
              <picture>
                <source
                  media="(width < 800px)"
                  srcset="./../LocalMarktMobileScreen.png"
                />
                <img
                src="./../LocalMarkt.png"
                alt="LocalMarkt - Marketplace local"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </picture>
              {/* Overlay degradado inferior */}
              <div className="absolute inset-0 bg-linear-to-t " />

              {/* Brillo al hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-linear-to-tr from-ember/5 via-transparent to-fire/5" />
            </div>

            {/* Info del proyecto */}
            <div className="relative p-8 md:p-12">
              {/* Nombre */}
              <h3 className="font-display text-3xl md:text-5xl text-ember mb-4">
                LocalMarkt
              </h3>

              {/* Descripción */}
              <p className="text-ash text-base md:text-lg leading-relaxed max-w-3xl mb-8">
                Un marketplace local que conecta compradores con vendedores
                cercanos mediante geolocalización. Diseñado con una interfaz
                moderna, animaciones fluidas y una arquitectura full-stack
                robusta.
              </p>

              {/* Tags de tecnologías */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "React",
                  "TailwindCSS",
                  "Framer Motion",
                  "Lucide React",
                  "Cloudinary",
                  "Vercel",
                  "Render",
                  "Clever Cloud",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-[10px] md:text-xs font-mono tracking-wider text-ash/70 border border-ash/15 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Botones de acción */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://proyecto-final-grado-lucas-olias-mo.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono uppercase tracking-wider text-ember border border-ember/40 hover:bg-ember/10 hover:border-ember/60 transition-all duration-300 rounded-full"
                >
                  <FiExternalLink size={14} />
                  Ver demo
                </a>
                <a
                  href="https://github.com/LucasOlias15/LocalMarkt_Lucas_Olias_Morilla.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-mono uppercase tracking-wider text-ash border border-ash/20 hover:border-ash/40 hover:text-ember transition-all duration-300 rounded-full"
                >
                  <FiGithub size={14} />
                  Código fuente
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* ESPACIOS PARA FUTUROS PROYECTOS               */}
        {/* ============================================ */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {["En desarrollo", "Próximamente"].map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              className="relative flex items-center justify-center h-48 md:h-56 rounded-2xl border border-dashed border-ash/10 bg-ink-light/40 group cursor-default"
            >
              {/* Brillo sutil al hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-linear-to-br from-ember/2 to-fire/2" />

              <div className="text-center">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-ash/50 flex flex-col items-center gap-2">
                  {label}
                  <FiSettings size={16} className="text-ash/50" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ============================================ */}
        {/* LINK A GITHUB                                 */}
        {/* ============================================ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href="https://github.com/LucasOlias15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-ash hover:text-ember/60 transition-colors duration-300"
          >
            <FiGithub size={14} />
            Explora más en GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
