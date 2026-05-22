"use client";

import { useRef, useState } from "react";
import styles from "./VideoSection.module.scss";
import Stars from "./elements/Stars";
import Hearts from "./elements/Hearts";

export default function VideoSection({ onNext }: { onNext: () => void }) {
  const [started, setStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const VIDEO_ID = "x7Srblg9VSc";

  const startVideo = () => {
    setStarted(true);
  };

  return (
    <section className={styles.section}>
      <Hearts />

      <div className={styles.videoWrap}>
        <div className={styles.videoFrame}>
          {!started ? (
            // START OVERLAY — YouTube thumbnail фону менен
            <div className={styles.overlay} onClick={startVideo}>
              <img
                src={`https://img.youtube.com/vi/${VIDEO_ID}/hqdefault.jpg`}
                alt="preview"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0.5,
                }}
              />
              <div
                className={styles.playBtn}
                style={{ position: "relative", zIndex: 2 }}
              >
                ▶ Play
              </div>
              <p style={{ position: "relative", zIndex: 2 }}>Tap to start</p>
            </div>
          ) : (
            // YouTube iframe — autoplay=1 менен
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&loop=1&playlist=${VIDEO_ID}&rel=0&modestbranding=1`}
              className={styles.video}
              allow="autoplay; fullscreen"
              allowFullScreen
              style={{ border: "none" }}
            />
          )}
        </div>

        {started && (
          <div className={styles.controls}>
            <button className={styles.btnNext} onClick={onNext}>
              Дальше →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
