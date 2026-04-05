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

            {/* Project Card 2: ByteShift */}
            <div className="project-card">
              <Image
                src="/images/projects/byteshift.png"
                alt="ByteShift"
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>ByteShift</h3>
                <p className="project-description">
                  A tech content platform for developers covering AI, dev tools, gaming culture, and productivity — with an interactive typing lab.
                </p>
              </div>
            </div>

            {/* Project Card 3: Sinervet VetHub */}
            <div className="project-card">
              <Image
                src="/images/projects/wivly-chat-app.png"
                alt="Wivly Chat App" 
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>Wivly Chat App</h3>
                <p className="project-description">
                  A full-stack, serverless real-time chat application built on AWS. 
                </p>
              </div>
            </div>

{/* Project Card 4: Nocturnal Pulse */}
             <div className="project-card">
              <Image
                src="/images/projects/nocturnal-pulse.png"
                alt="Nocturnal Pulse" 
                width={600}
                height={400}
                className="project-image"
              />
              <div className="project-content">
                <h3>Nocturnal Pulse</h3>
                <p className="project-description">
                  A budget tracking app for everyday uses.
                </p>
              </div>
            </div>


      </div>
    </div>
  )
}