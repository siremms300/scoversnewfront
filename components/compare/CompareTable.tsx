'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import {
  MapPin, Globe, Users, Star, TrendingUp, Award, Building,
  Calendar, DollarSign, GraduationCap, BookOpen, Target,
  Briefcase, MessageCircle, Share2, Download, Bookmark,
  ChevronLeft, ExternalLink, CheckCircle, BarChart3,
  Users2, Trophy, Heart, Eye, ThumbsUp
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
// import UniversityCourses from '../universities/UniversityCourses'
import UniversityCourses from '@/components/universities/UniversityCourses'

// Mock data - in production, this would come from an API
const universityData = {
  id: 'stanford',
  name: 'Stanford University',
  location: {
    city: 'Stanford',
    state: 'California',
    country: 'USA',
    coordinates: { lat: 37.4275, lng: -122.1697 }
  },
  
  overview: {
    description: 'Stanford University is a private research university in Stanford, California. The campus occupies 8,180 acres, among the largest in the United States, and enrolls over 17,000 students. Stanford is ranked among the top universities in the world.',
    established: 1885,
    type: 'Private',
    motto: 'Die Luft der Freiheit weht (The wind of freedom blows)',
    colors: ['Cardinal', 'White'],
    endowment: '$36.3 billion'
  },
  
  rankings: {
    world: 3,
    national: 2,
    subjectRankings: {
      'Computer Science': 1,
      'Engineering': 2,
      'Business': 3,
      'Medicine': 5,
      'Law': 2,
      'Education': 1
    }
  },
  
  academics: {
    schools: [
      'School of Engineering',
      'School of Humanities & Sciences',
      'School of Medicine',
      'Graduate School of Business',
      'School of Law',
      'School of Education'
    ],
    faculty: {
      total: 2230,
      nobelLaureates: 85,
      fieldsMedalists: 7,
      turingAwardWinners: 29
    },
    research: {
      expenditure: '$1.82 billion',
      centers: 18,
      patents: '3000+'
    }
  },
  
  students: {
    total: 17000,
    undergraduate: 7500,
    graduate: 9500,
    international: 4500,
    acceptanceRate: '4%',
    studentFacultyRatio: '5:1'
  },
  
  campus: {
    size: '8180 acres',
    libraries: 24,
    museums: 2,
    athleticTeams: 36,
    residentialColleges: 8
  },
  
  tuition: {
    undergraduate: '$56,169',
    graduate: '$55,000',
    roomBoard: '$17,255',
    totalCost: '$78,218'
  },
  
  scholarships: {
    totalAwarded: '$250 million',
    studentsReceiving: '70%',
    averageAward: '$52,000',
    needBased: true,
    meritBased: true
  },
  
  facilities: [
    'State-of-the-art research labs',
    '20 libraries with 9.5M volumes',
    'Performing arts centers',
    'Olympic-size swimming pool',
    'Golf course',
    'Art museums'
  ],
  
  notableAlumni: [
    { name: 'Larry Page', role: 'Co-founder of Google' },
    { name: 'Elon Musk', role: 'CEO of Tesla & SpaceX' },
    { name: 'Reid Hoffman', role: 'Co-founder of LinkedIn' },
    { name: 'Tiger Woods', role: 'Professional Golfer' },
    { name: 'John F. Kennedy', role: '35th U.S. President' }
  ],
  
  statistics: {
    applications: 55000,
    enrolled: 1700,
    graduationRate: '94%',
    employmentRate: '98%',
    averageSalary: '$125,000',
    satisfaction: '95%'
  },
  
  contact: {
    website: 'https://stanford.edu',
    phone: '+1 (650) 723-2300',
    address: '450 Serra Mall, Stanford, CA 94305',
    email: 'admissions@stanford.edu'
  }
}

