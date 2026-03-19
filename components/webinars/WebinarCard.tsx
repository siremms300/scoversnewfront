'use client'

import { Calendar, Clock, Users, Video, Zap, Bookmark, Share2, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface WebinarCardProps {
  webinar: {
    id: number
    title: string
    host: string
    date: string
    duration: number
    platform: string
    maxParticipants: number
    registeredParticipants: number
    description: string
    tags: string[]
    featured: boolean
    recordingAvailable: boolean
  }
  index: number
  isSaved: boolean
  onSaveToggle: () => void
  formatDate: (date: string) => string
  formatTime: (date: string) => string
}

export default function WebinarCard({
  webinar,
  index,
  isSaved,
  onSaveToggle,
  formatDate,
  formatTime
}: WebinarCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)

  const isUpcoming = new Date(webinar.date) > new Date()
  const registrationPercentage = (webinar.registeredParticipants / webinar.maxParticipants) * 100
  const spotsLeft = webinar.maxParticipants - webinar.registeredParticipants

  const getPlatformColor = () => {
    switch (webinar.platform) {
      case 'zoom': return 'bg-blue-100 text-blue-700'
      case 'teams': return 'bg-purple-100 text-purple-700'
      case 'google_meet': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPlatformIcon = () => {
    switch (webinar.platform) {
      case 'zoom': return '🔵'
      case 'teams': return '🟣'
      case 'google_meet': return '🟢'
      default: return '📹'
    }
  }

  return (
    <div
      className={`relative group animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
        {/* Featured badge */}
        {webinar.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
              <Zap size={12} className="fill-white" />
              Featured
            </span>
          </div>
        )}

        {/* Recording badge */}
        {webinar.recordingAvailable && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
              Recording Available
            </span>
          </div>
        )}

        {/* Card content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                {webinar.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <Video size={16} className="mr-2" />
                <span className="text-sm">{webinar.host}</span>
              </div>
            </div>
            <button
              onClick={onSaveToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isSaved ? 'Remove from saved' : 'Save webinar'}
            >
              <Bookmark
                className={`w-5 h-5 ${isSaved ? 'fill-purple-600 text-purple-600' : 'text-gray-400'}`}
              />
            </button>
          </div>

          <p className="text-gray-700 mb-6 line-clamp-3">{webinar.description}</p>

          {/* Date and Time */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-purple-600" size={18} />
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="font-semibold text-gray-900">{formatDate(webinar.date)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-purple-600" size={18} />
              <div>
                <div className="text-sm text-gray-600">Time</div>
                <div className="font-semibold text-gray-900">{formatTime(webinar.date)}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{getPlatformIcon()}</span>
              <div>
                <div className="text-sm text-gray-600">Platform</div>
                <div className="font-semibold text-gray-900 capitalize">{webinar.platform}</div>
              </div>
            </div>
          </div>

          {/* Registration Progress */}
          {isUpcoming && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {webinar.registeredParticipants.toLocaleString()} registered
                  </span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  {spotsLeft} spots left
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    registrationPercentage > 80
                      ? 'bg-gradient-to-r from-red-500 to-pink-500'
                      : registrationPercentage > 50
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500'
                  }`}
                  style={{ width: `${registrationPercentage}%` }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {webinar.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {isUpcoming ? (
              <>
                <button
                  onClick={() => setIsRegistered(!isRegistered)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    isRegistered
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {isRegistered ? '✓ Registered' : 'Register Now'}
                </button>
                <button className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-semibold transition-colors">
                  Add to Calendar
                </button>
              </>
            ) : (
              <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-black font-semibold transition-colors flex items-center gap-2">
                <Video size={18} />
                Watch Recording
              </button>
            )}
            <Link
              href={`/webinars/${webinar.id}`}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors flex items-center gap-2"
            >
              Details
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        {/* Hover effect line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left transition-transform duration-500 ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`} />
      </div>
    </div>
  )
}