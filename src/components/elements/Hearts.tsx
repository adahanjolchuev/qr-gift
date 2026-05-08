"use client";
import styles from "./Hearts.module.scss";
import { useState } from "react";

export default function Hearts() {
  const emojis = ["🤍", "❤️", "💖", "💗", "💘"];

  const [hearts] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      size: 12 + Math.random() * 10,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 6,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
  );

  return (
    <div className={styles.heartsLayer}>
      {hearts.map((h) => (
        <div
          key={h.id}
          className={styles.heartItem}
          style={{
            left: `${h.x}%`,
            fontSize: h.size,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        >
          {h.emoji}
        </div>
      ))}
    </div>
  );
}