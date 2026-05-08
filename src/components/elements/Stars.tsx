"use client";

import styles from "./Stars.module.scss";
import { useState, memo } from "react";

function StarsComponent() {
  const [stars] = useState(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 0.8 + Math.random() * 1.5,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 6,
      opacity: 0.2 + Math.random() * 0.4,
    })),
  );

  return (
    <div className={styles.starsLayer}>
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default memo(StarsComponent);