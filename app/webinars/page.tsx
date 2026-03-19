// app/webinars/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Video, Zap, TrendingUp, Search, Filter, Bookmark } from 'lucide-react'
import WebinarCard from '@/components/webinars/WebinarCard'
import Link from 'next/link'

const webinars = [
  {
    id: 1,
    title: 'How to Get into Top US Universities',
    host: 'Dr. Sarah Johnson - Stanford Admissions Officer',
    date: '2024-03-15T14:00:00Z',
    duration: 90,
    platform: 'zoom',
    maxParticipants: 500,
    registeredParticipants: 423,
    description: 'Learn insider tips on crafting standout applications for Ivy League and top-tier US universities.',
    tags: ['USA', 'Admissions', 'Ivy League', 'Strategy'],
    featured: true,
    recordingAvailable: false
  },
  {
    id: 2,
    title: 'Scholarship Success Secrets',
    host: 'Michael Chen - Scholarship Consultant',
    date: '2024-03-18T10:00:00Z',
    duration: 60,
    platform: 'teams',
    maxParticipants: 300,
    registeredParticipants: 287,
    description: 'Discover proven strategies to secure scholarships and funding for international education.',
    tags: ['Scholarship', 'Funding', 'Financial Aid'],
    featured: true,
    recordingAvailable: true
  },
  {
    id: 3,
    title: 'UK University Applications 2024',
    host: 'Prof. David Williams - University of Cambridge',
    date: '2024-03-20T16:00:00Z',
    duration: 75,
    platform: 'google_meet',
    maxParticipants: 400,
    registeredParticipants: 195,
    description: 'Complete guide to UK university applications, deadlines, and personal statement tips.',
    tags: ['UK', 'UCAS', 'Personal Statement', 'Deadlines'],
    featured: false,
    recordingAvailable: false
  },
  {
    id: 4,
    title: 'Visa Processing Simplified',
    host: 'Immigration Expert Lisa Rodriguez',
    date: '2024-03-22T12:00:00Z',
    duration: 45,
    platform: 'zoom',
    maxParticipants: 250,
    registeredParticipants: 89,
    description: 'Step-by-step guide to student visa applications for popular study destinations.',
    tags: ['Visa', 'Immigration', 'Documentation'],
    featured: false,
    recordingAvailable: false
  },
  {
    id: 5,
    title: 'STEM Careers in Europe',
    host: 'Dr. Emma Schmidt - ETH Zurich Alumni',
    date: '2024-03-25T15:00:00Z',
    duration: 60,
    platform: 'teams',
    maxParticipants: 350,
    registeredParticipants: 312,
    description: 'Explore career opportunities and pathways for STEM graduates in European countries.',
    tags: ['STEM', 'Europe', 'Careers', 'Engineering'],
    featured: true,
    recordingAvailable: false
  },
  {
    id: 6,
    title: 'MBA Admissions Masterclass',
    host: 'MBA Admissions Committee - Harvard Business School',
    date: '2024-03-28T11:00:00Z',
    duration: 120,
    platform: 'zoom',
    maxParticipants: 200,
    registeredParticipants: 199,
    description: 'Exclusive insights into MBA admissions at top business schools worldwide.',
    tags: ['MBA', 'Business School', 'GMAT', 'Leadership'],
    featured: false,
    recordingAvailable: true
  }
]

