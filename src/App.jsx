import NavSection from "./components/NavSection";
import MobileNav from "./components/MovileNav";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import  OtherSkills from "./components/OtherSkills";

function App() {
  return (
    <div className="min-h-screen bg-ink text-ember">
      <MobileNav />
      <main>
        <Hero />
        <About />
        <div>
          <NavSection />
          <TechStack />
          <OtherSkills/>
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
