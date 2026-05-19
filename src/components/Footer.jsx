const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-fire/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body text-sm text-ash/60">
          © {new Date().getFullYear()} Lucas Olías — Hecho con paciencia y buenas prácticas.
        </p>
        <div className="flex gap-6">
          <a href="https://github.com/LucasOlias15/LocalMarkt_Lucas_Olias_Morilla.git" className="font-mono text-xs text-ash/60 hover:text-ember transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/lucas-olias-morilla-852336258/" className="font-mono text-xs text-ash/60 hover:text-ember transition-colors">LinkedIn</a>
          <a href="mailto:lucasolias15@gmail.com" className="font-mono text-xs text-ash/60 hover:text-ember transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;