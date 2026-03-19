'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Search, Filter, BookOpen, Award, Clock, Users, DollarSign,
  ChevronLeft, GraduationCap, Star, TrendingUp, MapPin, Building,
  BarChart3, Target, Calendar, Bookmark, Share2, Download,
  Eye, Heart, Layers, Zap, CheckCircle, ArrowRight, Filter as FilterIcon,
  X, ChevronDown, ExternalLink, Book as ProgramIcon
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock data - in production, this would come from API
const universityPrograms = {
  id: 'stanford',
  name: 'Stanford University',
  location: 'Stanford, California, USA',
  ranking: 3,
  totalPrograms: 190,
  
  programs: [
    {
      id: 'cs-bs',
      name: 'Computer Science',
      level: 'Undergraduate',
      degree: 'Bachelor of Science (BS)',
      duration: '4 years',
      department: 'School of Engineering',
      tuition: '$56,169/year',
      applicationDeadline: '2024-12-15',
      scholarships: 45,
      popularity: 95,
      employmentRate: '98%',
      avgSalary: '$125,000',
      requirements: {
        gpa: 3.9,
        tests: ['SAT/ACT', 'TOEFL/IELTS'],
        prerequisites: ['Calculus', 'Physics', 'Programming']
      },
      description: 'Comprehensive computer science program focusing on algorithms, AI, systems, and software engineering.',
      specializations: ['AI & Machine Learning', 'Systems', 'Theory', 'Human-Computer Interaction']
    },
    {
      id: 'mba',
      name: 'Master of Business Administration',
      level: 'Graduate',
      degree: 'MBA',
      duration: '2 years',
      department: 'Graduate School of Business',
      tuition: '$73,440/year',
      applicationDeadline: '2024-09-05',
      scholarships: 38,
      popularity: 98,
      employmentRate: '99%',
      avgSalary: '$165,000',
      requirements: {
        gpa: 3.7,
        tests: ['GMAT/GRE', 'TOEFL/IELTS'],
        workExperience: '2+ years'
      },
      description: 'World-renowned MBA program focusing on leadership, entrepreneurship, and global business strategy.',
      specializations: ['Entrepreneurship', 'Finance', 'Marketing', 'Operations']
    },
    {
      id: 'medicine-md',
      name: 'Medicine',
      level: 'Graduate',
      degree: 'Doctor of Medicine (MD)',
      duration: '4 years',
      department: 'School of Medicine',
      tuition: '$63,747/year',
      applicationDeadline: '2024-10-01',
      scholarships: 52,
      popularity: 92,
      employmentRate: '100%',
      avgSalary: '$230,000',
      requirements: {
        gpa: 3.8,
        tests: ['MCAT', 'TOEFL/IELTS'],
        prerequisites: ['Biology', 'Chemistry', 'Physics']
      },
      description: 'Comprehensive medical program with clinical training and research opportunities.',
      specializations: ['Surgery', 'Pediatrics', 'Cardiology', 'Neurology']
    },
    {
      id: 'law-jd',
      name: 'Law',
      level: 'Graduate',
      degree: 'Juris Doctor (JD)',
      duration: '3 years',
      department: 'School of Law',
      tuition: '$66,396/year',
      applicationDeadline: '2024-02-15',
      scholarships: 41,
      popularity: 90,
      employmentRate: '97%',
      avgSalary: '$180,000',
      requirements: {
        gpa: 3.8,
        tests: ['LSAT', 'TOEFL/IELTS'],
        prerequisites: ['Bachelor\'s Degree']
      },
      description: 'Leading law program focusing on legal theory, practice, and public service.',
      specializations: ['Corporate Law', 'Constitutional Law', 'International Law', 'Environmental Law']
    },
    {
      id: 'engineering-bs',
      name: 'Mechanical Engineering',
      level: 'Undergraduate',
      degree: 'Bachelor of Science (BS)',
      duration: '4 years',
      department: 'School of Engineering',
      tuition: '$56,169/year',
      applicationDeadline: '2024-12-15',
      scholarships: 35,
      popularity: 88,
      employmentRate: '96%',
      avgSalary: '$85,000',
      requirements: {
        gpa: 3.7,
        tests: ['SAT/ACT', 'TOEFL/IELTS'],
        prerequisites: ['Calculus', 'Physics', 'Chemistry']
      },
      description: 'Comprehensive mechanical engineering program with focus on design, analysis, and innovation.',
      specializations: ['Robotics', 'Aerospace', 'Automotive', 'Biomechanics']
    },
    {
      id: 'education-ma',
      name: 'Education',
      level: 'Graduate',
      degree: 'Master of Arts (MA)',
      duration: '2 years',
      department: 'School of Education',
      tuition: '$52,479/year',
      applicationDeadline: '2025-01-05',
      scholarships: 28,
      popularity: 85,
      employmentRate: '94%',
      avgSalary: '$65,000',
      requirements: {
        gpa: 3.5,
        tests: ['GRE', 'TOEFL/IELTS'],
        prerequisites: ['Bachelor\'s Degree']
      },
      description: 'Advanced education program focusing on teaching, learning, and educational leadership.',
      specializations: ['Educational Technology', 'Curriculum Design', 'Educational Leadership', 'Special Education']
    }
  ],
  
  departments: [
    { name: 'School of Engineering', programs: 45, icon: '⚙️' },
    { name: 'School of Humanities & Sciences', programs: 68, icon: '📚' },
    { name: 'School of Medicine', programs: 32, icon: '⚕️' },
    { name: 'Graduate School of Business', programs: 12, icon: '📊' },
    { name: 'School of Law', programs: 15, icon: '⚖️' },
    { name: 'School of Education', programs: 28, icon: '🎓' }
  ],
  
  stats: {
    undergraduate: 65,
    graduate: 125,
    online: 15,
    averageScholarships: 40,
    employmentRate: '98%'
  }
}

