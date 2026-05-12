import { useEffect, useRef } from "react";

const COLORS = {
  ember:    "#FFBA08",
  emberDim: "#FAA307",
  glow:     "#F48C06",
  ash:      "#6B6B7B",
  ashLight: "#8B8B9B",
};

const SYMBOLS = [
  "<", ">", "/", "{", "}", "(", ")", ";", "=>",
  "[]", "&&", "||", "==", "!=", "++", "--",
  "fn", "if", "const", "let", "return", "::",
  "0", "1", "#", "@", "/*", "*/", "~/",
  "</>", "import", "export",
];

const rand  = (a, b) => a + Math.random() * (b - a);
const randI = (a, b) => Math.floor(rand(a, b));
const pick  = (arr)  => arr[randI(0, arr.length)];

class Particle {
  constructor(W, H) {
    this.W = W;
    this.H = H;
    this.reset(true);
  }

  reset(initial = false) {
    this.x   = rand(0, this.W);
    this.y   = initial ? rand(0, this.H) : rand(-40, -10);
    this.z   = rand(0.15, 1);
    this.vx  = rand(-0.15, 0.15) * this.z;
    this.vy  = rand(0.15, 0.55)  * this.z;
    this.sym = pick(SYMBOLS);
    this.fontSize = Math.round(rand(10, 24) * this.z + 6);
    this.baseAlpha = rand(0.18, 0.7) * this.z;
    this.alpha = this.baseAlpha;

    // ember-dominant palette — no fire/red
    if (this.z > 0.65)      this.color = pick([COLORS.ember, COLORS.ember, COLORS.glow]);
    else if (this.z > 0.35) this.color = pick([COLORS.glow, COLORS.emberDim]);
    else                    this.color = pick([COLORS.ash, COLORS.ashLight]);

    this.angle   = rand(0, Math.PI * 2);
    this.dAngle  = rand(-0.006, 0.006);
    this.vxExtra = 0;
    this.vyExtra = 0;
  }

  update(mx, my, W, H) {
    if (mx !== null && this.z > 0.25) {
      const dx   = this.x - mx;
      const dy   = this.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 120 * this.z;
      if (dist < radius && dist > 0) {
        const force = ((radius - dist) / radius) * 1.0 * this.z;
        this.vxExtra += (dx / dist) * force;
        this.vyExtra += (dy / dist) * force;
      }
    }

    this.vxExtra *= 0.9;
    this.vyExtra *= 0.9;

    this.x += this.vx + this.vxExtra;
    this.y += this.vy + this.vyExtra;
    this.angle += this.dAngle;

    if (this.x < -40)    this.x = W + 20;
    if (this.x > W + 40) this.x = -20;
    if (this.y > H + 40) this.reset(false);
    if (this.y < -60 && this.vy < 0) this.reset(false);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha  = this.alpha;
    ctx.fillStyle    = this.color;
    ctx.font         = `${this.fontSize}px "JetBrains Mono", "Fira Mono", monospace`;
    ctx.textAlign    = "center";
    ctx.textBaseline = "middle";

    if (this.z > 0.65) {
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 10 * this.z;
    }

    ctx.fillText(this.sym, 0, 0);
    ctx.restore();
  }
}

function drawConnections(ctx, particles) {
  const MAX_DIST = 90;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      if (Math.abs(a.z - b.z) > 0.3) continue;
      const dx   = a.x - b.x;
      const dy   = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX_DIST) {
        const alpha = (1 - dist / MAX_DIST) * 0.13 * Math.min(a.z, b.z);
        ctx.beginPath();
        ctx.strokeStyle = COLORS.ash;
        ctx.globalAlpha = alpha;
        ctx.lineWidth   = 0.4;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
}

const CodeField = () => {
  const canvasRef = useRef(null);
  const stateRef  = useRef({
    particles: [],
    mouse: { x: null, y: null },
    raf: null,
    W: 0,
    H: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx   = canvas.getContext("2d");
    const state = stateRef.current;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr  = window.devicePixelRatio || 1;
      state.W = rect.width;
      state.H = rect.height;
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.floor((state.W * state.H) / 4500);
      state.particles = Array.from(
        { length: Math.max(40, Math.min(count, 100)) },
        () => new Particle(state.W, state.H)
      );
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      state.mouse.x = null;
      state.mouse.y = null;
    };

    const draw = () => {
      const { W, H, particles, mouse } = state;
      ctx.clearRect(0, 0, W, H);
      particles.sort((a, b) => a.z - b.z);
      drawConnections(ctx, particles);
      for (const p of particles) {
        p.update(mouse.x, mouse.y, W, H);
        p.draw(ctx);
      }
      state.raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    draw();

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        // pointer-events only on canvas, not on children (form sits above)
        pointerEvents: "auto",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          cursor: "crosshair",
        }}
      />
    </div>
  );
};

export default CodeField;