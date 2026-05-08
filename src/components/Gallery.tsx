"use client";

import { useEffect, useRef } from "react";
import styles from "./Gallery.module.scss";

const captions = [
  "memories",
  "forever",
  "together",
  "always",
  "love",
  "us",
  "moments",
  "hearts",
  "dream",
  "smile",
  "stars",
  "close",
];

const images = [
  "/images/фоткаслайды2.jpg",
  "/images/storyPhotos.jpg",
  "/images/storyPhotos2.jpg",
  "/images/storyPhotos3.jpg",
  "/images/storyPhotos4.jpg",
  "/images/storyPhotos2.jpg",
  "/images/storyPhotos3.jpg",
  "/images/storyPhotos4.jpg",
  "/images/storyPhotos.jpg",
  "/images/фоткаслайды2.jpg",
  "/images/storyPhotos4.jpg",
];

export default function Gallery({ onNext }: { onNext: () => void }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    cardRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.gallery}>
      {/* Aurora blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.heartLine}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={styles.heart}
              style={{ animationDelay: `${i * 0.13}s` }}
            >
              ♥
            </span>
          ))}
        </div>
        <h2 className={styles.title}>Фотки</h2>
        <p className={styles.subtitle}>Наши моменты</p>
        <div className={styles.divider}>
          <span className={styles.divLine} />
          <span className={styles.divDiamond} />
          <span className={styles.divLine} />
        </div>
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {images.map((img, i) => (
          <div
            key={i}
            className={styles.card}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ transitionDelay: `${(i % 6) * 70}ms` }}
          >
            <div className={styles.tape} />
            <img src={img} alt={`photo-${i}`} className={styles.photo} />
            <span className={styles.caption}>
              ♥ {captions[i % captions.length]} ♥
            </span>
          </div>
        ))}
      </div>

      {/* Next button */}
      <button className={styles.nextBtn} onClick={onNext}>
        Дальше ➜
      </button>
    </section>
  );
}
