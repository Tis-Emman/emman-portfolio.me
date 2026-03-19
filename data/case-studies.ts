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
        title: 'Test Request',
        description:
          'Staff can create and manage laboratory test requests linked directly to a patient, with support for selecting multiple tests across different lab sections in a single order.',
        screenshots: [
          '/images/projects/cogni-lab-assets/test-request/test-request-overview.png',
          '/images/projects/cogni-lab-assets/test-request/test-request-records.png',
          '/images/projects/cogni-lab-assets/test-request/test-request-new-form.png',
        ],
        highlights: [
          {
            icon: 'ClipboardList',
            title: 'Request Overview',
            description:
              'A master list of all test requests across patients, showing request status, assigned lab section, and creation date at a glance.',
          },
          {
            icon: 'FileText',
            title: 'Request Records',
            description:
              'Detailed records per request include the ordered tests, requesting physician, and a full trail of status changes from submission to completion.',
          },
          {
            icon: 'Zap',
            title: 'New Request Form',
            description:
              'Staff can quickly file a new test request by selecting the patient, choosing tests from a structured catalog, and submitting in one step.',
          },
          {
            icon: 'Activity',
            title: 'Status Tracking',
            description:
              'Every request moves through clearly defined statuses — Pending, In Progress, and Completed — so staff always know where each order stands.',
          },
        ],
      },
      {
        title: 'Billing',
        description:
          'The billing module tracks payment status for each test request, generates invoices, and flags unpaid billings — keeping the lab\'s financial records clean and up to date.',
        screenshots: [
          '/images/projects/cogni-lab-assets/billing/billing-management-overview.png',
        ],
        highlights: [
          {
            icon: 'FileText',
            title: 'Billing Overview',
            description:
              'A consolidated table lists all billing records tied to test requests, showing amount, payment status, and the associated patient at a glance.',
          },
          {
            icon: 'Activity',
            title: 'Payment Status Tracking',
            description:
              'Each billing record is tagged as Paid or Unpaid, making it easy for staff to follow up on outstanding balances without digging through records.',
          },
          {
            icon: 'Zap',
            title: 'Invoice Generation',
            description:
              'Staff can generate a printable invoice for any test request directly from the billing module, ready for patient pickup or official filing.',
          },
          {
            icon: 'BarChart2',
            title: 'Unpaid Billing Alerts',
            description:
              'Unpaid billings are surfaced on the dashboard metric card so supervisors are always aware of outstanding collections without manually checking records.',
          },
        ],
      },
      {
        title: 'Specimen Tracking',
        description:
          'Tracks the physical status of collected specimens throughout the testing process, ensuring no sample is lost or left unprocessed.',
        screenshots: [
          '/images/projects/cogni-lab-assets/specimen-tracking/specimen-tracking-overview.png',
        ],
        highlights: [
          {
            icon: 'Database',
            title: 'Specimen Overview',
            description:
              'A dedicated table lists all collected specimens with their associated test request, collection date, and current processing status.',
          },
          {
            icon: 'Activity',
            title: 'Status Progression',
            description:
              'Specimens move through defined statuses — Collected, In Processing, and Done — giving lab staff a clear view of where each sample stands.',
          },
          {
            icon: 'Search',
            title: 'Quick Lookup',
            description:
              'Staff can search and filter specimens by patient or test type, making it fast to locate a specific sample during a busy processing run.',
          },
          {
            icon: 'Shield',
            title: 'Traceability',
            description:
              'Every specimen is tied to a specific test request and patient record, maintaining a full chain of custody from collection to result entry.',
          },
        ],
      },
      {
        title: 'Test Results',
        description:
          'Lab staff can encode and review test results per request, with structured input fields per test type and a clear release workflow before results are made visible.',
        screenshots: [
          '/images/projects/cogni-lab-assets/test-results/test-results-overview.png',
        ],
        highlights: [
          {
            icon: 'ClipboardList',
            title: 'Results Overview',
            description:
              'A consolidated list shows all test results across requests, with columns for patient, test type, encoded values, and release status.',
          },
          {
            icon: 'FileText',
            title: 'Structured Result Entry',
            description:
              'Each test type has its own input schema — staff fill in specific fields like reference ranges and measured values, reducing encoding errors.',
          },
          {
            icon: 'Shield',
            title: 'Release Workflow',
            description:
              'Results go through a review step before being marked as released, ensuring no unverified result is accidentally made available.',
          },
          {
            icon: 'Activity',
            title: 'Pending vs. Released Tracking',
            description:
              'Staff can filter by status to see which results still need encoding and which have already been released, keeping the queue organized.',
          },
        ],
      },
      {
        title: 'Reports',
        description:
          'Generates printable and exportable reports for individual test results and patient summaries, formatted for clinical use and ready for physician review.',
        screenshots: [
          '/images/projects/cogni-lab-assets/reports/reports-overview.png',
        ],
        highlights: [
          {
            icon: 'FileText',
            title: 'Printable Reports',
            description:
              'Staff can generate a formatted, print-ready report for any completed test request — structured for clinical handoff to the requesting physician.',
          },
          {
            icon: 'BarChart2',
            title: 'Summary Reports',
            description:
              'Aggregate reports give supervisors a period-based overview of total tests conducted, results released, and billing collected.',
          },
          {
            icon: 'Search',
            title: 'Report Lookup',
            description:
              'Reports can be filtered by date range, patient, or test type, making it easy to pull up historical records when needed.',
          },
          {
            icon: 'Database',
            title: 'Export Ready',
            description:
              'Reports are structured for easy export, supporting documentation requirements for audits, accreditation, and clinical compliance.',
          },
        ],
      },
      {
        title: 'Access History',
        description:
          'A full audit log records every significant action performed in the system — who accessed what, and when — supporting accountability and compliance tracking.',
        screenshots: [
          '/images/projects/cogni-lab-assets/access-history/access-history-overiew.png',
        ],
        highlights: [
          {
            icon: 'Shield',
            title: 'Full Audit Log',
            description:
              'Every create, update, and delete action is automatically logged with the responsible user, timestamp, and affected record — nothing goes untracked.',
          },
          {
            icon: 'Users',
            title: 'User Activity Monitoring',
            description:
              'Supervisors can filter the log by user to review what any staff member has done within a given period, supporting internal accountability.',
          },
          {
            icon: 'Search',
            title: 'Searchable History',
            description:
              'The log is fully searchable and filterable by date, action type, and module — making it fast to trace back any change in the system.',
          },
          {
            icon: 'Database',
            title: 'Compliance Support',
            description:
              'The audit trail serves as a tamper-evident record for compliance reviews, accreditation requirements, and any investigation into data discrepancies.',
          },
        ],
      },
      {
        title: 'Profile',
        description:
          'Each user has a personal profile page where they can view their account details and role assignments within the system.',
        screenshots: [
          '/images/projects/cogni-lab-assets/profile/my-profile-overview.png',
        ],
        highlights: [
          {
            icon: 'Users',
            title: 'Account Details',
            description:
              'Users can view their personal information including name, email, and account credentials tied to their system login.',
          },
          {
            icon: 'Shield',
            title: 'Role Assignment',
            description:
              'Each profile clearly displays the user\'s assigned role — Admin, Staff, or Viewer — defining what actions and modules they have access to.',
          },
          {
            icon: 'Settings',
            title: 'Profile Management',
            description:
              'Users can update their profile details and manage their account settings directly from this page without admin intervention.',
          },
          {
            icon: 'Activity',
            title: 'Session Awareness',
            description:
              'The profile page reflects the currently active session, ensuring users always know which account they are operating under.',
          },
        ],
      },
    ],
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}

export default caseStudies
