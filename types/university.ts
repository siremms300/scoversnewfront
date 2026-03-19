export interface Program {
  id: string
  name: string
  level: 'Undergraduate' | 'Graduate' | 'PhD' | 'Diploma'
  duration: string // e.g., "4 years", "2 years"
  tuition: {
    domestic: string
    international: string
  }
  applicationDeadline: string
  intake: string[] // e.g., ["Fall", "Spring"]
  requirements: {
    gpa: number
    languageTests: {
      toefl?: number
      ielts?: number
      pte?: number
    }
    standardizedTests?: {
      sat?: number
      gre?: number
      gmat?: number
    }
  }
  description: string
  careerOutcomes: string[]
  scholarships: number
  popularity: number // 1-100 scale
}

export interface University {
  id: string
  name: string
  location: {
    city: string
    country: string
    flag: string
  }
  ranking: {
    world: number
    national: number
    subject?: {
      [key: string]: number
    }
  }
  type: 'Public' | 'Private'
  established: number
  studentPopulation: {
    total: number
    international: number
  }
  acceptanceRate: number
  programs: Program[]
  tuitionRange: {
    min: string
    max: string
  }
  scholarships: {
    total: number
    averageAward: string
  }
  campusFeatures: string[]
  accreditation: string[]
  website: string
  image: string
  featured: boolean
  tags: string[]
}