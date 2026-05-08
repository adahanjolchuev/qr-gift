"use client";
import { useState, useEffect, useRef } from "react";
import OpenCard from "@/components/OpenCard";
import Intro from "@/components/Intro";
import VideoSection from "@/components/VideoSection";
import Gallery from "@/components/Gallery";
import OurStory from "@/components/OurStory";
import Congrats from "@/components/Congrats";

export default function Home() {
  const [step, setStep] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/музыка.mp3");
    audio.loop = true;
    audio.volume = 0.9;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const startMusic = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    audioRef.current?.play().catch(() => {});
  };

  const next = () => setStep((prev) => prev + 1);

  const handleOpen = () => {
    startMusic();
    next();
  };

  // 🔥 ВАЖНО: scroll top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  return (
    <main className="container">
      {step === 0 && <OpenCard onYes={handleOpen} />}
      {step === 1 && <Intro onNext={next} />}
      {step === 2 && <VideoSection onNext={next} />}
      {step === 3 && <OurStory onNext={next} />}
      {step === 4 && <Gallery onNext={next} />}
      {step === 5 && <Congrats />}
    </main>
  );
}
