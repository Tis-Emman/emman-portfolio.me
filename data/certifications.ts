export interface Certification {
  name: string
  provider: string
  year: number
  img: string
}

// Add new certifications at the TOP — the component always shows the first 3
const certifications: Certification[] = [
  {
    name: "AWS Cloud Practitioner Essentials",
    provider: "AWS Skill Builder",
    year: 2026,
    img: "/images/certifications/aws-certificate.png",
  },
  {
    name: "Python Essentials 1",
    provider: "CISCO",
    year: 2026,
    img: "/images/certifications/python-essentials-1-certificate.png",
  },
  {
    name: "Intermediate Git",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/intermediate-git-certificate.png",
  },
  {
    name: "Introduction to Git",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/introduction-to-git-certificate.png",
  },
  {
    name: "Intermediate Java",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/intermediate-java-certificate.png",
  },
  {
    name: "Introduction to Java",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/introduction-to-java-certificate.png",
  },
  {
    name: "Associate Data Analyst",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/associate-data-analyst-certificate.png",
  },
  {
    name: "Associate SQL",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/associate-sql-certificate.png",
  },
  {
    name: "Introduction to SQL",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/introduction-to-SQL-certificate.png",
  },
  {
    name: "Data Literacy",
    provider: "DataCamp",
    year: 2025,
    img: "/images/certifications/data-literacy-certificate.png",
  },
]

export default certifications
