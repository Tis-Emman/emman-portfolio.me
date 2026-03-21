import Image from 'next/image'
import Link from 'next/link'

export default function Projects() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>Projects</h2>
        <Link href="/projects" className="view-all">
          View All →
        </Link>
      </div>

      <div className="projects-grid">
            {/* Project Card 1: Cogni-Lab */}
            <Link href="/projects/cogni-lab" className="project-card">
              <Image
                src="/images/projects/CogniLab.png"
                alt="Cogni-Lab Information System"
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>Cogni-Lab Information System</h3>
                <p className="project-description">
                  A comprehensive information system for a local laboratory.
                </p>
                <span className="project-link">View Case Study</span>
              </div>
            </Link>

            {/* Project Card 2: E Tour Travels */}
            <div className="project-card">
              <Image
                src="/images/projects/emeren_inventory.png"
                alt="EMEREN Inventory System" 
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>EMEREN Inventory System</h3>
                <p className="project-description">
                  An inventory management system for a local business.
                </p>
                <a href="https://github.com/Tis-Emman/EMEREN-Inventory" className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>

            {/* Project Card 3: Sinervet VetHub */}
            <div className="project-card">
              <Image
                src="/images/projects/sinervet-updated.png"
                alt="Sinervet VetHub" 
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>Sinervet VetHub</h3>
                <p className="project-description">
                  A comprehensive website for veterinary services at local town. Features appointment booking and pet records.
                </p>
                <a href="https://github.com/Tis-Emman/PetSineVet" className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>

             <div className="project-card">
              <Image
                src="/images/projects/korean_express.png"
                alt="E Tour Travels" 
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>Korean Express</h3>
                <p className="project-description">
                  A modern Korean grocery delivery platform offering authentic ingredients and fast, reliable service.
                </p>
                <a href="https://github.com/Tis-Emman/KoreanExpress" className="project-link" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </div>
            </div>

      </div>
    </div>
  )
}