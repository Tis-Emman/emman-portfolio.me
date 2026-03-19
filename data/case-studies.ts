export interface SectionHighlight {
  icon: string
  title: string
  description: string
}

export interface CaseStudySection {
  title: string
  description: string
  highlights?: SectionHighlight[]
  screenshots: string[]
}

export interface CaseStudy {
  slug: string
  title: string
  tagline: string
  description: string
  role: string
  type: string
  year: number
  status: 'Completed' | 'In Progress' | 'Archived'
  technologies: string[]
  githubLink: string
  liveLink: string
  thumbnail: string
  features: string[]
  sections: CaseStudySection[]
}

const caseStudies: CaseStudy[] = [
  {
    slug: 'cogni-lab',
    title: 'Cogni-Lab Information System',
    tagline: 'A comprehensive information system for a local laboratory.',
    description:
      'Cogni-Lab is a full-stack laboratory information system designed to streamline day-to-day operations of a local medical laboratory. It handles patient records, test requests, result management, and user role-based access control.',
    role: 'Lead Developer',
    type: 'Web Application',
    year: 2026,
    status: 'Completed',
    technologies: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
    githubLink: '',
    liveLink: '',
    thumbnail: '/images/projects/CogniLab.png',
    features: [
      'Role-based access control (Admin, Staff, Viewer)',
      'Patient record management with search and filtering',
      'Test request and result tracking',
      'Real-time data updates via Supabase',
      'Reporting and data export tools',
      'Audit logs for all user actions',
    ],
    sections: [
      {
        title: 'Dashboard Overview',
        description:
          'The main dashboard serves as the command center for lab staff — offering live data at a glance so nothing gets missed during a busy shift.',
        highlights: [
          {
            icon: 'Activity',
            title: 'Live Metric Cards',
            description:
              'Real-time counters display total patients, pending results, released results, and unpaid billings — all updated instantly via Supabase.',
          },
          {
            icon: 'Zap',
            title: 'Quick Actions Panel',
            description:
              'One-click shortcuts for the most common tasks: adding a new patient, entering test results, and managing billing invoices.',
          },
          {
            icon: 'PieChart',
            title: 'Tests by Lab Section',
            description:
              'A visual chart breaks down active test requests grouped by laboratory section, helping staff prioritize workload efficiently.',
          },
          {
            icon: 'ClipboardList',
            title: 'Result Status Distribution',
            description:
              'An at-a-glance chart shows the ratio of pending vs. released results, so supervisors can quickly spot processing bottlenecks.',
          },
        ],
        screenshots: [
          '/images/projects/cogni-lab-assets/dashboard/dashboard-overview.png',
        ],
      },
      {
        title: 'Patient Management',
        description:
          'A centralized module for managing the full patient lifecycle — from registration to test history — giving staff a complete and organized view of every patient in the system.',
        screenshots: [
          '/images/projects/cogni-lab-assets/patient-management/patient-management-overview.png',
          '/images/projects/cogni-lab-assets/patient-management/patient-management-demographics-form.png',
          '/images/projects/cogni-lab-assets/patient-management/patient-management-demographics-edit-form.png',
          '/images/projects/cogni-lab-assets/patient-management/patient-management-demographics-delete.png',
          '/images/projects/cogni-lab-assets/patient-management/patient-management-test-request-overview.png',
        ],
        highlights: [
          {
            icon: 'Users',
            title: 'Patient List Overview',
            description:
              'A paginated table displays all registered patients with their key details, making it easy to browse and manage a growing patient database.',
          },
          {
            icon: 'Search',
            title: 'Search & Filter',
            description:
              'Staff can instantly search patients by name or ID and filter by relevant criteria, cutting down lookup time during busy lab hours.',
          },
          {
            icon: 'FileText',
            title: 'Demographics Form',
            description:
              'A structured form captures complete patient demographic data — name, age, sex, address, and contact info — upon registration or update.',
          },
          {
            icon: 'ClipboardList',
            title: 'Test Request History',
            description:
              'Each patient profile includes a full log of past and active test requests, giving staff full context before processing any new order.',
          },
        ],
      },
      {
        title: 'Test & Results Module',
        description:
          'Manages the full lifecycle of a laboratory test — from request to result entry and final report generation.',
        screenshots: [],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export default caseStudies
