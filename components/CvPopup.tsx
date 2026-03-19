"use client";

import { X, AlertCircle, Mail } from "lucide-react";

interface CvPopupProps {
  onClose: () => void;
}

export default function CvPopup({ onClose }: CvPopupProps) {
  return (
    <div className="cv-popup-modal active">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="cv-popup-content">
        <button className="close-popup-btn" onClick={onClose}>
          <X size={20} />
        </button>
        <div className="cv-popup-icon">
          <AlertCircle size={48} />
        </div>
        <h3>CV Not Available Yet</h3>
        <p>My CV is currently being updated and will be available soon. Please check back later or feel free to contact me directly.</p>
        <div className="cv-popup-actions">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=emmandelapena755@gmail.com&su=CV Request&body=Hi Emmanuel, I would like to request your CV."
            className="btn-request-cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <Mail size={16} />
            Request CV via Email
          </a>
          <button className="btn-close-popup" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
