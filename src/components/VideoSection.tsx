"use client";
import { useEffect, useRef } from "react";
import styles from "./VideoSection.module.scss";
import Stars from "./elements/Stars";
import Hearts from "./elements/Hearts";

export default function VideoSection({ onNext }: { onNext: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoplay FIX for iPhone
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playsInline = true;
    video.loop = true;
    video.muted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (e) {
        console.log("Autoplay blocked:", e);
      }
    };

    playVideo();
  }, []);

  return (
    <section className={styles.section}>
      <Stars />
      <Hearts />

      {/* Aurora */}
      <div className={styles.aurora}>
        <div className={`${styles.ab} ${styles.ab1}`} />
        <div className={`${styles.ab} ${styles.ab2}`} />
        <div className={`${styles.ab} ${styles.ab3}`} />
      </div>

      {/* VIDEO */}
      <div className={styles.videoWrap}>
        <div className={styles.videoFrame}>
          <video
            ref={videoRef}
            src="/0423.mp4"
            className={styles.video}
            playsInline
            autoPlay
            loop
            preload="auto"
          />

          <div className={styles.vignette} />
          <div className={styles.grain} />

          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerTR}`} />
          <div className={`${styles.corner} ${styles.cornerBL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
        </div>
      </div>

      {/* Cinematic bars */}
      <div className={styles.cinemaBars} />

      {/* Next button */}
      <button className={styles.nextBtn} onClick={onNext}>
        Дальше →
      </button>
    </section>
  );
}
