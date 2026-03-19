'use client'

import { useEffect, useState } from 'react'
import { Github, GitCommitHorizontal } from 'lucide-react'

interface Day {
  date: string
  count: number
}

interface Commit {
  message: string
  repo: string
  date: string
  sha: string
}

interface ContributionData {
  days: Day[]
  totalContributions: number
  recentCommits: Commit[]
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function getIntensity(count: number): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

function formatRelativeDate(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function GitHubActivity() {
  const [data, setData] = useState<ContributionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  useEffect(() => {
    fetch('/api/github/contributions')
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false))
  }, [])

  // Build weeks grid: group days into columns of 7 (Sun–Sat)
  const buildWeeks = (days: Day[]) => {
    const weeks: Day[][] = []
    // Pad the start so the first day lands on the correct day-of-week
    const firstDayOfWeek = new Date(days[0].date).getDay() // 0=Sun
    const padded: (Day | null)[] = [...Array(firstDayOfWeek).fill(null), ...days]
    for (let i = 0; i < padded.length; i += 7) {
      weeks.push(padded.slice(i, i + 7) as Day[])
    }
    return weeks
  }

  // Get month label positions for the week columns
  const getMonthPositions = (weeks: (Day | null)[][]) => {
    const positions: { label: string; col: number }[] = []
    let lastMonth = -1
    weeks.forEach((week, col) => {
      const firstDay = week.find((d) => d !== null)
      if (!firstDay) return
      const month = new Date(firstDay.date).getMonth()
      if (month !== lastMonth) {
        positions.push({ label: MONTH_LABELS[month], col })
        lastMonth = month
      }
    })
    return positions
  }

  if (loading) {
    return (
      <div className="github-activity-card card">
        <div className="card-header">
          <Github size={20} className="card-header-icon" />
          GitHub Activity
        </div>
        <div className="github-skeleton">
          <div className="skeleton-heatmap" />
        </div>
      </div>
    )
  }

  if (!data || !data.days?.length) return null

  const weeks = buildWeeks(data.days)
  const monthPositions = getMonthPositions(weeks)

  return (
    <div className="github-activity-card card">
      <div className="card-header">
        <Github size={20} className="card-header-icon" />
        GitHub Activity
      </div>

      {/* Stats row */}
      <div className="github-stats-row">
        <span className="github-total">
          <span className="github-total-count">{data.totalContributions}</span>
          &nbsp;contributions in the last year
        </span>
      </div>

      {/* Heatmap */}
      <div className="heatmap-wrapper">
        {/* Month labels */}
        <div className="heatmap-months">
          <div className="heatmap-day-labels-spacer" />
          <div className="heatmap-month-track">
            {monthPositions.map(({ label, col }) => (
              <span
                key={`${label}-${col}`}
                className="heatmap-month-label"
                style={{ gridColumnStart: col + 1 }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="heatmap-body">
          {/* Day-of-week labels */}
          <div className="heatmap-day-labels">
            {DAY_LABELS.map((d, i) => (
              <span key={d} className="heatmap-day-label" style={{ gridRow: i + 1 }}>
                {i % 2 !== 0 ? d : ''}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="heatmap-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="heatmap-week">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week[di] ?? null
                  const intensity = day ? getIntensity(day.count) : -1
                  return (
                    <div
                      key={di}
                      className={`heatmap-cell intensity-${intensity === -1 ? 'empty' : intensity}`}
                      onMouseEnter={(e) => {
                        if (!day) return
                        const rect = (e.target as HTMLElement).getBoundingClientRect()
                        setTooltip({
                          text: `${day.count} commit${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
                          x: rect.left + rect.width / 2,
                          y: rect.top - 8,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="heatmap-legend">
          <span className="heatmap-legend-label">Less</span>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={`heatmap-cell intensity-${i}`} />
          ))}
          <span className="heatmap-legend-label">More</span>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="heatmap-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      {/* Recent Commits */}
      {data.recentCommits.length > 0 && (
        <div className="github-commits">
          <div className="github-commits-title">Recent Commits</div>
          {data.recentCommits.slice(0, 6).map((commit, i) => (
            <div key={i} className="github-commit-item">
              <GitCommitHorizontal size={14} className="commit-icon" />
              <div className="commit-details">
                <span className="commit-message">{commit.message}</span>
                <div className="commit-meta">
                  <span className="commit-repo">{commit.repo}</span>
                  <span className="commit-sha">{commit.sha}</span>
                  <span className="commit-date">{formatRelativeDate(commit.date)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
