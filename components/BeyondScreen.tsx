"use client"

import { useEffect, useRef, useState } from 'react';
import { Target } from 'lucide-react';
import Image from 'next/image';

export default function BeyondScreen() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = scrollContainer.scrollLeft || 0;
    const scrollSpeed = 0.3;

    const scroll = () => {
      if (!isPaused) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  const hobbies = [
    { src: '/images/hobbies/hobby_1.png', alt: 'Muay Thai' },
    { src: '/images/hobbies/hobby_2.png', alt: 'Gym & Fitness' },
    { src: '/images/hobbies/codefest-cert.jpeg', alt: 'Dance & Travel' },
    { src: '/images/hobbies/hobby_1.png', alt: 'Muay Thai' },
    { src: '/images/hobbies/hobby_2.png', alt: 'Gym & Fitness' },
    { src: '/images/hobbies/codefest-cert.jpeg', alt: 'Dance & Travel' },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <Target className="card-header-icon" />
        Beyond the Screen
      </div>

      <p className="about-text beyond-text">
        Outside of work, I recharge by playing guitar, coding personal projects, and cooking. I also stay active with walks and exercise, which keeps me creative, curious, and balanced.
      </p>

      <div
        className="beyond-scroll-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div ref={scrollRef} className="beyond-scroll-track">
          {hobbies.map((hobby, index) => (
            <div key={index} className="hobby-card">
              <Image
                src={hobby.src}
                alt={hobby.alt}
                width={300}
                height={200}
                className="hobby-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
