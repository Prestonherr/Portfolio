import "./App.css";
import Header from "./components/Header/Header";
import SmokeBackground from "./components/SmokeBackground/SmokeBackground";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import Resume from "./sections/Resume/Resume";
import Connect from "./sections/Connect/Connect";

export default function App() {
  return (
    <>
      <SmokeBackground />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Resume />
        <Connect />
      </main>
      <footer>
        <p>© {new Date().getFullYear()} Preston Herr</p>
      </footer>
    </>
  );
}