export default function WebinarsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredWebinars, setFilteredWebinars] = useState(webinars)
  const [filter, setFilter] = useState('all')
  const [savedWebinars, setSavedWebinars] = useState<number[]>([])

  useEffect(() => {
    let results = webinars
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(webinar =>
        webinar.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webinar.host.toLowerCase().includes(searchTerm.toLowerCase()) ||
        webinar.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Apply status filter
    if (filter === 'upcoming') {
      results = results.filter(webinar => new Date(webinar.date) > new Date())
    } else if (filter === 'recorded') {
      results = results.filter(webinar => webinar.recordingAvailable)
    } else if (filter === 'featured') {
      results = results.filter(webinar => webinar.featured)
    }

    setFilteredWebinars(results)
  }, [searchTerm, filter])

  const toggleSaveWebinar = (id: number) => {
    setSavedWebinars(prev =>
      prev.includes(id)
        ? prev.filter(webinarId => webinarId !== id)
        : [...prev, id]
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-violet-600 to-purple-700">
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Live Webinars
              <span className="block text-purple-200">Learn from Experts</span>
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-12">
              Join interactive sessions with admissions officers, alumni, and education experts.
              Get your questions answered in real-time.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-12">
              {[
                { icon: Calendar, value: '50+', label: 'Monthly Webinars' },
                { icon: Users, value: '10K+', label: 'Attendees' },
                { icon: Video, value: '200+', label: 'Recordings' },
                { icon: Zap, value: '98%', label: 'Satisfaction' }
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Icon className="text-purple-200 mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-purple-200">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <div className="mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search webinars..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Filter size={18} />
                    Filter By
                  </h3>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'All Webinars', count: webinars.length },
                      { value: 'upcoming', label: 'Upcoming', count: webinars.filter(w => new Date(w.date) > new Date()).length },
                      { value: 'recorded', label: 'Recorded', count: webinars.filter(w => w.recordingAvailable).length },
                      { value: 'featured', label: 'Featured', count: webinars.filter(w => w.featured).length }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFilter(option.value)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          filter === option.value
                            ? 'bg-purple-100 text-purple-700 font-semibold'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.label}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            filter === option.value
                              ? 'bg-purple-200 text-purple-800'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {option.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Topics */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-4">Popular Topics</h3>
                  <div className="space-y-2">
                    {['Admissions', 'Scholarships', 'Visa', 'STEM', 'MBA', 'UK', 'USA', 'Canada'].map((topic) => (
                      <button
                        key={topic}
                        className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Saved Webinars */}
                {savedWebinars.length > 0 && (
                  <div className="pt-6 border-t">
                    <h3 className="font-bold text-gray-900 mb-4">Saved Webinars</h3>
                    <div className="space-y-2">
                      {webinars
                        .filter(w => savedWebinars.includes(w.id))
                        .map((webinar) => (
                          <div key={webinar.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-900 truncate">{webinar.title}</span>
                            <button
                              onClick={() => toggleSaveWebinar(webinar.id)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Card */}
            <div className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-3">Host a Webinar?</h3>
              <p className="text-purple-100 mb-4">Share your expertise with our global audience</p>
              <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Become a Host
              </button>
            </div>
          </div>

          {/* Webinars Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredWebinars.length} Webinars Found
                </h2>
                <p className="text-gray-600">Join live or watch recordings</p>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/webinars/calendar"
                  className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <Calendar size={20} />
                  View Calendar
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredWebinars.map((webinar, index) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  index={index}
                  isSaved={savedWebinars.includes(webinar.id)}
                  onSaveToggle={() => toggleSaveWebinar(webinar.id)}
                  formatDate={formatDate}
                  formatTime={formatTime}
                />
              ))}
            </div>

            {filteredWebinars.length === 0 && (
              <div className="text-center py-20">
                <Video className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No webinars found</h3>
                <p className="text-gray-600">Try different search terms or filters</p>
              </div>
            )}

            {/* Upcoming Highlights */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Highlights</h2>
                <Link href="/webinars/upcoming" className="text-purple-600 hover:text-purple-700 font-semibold">
                  View all →
                </Link>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {webinars
                    .filter(w => new Date(w.date) > new Date())
                    .slice(0, 3)
                    .map((webinar, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="text-purple-600" size={16} />
                          <span className="text-sm font-semibold text-purple-700">
                            {formatDate(webinar.date)}
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2 line-clamp-2">{webinar.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} />
                          {webinar.duration} min
                        </div>
                        <button className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                          Register Now
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