const filters = {
  level: ['All', 'Undergraduate', 'Graduate', 'Doctoral'],
  department: ['All Departments', 'Engineering', 'Business', 'Medicine', 'Law', 'Education', 'Humanities'],
  duration: ['All', '1-2 years', '3-4 years', '5+ years'],
  scholarship: ['All', 'Scholarships Available', 'Full Funding']
}

export default function UniversityProgramsPage() {
  const params = useParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilters, setSelectedFilters] = useState({
    level: 'All',
    department: 'All Departments',
    duration: 'All',
    scholarship: 'All'
  })
  const [filteredPrograms, setFilteredPrograms] = useState(universityPrograms.programs)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('popularity')
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  useEffect(() => {
    let results = universityPrograms.programs
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(program =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply level filter
    if (selectedFilters.level !== 'All') {
      results = results.filter(program => program.level === selectedFilters.level)
    }

    // Apply department filter
    if (selectedFilters.department !== 'All Departments') {
      results = results.filter(program => 
        program.department.toLowerCase().includes(selectedFilters.department.toLowerCase())
      )
    }

    // Apply scholarship filter
    if (selectedFilters.scholarship === 'Scholarships Available') {
      results = results.filter(program => program.scholarships > 30)
    } else if (selectedFilters.scholarship === 'Full Funding') {
      results = results.filter(program => program.scholarships > 40)
    }

    // Sort results
    results.sort((a, b) => {
      if (sortBy === 'popularity') return b.popularity - a.popularity
      if (sortBy === 'tuition') {
        const aTuition = parseFloat(a.tuition.replace(/[^0-9.]/g, ''))
        const bTuition = parseFloat(b.tuition.replace(/[^0-9.]/g, ''))
        return aTuition - bTuition
      }
      if (sortBy === 'deadline') {
        return new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime()
      }
      if (sortBy === 'salary') {
        const aSalary = parseFloat(a.avgSalary.replace(/[^0-9.]/g, ''))
        const bSalary = parseFloat(b.avgSalary.replace(/[^0-9.]/g, ''))
        return bSalary - aSalary
      }
      return 0
    })

    setFilteredPrograms(results)
  }, [searchTerm, selectedFilters, sortBy])

  const handleFilterChange = (filterType: string, value: string) => {
    setSelectedFilters(prev => ({ ...prev, [filterType]: value }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      level: 'All',
      department: 'All Departments',
      duration: 'All',
      scholarship: 'All'
    })
    setSearchTerm('')
  }

  const handleApply = (programId: string) => {
    router.push(`/universities/${params.id}/apply?program=${programId}`)
  }

  const handleViewDetails = (programId: string) => {
    router.push(`/courses/${programId}`)
  }

  const handleCompare = (programId: string) => {
    toast.success('Added to comparison list')
    // In production: Add to comparison context
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <Link
                href={`/universities/${params.id}`}
                className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to University Profile
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <Building size={24} className="text-blue-300" />
                <h1 className="text-3xl font-bold">{universityPrograms.name}</h1>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                All Academic Programs
              </h2>
              
              <p className="text-xl text-blue-100 max-w-3xl">
                Explore {universityPrograms.totalPrograms} programs across {universityPrograms.departments.length} departments at {universityPrograms.name}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{universityPrograms.stats.undergraduate}</div>
                  <div className="text-blue-200">Undergraduate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{universityPrograms.stats.graduate}</div>
                  <div className="text-blue-200">Graduate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{universityPrograms.stats.averageScholarships}</div>
                  <div className="text-blue-200">Avg. Scholarships</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{universityPrograms.stats.employmentRate}</div>
                  <div className="text-blue-200">Employment Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Search programs by name, department, or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Filter Button */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold flex items-center gap-2"
              >
                <Filter size={20} />
                Filters
                {Object.values(selectedFilters).some(f => f !== 'All' && f !== 'All Departments') && (
                  <span className="px-2 py-1 bg-white/20 rounded-full text-sm">
                    {Object.values(selectedFilters).filter(f => f !== 'All' && f !== 'All Departments').length}
                  </span>
                )}
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="popularity">Sort by: Popularity</option>
                <option value="tuition">Sort by: Tuition (Low to High)</option>
                <option value="deadline">Sort by: Application Deadline</option>
                <option value="salary">Sort by: Salary (High to Low)</option>
              </select>
            </div>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200 animate-slide-down">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Filter Programs</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Study Level</h4>
                  <div className="space-y-2">
                    {filters.level.map((level) => (
                      <button
                        key={level}
                        onClick={() => handleFilterChange('level', level)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedFilters.level === level
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Department</h4>
                  <div className="space-y-2">
                    {filters.department.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => handleFilterChange('department', dept)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedFilters.department === dept
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Duration</h4>
                  <div className="space-y-2">
                    {filters.duration.map((duration) => (
                      <button
                        key={duration}
                        onClick={() => handleFilterChange('duration', duration)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedFilters.duration === duration
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {duration}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Funding</h4>
                  <div className="space-y-2">
                    {filters.scholarship.map((scholarship) => (
                      <button
                        key={scholarship}
                        onClick={() => handleFilterChange('scholarship', scholarship)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedFilters.scholarship === scholarship
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {scholarship}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {Object.values(selectedFilters).some(f => f !== 'All' && f !== 'All Departments') && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters)
                .filter(([_, value]) => value !== 'All' && value !== 'All Departments')
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium"
                  >
                    {value}
                    <button
                      onClick={() => handleFilterChange(key, key === 'department' ? 'All Departments' : 'All')}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
            </div>
          </div>
        )}

        {/* Departments Overview */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Departments & Schools</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {universityPrograms.departments.map((dept, idx) => (
              <div
                key={idx}
                onClick={() => handleFilterChange('department', dept.name)}
                className={`bg-white rounded-xl p-6 text-center cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${
                  selectedFilters.department === dept.name
                    ? 'ring-2 ring-blue-500 bg-blue-50'
                    : 'border border-gray-200'
                }`}
              >
                <div className="text-3xl mb-3">{dept.icon}</div>
                <div className="font-semibold text-gray-900 mb-2">{dept.name}</div>
                <div className="text-sm text-blue-600 font-semibold">{dept.programs} programs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {filteredPrograms.length} Programs Found
              </h3>
              <p className="text-gray-600">Showing programs for {universityPrograms.name}</p>
            </div>
            <div className="text-sm text-gray-600">
              {filteredPrograms.length === 0 ? 'No matches' : 'Sorted by ' + sortBy}
            </div>
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Search className="mx-auto text-gray-400 mb-4" size={64} />
              <h4 className="text-2xl font-bold text-gray-900 mb-2">No programs found</h4>
              <p className="text-gray-600 mb-6">Try adjusting your search filters</p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Program Info */}
                      <div className="lg:w-2/3">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {program.level}
                              </span>
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {program.department}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="fill-amber-400 text-amber-400" size={16} />
                                <span className="font-bold">{program.popularity}%</span>
                              </div>
                            </div>
                            
                            <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                              {program.name}
                            </h4>
                            
                            <p className="text-gray-700 mb-6 line-clamp-2">{program.description}</p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Bookmark size={20} className="text-gray-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg">
                              <Share2 size={20} className="text-gray-400" />
                            </button>
                          </div>
                        </div>

                        {/* Program Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Clock size={16} className="text-gray-500" />
                              <span className="text-sm text-gray-600">Duration</span>
                            </div>
                            <div className="font-bold text-gray-900">{program.duration}</div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign size={16} className="text-gray-500" />
                              <span className="text-sm text-gray-600">Tuition</span>
                            </div>
                            <div className="font-bold text-gray-900">{program.tuition}</div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar size={16} className="text-gray-500" />
                              <span className="text-sm text-gray-600">Deadline</span>
                            </div>
                            <div className="font-bold text-gray-900">{formatDate(program.applicationDeadline)}</div>
                          </div>
                          
                          <div className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Award size={16} className="text-gray-500" />
                              <span className="text-sm text-gray-600">Scholarships</span>
                            </div>
                            <div className="font-bold text-green-600">{program.scholarships} available</div>
                          </div>
                        </div>

                        {/* Specializations */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Layers size={18} className="text-blue-600" />
                            <span className="font-semibold text-gray-900">Specializations</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {program.specializations.map((spec, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                              >
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Sidebar */}
                      <div className="lg:w-1/3">
                        <div className="bg-gradient-to-b from-blue-900 to-blue-800 rounded-2xl p-6 text-white h-full">
                          <div className="mb-6">
                            <h5 className="font-bold text-lg mb-4">Career Outcomes</h5>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-blue-200">Employment Rate</span>
                                <span className="font-bold text-green-300">{program.employmentRate}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-blue-200">Avg. Starting Salary</span>
                                <span className="font-bold text-amber-300">{program.avgSalary}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-8">
                            <h5 className="font-bold text-lg mb-4">Requirements</h5>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-300" />
                                <span className="text-sm">GPA: {program.requirements.gpa}+</span>
                              </div>
                              {program.requirements.tests.map((test, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle size={16} className="text-green-300" />
                                  <span className="text-sm">{test}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <button
                              onClick={() => handleApply(program.id)}
                              className="w-full py-3 bg-white text-blue-600 rounded-xl hover:bg-blue-50 font-bold transition-colors"
                            >
                              Apply Now
                            </button>
                            <button
                              onClick={() => handleViewDetails(program.id)}
                              className="w-full py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold transition-colors"
                            >
                              View Program Details
                            </button>
                            <button
                              onClick={() => handleCompare(program.id)}
                              className="w-full py-3 border-2 border-blue-300 text-blue-300 rounded-xl hover:bg-white/5 font-bold transition-colors"
                            >
                              Add to Compare
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expandable Details */}
                  <div className="border-t border-gray-200">
                    <button
                      onClick={() => setExpandedProgram(expandedProgram === program.id ? null : program.id)}
                      className="w-full p-4 flex items-center justify-center gap-2 text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      {expandedProgram === program.id ? 'Show Less' : 'Show More Details'}
                      <ChevronDown className={`transition-transform ${expandedProgram === program.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedProgram === program.id && (
                      <div className="p-6 bg-gray-50 border-t border-gray-200 animate-slide-down">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h5 className="font-bold text-gray-900 mb-4">Program Description</h5>
                            <p className="text-gray-700">{program.description}</p>
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900 mb-4">Career Paths</h5>
                            <div className="space-y-2">
                              {[
                                'Industry Leadership Roles',
                                'Research & Development',
                                'Academic Positions',
                                'Entrepreneurship',
                                'Consulting'
                              ].map((path, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <ArrowRight size={16} className="text-blue-500" />
                                  <span className="text-gray-700">{path}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{universityPrograms.totalPrograms}</div>
              <div className="text-blue-200">Total Programs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{universityPrograms.stats.averageScholarships}</div>
              <div className="text-blue-200">Average Scholarships per Program</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{universityPrograms.stats.employmentRate}</div>
              <div className="text-blue-200">Overall Employment Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}