 'use client';
import styles from "./Stars.module.scss";
 
 export default function Stars() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 3,
  }));

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
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}