"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./VideoSection.module.scss";
import Stars from "./elements/Stars";
import Hearts from "./elements/Hearts";

export default function VideoSection({ onNext }: { onNext: () => void }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = true;
    video.playsInline = true;

    const handleLoaded = () => {
      setLoading(false);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handlePlaying = () => {
      setLoading(false);
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  const startVideo = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      setLoading(true);

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
      setLoading(true);
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className={styles.section}>
      <Stars />
      <Hearts />

      <div className={styles.videoWrap}>
        <div className={styles.videoFrame}>
          <video
            ref={videoRef}
            src="/0423.mp4"
            className={styles.video}
            playsInline
            preload="auto"
          />

          {/* 🔥 LOADER */}
          {loading && (
            <div className={styles.loaderOverlay}>
              <div className={styles.loader}></div>
              <p>Загрузка видео...</p>
            </div>
          )}

          {/* 🔥 START OVERLAY */}
          {!started && !loading && (
            <div className={styles.overlay} onClick={startVideo}>
              <div className={styles.playBtn}>▶ Play</div>
              <p>Tap to start</p>
            </div>
          )}
        </div>

        {/* 🔥 CONTROLS */}
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
