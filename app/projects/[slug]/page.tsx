import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Activity,
  Zap,
  PieChart,
  ClipboardList,
  Users,
  Shield,
  Database,
  BarChart2,
  Search,
  Bell,
  FileText,
  Settings,
  type LucideIcon,
} from 'lucide-react'
import { getCaseStudy } from '@/data/case-studies'
import CsScreenshotGallery from '@/components/CsScreenshotGallery'

const ICON_MAP: Record<string, LucideIcon> = {
  Activity,
  Zap,
  PieChart,
  ClipboardList,
  Users,
  Shield,
  Database,
  BarChart2,
  Search,
  Bell,
  FileText,
  Settings,
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getCaseStudy(slug)

  if (!project) notFound()

  return (
    <div className="case-study-page">
      {/* Slim top nav */}
      <div className="case-study-topnav">
        <div className="container">
          <Link href="/" className="case-study-back">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Two-column body */}
      <div className="container case-study-layout">

        {/* LEFT: Sidebar */}
        <aside className="cs-sidebar">

          <div className="cs-sidebar-card">
            <h3 className="cs-sidebar-title">Project Overview</h3>
            <div className="cs-overview-list">
              <div className="cs-overview-item">
                <span className="cs-overview-label">Role</span>
                <span className="cs-overview-value">{project.role}</span>
              </div>
              <div className="cs-overview-item">
                <span className="cs-overview-label">Type</span>
                <span className="cs-overview-value">{project.type}</span>
              </div>
              <div className="cs-overview-item">
                <span className="cs-overview-label">Year</span>
                <span className="cs-overview-value">{project.year}</span>
              </div>
              <div className="cs-overview-item">
                <span className="cs-overview-label">Status</span>
                <span className={`case-study-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </div>
            </div>
          </div>

          <div className="cs-sidebar-card">
            <h3 className="cs-sidebar-title">Tech Stack</h3>
            <div className="case-study-tech-stack">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>

          <div className="cs-sidebar-card">
            <h3 className="cs-sidebar-title">Key Features</h3>
            <div className="cs-features-list">
              {project.features.map((feature, i) => (
                <div key={i} className="cs-feature-item">
                  <CheckCircle2 size={13} className="cs-feature-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {(project.githubLink || project.liveLink) && (
            <div className="cs-sidebar-card cs-sidebar-links">
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="cs-link-btn">
                  View on GitHub
                </a>
              )}
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="cs-link-btn cs-link-btn-primary">
                  <ExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>
          )}

        </aside>

        {/* RIGHT: Main content */}
        <main className="cs-main">

          {/* Project title */}
          <div className="cs-project-title-block">
            <div className="case-study-meta-row">
              <span className="case-study-type">{project.type}</span>
              <span className={`case-study-status status-${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
            <h1 className="cs-project-title">{project.title}</h1>
            <p className="case-study-tagline">{project.tagline}</p>
          </div>

          <div className="cs-section">
            <h2>About the Project</h2>
            <p className="cs-description">{project.description}</p>
          </div>

          {project.sections.map((section, i) => {
            return (
              <div key={i} className="cs-section">
                <h2>{section.title}</h2>
                <p className="cs-description">{section.description}</p>

                {section.screenshots.length > 0 ? (
                  <CsScreenshotGallery
                    screenshots={section.screenshots}
                    sectionTitle={section.title}
                  />
                ) : (
                  <div className="cs-screenshot-placeholder">
                    <span>Screenshots coming soon</span>
                  </div>
                )}

                {section.highlights && section.highlights.length > 0 && (
                  <div className="cs-highlights-grid">
                    {section.highlights.map((h, hi) => {
                      const Icon = ICON_MAP[h.icon]
                      return (
                        <div key={hi} className="cs-highlight-item">
                          {Icon && (
                            <div className="cs-highlight-icon">
                              <Icon size={16} />
                            </div>
                          )}
                          <div>
                            <p className="cs-highlight-title">{h.title}</p>
                            <p className="cs-highlight-desc">{h.description}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

        </main>
      </div>

      <footer>
        <p>&copy; 2026 Emmanuel Dela Pena. All Rights Reserved.</p>
        <p>Developed in Baliuag City, Bulacan, Philippines</p>
      </footer>
    </div>
  )
}
