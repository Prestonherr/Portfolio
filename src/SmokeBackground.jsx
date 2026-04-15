import { useEffect, useRef } from "react";

export default function SmokeBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor(stagger = false) {
        this.init(stagger);
      }

      init(stagger = false) {
        // Concentrate emitters toward the bottom-center, spread out a bit
        const spread = canvas.width * 0.55;
        this.x = canvas.width / 2 + (Math.random() - 0.5) * spread;
        this.y = canvas.height + Math.random() * 60;

        this.size = Math.random() * 160 + 60;
        this.speedY = -(Math.random() * 0.6 + 0.25);
        this.speedX = (Math.random() - 0.5) * 0.25;

        this.life = stagger ? Math.floor(Math.random() * 500) : 0;
        this.maxLife = Math.random() * 500 + 250;

        this.opacity = 0;
        this.peakOpacity = Math.random() * 0.13 + 0.04;

        // Each particle drifts with its own sine rhythm
        this.wobblePhase = Math.random() * Math.PI * 2;
        this.wobbleFreq = 0.008 + Math.random() * 0.012;
        this.wobbleAmp = 0.3 + Math.random() * 0.5;

        // Grow a bit as it rises
        this.growRate = Math.random() * 0.08 + 0.03;
      }

      update() {
        this.life++;
        this.wobblePhase += this.wobbleFreq;
        this.x += this.speedX + Math.sin(this.wobblePhase) * this.wobbleAmp;
        this.y += this.speedY;
        this.size += this.growRate;

        const t = this.life / this.maxLife;
        if (t < 0.15) {
          this.opacity = (t / 0.15) * this.peakOpacity;
        } else if (t > 0.65) {
          this.opacity = ((1 - t) / 0.35) * this.peakOpacity;
        } else {
          this.opacity = this.peakOpacity;
        }

        if (this.life >= this.maxLife || this.y < -this.size * 2) {
          this.init();
        }
      }

      draw() {
        const grad = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        grad.addColorStop(0,   `rgba(255,255,255,${this.opacity})`);
        grad.addColorStop(0.3, `rgba(210,210,210,${this.opacity * 0.55})`);
        grad.addColorStop(0.7, `rgba(160,160,160,${this.opacity * 0.15})`);
        grad.addColorStop(1,   `rgba(0,0,0,0)`);

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Seed particles at random life offsets so the canvas isn't empty at load
    for (let i = 0; i < 55; i++) {
      particles.push(new Particle(true));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.update();
        p.draw();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
