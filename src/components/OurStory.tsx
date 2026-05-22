"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import styles from "./OurStory.module.scss";
import storyPhoto from "../../public/images/storyPhotos4.jpg";
import storyPhotos from "../../public/images/storyPhotos.jpg";
import storyPhotos2 from "../../public/images/storyPhotos2.jpg";
import storyPhotos3 from "../../public/images/storyPhotos3.jpg";

import Stars from "./Stars";

const entries = [
  {
    date: "7 Августа 2023",
    title: "Наша первая встреча",
    text: "Тот самый день, когда мы впервые увидели друг друга вживую. Время будто остановилось, а сердце впервые забилось по-особенному.",
    even: true,
    image: storyPhoto,
  },
  {
    date: "Осень 2023",
    title: "Мы начали влюбляться",
    text: "Долгие разговоры ночами, смех без причины, забота в мелочах — именно тогда между нами появилось что-то настоящее и невероятно тёплое.",
    even: false,
    image: storyPhotos,
  },
  {
    date: "Декабрь 2023",
    title: "Самое важное “Да”",
    text: "В тот момент мир словно исчез вокруг. Остались только мы, наши чувства и обещание быть рядом несмотря ни на что.",
    even: true,
    image: storyPhotos2,
  },
  {
    date: "Сейчас",
    title: "И это только начало…",
    text: "Этот маленький сюрприз создан только для тебя ✨ Но самое главное — моя любовь к тебе становится сильнее с каждым новым днём. Спасибо, что ты есть в моей жизни ❤️",
    even: false,
    image: storyPhotos3,
    isFinal: true,
  },
];

interface Props {
  onNext: () => void;
}

type Heart = {
  id: number;
  x: number;
  y: number;
  icon: string;
};

export default function OurStory({ onNext }: Props) {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heartId = useRef(0);
  const [hearts, setHearts] = useState<Heart[]>([]);

  // Stars бир гана жолу render болот
  
  const starsBg = useMemo(() => <Stars />, []);

  // ─── Scroll animation ───
  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            const el = item.target as HTMLElement;
            const delay = parseInt(el.dataset.delay || "0");

            setTimeout(() => {
              el.classList.add(styles.visible);
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "30px",
      },
    );

    entryRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ─── Floating hearts ───
  useEffect(() => {
    const icons = ["❤️", "💕", "💗", "💖", "💝", "✨", "🌸", "🌷"];

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const id = heartId.current++;

          const newHeart: Heart = {
            id,
            x: e.clientX + (Math.random() - 0.5) * 40,
            y: e.clientY + (Math.random() - 0.5) * 20,
            icon: icons[Math.floor(Math.random() * icons.length)],
          };

          setHearts((prev) => [...prev, newHeart]);

          setTimeout(() => {
            setHearts((prev) => prev.filter((h) => h.id !== id));
          }, 2300);
        }, i * 70);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <section className={styles.page}>
      {starsBg}

      {/* HEADER */}
      <header className={styles.header}>
        <h1>Наша история</h1>
        <div className={styles.headerLine} />
      </header>

      {/* TIMELINE */}
      <div className={styles.entries}>
        {entries.map((entry, i) => (
          <div
            key={i}
            ref={(el) => {
              entryRefs.current[i] = el;
            }}
            className={`${styles.entry} ${entry.even ? styles.even : ""}`}
            data-delay={i * 120}
          >
            {/* IMAGE */}
            <div className={styles.imgCol}>
              <div className={styles.imgWrap}>
                <Image
                  src={entry.image}
                  alt={entry.title}
                  fill
                  className={styles.img}
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* TEXT */}
            <div className={styles.txtCol}>
              <span className={styles.dateBadge}>{entry.date}</span>

              <h2>{entry.title}</h2>

              <p>{entry.text}</p>

              {entry.isFinal && (
                <button className={styles.nextBtn} onClick={onNext}>
                  Дальше →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* HEARTS */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className={styles.heartFloat}
          style={{
            left: h.x,
            top: h.y,
          }}
        >
          {h.icon}
        </span>
      ))}
    </section>
  );
}
