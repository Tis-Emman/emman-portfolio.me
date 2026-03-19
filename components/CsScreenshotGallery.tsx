"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Props {
  screenshots: string[]
  sectionTitle: string
}

export default function CsScreenshotGallery({ screenshots, sectionTitle }: Props) {
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "auto"
    return () => { document.body.style.overflow = "auto" }
  }, [selected])

  return (
    <>
      <div className="cs-screenshots-grid">
        {screenshots.map((src, si) => (
          <div
            key={si}
            className="cs-screenshot"
            onClick={() => setSelected(src)}
          >
            <Image
              src={src}
              alt={`${sectionTitle} screenshot ${si + 1}`}
              width={800}
              height={500}
              className="cs-screenshot-img"
            />
          </div>
        ))}
      </div>

      {selected && (
        <div className="modal active" onClick={() => setSelected(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-modal" onClick={() => setSelected(null)}>
              &times;
            </span>
            <img src={selected} alt={sectionTitle} />
          </div>
        </div>
      )}
    </>
  )
}
