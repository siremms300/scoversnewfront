'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, BookOpen, Award, Globe, Clock, Users, TrendingUp, ChevronRight, GraduationCap } from 'lucide-react'
import CourseCard from '@/components/courses/CourseCard'
import CourseFilterPanel from '@/components/courses/CourseFilter'

// Sample data - in production, this would come from an API
const courses = [
  {
    id: 'cs-stanford',
    name: 'Computer Science',
    level: 'Undergraduate',
    duration: '4 years',
    university: {
      id: 'stanford',
      name: 'Stanford University',
      location: 'Stanford, California, USA',
      ranking: 3,
      image: '/api/placeholder/400/250'
    },
    tuition: {
      domestic: '$56,169',
      international: '$56,169'
    },
    requirements: {
      gpa: 3.9,
      languageTests: {
        toefl: 100,
        ielts: 7.0
      },
      standardizedTests: {
        sat: 1500
      }
    },
    description: 'Comprehensive computer science program covering algorithms, AI, systems, and software engineering.',
    careerOutcomes: ['Software Engineer', 'Data Scientist', 'ML Engineer', 'Product Manager'],
    scholarships: 45,
    popularity: 95,
    applicationDeadline: '2024-12-15',
    intake: ['Fall'],
    featured: true
  },
  {
    id: 'mba-harvard',
    name: 'Master of Business Administration',
    level: 'Graduate',
    duration: '2 years',
    university: {
      id: 'harvard',
      name: 'Harvard Business School',
      location: 'Boston, Massachusetts, USA',
      ranking: 1,
      image: '/api/placeholder/400/250'
    },
    tuition: {
      domestic: '$73,440',
      international: '$73,440'
    },
    requirements: {
      gpa: 3.7,
      languageTests: {
        toefl: 109,
        ielts: 7.5
      },
      standardizedTests: {
        gmat: 730
      }
    },
    description: 'World-renowned MBA program focusing on leadership, entrepreneurship, and global business strategy.',
    careerOutcomes: ['Management Consultant', 'Investment Banker', 'Tech Executive', 'Entrepreneur'],
    scholarships: 38,
    popularity: 98,
    applicationDeadline: '2024-09-05',
    intake: ['Fall'],
    featured: true
  },
  {
    id: 'medicine-cambridge',
    name: 'Medicine',
    level: 'Undergraduate',
    duration: '6 years',
    university: {
      id: 'cambridge',
      name: 'University of Cambridge',
      location: 'Cambridge, England, UK',
      ranking: 2,
      image: '/api/placeholder/400/250'
    },
    tuition: {
      domestic: '£9,250',
      international: '£63,990'
    },
    requirements: {
      gpa: 3.8,
      languageTests: {
        ielts: 7.5
      },
      standardizedTests: {
        bmat: 6.0
      }
    },
    description: 'Comprehensive medical program with clinical training and research opportunities.',
    careerOutcomes: ['Doctor', 'Surgeon', 'Researcher', 'Medical Specialist'],
    scholarships: 52,
    popularity: 92,
    applicationDeadline: '2024-10-15',
    intake: ['Fall'],
    featured: false
  },
  {
    id: 'cs-mit',
    name: 'Computer Science and Engineering',
    level: 'Undergraduate',
    duration: '4 years',
    university: {
      id: 'mit',
      name: 'Massachusetts Institute of Technology',
      location: 'Cambridge, Massachusetts, USA',
      ranking: 1,
      image: '/api/placeholder/400/250'
    },
    tuition: {
      domestic: '$53,790',
      international: '$53,790'
    },
    requirements: {
      gpa: 4.0,
      languageTests: {
        toefl: 100,
        ielts: 7.0
      },
      standardizedTests: {
        sat: 1540
      }
    },
    description: 'Cutting-edge computer science program with strong focus on research and innovation.',
    careerOutcomes: ['AI Researcher', 'Software Architect', 'Systems Engineer', 'Tech Entrepreneur'],
    scholarships: 42,
    popularity: 97,
    applicationDeadline: '2025-01-01',
    intake: ['Fall'],
    featured: true
  },
  {
    id: 'engineering-toronto',
    name: 'Mechanical Engineering',
    level: 'Undergraduate',
    duration: '4 years',
    university: {
      id: 'toronto',
      name: 'University of Toronto',
      location: 'Toronto, Ontario, Canada',
      ranking: 18,
      image: '/api/placeholder/400/250'
    },
    tuition: {
      domestic: 'CAD 14,180',
      international: 'CAD 60,000'
    },
    requirements: {
      gpa: 3.5,
      languageTests: {
        toefl: 90,
        ielts: 6.5
      }
    },
    description: 'Comprehensive mechanical engineering program with co-op opportunities.',
    careerOutcomes: ['Mechanical Engineer', 'Design Engineer', 'Project Manager', 'Consultant'],
    scholarships: 35,
    popularity: 85,
    applicationDeadline: '2025-01-15',
    intake: ['Fall', 'Winter'],
    featured: false
  },
  {
    id: 'business-melbourne',
    name: 'Bachelor of Commerce',
    level: 'Undergraduate',
    duration: '3 years',
    university: {
      id: 'melbourne',
      name: 'University of Melbourne',
      location: 'Melbourne, Victoria, Australia',
      ranking: 33,
      image: '/api/placeholder/400/250'
    },
    tuition: {
      domestic: 'AUD 14,630',
      international: 'AUD 45,000'
    },
    requirements: {
      gpa: 3.3,
      languageTests: {
        ielts: 6.5
      }
    },
    description: 'Flexible commerce degree with majors in finance, accounting, and marketing.',
    careerOutcomes: ['Accountant', 'Financial Analyst', 'Marketing Manager', 'Business Consultant'],
    scholarships: 28,
    popularity: 80,
    applicationDeadline: '2024-12-01',
    intake: ['Semester 1', 'Semester 2'],
    featured: false
  }
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredCourses, setFilteredCourses] = useState(courses)
  const [activeFilters, setActiveFilters] = useState({
    level: '',
    country: '',
    duration: '',
    tuitionRange: '',
    scholarship: false,
    intake: ''
  })

  useEffect(() => {
    let results = courses
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.careerOutcomes.some(outcome => outcome.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply level filter
    if (activeFilters.level) {
      results = results.filter(course => course.level === activeFilters.level)
    }

    // Apply country filter
    if (activeFilters.country) {
      results = results.filter(course => 
        course.university.location.toLowerCase().includes(activeFilters.country.toLowerCase())
      )
    }

    // Apply scholarship filter
    if (activeFilters.scholarship) {
      results = results.filter(course => course.scholarships > 30)
    }

    setFilteredCourses(results)
  }, [searchTerm, activeFilters])

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters({ ...activeFilters, ...newFilters })
  }

  const popularFields = [
    { name: 'Computer Science', icon: '💻', count: 320 },
    { name: 'Business Administration', icon: '📊', count: 280 },
    { name: 'Mechanical Engineering', icon: '⚙️', count: 195 },
    { name: 'Medicine', icon: '⚕️', count: 150 },
    { name: 'Data Science', icon: '📈', count: 180 },
    { name: 'Artificial Intelligence', icon: '🤖', count: 140 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Find Your
              <span className="block text-emerald-300">Dream Course</span>
            </h1>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-12">
              Discover 2,000+ programs worldwide. Filter by field, level, location, and connect directly with universities.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-white rounded-xl p-2 shadow-2xl">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                        <input
                          type="text"
                          placeholder="Search courses, programs, or universities..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border-0 focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 font-semibold"
                    >
                      <Filter size={20} />
                      Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">2,000+</div>
              <div className="text-gray-600">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">85%</div>
              <div className="text-gray-600">Acceptance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$50M+</div>
              <div className="text-gray-600">Scholarships</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <CourseFilterPanel 
              onFilterChange={handleFilterChange} 
              activeFilters={activeFilters}
            />
          </div>

          {/* Courses Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredCourses.length} Courses Found
                </h2>
                <p className="text-gray-600">Sorted by popularity</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Sort by: Popularity</option>
                <option>Sort by: Tuition (Low to High)</option>
                <option>Sort by: Tuition (High to Low)</option>
                <option>Sort by: University Ranking</option>
                <option>Sort by: Application Deadline</option>
              </select>
            </div>

            <div className="space-y-6">
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  index={index}
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-20">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            )}

            {/* Popular Fields of Study */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Popular Fields of Study
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {popularFields.map((field, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                  >
                    <div className="text-2xl mb-2">{field.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">{field.name}</h4>
                    <div className="text-sm text-emerald-600 font-semibold">
                      {field.count.toLocaleString()} programs
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}