// app/webinars/upcoming/page.tsx - UPDATED with future dates
'use client'

import { useState, useEffect } from 'react'
import {
  Calendar, Clock, Users, Video, Filter, Search, Zap,
  ChevronLeft, TrendingUp, Star, Globe, Target, Award,
  ChevronDown, Download, Share2, Bell
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// Helper function to get future dates
const getFutureDate = (daysFromNow: number, hour: number = 14, minute: number = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

// Mock webinar data with FUTURE dates
const webinars = [
  {
    id: 1,
    title: 'How to Get into Top US Universities',
    host: 'Dr. Sarah Johnson - Stanford Admissions Officer',
    date: getFutureDate(3, 14, 0), // 3 days from now
    duration: 90,
    category: 'Admissions',
    level: 'All Levels',
    registered: 423,
    capacity: 500,
    timezone: 'EST',
    description: 'Learn insider tips on crafting standout applications for Ivy League and top-tier US universities.',
    featured: true,
    tags: ['USA', 'Ivy League', 'Strategy'],
    earlyBird: true,
    earlyBirdEnds: getFutureDate(1) // 1 day from now
  },
  {
    id: 2,
    title: 'Scholarship Success Secrets',
    host: 'Michael Chen - Scholarship Consultant',
    date: getFutureDate(5, 10, 0), // 5 days from now
    duration: 60,
    category: 'Funding',
    level: 'Beginner',
    registered: 287,
    capacity: 300,
    timezone: 'PST',
    description: 'Discover proven strategies to secure scholarships and funding for international education.',
    featured: true,
    tags: ['Scholarship', 'Financial Aid'],
    earlyBird: false
  },
  {
    id: 3,
    title: 'UK University Applications 2024',
    host: 'Prof. David Williams - University of Cambridge',
    date: getFutureDate(7, 16, 0), // 7 days from now
    duration: 75,
    category: 'Admissions',
    level: 'Intermediate',
    registered: 195,
    capacity: 400,
    timezone: 'GMT',
    description: 'Complete guide to UK university applications, deadlines, and personal statement tips.',
    featured: false,
    tags: ['UK', 'UCAS'],
    earlyBird: true,
    earlyBirdEnds: getFutureDate(4) // 4 days from now
  },
  {
    id: 4,
    title: 'Visa Processing Simplified',
    host: 'Immigration Expert Lisa Rodriguez',
    date: getFutureDate(9, 12, 0), // 9 days from now
    duration: 45,
    category: 'Visa',
    level: 'Beginner',
    registered: 89,
    capacity: 250,
    timezone: 'CST',
    description: 'Step-by-step guide to student visa applications for popular study destinations.',
    featured: false,
    tags: ['Visa', 'Documentation'],
    earlyBird: false
  },
  {
    id: 5,
    title: 'STEM Careers in Europe',
    host: 'Dr. Emma Schmidt - ETH Zurich Alumni',
    date: getFutureDate(12, 15, 0), // 12 days from now
    duration: 60,
    category: 'Career',
    level: 'Advanced',
    registered: 312,
    capacity: 350,
    timezone: 'CET',
    description: 'Explore career opportunities and pathways for STEM graduates in European countries.',
    featured: true,
    tags: ['STEM', 'Europe', 'Engineering'],
    earlyBird: true,
    earlyBirdEnds: getFutureDate(8) // 8 days from now
  },
  {
    id: 6,
    title: 'MBA Admissions Masterclass',
    host: 'MBA Admissions Committee - Harvard Business School',
    date: getFutureDate(15, 11, 0), // 15 days from now
    duration: 120,
    category: 'MBA',
    level: 'Advanced',
    registered: 199,
    capacity: 200,
    timezone: 'EST',
    description: 'Exclusive insights into MBA admissions at top business schools worldwide.',
    featured: false,
    tags: ['MBA', 'Business School'],
    earlyBird: false
  },
  {
    id: 7,
    title: 'Study in Canada: Complete Guide',
    host: 'Canadian Education Expert',
    date: getFutureDate(18, 13, 0), // 18 days from now
    duration: 80,
    category: 'Country Guide',
    level: 'All Levels',
    registered: 156,
    capacity: 300,
    timezone: 'EST',
    description: 'Everything you need to know about studying in Canada - from admissions to post-study work.',
    featured: true,
    tags: ['Canada', 'Study Abroad'],
    earlyBird: true,
    earlyBirdEnds: getFutureDate(14) // 14 days from now
  },
  {
    id: 8,
    title: 'Medical School Admissions',
    host: 'Dr. Robert Chen - Medical School Advisor',
    date: getFutureDate(21, 9, 0), // 21 days from now
    duration: 90,
    category: 'Medical',
    level: 'Advanced',
    registered: 210,
    capacity: 250,
    timezone: 'PST',
    description: 'Comprehensive guide to medical school admissions, MCAT preparation, and interviews.',
    featured: false,
    tags: ['Medical', 'MCAT'],
    earlyBird: false
  },
  {
    id: 9,
    title: 'Study in Australia: Opportunities & Pathways',
    host: 'Australian Education Specialist',
    date: getFutureDate(2, 19, 0), // Tomorrow evening
    duration: 60,
    category: 'Country Guide',
    level: 'All Levels',
    registered: 145,
    capacity: 300,
    timezone: 'AEST',
    description: 'Learn about top universities, scholarships, and post-study work opportunities in Australia.',
    featured: true,
    tags: ['Australia', 'Study Abroad'],
    earlyBird: true,
    earlyBirdEnds: getFutureDate(0, 23, 59) // Ends tonight
  },
  {
    id: 10,
    title: 'Engineering Admissions: Top Programs Worldwide',
    host: 'Prof. Alex Wong - MIT Alumni',
    date: getFutureDate(1, 11, 0), // Tomorrow morning
    duration: 90,
    category: 'Engineering',
    level: 'Intermediate',
    registered: 278,
    capacity: 400,
    timezone: 'EST',
    description: 'Overview of top engineering programs and what it takes to get admitted.',
    featured: true,
    tags: ['Engineering', 'STEM', 'Admissions'],
    earlyBird: true,
    earlyBirdEnds: getFutureDate(0, 12, 0) // Ends today at noon
  }
]

export default function UpcomingWebinarsPage() {
  const router = useRouter()
  const [filteredWebinars, setFilteredWebinars] = useState(webinars)
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Always show webinars that are in the future
    let results = webinars.filter(webinar => new Date(webinar.date) > new Date())
    
    // Apply filters
    if (filterCategory !== 'all') {
      results = results.filter(webinar => webinar.category === filterCategory)
    }
    
    if (filterLevel !== 'all') {
      results = results.filter(webinar => webinar.level === filterLevel)
    }
    
    if (searchQuery) {
      results = results.filter(webinar =>
        webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        webinar.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        webinar.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    if (selectedTimezones.length > 0) {
      results = results.filter(webinar => selectedTimezones.includes(webinar.timezone))
    }
    
    // Apply sorting
    results.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      } else if (sortBy === 'popularity') {
        return (b.registered / b.capacity) - (a.registered / a.capacity)
      } else if (sortBy === 'duration') {
        return a.duration - b.duration
      }
      return 0
    })
    
    setFilteredWebinars(results)
  }, [filterCategory, filterLevel, searchQuery, sortBy, selectedTimezones])

  const handleTimezoneToggle = (timezone: string) => {
    setSelectedTimezones(prev =>
      prev.includes(timezone)
        ? prev.filter(tz => tz !== timezone)
        : [...prev, timezone]
    )
  }

  const handleSetAlert = () => {
    toast.success('Reminder set for upcoming webinars!')
  }

  const handleShareAll = () => {
    toast.success('Calendar link copied to clipboard!')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    }
    
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow'
    }
    
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) {
      return 'today'
    } else if (diffDays === 1) {
      return 'tomorrow'
    } else {
      return `in ${diffDays} days`
    }
  }

  const getUrgentWebinar = () => {
    const now = new Date()
    const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    
    const urgentWebinars = filteredWebinars.filter(webinar => {
      const webinarDate = new Date(webinar.date)
      return webinarDate > now && webinarDate < next24Hours
    })
    
    return urgentWebinars[0] // Return the first urgent webinar
  }

  const urgentWebinar = getUrgentWebinar()

  const categories = ['All', 'Admissions', 'Funding', 'Visa', 'Career', 'MBA', 'Medical', 'Country Guide', 'Engineering']
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
  const timezones = ['EST', 'PST', 'GMT', 'CST', 'CET', 'AEST']

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <Link
                href="/webinars"
                className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Webinars
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Webinars</h1>
              <p className="text-xl text-green-100">
                Don't miss these upcoming learning opportunities
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={handleSetAlert}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors font-semibold flex items-center gap-2"
              >
                <Bell size={20} />
                Set Reminder
              </button>
              <button
                onClick={handleShareAll}
                className="px-6 py-3 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-colors font-semibold flex items-center gap-2"
              >
                <Share2 size={20} />
                Share Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Urgent Webinar Banner */}
        {urgentWebinar && (
          <div className="mb-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="animate-pulse" size={24} />
                  <span className="font-bold text-lg">HAPPENING SOON!</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{urgentWebinar.title}</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{formatDate(urgentWebinar.date)} at {formatTime(urgentWebinar.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{urgentWebinar.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{urgentWebinar.capacity - urgentWebinar.registered} spots left</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/webinars/${urgentWebinar.id}`)}
                className="px-6 py-3 bg-white text-amber-700 rounded-xl hover:bg-amber-50 font-bold"
              >
                Register Now
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Upcoming', value: filteredWebinars.length, icon: Video, color: 'from-blue-500 to-cyan-500' },
            { label: 'Next 7 Days', value: filteredWebinars.filter(w => {
              const webinarDate = new Date(w.date)
              const weekFromNow = new Date()
              weekFromNow.setDate(weekFromNow.getDate() + 7)
              return webinarDate <= weekFromNow
            }).length, icon: Calendar, color: 'from-green-500 to-emerald-500' },
            { label: 'Featured', value: filteredWebinars.filter(w => w.featured).length, icon: Star, color: 'from-amber-500 to-orange-500' },
            { label: 'Early Bird', value: filteredWebinars.filter(w => w.earlyBird).length, icon: Zap, color: 'from-purple-500 to-pink-500' }
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Filters & Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search upcoming webinars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat === 'All' ? 'all' : cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                {levels.map(level => (
                  <option key={level} value={level === 'All Levels' ? 'all' : level}>{level}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="date">Sort by: Date</option>
                <option value="popularity">Sort by: Popularity</option>
                <option value="duration">Sort by: Duration</option>
              </select>
              
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {viewMode === 'grid' ? 'List View' : 'Grid View'}
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className={`mt-6 ${showFilters ? 'block' : 'hidden'}`}>
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-4">Filter by Timezone</h4>
              <div className="flex flex-wrap gap-2">
                {timezones.map(tz => (
                  <button
                    key={tz}
                    onClick={() => handleTimezoneToggle(tz)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedTimezones.includes(tz)
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tz}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="mt-4 text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
          >
            <Filter size={16} />
            {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
          </button>
        </div>

        {/* Webinars Count */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredWebinars.length} Upcoming Webinar{filteredWebinars.length !== 1 ? 's' : ''}
          </h2>
          <p className="text-gray-600">
            Register now to secure your spot
          </p>
        </div>

        {/* Webinars */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                {/* Header */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    {webinar.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="absolute top-4 right-4 z-10">
                    {webinar.earlyBird && (
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                        Early Bird
                      </span>
                    )}
                  </div>
                  
                  {/* Date Badge */}
                  <div className="absolute top-16 left-4 z-10">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-white">
                      <div className="text-center">
                        <div className="text-lg font-bold">{new Date(webinar.date).getDate()}</div>
                        <div className="text-xs">
                          {new Date(webinar.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-48 bg-gradient-to-r from-green-500 to-emerald-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="text-white/20" size={80} />
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                        {webinar.category}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold text-green-600">
                      {formatDate(webinar.date)} • {formatTime(webinar.date)} {webinar.timezone}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock size={14} />
                      {webinar.duration} min
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 line-clamp-2">
                    {webinar.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{webinar.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-600 truncate">{webinar.host}</div>
                    <div className="flex items-center gap-2">
                      <Users size={14} />
                      <span className="text-sm font-semibold">
                        {webinar.registered}/{webinar.capacity}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {webinar.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push(`/webinars/${webinar.id}`)}
                      className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                    >
                      View Details
                    </button>
                    <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-semibold">
                      Register
                    </button>
                  </div>
                  
                  {/* Early Bird Notice */}
                  {/* {webinar.earlyBird && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-sm text-purple-700 font-semibold">
                        ⚡ Early bird ends {getDaysUntil(webinar.earlyBirdEnds)}
                      </div>
                    </div>
                  )} */}


                {webinar.earlyBird && webinar.earlyBirdEnds && (
                  <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-sm text-purple-700 font-semibold">
                      ⚡ Early bird ends {getDaysUntil(webinar.earlyBirdEnds)}
                    </div>
                  </div>
                )}



                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredWebinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Date Badge */}
                  <div className="lg:w-32">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white text-center">
                      <div className="text-2xl font-bold">
                        {new Date(webinar.date).getDate()}
                      </div>
                      <div className="text-sm">
                        {new Date(webinar.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-xs mt-1">{formatTime(webinar.date)}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      {webinar.featured && (
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
                          Featured
                        </span>
                      )}
                      {webinar.earlyBird && (
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
                          Early Bird
                        </span>
                      )}
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                        {webinar.category}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
                        {webinar.level}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600">
                      {webinar.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{webinar.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>Hosted by {webinar.host}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{webinar.duration} minutes • {webinar.timezone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target size={16} />
                        <span className="font-semibold">
                          {webinar.registered}/{webinar.capacity} registered
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48">
                    <div className="space-y-3">
                      <button
                        onClick={() => router.push(`/webinars/${webinar.id}`)}
                        className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                      >
                        View Details
                      </button>
                      <button className="w-full py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-semibold">
                        Register Now
                      </button>
                      {/* {webinar.earlyBird && (
                        <div className="text-center text-sm text-purple-600 font-semibold">
                          ⚡ Early bird ends {getDaysUntil(webinar.earlyBirdEnds)}
                        </div>
                      )} */}


                      {webinar.earlyBird && webinar.earlyBirdEnds && (
                        <div className="text-center text-sm text-purple-600 font-semibold">
                          ⚡ Early bird ends {getDaysUntil(webinar.earlyBirdEnds)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredWebinars.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No upcoming webinars found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or check back later</p>
            <button
              onClick={() => {
                setFilterCategory('all')
                setFilterLevel('all')
                setSearchQuery('')
                setSelectedTimezones([])
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Miss a Webinar</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Subscribe to get notified about new webinars, early bird discounts, and exclusive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
            />
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}





























// // app/webinars/upcoming/page.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import {
//   Calendar, Clock, Users, Video, Filter, Search, Zap,
//   ChevronLeft, TrendingUp, Star, Globe, Target, Award,
//   ChevronDown, Download, Share2, Bell
// } from 'lucide-react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'

// // Mock webinar data
// const webinars = [
//   {
//     id: 1,
//     title: 'How to Get into Top US Universities',
//     host: 'Dr. Sarah Johnson - Stanford Admissions Officer',
//     date: '2024-03-15T14:00:00Z',
//     duration: 90,
//     category: 'Admissions',
//     level: 'All Levels',
//     registered: 423,
//     capacity: 500,
//     timezone: 'EST',
//     description: 'Learn insider tips on crafting standout applications for Ivy League and top-tier US universities.',
//     featured: true,
//     tags: ['USA', 'Ivy League', 'Strategy'],
//     earlyBird: true,
//     earlyBirdEnds: '2024-03-10'
//   },
//   {
//     id: 2,
//     title: 'Scholarship Success Secrets',
//     host: 'Michael Chen - Scholarship Consultant',
//     date: '2024-03-18T10:00:00Z',
//     duration: 60,
//     category: 'Funding',
//     level: 'Beginner',
//     registered: 287,
//     capacity: 300,
//     timezone: 'PST',
//     description: 'Discover proven strategies to secure scholarships and funding for international education.',
//     featured: true,
//     tags: ['Scholarship', 'Financial Aid'],
//     earlyBird: false
//   },
//   {
//     id: 3,
//     title: 'UK University Applications 2024',
//     host: 'Prof. David Williams - University of Cambridge',
//     date: '2024-03-20T16:00:00Z',
//     duration: 75,
//     category: 'Admissions',
//     level: 'Intermediate',
//     registered: 195,
//     capacity: 400,
//     timezone: 'GMT',
//     description: 'Complete guide to UK university applications, deadlines, and personal statement tips.',
//     featured: false,
//     tags: ['UK', 'UCAS'],
//     earlyBird: true,
//     earlyBirdEnds: '2024-03-15'
//   },
//   {
//     id: 4,
//     title: 'Visa Processing Simplified',
//     host: 'Immigration Expert Lisa Rodriguez',
//     date: '2024-03-22T12:00:00Z',
//     duration: 45,
//     category: 'Visa',
//     level: 'Beginner',
//     registered: 89,
//     capacity: 250,
//     timezone: 'CST',
//     description: 'Step-by-step guide to student visa applications for popular study destinations.',
//     featured: false,
//     tags: ['Visa', 'Documentation'],
//     earlyBird: false
//   },
//   {
//     id: 5,
//     title: 'STEM Careers in Europe',
//     host: 'Dr. Emma Schmidt - ETH Zurich Alumni',
//     date: '2024-03-25T15:00:00Z',
//     duration: 60,
//     category: 'Career',
//     level: 'Advanced',
//     registered: 312,
//     capacity: 350,
//     timezone: 'CET',
//     description: 'Explore career opportunities and pathways for STEM graduates in European countries.',
//     featured: true,
//     tags: ['STEM', 'Europe', 'Engineering'],
//     earlyBird: true,
//     earlyBirdEnds: '2024-03-20'
//   },
//   {
//     id: 6,
//     title: 'MBA Admissions Masterclass',
//     host: 'MBA Admissions Committee - Harvard Business School',
//     date: '2024-03-28T11:00:00Z',
//     duration: 120,
//     category: 'MBA',
//     level: 'Advanced',
//     registered: 199,
//     capacity: 200,
//     timezone: 'EST',
//     description: 'Exclusive insights into MBA admissions at top business schools worldwide.',
//     featured: false,
//     tags: ['MBA', 'Business School'],
//     earlyBird: false
//   },
//   {
//     id: 7,
//     title: 'Study in Canada: Complete Guide',
//     host: 'Canadian Education Expert',
//     date: '2024-04-02T13:00:00Z',
//     duration: 80,
//     category: 'Country Guide',
//     level: 'All Levels',
//     registered: 156,
//     capacity: 300,
//     timezone: 'EST',
//     description: 'Everything you need to know about studying in Canada - from admissions to post-study work.',
//     featured: true,
//     tags: ['Canada', 'Study Abroad'],
//     earlyBird: true,
//     earlyBirdEnds: '2024-03-28'
//   },
//   {
//     id: 8,
//     title: 'Medical School Admissions',
//     host: 'Dr. Robert Chen - Medical School Advisor',
//     date: '2024-04-05T09:00:00Z',
//     duration: 90,
//     category: 'Medical',
//     level: 'Advanced',
//     registered: 210,
//     capacity: 250,
//     timezone: 'PST',
//     description: 'Comprehensive guide to medical school admissions, MCAT preparation, and interviews.',
//     featured: false,
//     tags: ['Medical', 'MCAT'],
//     earlyBird: false
//   }
// ]

// export default function UpcomingWebinarsPage() {
//   const router = useRouter()
//   const [filteredWebinars, setFilteredWebinars] = useState(webinars)
//   const [filterCategory, setFilterCategory] = useState('all')
//   const [filterLevel, setFilterLevel] = useState('all')
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('date')
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
//   const [selectedTimezones, setSelectedTimezones] = useState<string[]>([])
//   const [showFilters, setShowFilters] = useState(false)

//   useEffect(() => {
//     let results = webinars.filter(webinar => new Date(webinar.date) > new Date())
    
//     // Apply filters
//     if (filterCategory !== 'all') {
//       results = results.filter(webinar => webinar.category === filterCategory)
//     }
    
//     if (filterLevel !== 'all') {
//       results = results.filter(webinar => webinar.level === filterLevel)
//     }
    
//     if (searchQuery) {
//       results = results.filter(webinar =>
//         webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         webinar.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         webinar.description.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     }
    
//     if (selectedTimezones.length > 0) {
//       results = results.filter(webinar => selectedTimezones.includes(webinar.timezone))
//     }
    
//     // Apply sorting
//     results.sort((a, b) => {
//       if (sortBy === 'date') {
//         return new Date(a.date).getTime() - new Date(b.date).getTime()
//       } else if (sortBy === 'popularity') {
//         return (b.registered / b.capacity) - (a.registered / a.capacity)
//       } else if (sortBy === 'duration') {
//         return a.duration - b.duration
//       }
//       return 0
//     })
    
//     setFilteredWebinars(results)
//   }, [filterCategory, filterLevel, searchQuery, sortBy, selectedTimezones])

//   const handleTimezoneToggle = (timezone: string) => {
//     setSelectedTimezones(prev =>
//       prev.includes(timezone)
//         ? prev.filter(tz => tz !== timezone)
//         : [...prev, timezone]
//     )
//   }

//   const handleSetAlert = () => {
//     toast.success('Reminder set for upcoming webinars!')
//   }

//   const handleShareAll = () => {
//     toast.success('Calendar link copied to clipboard!')
//   }

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleDateString('en-US', {
//       weekday: 'short',
//       month: 'short',
//       day: 'numeric'
//     })
//   }

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString)
//     return date.toLocaleTimeString('en-US', {
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }

//   const getDaysUntil = (dateString: string) => {
//     const date = new Date(dateString)
//     const today = new Date()
//     const diffTime = date.getTime() - today.getTime()
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//   }

//   const categories = ['All', 'Admissions', 'Funding', 'Visa', 'Career', 'MBA', 'Medical', 'Country Guide']
//   const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']
//   const timezones = ['EST', 'PST', 'GMT', 'CST', 'CET']

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
//             <div>
//               <Link
//                 href="/webinars"
//                 className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 group"
//               >
//                 <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
//                 Back to Webinars
//               </Link>
              
//               <h1 className="text-4xl md:text-5xl font-bold mb-4">Upcoming Webinars</h1>
//               <p className="text-xl text-green-100">
//                 Don't miss these upcoming learning opportunities
//               </p>
//             </div>
            
//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={handleSetAlert}
//                 className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors font-semibold flex items-center gap-2"
//               >
//                 <Bell size={20} />
//                 Set Reminder
//               </button>
//               <button
//                 onClick={handleShareAll}
//                 className="px-6 py-3 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-colors font-semibold flex items-center gap-2"
//               >
//                 <Share2 size={20} />
//                 Share Calendar
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//           {[
//             { label: 'Total Upcoming', value: filteredWebinars.length, icon: Video, color: 'from-blue-500 to-cyan-500' },
//             { label: 'This Month', value: filteredWebinars.filter(w => new Date(w.date).getMonth() === new Date().getMonth()).length, icon: Calendar, color: 'from-green-500 to-emerald-500' },
//             { label: 'Featured', value: filteredWebinars.filter(w => w.featured).length, icon: Star, color: 'from-amber-500 to-orange-500' },
//             { label: 'Early Bird', value: filteredWebinars.filter(w => w.earlyBird).length, icon: Zap, color: 'from-purple-500 to-pink-500' }
//           ].map((stat, idx) => {
//             const Icon = stat.icon
//             return (
//               <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
//                 <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
//                   <Icon className="text-white" size={24} />
//                 </div>
//                 <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
//                 <div className="text-gray-600">{stat.label}</div>
//               </div>
//             )
//           })}
//         </div>

//         {/* Filters & Controls */}
//         <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
//             {/* Search */}
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//                 <input
//                   type="text"
//                   placeholder="Search upcoming webinars..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             {/* Quick Filters */}
//             <div className="flex flex-wrap gap-4">
//               <select
//                 value={filterCategory}
//                 onChange={(e) => setFilterCategory(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               >
//                 {categories.map(cat => (
//                   <option key={cat} value={cat === 'All' ? 'all' : cat}>{cat}</option>
//                 ))}
//               </select>
              
//               <select
//                 value={filterLevel}
//                 onChange={(e) => setFilterLevel(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               >
//                 {levels.map(level => (
//                   <option key={level} value={level === 'All Levels' ? 'all' : level}>{level}</option>
//                 ))}
//               </select>
              
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="date">Sort by: Date</option>
//                 <option value="popularity">Sort by: Popularity</option>
//                 <option value="duration">Sort by: Duration</option>
//               </select>
              
//               <button
//                 onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
//                 className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//               >
//                 {viewMode === 'grid' ? 'List View' : 'Grid View'}
//               </button>
//             </div>
//           </div>

//           {/* Advanced Filters */}
//           <div className={`mt-6 ${showFilters ? 'block' : 'hidden'}`}>
//             <div className="pt-6 border-t border-gray-200">
//               <h4 className="font-bold text-gray-900 mb-4">Filter by Timezone</h4>
//               <div className="flex flex-wrap gap-2">
//                 {timezones.map(tz => (
//                   <button
//                     key={tz}
//                     onClick={() => handleTimezoneToggle(tz)}
//                     className={`px-4 py-2 rounded-lg border transition-colors ${
//                       selectedTimezones.includes(tz)
//                         ? 'bg-green-100 border-green-500 text-green-700'
//                         : 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
//                     }`}
//                   >
//                     {tz}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
          
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="mt-4 text-green-600 hover:text-green-700 font-semibold flex items-center gap-2"
//           >
//             <Filter size={16} />
//             {showFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
//           </button>
//         </div>

//         {/* Webinars */}
//         {viewMode === 'grid' ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredWebinars.map((webinar) => (
//               <div
//                 key={webinar.id}
//                 className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group"
//               >
//                 {/* Header */}
//                 <div className="relative">
//                   <div className="absolute top-4 left-4 z-10">
//                     {webinar.featured && (
//                       <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
//                         Featured
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="absolute top-4 right-4 z-10">
//                     {webinar.earlyBird && (
//                       <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
//                         Early Bird
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="h-48 bg-gradient-to-r from-green-500 to-emerald-500 relative overflow-hidden">
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Video className="text-white/20" size={80} />
//                     </div>
//                     <div className="absolute bottom-4 left-4">
//                       <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
//                         {webinar.category}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-3">
//                     <div className="text-sm font-semibold text-green-600">
//                       {formatDate(webinar.date)} • {formatTime(webinar.date)} {webinar.timezone}
//                     </div>
//                     <div className="text-sm text-gray-600 flex items-center gap-1">
//                       <Clock size={14} />
//                       {webinar.duration} min
//                     </div>
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 line-clamp-2">
//                     {webinar.title}
//                   </h3>
                  
//                   <p className="text-gray-600 mb-4 line-clamp-2">{webinar.description}</p>
                  
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="text-sm text-gray-600">{webinar.host}</div>
//                     <div className="flex items-center gap-2">
//                       <Users size={14} />
//                       <span className="text-sm font-semibold">
//                         {webinar.registered}/{webinar.capacity}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2 mb-6">
//                     {webinar.tags.map((tag, idx) => (
//                       <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
                  
//                   {/* Action Buttons */}
//                   <div className="flex gap-3">
//                     <button
//                       onClick={() => router.push(`/webinars/${webinar.id}`)}
//                       className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
//                     >
//                       View Details
//                     </button>
//                     <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-semibold">
//                       Register
//                     </button>
//                   </div>
                  
//                   {/* Early Bird Notice */}
//                   {webinar.earlyBird && (
//                     <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
//                       <div className="text-sm text-purple-700 font-semibold">
//                         Early bird ends in {getDaysUntil(webinar.earlyBirdEnds)} days
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-6">
//             {filteredWebinars.map((webinar) => (
//               <div
//                 key={webinar.id}
//                 className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
//               >
//                 <div className="flex flex-col lg:flex-row lg:items-center gap-6">
//                   {/* Date Badge */}
//                   <div className="lg:w-32">
//                     <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-4 text-white text-center">
//                       <div className="text-2xl font-bold">
//                         {new Date(webinar.date).getDate()}
//                       </div>
//                       <div className="text-sm">
//                         {new Date(webinar.date).toLocaleDateString('en-US', { month: 'short' })}
//                       </div>
//                       <div className="text-xs mt-1">{formatTime(webinar.date)}</div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center gap-3 mb-3">
//                       {webinar.featured && (
//                         <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
//                           Featured
//                         </span>
//                       )}
//                       {webinar.earlyBird && (
//                         <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-full">
//                           Early Bird
//                         </span>
//                       )}
//                       <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
//                         {webinar.category}
//                       </span>
//                       <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-bold rounded-full">
//                         {webinar.level}
//                       </span>
//                     </div>
                    
//                     <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600">
//                       {webinar.title}
//                     </h3>
                    
//                     <p className="text-gray-600 mb-4">{webinar.description}</p>
                    
//                     <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <Users size={16} />
//                         <span>Hosted by {webinar.host}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Clock size={16} />
//                         <span>{webinar.duration} minutes • {webinar.timezone}</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Target size={16} />
//                         <span className="font-semibold">
//                           {webinar.registered}/{webinar.capacity} registered
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="lg:w-48">
//                     <div className="space-y-3">
//                       <button
//                         onClick={() => router.push(`/webinars/${webinar.id}`)}
//                         className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
//                       >
//                         View Details
//                       </button>
//                       <button className="w-full py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-semibold">
//                         Register Now
//                       </button>
//                       {webinar.earlyBird && (
//                         <div className="text-center text-sm text-purple-600 font-semibold">
//                           Early bird ends soon!
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {filteredWebinars.length === 0 && (
//           <div className="text-center py-20">
//             <Calendar className="mx-auto text-gray-400 mb-4" size={64} />
//             <h3 className="text-2xl font-bold text-gray-900 mb-2">No upcoming webinars found</h3>
//             <p className="text-gray-600 mb-6">Try adjusting your filters or check back later</p>
//             <button
//               onClick={() => {
//                 setFilterCategory('all')
//                 setFilterLevel('all')
//                 setSearchQuery('')
//                 setSelectedTimezones([])
//               }}
//               className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
//             >
//               Clear All Filters
//             </button>
//           </div>
//         )}

//         {/* Call to Action */}
//         <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 text-center">
//           <h3 className="text-2xl font-bold text-gray-900 mb-4">Never Miss a Webinar</h3>
//           <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
//             Subscribe to get notified about new webinars, early bird discounts, and exclusive content.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
//             />
//             <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold">
//               Subscribe
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }