// app/webinars/calendar/page.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Calendar as CalendarIcon, ChevronLeft, ChevronRight,
  Filter, Video, Users, Clock, MapPin, Zap, Search,
  ChevronDown, X, Plus, Share2, Download
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// Mock webinar data
// const webinars = [
//   {
//     id: 1,
//     title: 'How to Get into Top US Universities',
//     host: 'Dr. Sarah Johnson',
//     date: '2024-03-15T14:00:00Z',
//     duration: 90,
//     category: 'Admissions',
//     level: 'All Levels',
//     registered: 423,
//     capacity: 500,
//     timezone: 'EST'
//   },
//   {
//     id: 2,
//     title: 'Scholarship Success Secrets',
//     host: 'Michael Chen',
//     date: '2024-03-18T10:00:00Z',
//     duration: 60,
//     category: 'Funding',
//     level: 'Beginner',
//     registered: 287,
//     capacity: 300,
//     timezone: 'PST'
//   },
//   {
//     id: 3,
//     title: 'UK University Applications 2024',
//     host: 'Prof. David Williams',
//     date: '2024-03-20T16:00:00Z',
//     duration: 75,
//     category: 'Admissions',
//     level: 'Intermediate',
//     registered: 195,
//     capacity: 400,
//     timezone: 'GMT'
//   },
//   {
//     id: 4,
//     title: 'Visa Processing Simplified',
//     host: 'Lisa Rodriguez',
//     date: '2024-03-22T12:00:00Z',
//     duration: 45,
//     category: 'Visa',
//     level: 'Beginner',
//     registered: 89,
//     capacity: 250,
//     timezone: 'CST'
//   },
//   {
//     id: 5,
//     title: 'STEM Careers in Europe',
//     host: 'Dr. Emma Schmidt',
//     date: '2024-03-25T15:00:00Z',
//     duration: 60,
//     category: 'Career',
//     level: 'Advanced',
//     registered: 312,
//     capacity: 350,
//     timezone: 'CET'
//   },
//   {
//     id: 6,
//     title: 'MBA Admissions Masterclass',
//     host: 'HBS Admissions Committee',
//     date: '2024-03-28T11:00:00Z',
//     duration: 120,
//     category: 'MBA',
//     level: 'Advanced',
//     registered: 199,
//     capacity: 200,
//     timezone: 'EST'
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
//     timezone: 'EST'
//   },
//   {
//     id: 8,
//     title: 'Medical School Admissions',
//     host: 'Dr. Robert Chen',
//     date: '2024-04-05T09:00:00Z',
//     duration: 90,
//     category: 'Medical',
//     level: 'Advanced',
//     registered: 210,
//     capacity: 250,
//     timezone: 'PST'
//   }
// ]


const getFutureDate = (daysFromNow: number, hour: number = 14, minute: number = 0) => {
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  date.setHours(hour, minute, 0, 0)
  return date.toISOString()
}

// Update the webinars array in app/webinars/calendar/page.tsx with future dates:

const webinars = [
  {
    id: 1,
    title: 'How to Get into Top US Universities',
    host: 'Dr. Sarah Johnson',
    date: getFutureDate(3, 14, 0), // 3 days from now
    duration: 90,
    category: 'Admissions',
    level: 'All Levels',
    registered: 423,
    capacity: 500,
    timezone: 'EST'
  },
  {
    id: 2,
    title: 'Scholarship Success Secrets',
    host: 'Michael Chen',
    date: getFutureDate(5, 10, 0), // 5 days from now
    duration: 60,
    category: 'Funding',
    level: 'Beginner',
    registered: 287,
    capacity: 300,
    timezone: 'PST'
  },
  // ... rest of the webinars with future dates
]

// Generate calendar days
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  
  const days = []
  const firstDayIndex = firstDay.getDay() // 0 = Sunday, 1 = Monday, etc.
  
  // Add empty days for the first week
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    days.push({
      date,
      day,
      isToday: date.toDateString() === new Date().toDateString(),
      webinars: webinars.filter(w => {
        const webinarDate = new Date(w.date)
        return webinarDate.getDate() === day &&
               webinarDate.getMonth() === month &&
               webinarDate.getFullYear() === year
      })
    })
  }
  
  return days
}

