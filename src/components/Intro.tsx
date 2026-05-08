"use client";

import { useEffect, useState } from "react";
import styles from "./Intro.module.scss";
import MatrixBackground from "./elements/Matrixbacground";

const WORDS = ["С", "ДНЁМ", "РОЖДЕНИЯ", "АИДА", "💗"];

export default function Intro({ onNext }: { onNext: () => void }) {
  const [count, setCount] = useState(3);
  const [showWords, setShowWords] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [wordVisible, setWordVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [done, setDone] = useState(false);

  // ⏱ countdown
  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(() => {
        setShowWords(true);
        setCount(-1);
      }, 800);
      return () => clearTimeout(t);
    }

    if (count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [count]);

  // 💬 words flow
  useEffect(() => {
    if (!showWords) return;
    if (currentWord >= WORDS.length) {
      const t = setTimeout(() => {
        setShowAll(true);

        setTimeout(() => {
          setDone(true);
        }, 800);
      }, 300);

      return () => clearTimeout(t);
    }

    const showT = setTimeout(() => setWordVisible(true), 100);

    const hideT = setTimeout(() => {
      setWordVisible(false);

      setTimeout(() => {
        setCurrentWord((prev) => prev + 1);
      }, 350);
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
        {count > 0 && (
          <div key={count} className={styles.countdown}>
            <svg viewBox="0 0 120 120" className={styles.ring}>
              <circle cx="60" cy="60" r="52" className={styles.ringTrack} />
              <circle
                cx="60"
                cy="60"
                r="52"
                className={styles.ringFill}
                style={{
                  strokeDashoffset: 326.7 * (1 - count / 3),
                }}
              />
            </svg>
            <span className={styles.countNum}>{count}</span>
          </div>
        )}

        {/* words */}
        {showWords && !showAll && currentWord < WORDS.length && (
          <div
            className={`${styles.word} ${
              wordVisible ? styles.wordVisible : ""
            }`}
          >
            {WORDS[currentWord]}
          </div>
        )}

        {/* all words */}
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

        {/* button */}
        {done && (
          <button className={styles.btn} onClick={onNext}>
            Дальше ➜
          </button>
        )}
      </div>
    </section>
  );
}