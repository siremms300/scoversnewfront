// app/scholarships/page.tsx - UPDATED VERSION
'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, Award, Calendar, DollarSign, Globe, TrendingUp, Zap, Bell } from 'lucide-react'
import ScholarshipCard from '@/components/scholarships/ScholarshipCard'
import { toast } from 'react-hot-toast'

const scholarships = [
  {
    id: 1,
    title: 'Fully Funded STEM Scholarship',
    provider: 'Stanford University',
    amount: '$50,000',
    deadline: '2024-03-15',
    eligibility: 'International students with 3.5+ GPA',
    description: 'Full tuition coverage for STEM programs',
    tags: ['STEM', 'Full Tuition', 'USA'],
    featured: true,
    applications: 1250
  },
  // ... (keep the rest of the scholarships data)
]

export default function ScholarshipsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships)
  const [sortBy, setSortBy] = useState('deadline')
  const [showAlertModal, setShowAlertModal] = useState(false)

  useEffect(() => {
    let results = scholarships
    
    if (searchTerm) {
      results = results.filter(scholarship =>
        scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scholarship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort results
    results.sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
      } else if (sortBy === 'amount') {
        const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''))
        const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''))
        return amountB - amountA
      } else if (sortBy === 'applications') {
        return b.applications - a.applications
      }
      return 0
    })

    setFilteredScholarships(results)
  }, [searchTerm, sortBy])

  const handleSetupAlert = () => {
    setShowAlertModal(true)
  }

  const handleSaveAlert = (preferences: any) => {
    // Save alert preferences to local storage or API
    localStorage.setItem('scholarship-alerts', JSON.stringify(preferences))
    setShowAlertModal(false)
    toast.success('Alerts set up successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Scholarship Hub
              <span className="block text-amber-200">Find Your Funding</span>
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-12">
              Discover thousands of scholarship opportunities worth millions. Updated daily.
            </p>
            
            {/* Search Bar and Alert Button */}
            <div className="max-w-6xl mx-auto">
              <div className="relative group mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-white rounded-xl p-2 shadow-2xl">
                  <div className="flex">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                        <input
                          type="text"
                          placeholder="Search scholarships by keyword, university, or field..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border-0 focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                      </div>
                    </div>
                    <button className="ml-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Alert Setup Button in Hero */}
              <div className="flex justify-center">
                <button
                  onClick={handleSetupAlert}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all hover:scale-105"
                >
                  <Bell size={24} />
                  <span className="font-semibold text-lg">Get Scholarship Alerts</span>
                  <span className="px-3 py-1 bg-amber-500 rounded-full text-sm font-bold animate-pulse">
                    New
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">2,500+</div>
              <div className="text-gray-600">Scholarships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">$250M+</div>
              <div className="text-gray-600">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">85%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
              <div className="text-gray-600">Application Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (without alert card) */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Amount</h4>
                  <div className="space-y-2">
                    {['Full Tuition', '$50k+', '$25k-$50k', 'Under $25k'].map((range) => (
                      <label key={range} className="flex items-center cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                        <span className="ml-2 text-gray-700">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Deadline</h4>
                  <div className="space-y-2">
                    {['Within 30 days', 'Within 60 days', 'Within 90 days', 'No deadline'].map((time) => (
                      <label key={time} className="flex items-center cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                        <span className="ml-2 text-gray-700">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Popular Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {['STEM', 'Merit-Based', 'Need-Based', 'Women', 'International', 'Sports', 'Arts'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Scholarships Grid */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredScholarships.length} Scholarships Found
                </h2>
                <p className="text-gray-600">Updated daily from global institutions</p>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                >
                  <option value="deadline">Sort by: Deadline</option>
                  <option value="amount">Sort by: Amount</option>
                  <option value="applications">Sort by: Popularity</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                  <Filter size={20} />
                  Advanced Filters
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {filteredScholarships.map((scholarship, index) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  index={index}
                />
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <div className="text-center py-20">
                <Award className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No scholarships found</h3>
                <p className="text-gray-600">Try different search terms or filters</p>
              </div>
            )}

            {/* Tips Section */}
            <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Scholarship Application Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    title: 'Start Early',
                    tips: ['Begin 3-6 months before deadline', 'Gather all documents']
                  },
                  {
                    icon: Zap,
                    title: 'Stand Out',
                    tips: ['Tell your unique story', 'Highlight achievements']
                  },
                  {
                    icon: Globe,
                    title: 'Apply Widely',
                    tips: ['Apply to 10-15 scholarships', 'Consider smaller awards']
                  }
                ].map((tip, idx) => {
                  const Icon = tip.icon
                  return (
                    <div key={idx} className="p-6 bg-gray-50 rounded-lg">
                      <Icon className="text-amber-600 mb-4" size={24} />
                      <h4 className="font-bold text-gray-900 mb-3">{tip.title}</h4>
                      <ul className="space-y-2">
                        {tip.tips.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-amber-600 mr-2">•</span>
                            <span className="text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Setup Modal */}
      {showAlertModal && (
        <AlertSetupModal
          onClose={() => setShowAlertModal(false)}
          onSave={handleSaveAlert}
        />
      )}
    </div>
  )
}

// Alert Setup Modal Component
function AlertSetupModal({ onClose, onSave }: { onClose: () => void; onSave: (preferences: any) => void }) {
  const [preferences, setPreferences] = useState({
    email: '',
    frequency: 'daily',
    categories: [] as string[],
    minAmount: '',
    deadlineAlert: 30,
    countries: [] as string[]
  })

  const categories = [
    'STEM', 'Merit-Based', 'Need-Based', 'Women', 'International',
    'Arts', 'Sports', 'Leadership', 'Research', 'Entrepreneurship'
  ]

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan', 'Singapore']

  const handleCategoryToggle = (category: string) => {
    setPreferences(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  const handleCountryToggle = (country: string) => {
    setPreferences(prev => ({
      ...prev,
      countries: prev.countries.includes(country)
        ? prev.countries.filter(c => c !== country)
        : [...prev.countries, country]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(preferences)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Set Up Scholarship Alerts</h2>
              <p className="text-gray-600">Get notified about new scholarships matching your criteria</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={preferences.email}
                onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alert Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['daily', 'weekly', 'monthly'].map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setPreferences(prev => ({ ...prev, frequency: freq }))}
                    className={`p-3 rounded-lg border-2 text-center capitalize ${
                      preferences.frequency === freq
                        ? 'border-amber-500 bg-amber-50 text-amber-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Scholarship Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      preferences.categories.includes(category)
                        ? 'bg-amber-100 border-amber-300 text-amber-700'
                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount and Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Amount (Optional)
                </label>
                <input
                  type="number"
                  value={preferences.minAmount}
                  onChange={(e) => setPreferences(prev => ({ ...prev, minAmount: e.target.value }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., 10000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline Alert (days before)
                </label>
                <select
                  value={preferences.deadlineAlert}
                  onChange={(e) => setPreferences(prev => ({ ...prev, deadlineAlert: parseInt(e.target.value) }))}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500"
                >
                  <option value={7}>7 days before</option>
                  <option value={14}>14 days before</option>
                  <option value={30}>30 days before</option>
                  <option value={60}>60 days before</option>
                </select>
              </div>
            </div>

            {/* Countries */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Countries (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    onClick={() => handleCountryToggle(country)}
                    className={`px-4 py-2 rounded-full border transition-colors ${
                      preferences.countries.includes(country)
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold"
              >
                Save Alert Preferences
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}





























// // app/scholarships/page.tsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { Search, Filter, Award, Calendar, DollarSign, Globe, TrendingUp, Zap } from 'lucide-react'
// import ScholarshipCard from '@/components/scholarships/ScholarshipCard'

// const scholarships = [
//   {
//     id: 1,
//     title: 'Fully Funded STEM Scholarship',
//     provider: 'Stanford University',
//     amount: '$50,000',
//     deadline: '2024-03-15',
//     eligibility: 'International students with 3.5+ GPA',
//     description: 'Full tuition coverage for STEM programs',
//     tags: ['STEM', 'Full Tuition', 'USA'],
//     featured: true,
//     applications: 1250
//   },
//   {
//     id: 2,
//     title: 'International Merit Scholarship',
//     provider: 'University of Cambridge',
//     amount: '£30,000',
//     deadline: '2024-04-30',
//     eligibility: 'All nationalities, academic excellence',
//     description: 'Merit-based scholarship for outstanding students',
//     tags: ['Merit-Based', 'UK', 'All Programs'],
//     featured: true,
//     applications: 890
//   },
//   {
//     id: 3,
//     title: 'Women in Technology Scholarship',
//     provider: 'Google & MIT',
//     amount: '$25,000',
//     deadline: '2024-02-28',
//     eligibility: 'Female students in tech fields',
//     description: 'Supporting women pursuing technology careers',
//     tags: ['Women', 'Technology', 'Diversity'],
//     featured: false,
//     applications: 620
//   },
//   {
//     id: 4,
//     title: 'Developing Nations Scholarship',
//     provider: 'University of Toronto',
//     amount: 'CAD 40,000',
//     deadline: '2024-05-15',
//     eligibility: 'Students from developing countries',
//     description: 'Financial support for students from developing nations',
//     tags: ['Developing Countries', 'Canada', 'Need-Based'],
//     featured: false,
//     applications: 430
//   },
//   {
//     id: 5,
//     title: 'Arts & Humanities Excellence Award',
//     provider: 'University of Melbourne',
//     amount: 'AUD 35,000',
//     deadline: '2024-03-31',
//     eligibility: 'Arts and humanities students',
//     description: 'Award for excellence in arts and humanities',
//     tags: ['Arts', 'Humanities', 'Australia'],
//     featured: false,
//     applications: 310
//   },
//   {
//     id: 6,
//     title: 'Engineering Leadership Scholarship',
//     provider: 'ETH Zurich',
//     amount: 'CHF 45,000',
//     deadline: '2024-04-15',
//     eligibility: 'Engineering students with leadership potential',
//     description: 'Scholarship for future engineering leaders',
//     tags: ['Engineering', 'Leadership', 'Switzerland'],
//     featured: true,
//     applications: 540
//   }
// ]

// export default function ScholarshipsPage() {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [filteredScholarships, setFilteredScholarships] = useState(scholarships)
//   const [sortBy, setSortBy] = useState('deadline')

//   useEffect(() => {
//     let results = scholarships
    
//     if (searchTerm) {
//       results = results.filter(scholarship =>
//         scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         scholarship.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         scholarship.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//       )
//     }

//     // Sort results
//     results.sort((a, b) => {
//       if (sortBy === 'deadline') {
//         return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
//       } else if (sortBy === 'amount') {
//         const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''))
//         const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''))
//         return amountB - amountA
//       } else if (sortBy === 'applications') {
//         return b.applications - a.applications
//       }
//       return 0
//     })

//     setFilteredScholarships(results)
//   }, [searchTerm, sortBy])

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600">
//         <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10" />
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//               Scholarship Hub
//               <span className="block text-amber-200">Find Your Funding</span>
//             </h1>
//             <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-12">
//               Discover thousands of scholarship opportunities worth millions. Updated daily.
//             </p>
            
//             {/* Search Bar */}
//             <div className="max-w-4xl mx-auto">
//               <div className="relative group">
//                 <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
//                 <div className="relative bg-white rounded-xl p-2 shadow-2xl">
//                   <div className="flex">
//                     <div className="flex-1">
//                       <div className="relative">
//                         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
//                         <input
//                           type="text"
//                           placeholder="Search scholarships by keyword, university, or field..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border-0 focus:ring-2 focus:ring-amber-500 outline-none"
//                         />
//                       </div>
//                     </div>
//                     <button className="ml-2 px-8 py-4 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold">
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Quick Stats */}
//       <div className="bg-white shadow-lg">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
//             <div className="text-center">
//               <div className="text-3xl font-bold text-amber-600 mb-2">2,500+</div>
//               <div className="text-gray-600">Scholarships</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-amber-600 mb-2">$250M+</div>
//               <div className="text-gray-600">Total Value</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-amber-600 mb-2">85%</div>
//               <div className="text-gray-600">Success Rate</div>
//             </div>
//             <div className="text-center">
//               <div className="text-3xl font-bold text-amber-600 mb-2">24/7</div>
//               <div className="text-gray-600">Application Support</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar */}
//           <div className="lg:w-1/4">
//             <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
//               <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Filters</h3>
              
//               <div className="space-y-6">
//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Amount</h4>
//                   <div className="space-y-2">
//                     {['Full Tuition', '$50k+', '$25k-$50k', 'Under $25k'].map((range) => (
//                       <label key={range} className="flex items-center cursor-pointer">
//                         <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
//                         <span className="ml-2 text-gray-700">{range}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Deadline</h4>
//                   <div className="space-y-2">
//                     {['Within 30 days', 'Within 60 days', 'Within 90 days', 'No deadline'].map((time) => (
//                       <label key={time} className="flex items-center cursor-pointer">
//                         <input type="checkbox" className="rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
//                         <span className="ml-2 text-gray-700">{time}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h4 className="font-semibold text-gray-900 mb-3">Popular Tags</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {['STEM', 'Merit-Based', 'Need-Based', 'Women', 'International', 'Sports', 'Arts'].map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 cursor-pointer"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               <button className="w-full mt-8 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold">
//                 Apply Filters
//               </button>
//             </div>

//             {/* Alert Card */}
//             <div className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
//               <h4 className="font-bold text-lg mb-3">Get Scholarship Alerts</h4>
//               <p className="text-blue-100 mb-4">Never miss a deadline</p>
//               <button className="w-full py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50">
//                 Set Up Alerts
//               </button>
//             </div>
//           </div>

//           {/* Scholarships Grid */}
//           <div className="flex-1">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">
//                   {filteredScholarships.length} Scholarships Found
//                 </h2>
//                 <p className="text-gray-600">Updated daily from global institutions</p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
//                 >
//                   <option value="deadline">Sort by: Deadline</option>
//                   <option value="amount">Sort by: Amount</option>
//                   <option value="applications">Sort by: Popularity</option>
//                 </select>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
//                   <Filter size={20} />
//                   Advanced Filters
//                 </button>
//               </div>
//             </div>

//             <div className="space-y-6">
//               {filteredScholarships.map((scholarship, index) => (
//                 <ScholarshipCard
//                   key={scholarship.id}
//                   scholarship={scholarship}
//                   index={index}
//                 />
//               ))}
//             </div>

//             {filteredScholarships.length === 0 && (
//               <div className="text-center py-20">
//                 <Award className="mx-auto text-gray-400 mb-4" size={64} />
//                 <h3 className="text-2xl font-bold text-gray-900 mb-2">No scholarships found</h3>
//                 <p className="text-gray-600">Try different search terms or filters</p>
//               </div>
//             )}

//             {/* Tips Section */}
//             <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
//               <h3 className="text-2xl font-bold text-gray-900 mb-6">Scholarship Application Tips</h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {[
//                   {
//                     icon: TrendingUp,
//                     title: 'Start Early',
//                     tips: ['Begin 3-6 months before deadline', 'Gather all documents']
//                   },
//                   {
//                     icon: Zap,
//                     title: 'Stand Out',
//                     tips: ['Tell your unique story', 'Highlight achievements']
//                   },
//                   {
//                     icon: Globe,
//                     title: 'Apply Widely',
//                     tips: ['Apply to 10-15 scholarships', 'Consider smaller awards']
//                   }
//                 ].map((tip, idx) => {
//                   const Icon = tip.icon
//                   return (
//                     <div key={idx} className="p-6 bg-gray-50 rounded-lg">
//                       <Icon className="text-amber-600 mb-4" size={24} />
//                       <h4 className="font-bold text-gray-900 mb-3">{tip.title}</h4>
//                       <ul className="space-y-2">
//                         {tip.tips.map((item, i) => (
//                           <li key={i} className="flex items-start">
//                             <span className="text-amber-600 mr-2">•</span>
//                             <span className="text-gray-600">{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

