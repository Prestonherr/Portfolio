import GlitchName from "../../components/GlitchName/GlitchName";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__intro">
        <h1>
          <GlitchName />
        </h1>
        <p className="hero__tagline">Software engineer</p>
      </div>
    </section>
  );
}
