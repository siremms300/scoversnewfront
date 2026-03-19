'use client'

import { useState } from 'react'
import { BookOpen, Award, Globe, Clock, Users, DollarSign, Calendar, ChevronRight, GraduationCap, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface CourseCardProps {
  course: {
    id: string
    name: string
    level: string
    duration: string
    university: {
      id: string
      name: string
      location: string
      ranking: number
      image: string
    }
    tuition: {
      domestic: string
      international: string
    }
    requirements: {
      gpa: number
      languageTests: {
        toefl?: number
        ielts?: number
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
    popularity: number
    applicationDeadline: string
    intake: string[]
    featured: boolean
  }
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 90) return 'from-emerald-500 to-green-500'
    if (popularity >= 80) return 'from-amber-500 to-orange-500'
    return 'from-gray-500 to-gray-600'
  }

  return (
    <div
      className={`relative group animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
        {/* Featured badge */}
        {course.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
              <Star size={12} className="fill-white" />
              Featured
            </span>
          </div>
        )}

        {/* Popularity badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full">
            <TrendingUp size={14} />
            <span className="text-sm font-bold">{course.popularity}%</span>
          </div>
        </div>

        {/* Card content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Course info */}
            <div className="lg:w-2/3">
              {/* Course title and university */}
              <div className="mb-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {course.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Globe size={18} className="mr-2" />
                      <Link 
                        href={`/universities/${course.university.id}`}
                        className="hover:text-emerald-600 transition-colors font-medium"
                      >
                        {course.university.name}
                      </Link>
                      <span className="mx-2">•</span>
                      <span>{course.university.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                    aria-label={isSaved ? 'Remove from saved' : 'Save course'}
                  >
                    <svg
                      className={`w-6 h-6 ${isSaved ? 'fill-emerald-500 text-emerald-500' : 'text-gray-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Course description */}
                <p className="text-gray-700 mb-6 line-clamp-2">{course.description}</p>
              </div>

              {/* Key details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">Level</span>
                  </div>
                  <div className="font-bold text-gray-900">{course.level}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">Duration</span>
                  </div>
                  <div className="font-bold text-gray-900">{course.duration}</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">Tuition</span>
                  </div>
                  <div className="font-bold text-gray-900">{course.tuition.international}/year</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-600">Deadline</span>
                  </div>
                  <div className="font-bold text-gray-900">{formatDate(course.applicationDeadline)}</div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    GPA: {course.requirements.gpa}+
                  </div>
                  {course.requirements.languageTests.toefl && (
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      TOEFL: {course.requirements.languageTests.toefl}+
                    </div>
                  )}
                  {course.requirements.languageTests.ielts && (
                    <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      IELTS: {course.requirements.languageTests.ielts}+
                    </div>
                  )}
                  {course.requirements.standardizedTests?.sat && (
                    <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                      SAT: {course.requirements.standardizedTests.sat}+
                    </div>
                  )}
                </div>
              </div>

              {/* Career outcomes */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Career Outcomes</h4>
                <div className="flex flex-wrap gap-2">
                  {course.careerOutcomes.map((outcome, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-200"
                    >
                      {outcome}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - University and actions */}
            <div className="lg:w-1/3">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white h-full">
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-2">University Info</h4>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center text-white font-bold text-xl">
                      {course.university.name.split(' ').map(word => word[0]).join('')}
                    </div>
                    <div>
                      <div className="font-bold">{course.university.name}</div>
                      <div className="text-sm text-gray-300">#{course.university.ranking} Worldwide</div>
                    </div>
                  </div>
                </div>

                {/* Scholarships info */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Award size={18} className="text-emerald-300" />
                    <span className="font-semibold">Scholarships Available</span>
                  </div>
                  <div className="text-3xl font-bold text-emerald-300 mb-1">
                    {course.scholarships}
                  </div>
                  <div className="text-sm text-gray-300">scholarships for this program</div>
                </div>

                {/* Intake periods */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={18} className="text-emerald-300" />
                    <span className="font-semibold">Intake Periods</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {course.intake.map((period, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-emerald-900/50 text-emerald-200 rounded-full text-sm"
                      >
                        {period}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="space-y-3">
                  <Link
                    href={`/courses/${course.id}`}
                    className="block w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-semibold text-center"
                  >
                    View Course Details
                  </Link>
                  <button className="w-full px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors font-semibold">
                    Compare Programs
                  </button>
                  <Link
                    href={`/universities/${course.university.id}`}
                    className="block w-full px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-semibold text-center flex items-center justify-center gap-2"
                  >
                    View University
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 transform origin-left transition-transform duration-500 ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`} />
      </div>
    </div>
  )
}



// In CourseCard.tsx, update the university link:
{/* <Link 
  href={`/universities/${course.university.id}`}
  className="hover:text-emerald-600 transition-colors font-medium group/university flex items-center gap-2"
>
  {course.university.name}
  <ExternalLink size={14} className="opacity-0 group-hover/university:opacity-100 transition-opacity" />
</Link> */}