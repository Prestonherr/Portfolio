import { useState, useEffect, useRef } from "react";
import "./GlitchName.css";

const TARGET = "Preston Herr";
const GLYPHS = "アカサタナハマヤラワ々仝〆ヲΛЖѪϞฬ༒༄⟟⟒⟟爻卂尺片";

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

const TARGET_CHARS = TARGET.split("");
const NON_SPACE_INDICES = TARGET_CHARS.map((c, i) =>
  c !== " " ? i : -1,
).filter((i) => i >= 0);

export default function GlitchName() {
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
          className={state.locked ? "glitch__char--enter" : undefined}
        >
          {state.display}
        </span>
      ),
    );

  return (
    <span className="glitch">
      <span className="glitch__text">{renderChars(charStates)}</span>
      <span className="glitch__glow" aria-hidden="true">
        {renderChars(charStates)}
      </span>
    </span>
  );
}
