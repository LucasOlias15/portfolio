import { motion } from "framer-motion";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiClevercloud,
  SiGit,
  SiGithub,
  SiDocker,
  SiFramer,
  SiVite,
  SiCloudinary,
  SiXampp,
  SiWordpress,
  SiVercel,
  SiRender

} from "react-icons/si";

// =============================================
// DATOS DE TECNOLOGÍAS SECUNDARIAS
// =============================================
const otherSkills = [
  { name: "TailwindCSS", accent: "#06B6D4", icon: SiTailwindcss },
  { name: "Next.js", accent: "#EBE4E4", icon: SiNextdotjs },
  { name: "Express", accent: "#ABA4A4", icon: SiExpress },
  { name: "CleverCloud", accent: "#DE5B40", icon: SiClevercloud },
  { name: "Git", accent: "#F05032", icon: SiGit },
  { name: "GitHub", accent: "#FFFFFF", icon: SiGithub },
  { name: "Docker", accent: "#2496ED", icon: SiDocker },
  { name: "Framer Motion", accent: "#E8106D", icon: SiFramer },
  { name: "Vite", accent: "#646CFF", icon: SiVite },
  { name: "Cloudinary", accent: "#0004FF", icon: SiCloudinary },
  { name: "XAMPP", accent: "#FF7B00", icon: SiXampp },
  { name: "WordPress", accent: "#3689B5", icon: SiWordpress },
  { name: "Vercel", accent: "#FFFFFF", icon: SiVercel },
  {name: "Render", accent: "#545454", icon: SiRender },
];

// =============================================
// COMPONENTE
// =============================================
const OtherSkills = () => {
  return (
    <section className="relative bg-ink border-t border-ember/5"
       id="tecnologiasSecundarias">
      <div className="max-w-4xl mx-auto px-6 md:px-20 py-10 md:py-16">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="font-mono text-xs md:text-sm text-fire/60 tracking-[0.3em] uppercase">
            Otras tecnologías y herramientas que también he utilizado
          </span>
        </motion.div>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {otherSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-4 py-2 border-2 bg-ink-light/30 text-ash/70 text-xs font-mono tracking-wider uppercase cursor-default select-none"
                style={{
                  borderColor: `${skill.accent}50`,
                }}
              >
                <Icon size={14} color={skill.accent} />
                <span
                  className="transition-colors duration-300"
                  style={{ color: skill.accent }}
                >
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Línea decorativa inferior */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="h-[1px] w-full max-w-[200px] mx-auto mt-14 bg-gradient-to-r from-transparent via-ember/10 to-transparent"
        />
      </div>
    </section>
  );
};

export default OtherSkills;