"use client";

import { useState } from "react";
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";
import { Mail, PhoneCall, FileText, Users } from "lucide-react";
import CvPopup from "./CvPopup";
import Link from "next/link";

export default function Contact() {
  const [showCvPopup, setShowCvPopup] = useState(false);

  return (
    <div className="contact-section">
      <h2 className="contact-heading">Let's work together.</h2>
      <p className="contact-description">
        I am applying for a junior web developer position while continuing my
        academic studies and managing my business.
      </p>

      <p className="contact-section-label">Get in Touch</p>

      <div className="contact-grid">
        <div className="contact-method">
          <Mail size={18} className="contact-method-icon" />
          <h4>Email</h4>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=emmandelapena755@gmail.com" target="_blank" rel="noopener noreferrer">
            emmandelapena755@gmail.com
          </a>
        </div>

        <div className="contact-method">
          <PhoneCall size={18} className="contact-method-icon" />
          <h4>Let's Talk</h4>
          <a href="https://calendly.com/emmandelapena755" target="_blank" rel="noopener noreferrer">
            Schedule a Call
          </a>
        </div>

        <div className="contact-method">
          <FileText size={18} className="contact-method-icon" />
          <h4>View my CV</h4>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCvPopup(true); }}>
            Click here to view
          </a>
        </div>

        <div className="contact-method">
          <Users size={18} className="contact-method-icon" />
          <h4>Community Hub</h4>
          <Link href="/community">Join Now!</Link>
        </div>
      </div>

      <div className="contact-socials">
        <p className="contact-section-label">Socials</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/emmanuel-dela-pena-328433347/" className="social-icon" title="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Tis-Emman" className="social-icon" title="GitHub" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.facebook.com/emman.delapena.144" className="social-icon" title="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/emman.delapena.50" className="social-icon" title="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>

      {showCvPopup && <CvPopup onClose={() => setShowCvPopup(false)} />}
    </div>
  );
}
