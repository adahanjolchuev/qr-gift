"use client";
import { useEffect, useState } from "react";
import styles from "./Intro.module.scss";
import MatrixBackground from "./elements/Matrixbacground";

const WORDS = ["С", "ДНЁМ", "РОЖДЕНИЯ", "АИДА", "💗"];

export default function Intro({ onNext }: { onNext: () => void }) {
  const [count, setCount] = useState<number | null>(3);
  const [showWords, setShowWords] = useState(false);
  const [currentWord, setCurrentWord] = useState<number | null>(null);
  const [wordVisible, setWordVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (count === null) return;
    if (count === 0) {
      const t = setTimeout(() => {
        setCount(null);
        setShowWords(true);
      }, 1000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setCount((c) => (c !== null ? c - 1 : null)),
      1000
    );
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => {
    if (!showWords) return;
    if (currentWord === null) {
      setCurrentWord(0);
      return;
    }
    if (currentWord >= WORDS.length) {
      const t = setTimeout(() => {
        setShowAll(true);
        setTimeout(() => setDone(true), 1000);
      }, 500);
      return () => clearTimeout(t);
    }
    const showT = setTimeout(() => setWordVisible(true), 100);
    const hideT = setTimeout(() => {
      setWordVisible(false);
      setTimeout(
        () => setCurrentWord((w) => (w !== null ? w + 1 : 0)),
        400
      );
    }, 900);
    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, [showWords, currentWord]);

  return (
    <section className={styles.intro}>
      <div className={styles.matrixBg}>
        <MatrixBackground />
      </div>

      <div className={styles.center}>
        {/* Countdown */}
        {count !== null && (
          <div key={count} className={styles.countdown}>
            <svg viewBox="0 0 120 120" className={styles.ring}>
              <circle cx="60" cy="60" r="52" className={styles.ringTrack} />
              <circle
                cx="60"
                cy="60"
                r="52"
                className={styles.ringFill}
                style={{ strokeDashoffset: 326.7 * (1 - count / 3) }}
              />
            </svg>
            <span className={styles.countNum}>{count}</span>
          </div>
        )}

        {/* Одно слово по очереди */}
        {showWords && !showAll && currentWord !== null && currentWord < WORDS.length && (
          <div
            className={`${styles.word} ${wordVisible ? styles.wordVisible : ""}`}
          >
            {WORDS[currentWord]}
          </div>
        )}

        {/* Все слова вместе */}
        {showAll && (
          <div className={styles.allWords}>
            {WORDS.map((word, i) => (
              <span
                key={i}
                className={styles.allWord}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {word}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        {done && (
          <button className={styles.btn} onClick={onNext}>
            Дальше ➜
          </button>
        )}
      </div>
    </section>
  );
}