export default function WebinarCalendarPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [calendarDays, setCalendarDays] = useState<any[]>([])
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterLevel, setFilterLevel] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const categories = ['All', 'Admissions', 'Funding', 'Visa', 'Career', 'MBA', 'Medical', 'Country Guide']
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentYear, currentMonth))
  }, [currentYear, currentMonth])

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const handleDateClick = (day: any) => {
    if (day) {
      setSelectedDate(day.date)
    }
  }

  const handleWebinarClick = (webinarId: number) => {
    router.push(`/webinars/${webinarId}`)
  }

  const handleAddToCalendar = () => {
    toast.success('Added to your calendar!')
  }

  const handleExportCalendar = () => {
    toast.success('Calendar exported successfully!')
  }

  const getFilteredWebinars = () => {
    if (!selectedDate) return []
    
    return webinars
      .filter(webinar => {
        const webinarDate = new Date(webinar.date)
        return webinarDate.getDate() === selectedDate.getDate() &&
               webinarDate.getMonth() === selectedDate.getMonth() &&
               webinarDate.getFullYear() === selectedDate.getFullYear()
      })
      .filter(webinar => {
        if (filterCategory !== 'all' && webinar.category !== filterCategory) return false
        if (filterLevel !== 'all' && webinar.level !== filterLevel) return false
        if (searchQuery && !webinar.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
      })
  }

  const selectedDateWebinars = getFilteredWebinars()

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <Link
                href="/webinars"
                className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Webinars
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Webinar Calendar</h1>
              <p className="text-xl text-blue-100">
                Plan your learning journey with our interactive calendar
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={goToToday}
                className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors font-semibold"
              >
                Today
              </button>
              <button
                onClick={handleExportCalendar}
                className="px-6 py-3 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-colors font-semibold flex items-center gap-2"
              >
                <Download size={20} />
                Export Calendar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Date Navigation */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Navigation</h3>
                <div className="flex gap-2">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-2xl font-bold text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Video className="text-blue-600" size={20} />
                    <div className="font-bold text-gray-900">Total Webinars</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">{webinars.length}</div>
                </div>
                
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="text-green-600" size={20} />
                    <div className="font-bold text-gray-900">Upcoming This Month</div>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    {webinars.filter(w => new Date(w.date).getMonth() === currentMonth).length}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat === 'All' ? 'all' : cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {levels.map(level => (
                      <option key={level} value={level === 'All Levels' ? 'all' : level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search webinars..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setFilterCategory('all')
                  setFilterLevel('all')
                  setSearchQuery('')
                }}
                className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
            </div>

            {/* Legend */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm text-gray-700">Admissions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-700">Funding</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-700">Career</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-700">Visa</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-700">Featured</span>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar & Events */}
          <div className="lg:col-span-3">
            {/* Calendar Header */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      viewMode === 'month'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Month
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      viewMode === 'week'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Week
                  </button>
                  <button
                    onClick={() => setViewMode('day')}
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      viewMode === 'day'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Day
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-lg font-bold text-gray-900">
                    {monthNames[currentMonth]} {currentYear}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={prevMonth}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="border rounded-xl overflow-hidden">
                {/* Day Headers */}
                <div className="grid grid-cols-7 bg-gray-50 border-b">
                  {dayNames.map(day => (
                    <div key={day} className="p-4 text-center font-semibold text-gray-700">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[120px] border border-gray-100 p-2 ${
                        day ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50'
                      } ${
                        day?.isToday ? 'bg-blue-50' : ''
                      } ${
                        selectedDate && day && day.date.toDateString() === selectedDate.toDateString()
                          ? 'bg-blue-100 ring-2 ring-blue-500'
                          : ''
                      }`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day && (
                        <>
                          <div className="flex justify-between items-center mb-1">
                            <div className={`text-sm font-semibold ${
                              day.isToday
                                ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                                : 'text-gray-900'
                            }`}>
                              {day.day}
                            </div>
                            {day.webinars.length > 0 && (
                              <div className="text-xs font-bold text-blue-600">
                                {day.webinars.length}
                              </div>
                            )}
                          </div>
                          
                          {/* Webinar Indicators */}
                          <div className="space-y-1">
                            {day.webinars.slice(0, 2).map((webinar: any) => (
                              <div
                                key={webinar.id}
                                className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-90 ${
                                  webinar.category === 'Admissions' ? 'bg-blue-100 text-blue-800' :
                                  webinar.category === 'Funding' ? 'bg-green-100 text-green-800' :
                                  webinar.category === 'Career' ? 'bg-purple-100 text-purple-800' :
                                  webinar.category === 'Visa' ? 'bg-amber-100 text-amber-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleWebinarClick(webinar.id)
                                }}
                              >
                                {webinar.title}
                              </div>
                            ))}
                            {day.webinars.length > 2 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{day.webinars.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Date Events */}
            {selectedDate && (
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Webinars on {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </h3>
                    <p className="text-gray-600">
                      {selectedDateWebinars.length} webinar{selectedDateWebinars.length !== 1 ? 's' : ''} scheduled
                    </p>
                  </div>
                  
                  <button
                    onClick={handleAddToCalendar}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2"
                  >
                    <Plus size={20} />
                    Add All to Calendar
                  </button>
                </div>

                {selectedDateWebinars.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateWebinars.map((webinar) => (
                      <div
                        key={webinar.id}
                        className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors group"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                webinar.category === 'Admissions' ? 'bg-blue-100 text-blue-800' :
                                webinar.category === 'Funding' ? 'bg-green-100 text-green-800' :
                                webinar.category === 'Career' ? 'bg-purple-100 text-purple-800' :
                                webinar.category === 'Visa' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {webinar.category}
                              </div>
                              <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                                {webinar.level}
                              </div>
                            </div>
                            
                            <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                              {webinar.title}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Clock size={16} />
                                {new Date(webinar.date).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })} ({webinar.timezone})
                              </div>
                              <div className="flex items-center gap-2">
                                <Video size={16} />
                                {webinar.duration} minutes
                              </div>
                              <div className="flex items-center gap-2">
                                <Users size={16} />
                                {webinar.registered}/{webinar.capacity} registered
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => handleWebinarClick(webinar.id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                            >
                              View Details
                            </button>
                            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold">
                              Add to Calendar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="mx-auto text-gray-400 mb-4" size={64} />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">No webinars scheduled</h4>
                    <p className="text-gray-600 mb-6">No webinars are scheduled for this date with current filters</p>
                    <button
                      onClick={() => {
                        setFilterCategory('all')
                        setFilterLevel('all')
                        setSearchQuery('')
                      }}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}