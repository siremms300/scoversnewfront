'use client'

import { useState } from 'react'
import { BookOpen, Filter, ChevronRight, TrendingUp, Star, Users } from 'lucide-react'
import Link from 'next/link'

interface UniversityCoursesProps {
  universityId: string
}

// Sample courses data for the university
const coursesData = [
  {
    id: 'cs-stanford',
    name: 'Computer Science',
    level: 'Undergraduate',
    duration: '4 years',
    tuition: '$56,169/year',
    department: 'School of Engineering',
    popularity: 95,
    scholarships: 45,
    applicationDeadline: '2024-12-15'
  },
  {
    id: 'mba-stanford',
    name: 'MBA',
    level: 'Graduate',
    duration: '2 years',
    tuition: '$73,440/year',
    department: 'Graduate School of Business',
    popularity: 98,
    scholarships: 38,
    applicationDeadline: '2024-09-05'
  },
  {
    id: 'medicine-stanford',
    name: 'Medicine',
    level: 'Graduate',
    duration: '4 years',
    tuition: '$63,747/year',
    department: 'School of Medicine',
    popularity: 92,
    scholarships: 52,
    applicationDeadline: '2024-10-01'
  },
  {
    id: 'law-stanford',
    name: 'Law',
    level: 'Graduate',
    duration: '3 years',
    tuition: '$66,396/year',
    department: 'School of Law',
    popularity: 90,
    scholarships: 41,
    applicationDeadline: '2024-02-15'
  },
  {
    id: 'engineering-stanford',
    name: 'Mechanical Engineering',
    level: 'Undergraduate',
    duration: '4 years',
    tuition: '$56,169/year',
    department: 'School of Engineering',
    popularity: 88,
    scholarships: 35,
    applicationDeadline: '2024-12-15'
  },
  {
    id: 'education-stanford',
    name: 'Education',
    level: 'Graduate',
    duration: '2 years',
    tuition: '$52,479/year',
    department: 'School of Education',
    popularity: 85,
    scholarships: 28,
    applicationDeadline: '2025-01-05'
  }
]

const filters = [
  { value: 'all', label: 'All Programs' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'scholarship', label: 'Scholarships Available' }
]

export default function UniversityCourses({ universityId }: UniversityCoursesProps) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = coursesData.filter(course => {
    // Apply search filter
    if (searchTerm && !course.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }
    
    // Apply category filter
    if (activeFilter === 'undergraduate' && course.level !== 'Undergraduate') return false
    if (activeFilter === 'graduate' && course.level !== 'Graduate') return false
    if (activeFilter === 'popular' && course.popularity < 90) return false
    if (activeFilter === 'scholarship' && course.scholarships < 30) return false
    
    return true
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Programs & Courses</h3>
          <p className="text-gray-600">{filteredCourses.length} programs available</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter size={18} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === filter.value
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Courses grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {course.name}
                    </h4>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span className="px-3 py-1 bg-gray-100 rounded-full">
                        {course.level}
                      </span>
                      <span>{course.duration}</span>
                      <span>{course.department}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="fill-amber-400 text-amber-400" size={16} />
                    <span className="font-bold">{course.popularity}%</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tuition Fees</span>
                    <span className="font-bold text-gray-900">{course.tuition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Application Deadline</span>
                    <span className="font-medium text-gray-900">{course.applicationDeadline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available Scholarships</span>
                    <span className="font-bold text-green-600">{course.scholarships}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-6 border-t">
              <Link
                href={`/courses/${course.id}`}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold group/link"
              >
                View Program Details
                <ChevronRight className="group-hover/link:translate-x-1 transition-transform" size={18} />
              </Link>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
          <h4 className="text-xl font-bold text-gray-900 mb-2">No programs found</h4>
          <p className="text-gray-600">Try different search terms or filters</p>
        </div>
      )}

      {/* Statistics */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
        <h4 className="text-xl font-bold text-gray-900 mb-6">Program Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {coursesData.length}
            </div>
            <div className="text-gray-700">Total Programs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {Math.round(coursesData.reduce((acc, c) => acc + c.popularity, 0) / coursesData.length)}%
            </div>
            <div className="text-gray-700">Average Popularity</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {coursesData.reduce((acc, c) => acc + c.scholarships, 0)}
            </div>
            <div className="text-gray-700">Total Scholarships</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              98%
            </div>
            <div className="text-gray-700">Employment Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}