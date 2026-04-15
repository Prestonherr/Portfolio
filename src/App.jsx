import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";
import SmokeBackground from "./SmokeBackground";

const TARGET = "Preston Herr";
const GLYPHS = "アカサタナハマヤラワ々仝〆ヲΛЖѪϞฬ༒༄⟟⟒⟟爻卂尺片";

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

const TARGET_CHARS = TARGET.split("");
const NON_SPACE_INDICES = TARGET_CHARS.map((c, i) =>
  c !== " " ? i : -1,
).filter((i) => i >= 0);

function GlitchName() {
  const [charStates, setCharStates] = useState(() =>
    TARGET_CHARS.map((char) => ({
      display: char === " " ? " " : randomGlyph(),
      locked: false,
      lockVersion: 0,
    })),
  );
  const [started, setStarted] = useState(false);
  const frameRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const totalFrames = 50;

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;
      const frame = frameRef.current;

      setCharStates((prev) =>
        prev.map((state, i) => {
          const char = TARGET_CHARS[i];
          if (char === " ") return state;
          if (state.locked) return state;

          const pos = NON_SPACE_INDICES.indexOf(i);
          const lockFrame = Math.round(
            (pos / NON_SPACE_INDICES.length) * totalFrames * 0.85,
          );

          if (frame >= lockFrame) {
            return {
              display: char,
              locked: true,
              lockVersion: state.lockVersion + 1,
            };
          }
          return { ...state, display: randomGlyph() };
        }),
      );

      if (frame >= totalFrames) clearInterval(intervalRef.current);
    }, 55);

    return () => clearInterval(intervalRef.current);
  }, [started]);

  const renderChars = (states) =>
    states.map((state, i) =>
      TARGET_CHARS[i] === " " ? (
        "\u00a0"
      ) : (
        <span
          key={`${i}-${state.lockVersion}`}
          className={state.locked ? "char-enter" : undefined}
        >
          {state.display}
        </span>
      ),
    );

  return (
    <span className="glitch-name">
      <span className="glitch-text">{renderChars(charStates)}</span>
      <span className="glitch-glow" aria-hidden="true">
        {renderChars(charStates)}
      </span>
    </span>
  );
}

const projects = [
  {
    title: "Project One",
    description:
      "A short description of what this project does and the problem it solves.",
    tags: ["React", "Node.js"],
    github: "#",
    live: "#",
  },
  {
    title: "Project Two",
    description:
      "A short description of what this project does and the problem it solves.",
    tags: ["Python", "FastAPI"],
    github: "#",
    live: null,
  },
  {
    title: "Project Three",
    description:
      "A short description of what this project does and the problem it solves.",
    tags: ["TypeScript", "PostgreSQL"],
    github: "#",
    live: "#",
  },
];

// From your EmailJS dashboard: emailjs.com
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="What's on your mind?"
          rows={5}
          required
        />
      </div>
      <button
        type="submit"
        className="submit-btn"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send Message"}
      </button>
      {status === "success" && (
        <p className="form-feedback success">
          Message sent! I'll get back to you soon.
        </p>
      )}
      {status === "error" && (
        <p className="form-feedback error">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

function App() {
  return (
    <>
      <SmokeBackground />
      <nav>
        <div className="container">
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#resume">Resume</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="hero" id="hero">
          <div className="hero-intro">
            <h1>
              <GlitchName />
            </h1>
            <p className="tagline">Software engineer</p>
          </div>
        </section>

        {/* About */}
        <section className="about" id="about">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <p>
              Write a few sentences about yourself here — your background, what
              you're passionate about, and what kind of work you're looking for
              or doing.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="projects" id="projects">
          <div className="container">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div className="project-card" key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="links">
                    <a href={project.github}>GitHub</a>
                    {project.live && <a href={project.live}>Live</a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume */}
        <section className="resume" id="resume">
          <div className="container">
            <h2 className="section-title">Resume</h2>
            <p>Download or view my resume below.</p>
            <a
              href="/resume.pdf"
              className="resume-btn"
              target="_blank"
              rel="noreferrer"
            >
              View Resume (PDF)
            </a>
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <p className="contact-intro">
              Have a question or want to work together? Send me a message.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer>
        <p>© {new Date().getFullYear()} Preston Herr</p>
      </footer>
    </>
  );
}

export default App;
