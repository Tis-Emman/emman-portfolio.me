"use client";

import { Briefcase } from "lucide-react";

const experiences = [
  {
    title: "Practice Owner",
    company: "Emeren Refrigeration and Airconditioning Services",
    period: "2022 - Present",
    current: true,
  },
  {
    title: "IT Helpdesk",
    company: "Billy Booms Computer",
    period: "January 2024",
    current: false,
  },
];

export default function Experience() {
  return (
    <div className="card">
      <div className="card-header">
        <Briefcase size={20} />
        Experience
      </div>

      <div className="experience-timeline">
        {experiences.map((exp, i) => (
          <div key={i} className={`experience-timeline-item ${i === experiences.length - 1 ? 'last' : ''}`}>
            <div className="experience-timeline-track">
              <div className={`experience-dot ${exp.current ? 'active' : ''}`} />
              {i < experiences.length - 1 && <div className="experience-line" />}
            </div>
            <div className="experience-timeline-content">
              <div className="experience-timeline-header">
                <h4>{exp.title}</h4>
                <span className="period">{exp.period}</span>
              </div>
              <p className="company">{exp.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
