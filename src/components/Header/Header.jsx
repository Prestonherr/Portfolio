import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Header.css";

export default function Header() {
  return (
    <nav>
      <div className="container">
        <ul className="header__nav">
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
            <a href="#connect">Connect</a>
          </li>
        </ul>
        <div className="header__actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
