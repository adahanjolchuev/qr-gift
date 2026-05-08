"use client";

import Image from "next/image";
import styles from "./Congrats.module.scss";
import dudu from "../../public/images/tenor.gif";

export default function Congrats() {
  return (
    <section className={styles.section}>

      {/* Aurora blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Floating hearts */}
      <div className={styles.hearts}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={styles.floatHeart}
            style={{
              left: `${(i / 24) * 100 + Math.random() * 4}%`,
              animationDelay: `${(i * 0.4) % 6}s`,
              animationDuration: `${5 + (i % 5)}s`,
              fontSize: `${8 + (i % 4) * 5}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Card */}
      <div className={styles.card}>

        {/* Top ornament */}
        <div className={styles.topOrnament}>
          <span className={styles.ornLine} />
          <span className={styles.ornDiamond} />
          <span className={styles.ornDiamond} />
          <span className={styles.ornDiamond} />
          <span className={styles.ornLine} />
        </div>

        {/* Corner accents */}
        <div className={`${styles.corner} ${styles.cornerTL}`} />
        <div className={`${styles.corner} ${styles.cornerTR}`} />
        <div className={`${styles.corner} ${styles.cornerBL}`} />
        <div className={`${styles.corner} ${styles.cornerBR}`} />

        <p className={styles.date}>— с днём рождения —</p>

        <h1 className={styles.name}>Моя любимая</h1>

        <div className={styles.sealRow}>
          <div className={styles.seal}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        <div className={styles.divider}>
          <span className={styles.divLine} />
          <span className={styles.divText}>♥ ♥ ♥</span>
          <span className={styles.divLine} />
        </div>

        <p className={styles.text}>
          Сегодня особенный день — день, когда появилась ты.
          <br /><br />
          Ты делаешь мою жизнь теплее, ярче и счастливее просто тем, что
          существуешь. Каждый момент рядом с тобой — это подарок, который я не
          заслужил, но очень берегу.
          <br /><br />
          Желаю тебе всего, чего ты сама себе желаешь в этот день. Пусть этот
          год будет самым лёгким, самым нежным и самым счастливым в твоей жизни.
          <br /><br />
          Я люблю тебя. Сегодня, завтра и всегда.
        </p>

        <div className={styles.divider}>
          <span className={styles.divLine} />
          <span className={styles.divText}>♥ ♥ ♥</span>
          <span className={styles.divLine} />
        </div>

        <p className={styles.sign}>С любовью, только твой ♥</p>

        <div className={styles.gifWrap}>
          <Image src={dudu} alt="Kiss" width={200} height={200} />
        </div>

        {/* Bottom ornament */}
        <div className={styles.bottomOrnament}>
          <span className={styles.ornLine} />
          <span className={styles.ornDiamond} />
          <span className={styles.ornDiamond} />
          <span className={styles.ornDiamond} />
          <span className={styles.ornLine} />
        </div>

      </div>
    </section>
  );
}