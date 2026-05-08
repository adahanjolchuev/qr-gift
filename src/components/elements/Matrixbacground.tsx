"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT_SIZE = 16;
    const CHARS = "HAPPYBIRTHDAYRHPTAIY".split("");
    const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

    const BRIGHT = ["#ff2d9b", "#ff1493", "#ff3dac", "#e8008a"];
    const DIM = ["#6b0033", "#55002a", "#7a0040", "#3d001e"];
    const randomBright = () =>
      BRIGHT[Math.floor(Math.random() * BRIGHT.length)];
    const randomDim = () => DIM[Math.floor(Math.random() * DIM.length)];

    let cols = 0;
    let rows = 0;

    interface Cell {
      char: string;
      color: string;
      bright: boolean;
      alpha: number;
    }

    interface Drop {
      col: number;
      row: number; // current head row (float)
      speed: number;
      length: number; // trail length in rows
    }

    let grid: Cell[][] = [];
    let drops: Drop[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / FONT_SIZE);
      rows = Math.floor(canvas.height / FONT_SIZE);

      // Background grid — dim letters everywhere
      grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => ({
          char: randomChar(),
          color: randomDim(),
          bright: false,
          alpha: 0.45,
        })),
      );

      // Rain drops — one per column, staggered
      drops = Array.from({ length: cols }, (_, c) => ({
        col: c,
        row: Math.random() * -rows,
        speed: 0.15 + Math.random() * 0.25,
        length: 8 + Math.floor(Math.random() * 14),
      }));
    };

    init();
    window.addEventListener("resize", init);

    const draw = () => {
      ctx.fillStyle = "#0a0008";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${FONT_SIZE}px "Courier New", monospace`;
      ctx.textBaseline = "top";

      // Draw background dim grid
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cell = grid[r][c];
          ctx.shadowBlur = 0;
          ctx.globalAlpha = cell.alpha;
          ctx.fillStyle = cell.color;
          ctx.fillText(cell.char, c * FONT_SIZE, r * FONT_SIZE);
        }
      }

      // Draw rain drops on top
      for (const drop of drops) {
        const headRow = Math.floor(drop.row);

        for (let t = 0; t < drop.length; t++) {
          const r = headRow - t;
          if (r < 0 || r >= rows) continue;

          const ratio = 1 - t / drop.length;
          const x = drop.col * FONT_SIZE;
          const y = r * FONT_SIZE;
          const char = grid[r][drop.col].char;

          if (t === 0) {
            // Bright white head
            ctx.shadowColor = "#ff1493";
            ctx.shadowBlur = 18;
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = 1;
          } else if (t <= 2) {
            ctx.shadowColor = "#ff1493";
            ctx.shadowBlur = 12;
            ctx.fillStyle = "#ff1493";
            ctx.globalAlpha = 1;
          } else if (t <= 5) {
            ctx.shadowColor = "#cc0077";
            ctx.shadowBlur = 8;
            ctx.fillStyle = randomBright();
            ctx.globalAlpha = ratio * 0.95 + 0.05;
          } else {
            ctx.shadowColor = "#880044";
            ctx.shadowBlur = 4;
            ctx.fillStyle = "#aa0066";
            ctx.globalAlpha = ratio * 0.7;
          }

          ctx.fillText(char, x, y);
        }

        // Update drop head char randomly
        if (headRow >= 0 && headRow < rows) {
          if (Math.random() < 0.4) {
            grid[headRow][drop.col].char = randomChar();
          }
        }

        drop.row += drop.speed;

        if (drop.row - drop.length > rows) {
          drop.row = -drop.length - Math.random() * 10;
          drop.speed = 0.15 + Math.random() * 0.25;
          drop.length = 8 + Math.floor(Math.random() * 14);
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    };

    // Slowly randomize background chars
    const bgInterval = setInterval(() => {
      const count = Math.floor(cols * rows * 0.008);
      for (let i = 0; i < count; i++) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);
        grid[r][c].char = randomChar();
      }
    }, 200);

    let animId: number;
    const loop = () => {
      draw();
      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(bgInterval);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
