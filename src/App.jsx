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
    title: "BrewMap ☕️",
    description:
      "Coffee shop locator where users can find and save their favorite local coffee shops.",
    frontend: "https://github.com/Prestonherr/brewmap-frontend",
    backend: "https://github.com/Prestonherr/brewmap-backend",
    live: "https://brewmap.root.sx/",
  },
  {
    title: "WTWR (What To Wear)",
    description:
      "A weather-based clothing recommendation app that fetches real-time weather data and suggests custom appropriate clothing.",
    frontend: "https://github.com/Prestonherr/se_project_react",
    backend: "https://github.com/Prestonherr/se_project_express",
    live: "https://w2wr.root.sx/",
  },
  {
    title: "Spots 📸",
    description:
      "An interactive photo-sharing web application where users can share photos, like posts, and manage their profile.",
    frontend: "https://github.com/Prestonherr/se_project_spots",
    live: "https://prestonherr.github.io/se_project_spots/",
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
              <a href="#contact">Connect</a>
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
              I’m a fullstack developer with a background in operations and
              logistics, where I spent years optimizing systems and solving
              real-world problems. I’ve transitioned into software engineering
              to build better, more efficient tools instead of working around
              broken ones. I enjoy creating clean, user-focused interfaces and
              bringing ideas to life through code. I’m currently looking for
              opportunities where I can contribute to meaningful products while
              continuing to grow as a developer.
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
                  <div className="card-links">
                    {project.frontend && (
                      <a
                        href={project.frontend}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Frontend
                      </a>
                    )}
                    {project.backend && (
                      <a
                        href={project.backend}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Backend
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer">
                        Live
                      </a>
                    )}
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

        {/* Connect */}
        <section className="contact" id="contact">
          <div className="container">
            <h2 className="section-title">Connect</h2>
            <div className="social-links">
              <a
                href="https://linkedin.com/in/prestonherr"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="social-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/prestonherr"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="social-link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
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
