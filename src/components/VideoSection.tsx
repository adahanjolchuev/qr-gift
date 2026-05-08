"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoSection.module.scss";
import Stars from "./elements/Stars";
import Hearts from "./elements/Hearts";

export default function VideoSection({ onNext }: { onNext: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.playsInline = true;
  }, []);

  const startVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      await video.play();
      setStarted(true);
      setIsPlaying(true);
    } catch (e) {
      console.log(e);
    }
  };

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.section}>
     <Stars/>
     <Hearts/>
      <div className={styles.videoWrap}>
        <div className={styles.videoFrame}>
          <video
            ref={videoRef}
            src="/0423.mp4"
            className={styles.video}
            playsInline
          />

          {/* 🔥 START OVERLAY */}
          {!started && (
            <div className={styles.overlay} onClick={startVideo}>
              <div className={styles.playBtn}>▶ Play</div>
              <p>Tap to start</p>
            </div>
          )}
        </div>

        {/* 🔥 CONTROLS (PAUSE + NEXT) */}
        {started && (
          <div className={styles.controls}>
            <button className={styles.btn} onClick={togglePlay}>
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            <button className={styles.btnNext} onClick={onNext}>
              Дальше →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}