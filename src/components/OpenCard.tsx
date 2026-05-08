"use client";

import { useState, useRef } from "react";
import styles from "./OpenCard.module.scss";

export default function OpenCard({ onYes }: { onYes: () => void }) {
  const [escaped, setEscaped] = useState(false);
  const [noPos, setNoPos] = useState({ top: 0, left: 0 });

  const yesRef = useRef<HTMLButtonElement>(null);

  const runAway = () => {
    if (!yesRef.current) return;

    const yesRect = yesRef.current.getBoundingClientRect();

    const btnW = 160;
    const btnH = 60;
    const padding = 30;
    const avoidRadius = 180;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = 0;
    let left = 0;

    for (let i = 0; i < 50; i++) {
      const randTop =
        padding + Math.random() * (vh - btnH - padding * 2);

      const randLeft =
        padding + Math.random() * (vw - btnW - padding * 2);

      const yesX = yesRect.left + yesRect.width / 2;
      const yesY = yesRect.top + yesRect.height / 2;

      const btnX = randLeft + btnW / 2;
      const btnY = randTop + btnH / 2;

      const dist = Math.hypot(btnX - yesX, btnY - yesY);

      if (dist > avoidRadius) {
        top = randTop;
        left = randLeft;
        break;
      }
    }

    setEscaped(true);
    setNoPos({ top, left });
  };

  const handleYes = () => {
    const audio = new Audio("/музыка.mp3");
    audio.loop = true;
    audio.volume = 0.9;
    audio.play().catch(() => {});

    (window as any).__bgAudio = audio;

    onYes();
  };

  return (
    <div className={styles.screen}>
      <div className={styles.envelope}>💌</div>

      <h1 className={styles.title}>Открыть открытку?</h1>
      <p className={styles.sub}>Тебе пришло кое-что важное...</p>

      <div className={styles.btns}>
        <button ref={yesRef} className={styles.yes} onClick={handleYes}>
          💗 Да
        </button>

        <button
          className={`${styles.no} ${escaped ? styles.noEscaped : ""}`}
          style={
            escaped
              ? {
                  position: "fixed",
                  top: noPos.top,
                  left: noPos.left,
                }
              : undefined
          }
          onClick={runAway}
        >
          🚫 Нет
        </button>
      </div>
    </div>
  );
}