import GlitchName from "../../components/GlitchName/GlitchName";
import "./Name.css";

export default function Name() {
  return (
    <section className="name" id="name">
      <div className="name__intro">
        <h1>
          <GlitchName />
        </h1>
        <p className="name__tagline">Software engineer</p>
      </div>
    </section>
  );
}
