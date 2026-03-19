'use client'

import { Award, Calendar, DollarSign, Globe, Users, ChevronRight, Clock, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface ScholarshipCardProps {
  scholarship: {
    id: number
    title: string
    provider: string
    amount: string
    deadline: string
    eligibility: string
    description: string
    tags: string[]
    featured: boolean
    applications: number
  }
  index: number
}

export default function ScholarshipCard({ scholarship, index }: ScholarshipCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Calculate days until deadline
  const daysUntilDeadline = Math.max(
    0,
    Math.ceil((new Date(scholarship.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  )

  // Format deadline date
  const formattedDeadline = new Date(scholarship.deadline).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  // Get urgency color
  const getUrgencyColor = () => {
    if (daysUntilDeadline <= 7) return 'bg-red-100 text-red-700 border-red-200'
    if (daysUntilDeadline <= 30) return 'bg-amber-100 text-amber-700 border-amber-200'
    return 'bg-green-100 text-green-700 border-green-200'
  }

  // Get amount icon color
  const getAmountColor = () => {
    const amount = scholarship.amount.toLowerCase()
    if (amount.includes('full') || amount.includes('fully')) return 'from-emerald-500 to-green-400'
    if (parseInt(scholarship.amount.replace(/[^0-9]/g, '')) > 40000) return 'from-amber-500 to-orange-400'
    return 'from-blue-500 to-cyan-400'
  }

  return (
    <div
      className={`relative group animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
        {/* Featured badge */}
        {scholarship.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full flex items-center gap-1 animate-pulse">
              <Award size={12} className="fill-white" />
              Featured
            </span>
          </div>
        )}

        {/* Save button */}
        <button
          onClick={() => setIsSaved(!isSaved)}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
          aria-label={isSaved ? 'Remove from saved' : 'Save scholarship'}
        >
          <svg
            className={`w-6 h-6 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-gray-400'}`}
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

        {/* Card content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left section - Amount and basic info */}
            <div className="lg:w-1/3">
              <div className="relative">
                {/* Amount badge */}
                <div className={`inline-flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br ${getAmountColor()} text-white mb-4 w-full`}>
                  <div className="text-3xl font-bold">{scholarship.amount}</div>
                  <div className="text-sm opacity-90">Total Award</div>
                </div>

                {/* Application stats */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">Applications</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} className="text-green-500" />
                      <span className="font-semibold text-gray-900">{scholarship.applications.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, (scholarship.applications / 2000) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right section - Details */}
            <div className="lg:w-2/3">
              <div className="mb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {scholarship.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Globe size={16} className="mr-2" />
                      <span className="text-sm">{scholarship.provider}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">{scholarship.description}</p>

                {/* Eligibility */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-amber-600" />
                    <span className="text-sm font-semibold text-gray-700">Eligibility</span>
                  </div>
                  <p className="text-sm text-gray-600">{scholarship.eligibility}</p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {scholarship.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Deadline info */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      <div>
                        <div className="text-sm text-gray-600">Deadline</div>
                        <div className="font-semibold text-gray-900">{formattedDeadline}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full border ${getUrgencyColor()} flex items-center gap-1`}>
                      <Clock size={12} />
                      <span className="text-sm font-semibold">
                        {daysUntilDeadline === 0 ? 'Last day!' : `${daysUntilDeadline} days left`}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/scholarships/${scholarship.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-semibold group/btn"
                    >
                      <span>View Details</span>
                      <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" size={20} />
                    </Link>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar for deadline */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
          <div
            className={`h-full ${
              daysUntilDeadline <= 7
                ? 'bg-gradient-to-r from-red-500 to-pink-500'
                : daysUntilDeadline <= 30
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : 'bg-gradient-to-r from-green-500 to-emerald-500'
            } transition-all duration-1000`}
            style={{
              width: `${Math.max(5, Math.min(100, (daysUntilDeadline / 90) * 100))}%`
            }}
          />
        </div>

        {/* Hover effect line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform origin-left transition-transform duration-500 ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>

      {/* Floating info on hover */}
      {isHovered && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-lg p-3 z-20 animate-slide-up">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold">Success rate:</span>
            <span className="text-green-600 font-bold">85%</span>
            <span className="text-gray-400">•</span>
            <span className="font-semibold">Avg. award:</span>
            <span className="text-amber-600 font-bold">$28,500</span>
          </div>
        </div>
      )}
    </div>
  )
}


