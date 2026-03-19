import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'Tis-Emman'

export const dynamic = 'force-dynamic'

const GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`

export async function GET() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not set' }, { status: 500 })
  }

  try {
    // --- 1. Contribution calendar via GraphQL (exact same source as GitHub's heatmap) ---
    const gqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'User-Agent': 'emman-portfolio',
      },
      body: JSON.stringify({ query: GRAPHQL_QUERY, variables: { username: GITHUB_USERNAME } }),
      cache: 'no-store',
    })

    const gqlData = await gqlRes.json()

    if (gqlData.errors) {
      console.error('GraphQL errors:', gqlData.errors)
      return NextResponse.json({ error: gqlData.errors }, { status: 500 })
    }

    const calendar = gqlData?.data?.user?.contributionsCollection?.contributionCalendar
    const totalContributions: number = calendar?.totalContributions ?? 0

    // Flatten weeks → days
    const days: { date: string; count: number }[] = (calendar?.weeks ?? []).flatMap(
      (week: { contributionDays: { date: string; contributionCount: number }[] }) =>
        week.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount }))
    )

    // --- 2. Recent commits via REST Events API ---
    const eventsRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `Bearer ${token}`,
          'User-Agent': 'emman-portfolio',
        },
        cache: 'no-store',
      }
    )

    const events = eventsRes.ok ? await eventsRes.json() : []
    const recentCommits: { message: string; repo: string; date: string; sha: string }[] = []

    for (const event of events) {
      if (event.type !== 'PushEvent') continue
      const firstCommit = event.payload?.commits?.[0]
      if (firstCommit && recentCommits.length < 10) {
        recentCommits.push({
          message: firstCommit.message.split('\n')[0],
          repo: event.repo.name.replace(`${GITHUB_USERNAME}/`, ''),
          date: event.created_at,
          sha: firstCommit.sha.slice(0, 7),
        })
      }
    }

    return NextResponse.json({ days, totalContributions, recentCommits })
  } catch (error) {
    console.error('GitHub contributions error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
