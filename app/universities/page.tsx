'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MapPin, Star, Globe, TrendingUp, Award, Users } from 'lucide-react'
import UniversityCard from '@/components/universities/UniversityCard'
import FilterPanel from '@/components/universities/FilterPanel'

const universities = [
  {
    id: 1,
    name: 'Stanford University',
    location: 'Stanford, California, USA',
    ranking: 3,
    tuition: '$56,169',
    acceptanceRate: '4%',
    programs: ['Computer Science', 'Business', 'Engineering'],
    image: '/api/placeholder/400/250',
    featured: true,
    scholarships: 45
  },
  {
    id: 2,
    name: 'Massachusetts Institute of Technology',
    location: 'Cambridge, Massachusetts, USA',
    ranking: 1,
    tuition: '$53,790',
    acceptanceRate: '7%',
    programs: ['Engineering', 'Computer Science', 'Physics'],
    image: '/api/placeholder/400/250',
    featured: true,
    scholarships: 38
  },
  {
    id: 3,
    name: 'University of Cambridge',
    location: 'Cambridge, England, UK',
    ranking: 2,
    tuition: '£33,825',
    acceptanceRate: '21%',
    programs: ['Natural Sciences', 'Medicine', 'Law'],
    image: '/api/placeholder/400/250',
    featured: false,
    scholarships: 52
  },
  {
    id: 4,
    name: 'University of Toronto',
    location: 'Toronto, Ontario, Canada',
    ranking: 18,
    tuition: 'CAD 60,000',
    acceptanceRate: '43%',
    programs: ['Medicine', 'Engineering', 'Business'],
    image: '/api/placeholder/400/250',
    featured: false,
    scholarships: 67
  },
  {
    id: 5,
    name: 'University of Melbourne',
    location: 'Melbourne, Victoria, Australia',
    ranking: 33,
    tuition: 'AUD 45,000',
    acceptanceRate: '70%',
    programs: ['Arts', 'Science', 'Business'],
    image: '/api/placeholder/400/250',
    featured: false,
    scholarships: 41
  },
  {
    id: 6,
    name: 'ETH Zurich',
    location: 'Zurich, Switzerland',
    ranking: 7,
    tuition: 'CHF 1,290',
    acceptanceRate: '27%',
    programs: ['Engineering', 'Science', 'Architecture'],
    image: '/api/placeholder/400/250',
    featured: true,
    scholarships: 29
  }
]

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filteredUniversities, setFilteredUniversities] = useState(universities)
  const [activeFilters, setActiveFilters] = useState({
    country: '',
    program: '',
    tuition: '',
    scholarship: false
  })

  useEffect(() => {
    let results = universities
    
    if (searchTerm) {
      results = results.filter(uni =>
        uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uni.programs.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (activeFilters.country) {
      results = results.filter(uni => 
        uni.location.toLowerCase().includes(activeFilters.country.toLowerCase())
      )
    }

    if (activeFilters.program) {
      results = results.filter(uni =>
        uni.programs.some(p => p.toLowerCase().includes(activeFilters.program.toLowerCase()))
      )
    }

    if (activeFilters.scholarship) {
      results = results.filter(uni => uni.scholarships > 30)
    }

    setFilteredUniversities(results)
  }, [searchTerm, activeFilters])

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters({ ...activeFilters, ...newFilters })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-secondary">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Find Your Dream
              <span className="block text-cyan-300">University</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Search 500+ universities worldwide. Filter by location, program, tuition, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <div className="relative bg-white rounded-xl p-2 shadow-2xl">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                        <input
                          type="text"
                          placeholder="Search universities, programs, or locations..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-4 text-lg rounded-lg border-0 focus:ring-2 focus:ring-primary outline-none"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="px-6 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2 font-semibold"
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
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">2,000+</div>
              <div className="text-gray-600">Programs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-600">Admission Success</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterPanel onFilterChange={handleFilterChange} activeFilters={activeFilters} />
          </div>

          {/* Universities Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredUniversities.length} Universities Found
                </h2>
                <p className="text-gray-600">Sorted by relevance</p>
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary">
                <option>Sort by: Relevance</option>
                <option>Sort by: Ranking</option>
                <option>Sort by: Tuition (Low to High)</option>
                <option>Sort by: Tuition (High to Low)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredUniversities.map((university, index) => (
                <UniversityCard
                  key={university.id}
                  university={university}
                  index={index}
                />
              ))}
            </div>

            {filteredUniversities.length === 0 && (
              <div className="text-center py-20">
                <Search className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No universities found</h3>
                <p className="text-gray-600">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </div>

        {/* Featured Programs */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Study Programs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Computer Science', icon: TrendingUp, count: 320 },
              { name: 'Business Administration', icon: Award, count: 280 },
              { name: 'Mechanical Engineering', icon: Users, count: 195 },
              { name: 'Medicine', icon: Star, count: 150 }
            ].map((program, idx) => {
              const Icon = program.icon
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-primary/20 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className="text-primary" size={32} />
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {program.count} programs
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
                  <p className="text-gray-600">Top universities offering this program worldwide</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}