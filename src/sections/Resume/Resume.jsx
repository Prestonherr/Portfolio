import "./Resume.css";

export default function Resume() {
  return (
    <section className="resume" id="resume">
      <div className="container">
        <h2 className="section-title">Resume</h2>
        <p className="resume__text">Download or view my resume below.</p>
        <a
          href="/resume.pdf"
          className="resume__btn"
          target="_blank"
          rel="noreferrer"
        >
          View Resume (PDF)
        </a>
      </div>
    </section>
  );
}
