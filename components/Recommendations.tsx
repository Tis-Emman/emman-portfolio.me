"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";

const recommendations = [
  {
    text: "I’ve had the opportunity to work with him for about a year, and I can confidently say he’s an exceptional individual when it comes to coding.",
    author: "Christian G.",
    role: "Colleague",
  },
  {
    text: "Emmanuel is a dedicated developer who always delivers clean, well-thought-out solutions. A great collaborator.",
    author: "John D.",
    role: "Project Partner",
  },                                                                                                                                                                                                            
  {
    text: "One of the most motivated students I've worked with. His attention to detail and drive to learn sets him apart.",
    author: "Prof. Santos",
    role: "Instructor",
  },
];

export default function Recommendations() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number, dir: "left" | "right") => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);                                                                                                                   
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };              

  const prev = () => goTo((current - 1 + recommendations.length) % recommendations.length, "left");
  const next = () => goTo((current + 1) % recommendations.length, "right");

  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [current]);

  return (
    <div className="card recommendations-card">
      <div className="card-header">
        <MessageCircle size={18} className="card-header-icon" />
        Recommendations
      </div>

      <div className="recommendation-slider">
        <div
          className={`recommendation-slide ${animating ? `slide-out-${direction}` : "slide-in"}`}
        >
          <p className="recommendation-text">
            &ldquo;{recommendations[current].text}&rdquo;
          </p>
          <div className="recommendation-author-row">
            <span className="recommendation-dash">—</span>
            <div>
              <span className="recommendation-author">{recommendations[current].author}</span>
              <span className="recommendation-role">{recommendations[current].role}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recommendation-footer">
        <button className="rec-arrow" onClick={prev} aria-label="Previous">
          <ChevronLeft size={14} />
        </button>

        <div className="carousel-dots">
          {recommendations.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i, i > current ? "right" : "left")}
            />
          ))}
        </div>

        <button className="rec-arrow" onClick={next} aria-label="Next">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