export default function UniversityProfilePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [views, setViews] = useState(125000)
  const [likes, setLikes] = useState(24500)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'campus', label: 'Campus Life', icon: MapPin },
    { id: 'admissions', label: 'Admissions', icon: Target },
    { id: 'courses', label: 'Programs & Courses', icon: BookOpen },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'alumni', label: 'Notable Alumni', icon: Users2 }
  ]

  useEffect(() => {
    // Simulate view count increment
    setViews(prev => prev + 1)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: universityData.name,
          text: `Check out ${universityData.name} on Scovers Education`,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast.success(isFollowing ? 'Unfollowed university' : 'Following university')
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 text-red-200 hover:text-white mb-6"
          >
            <ChevronLeft size={20} />
            Back to Universities
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-bold">#{universityData.rankings.world}</span>
                  <span className="ml-2">World Ranking</span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-bold">{universityData.location.country}</span>
                </div>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                {universityData.name}
              </h1>
              
              <div className="flex items-center gap-4 text-red-200 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  {universityData.location.city}, {universityData.location.state}, {universityData.location.country}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Established {universityData.overview.established}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  {formatNumber(universityData.students.total)} students
                </div>
              </div>
              
              <p className="text-xl text-red-100 max-w-3xl">
                {universityData.overview.description}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={isSaved ? 'Remove from saved' : 'Save university'}
              >
                <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-white' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Share university"
              >
                <Share2 className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setLikes(isLiked => isLiked ? likes - 1 : likes + 1)
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Like university"
              >
                <Heart className="w-6 h-6" />
              </button>
              <button
                onClick={handleFollow}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  isFollowing
                    ? 'bg-white text-red-700 hover:bg-red-50'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                {isFollowing ? '✓ Following' : 'Follow'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: Target, label: 'Acceptance Rate', value: universityData.students.acceptanceRate, color: 'bg-red-500' },
            { icon: Users, label: 'International Students', value: `${Math.round((universityData.students.international / universityData.students.total) * 100)}%`, color: 'bg-blue-500' },
            { icon: GraduationCap, label: 'Graduation Rate', value: universityData.statistics.graduationRate, color: 'bg-green-500' },
            { icon: Briefcase, label: 'Employment Rate', value: universityData.statistics.employmentRate, color: 'bg-amber-500' },
            { icon: DollarSign, label: 'Avg. Salary', value: universityData.statistics.averageSalary, color: 'bg-purple-500' }
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <Icon className={`${stat.color.replace('bg-', 'text-')} mx-auto mb-3`} size={32} />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Tabs Navigation */}
            <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={20} />
                      {tab.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">University Overview</h3>
                    <p className="text-gray-700 mb-6">
                      {universityData.overview.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Building className="text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">University Type</h4>
                            <p className="text-gray-600">{universityData.overview.type} • {universityData.overview.established}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Globe className="text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Location</h4>
                            <p className="text-gray-600">{universityData.location.city}, {universityData.location.state}, {universityData.location.country}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Trophy className="text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Endowment</h4>
                            <p className="text-gray-600">{universityData.overview.endowment}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Users2 className="text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Student Population</h4>
                            <p className="text-gray-600">{formatNumber(universityData.students.total)} total students</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Star className="text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Rankings</h4>
                            <p className="text-gray-600">World: #{universityData.rankings.world} • National: #{universityData.rankings.national}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Target className="text-red-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Acceptance Rate</h4>
                            <p className="text-gray-600">{universityData.students.acceptanceRate} (Most selective)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subject Rankings */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Subject Rankings</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(universityData.rankings.subjectRankings).map(([subject, rank]) => (
                        <div key={subject} className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm text-gray-600 mb-1">{subject}</div>
                          <div className="text-2xl font-bold text-gray-900">#{rank}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="bg-red-50 rounded-lg p-4">
                        <div className="text-sm text-red-600 mb-1">Student-Faculty Ratio</div>
                        <div className="text-xl font-bold text-gray-900">{universityData.students.studentFacultyRatio}</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-sm text-blue-600 mb-1">International Students</div>
                        <div className="text-xl font-bold text-gray-900">{formatNumber(universityData.students.international)}</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-sm text-green-600 mb-1">Campus Size</div>
                        <div className="text-xl font-bold text-gray-900">{universityData.campus.size}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'academics' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Academic Structure</h3>
                    
                    {/* Schools */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Schools & Departments</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {universityData.academics.schools.map((school, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <GraduationCap className="text-red-500" size={20} />
                              <span className="font-medium text-gray-900">{school}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Faculty */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Faculty Excellence</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
                          <div className="text-3xl font-bold text-red-600 mb-2">
                            {formatNumber(universityData.academics.faculty.total)}
                          </div>
                          <div className="text-gray-700">Faculty Members</div>
                        </div>
                        <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
                          <div className="text-3xl font-bold text-red-600 mb-2">
                            {universityData.academics.faculty.nobelLaureates}
                          </div>
                          <div className="text-gray-700">Nobel Laureates</div>
                        </div>
                        <div className="bg-white border border-red-200 rounded-lg p-6 text-center">
                          <div className="text-3xl font-bold text-red-600 mb-2">
                            {universityData.academics.faculty.turingAwardWinners}
                          </div>
                          <div className="text-gray-700">Turing Award Winners</div>
                        </div>
                      </div>
                    </div>

                    {/* Research */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Research Excellence</h4>
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {universityData.academics.research.expenditure}
                            </div>
                            <div className="text-gray-700">Research Expenditure</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {universityData.academics.research.centers}
                            </div>
                            <div className="text-gray-700">Research Centers</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {universityData.academics.research.patents}
                            </div>
                            <div className="text-gray-700">Patents Filed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'courses' && (
                <UniversityCourses universityId={universityData.id} />
              )}

              {activeTab === 'admissions' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Admissions Information</h3>
                    
                    {/* Admissions Stats */}
                    <div className="mb-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-red-50 rounded-xl p-6">
                          <div className="text-4xl font-bold text-red-600 mb-2">
                            {universityData.statistics.applications.toLocaleString()}
                          </div>
                          <div className="text-gray-700">Total Applications</div>
                        </div>
                        <div className="bg-amber-50 rounded-xl p-6">
                          <div className="text-4xl font-bold text-amber-600 mb-2">
                            {universityData.statistics.enrolled.toLocaleString()}
                          </div>
                          <div className="text-gray-700">Students Enrolled</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-6">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {universityData.students.acceptanceRate}
                          </div>
                          <div className="text-gray-700">Acceptance Rate</div>
                        </div>
                      </div>
                    </div>

                    {/* Application Requirements */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Application Requirements</h4>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Application Fee</span>
                            <span className="font-bold text-gray-900">$90</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Application Deadline</span>
                            <span className="font-bold text-gray-900">December 15</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Decision Notification</span>
                            <span className="font-bold text-gray-900">April 1</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Acceptance Deadline</span>
                            <span className="font-bold text-gray-900">May 1</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h4>
                      <div className="space-y-3">
                        {[
                          'Completed application form',
                          'Official high school transcripts',
                          'Standardized test scores (SAT/ACT)',
                          'English proficiency test scores',
                          'Letters of recommendation (2)',
                          'Personal statement/essay',
                          'Resume/Curriculum Vitae',
                          'Portfolio (for specific programs)'
                        ].map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'scholarships' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Scholarships & Financial Aid</h3>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Financial Aid Overview</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-600">Total Aid Awarded</div>
                            <div className="text-3xl font-bold text-gray-900">{universityData.scholarships.totalAwarded}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Students Receiving Aid</div>
                            <div className="text-3xl font-bold text-gray-900">{universityData.scholarships.studentsReceiving}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Average Award</div>
                            <div className="text-3xl font-bold text-gray-900">{universityData.scholarships.averageAward}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Available Scholarships</h4>
                        <div className="space-y-4">
                          {[
                            { name: 'Stanford Merit Scholarship', amount: 'Full tuition', deadline: 'Nov 1' },
                            { name: 'International Student Grant', amount: 'Up to $50,000', deadline: 'Dec 15' },
                            { name: 'Need-Based Financial Aid', amount: 'Varies', deadline: 'Feb 1' },
                            { name: 'Athletic Scholarships', amount: 'Partial to full', deadline: 'Rolling' }
                          ].map((scholarship, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold text-gray-900">{scholarship.name}</div>
                                <div className="text-amber-600 font-bold">{scholarship.amount}</div>
                              </div>
                              <div className="text-sm text-gray-600">
                                Deadline: {scholarship.deadline}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'alumni' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Notable Alumni</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {universityData.notableAlumni.map((alumni, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl mb-4">
                          {alumni.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{alumni.name}</h4>
                        <p className="text-gray-600 mb-4">{alumni.role}</p>
                        <div className="text-sm text-red-600 font-semibold">Stanford Class</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="text-red-500" size={20} />
                  <a
                    href={universityData.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {universityData.contact.website}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-red-500" size={20} />
                  <a
                    href={`mailto:${universityData.contact.email}`}
                    className="text-gray-700 hover:text-red-600"
                  >
                    {universityData.contact.email}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-red-500 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700">{universityData.contact.address}</span>
                </div>
                <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                  Contact Admissions
                </button>
              </div>
            </div>

            {/* Tuition Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Tuition & Fees</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Undergraduate Tuition</span>
                  <span className="font-bold text-gray-900">{universityData.tuition.undergraduate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Graduate Tuition</span>
                  <span className="font-bold text-gray-900">{universityData.tuition.graduate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Room & Board</span>
                  <span className="font-bold text-gray-900">{universityData.tuition.roomBoard}</span>
                </div>
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Estimated Cost</span>
                    <span className="text-2xl font-bold text-red-600">{universityData.tuition.totalCost}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* University Stats */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">University Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>Profile Views</span>
                  </div>
                  <div className="font-bold">{views.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={16} />
                    <span>Likes</span>
                  </div>
                  <div className="font-bold">{likes.toLocaleString()}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={16} />
                    <span>Student Satisfaction</span>
                  </div>
                  <div className="font-bold">{universityData.statistics.satisfaction}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>Graduate Employment</span>
                  </div>
                  <div className="font-bold">{universityData.statistics.employmentRate}%</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Take Action</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors">
                  Apply Now
                </button>
                <button className="w-full py-3 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 font-semibold transition-colors">
                  Book Campus Tour
                </button>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Brochure
                </button>
                <Link
                  href="/consultation"
                  className="block w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-center font-semibold transition-colors"
                >
                  Get Admissions Advice
                </Link>
              </div>
            </div>

            {/* Similar Universities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Universities</h3>
              <div className="space-y-4">
                {[
                  { name: 'MIT', ranking: 1, location: 'USA', acceptance: '7%' },
                  { name: 'Harvard', ranking: 2, location: 'USA', acceptance: '5%' },
                  { name: 'Cambridge', ranking: 2, location: 'UK', acceptance: '21%' }
                ].map((uni, idx) => (
                  <Link
                    key={idx}
                    href={`/universities/${uni.name.toLowerCase()}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-red-600">
                        {uni.name}
                      </div>
                      <div className="text-sm text-gray-600">{uni.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-700">#{uni.ranking}</div>
                      <div className="text-xs text-gray-500">{uni.acceptance}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}