import { motion } from "framer-motion";

const CascadeText = ({ text, className }) => {
  // =============================================
  // VARIANTES DE ANIMACIÓN
  // =============================================
  
  // LETRA QUE CAE: es la que se ve normalmente
  const fallVariants = {
    initial: { 
      y: 0,        // Posición normal
      opacity: 1   // Totalmente visible
    },
    hover: { 
      y: 20,       // Cae 20px hacia abajo
      opacity: 0   // Se desvanece hasta desaparecer
    }
  };

  // LETRA QUE ENTRA: está oculta encima y baja al hacer hover
  const riseVariants = {
    initial: { 
      y: -20,      // Empieza 20px por encima
      opacity: 0   // Totalmente invisible
    },
    hover: { 
      y: 0,        // Baja a su posición normal
      opacity: 1   // Se vuelve completamente visible
    }
  };

  // =============================================
  // COMPONENTE
  // =============================================
  return (
    <motion.span
      // "initial" le dice a Framer Motion que empiece desde el estado "initial" de las variantes
      initial="initial"
      // "whileHover" dispara el estado "hover" de TODAS las variantes cuando el ratón entra
      whileHover="hover"
      // El cursor pointer indica que es interactivo
      className={`inline-block cursor-pointer ${className}`}
      // IMPORTANTE: el contenedor también tiene variantes para controlar el stagger
      variants={{
        hover: {
          transition: {
            // staggerChildren hace que cada hijo (cada letra) se anime con retraso
            // 0.05 significa que la 2ª letra empieza 0.05s después de la 1ª, etc.
            staggerChildren: 0.03,
            // easeOut: animación que empieza rápido y acaba suave (efecto más natural)
            ease: "easeOut",
          }
        }
      }}
    >
      {/* ============================================= */}
      {/* Descomponemos el texto en letras individuales */}
      {/* ============================================= */}
      {text.split("").map((char, index) => (
        <span
          key={index}
          // CRÍTICO: relative para posicionar la letra nueva encima
          // overflow-hidden para que cuando la letra caiga no se vea fuera del contenedor
          // inline-block para que ocupe solo el ancho de la letra
          className="relative inline-block overflow-hidden"
        >
          {/* --- LETRA QUE CAE (la visible por defecto) --- */}
          <motion.span
            variants={fallVariants}
            transition={{ 
              duration: 0.3,   // La caída dura 0.3 segundos
              ease: "easeInOut"  // Empieza rápido, frena al final (como la gravedad real)
            }}
            className="inline-block"
          >
            {/* Si es un espacio, usamos un espacio no rompible para que no colapse */}
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* --- LETRA QUE ENTRA (oculta, superpuesta encima) --- */}
          <motion.span
            variants={riseVariants}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
            // absolute + top-0 + left-0: la coloca EXACTAMENTE encima de la letra original
            className="inline-block absolute top-0 left-0"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default CascadeText;