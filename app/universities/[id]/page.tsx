// app/universities/[id]/page
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  MapPin, Globe, Users, Star, TrendingUp, Award, Building,
  Calendar, DollarSign, GraduationCap, BookOpen, Target,
  Briefcase, MessageCircle, Share2, Download, Bookmark,
  ChevronLeft, ExternalLink, CheckCircle, BarChart3,
  Users2, Trophy, Heart, Eye, ThumbsUp, Filter, Search,
  ArrowRight, Clock, Shield, Book, Home, Mail, Phone,
  Layers, Zap, TrendingDown, Globe as GlobeIcon
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import UniversityCourses from '@/components/universities/UniversityCourses'

// Mock data - in production, this would come from an API
const universityData = {
  id: 'stanford',
  name: 'Stanford University',
  location: {
    city: 'Stanford',
    state: 'California',
    country: 'USA',
    flag: '🇺🇸',
    coordinates: { lat: 37.4275, lng: -122.1697 }
  },
  
  overview: {
    description: 'Stanford University is a private research university in Stanford, California. The campus occupies 8,180 acres, among the largest in the United States, and enrolls over 17,000 students. Stanford is ranked among the top universities in the world.',
    established: 1885,
    type: 'Private Research University',
    motto: 'Die Luft der Freiheit weht (The wind of freedom blows)',
    colors: ['Cardinal', 'White'],
    endowment: '$36.3 billion',
    campusType: 'Suburban',
    website: 'https://stanford.edu'
  },
  
  rankings: {
    world: 3,
    national: 2,
    qsWorld: 3,
    timesHigher: 4,
    subjectRankings: {
      'Computer Science': { ranking: 1, score: 99.5 },
      'Engineering': { ranking: 2, score: 98.7 },
      'Business': { ranking: 3, score: 97.8 },
      'Medicine': { ranking: 5, score: 96.5 },
      'Law': { ranking: 2, score: 97.2 },
      'Education': { ranking: 1, score: 98.9 }
    },
    rankingTrend: 'up'
  },
  
  academics: {
    schools: [
      { name: 'School of Engineering', established: 1925, programs: 45 },
      { name: 'School of Humanities & Sciences', established: 1891, programs: 68 },
      { name: 'School of Medicine', established: 1908, programs: 32 },
      { name: 'Graduate School of Business', established: 1925, programs: 12 },
      { name: 'School of Law', established: 1893, programs: 15 },
      { name: 'School of Education', established: 1917, programs: 28 }
    ],
    faculty: {
      total: 2230,
      nobelLaureates: 85,
      fieldsMedalists: 7,
      turingAwardWinners: 29,
      studentFacultyRatio: '5:1'
    },
    research: {
      expenditure: '$1.82 billion',
      centers: 18,
      patents: '3000+',
      publications: '25000+ annually'
    },
    accreditation: ['WASC', 'ABET', 'AACSB']
  },
  
  students: {
    total: 17000,
    undergraduate: 7500,
    graduate: 9500,
    international: 4500,
    countriesRepresented: 90,
    genderRatio: { male: '52%', female: '48%' },
    acceptanceRate: '4%',
    yieldRate: '82%',
    graduationRate: {
      '4-year': '75%',
      '6-year': '94%'
    }
  },
  
  campus: {
    size: '8180 acres',
    libraries: 24,
    museums: 2,
    athleticTeams: 36,
    residentialColleges: 8,
    housing: {
      onCampus: '93%',
      offCampus: '7%'
    },
    facilities: [
      'State-of-the-art research labs',
      '20 libraries with 9.5M volumes',
      'Performing arts centers',
      'Olympic-size swimming pool',
      'Golf course',
      'Art museums',
      'Student union',
      'Sports complex'
    ]
  },
  
  tuition: {
    undergraduate: {
      tuition: '$56,169',
      fees: '$696',
      roomBoard: '$17,255',
      books: '$1,290',
      total: '$75,410'
    },
    graduate: {
      tuition: '$55,000',
      fees: '$1,200',
      roomBoard: '$18,000',
      books: '$1,500',
      total: '$75,700'
    },
    financialAid: {
      averagePackage: '$52,000',
      studentsReceiving: '70%',
      totalAwarded: '$250 million'
    }
  },
  
  admissions: {
    deadlines: {
      earlyDecision: 'November 1',
      regularDecision: 'January 2',
      transfer: 'March 15'
    },
    requirements: {
      tests: ['SAT or ACT', 'SAT Subject Tests (Recommended)'],
      essays: ['Common App Essay', 'Supplemental Essays'],
      recommendations: '2 Teacher Evaluations',
      interviews: 'Optional',
      portfolio: 'For specific programs'
    },
    process: {
      applicationFee: '$90',
      notification: 'Early April',
      responseDeadline: 'May 1'
    }
  },
  
  programs: {
    undergraduate: 65,
    graduate: 125,
    professional: 25,
    online: 15,
    popularMajors: [
      'Computer Science',
      'Engineering',
      'Biology',
      'Economics',
      'Political Science',
      'Psychology'
    ],
    specialPrograms: [
      'Honors Program',
      'Study Abroad (50+ countries)',
      'Undergraduate Research',
      'Co-op Programs',
      'Dual Degrees'
    ]
  },
  
  career: {
    employmentRate: '98%',
    averageSalary: '$125,000',
    topEmployers: ['Google', 'Apple', 'Microsoft', 'Goldman Sachs', 'McKinsey'],
    careerServices: [
      'Career Counseling',
      'Resume Workshops',
      'Interview Preparation',
      'Networking Events',
      'Job Fairs'
    ],
    alumniNetwork: '220,000+'
  },
  
  scholarships: {
    types: [
      { name: 'Need-Based', coverage: '100% demonstrated need', deadline: 'February 15' },
      { name: 'Merit-Based', coverage: 'Full tuition', deadline: 'December 1' },
      { name: 'Athletic', coverage: 'Partial to full', deadline: 'Varies' },
      { name: 'International', coverage: 'Up to $50,000', deadline: 'January 15' }
    ],
    statistics: {
      totalAwarded: '$250 million',
      averageAward: '$52,000',
      recipients: '70% of students'
    }
  },
  
  alumni: {
    notable: [
      { name: 'Larry Page', role: 'Co-founder of Google', year: 1995 },
      { name: 'Elon Musk', role: 'CEO of Tesla & SpaceX', year: 1995 },
      { name: 'Reid Hoffman', role: 'Co-founder of LinkedIn', year: 1990 },
      { name: 'Tiger Woods', role: 'Professional Golfer', year: 'Attended' },
      { name: 'John F. Kennedy', role: '35th U.S. President', year: 'Attended' },
      { name: 'Sandra Day O\'Connor', role: 'Former Supreme Court Justice', year: 1950 }
    ],
    achievements: [
      '30 Billionaires',
      '17 Astronauts',
      '20 Nobel Laureates',
      '4 Pulitzer Prize Winners'
    ]
  },
  
  international: {
    support: [
      'International Student Office',
      'Visa Assistance',
      'Cultural Programs',
      'Language Support',
      'Orientation Programs'
    ],
    partnerships: '200+ universities worldwide',
    exchangePrograms: '50+ countries'
  },
  
  contact: {
    website: 'https://stanford.edu',
    phone: '+1 (650) 723-2300',
    address: '450 Serra Mall, Stanford, CA 94305, USA',
    email: 'admissions@stanford.edu',
    social: {
      twitter: '@Stanford',
      facebook: 'StanfordUniversity',
      instagram: 'stanford',
      linkedin: 'stanford-university'
    }
  },
  
  stats: {
    views: 125000,
    likes: 24500,
    saved: 18000,
    applications: 55000,
    satisfaction: '95%',
    retention: '98%'
  }
}

export default function UniversityProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [views, setViews] = useState(universityData.stats.views)
  const [likes, setLikes] = useState(universityData.stats.likes)
  const [saved, setSaved] = useState(universityData.stats.saved)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'academics', label: 'Academics', icon: GraduationCap },
    { id: 'admissions', label: 'Admissions', icon: Target },
    { id: 'programs', label: 'Programs', icon: BookOpen },
    { id: 'campus', label: 'Campus Life', icon: Building },
    { id: 'tuition', label: 'Tuition & Aid', icon: DollarSign },
    { id: 'career', label: 'Career Outcomes', icon: Briefcase },
    { id: 'alumni', label: 'Alumni', icon: Users2 }
  ]

  useEffect(() => {
    // Simulate view count increment
    setViews(prev => prev + 1)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${universityData.name} - Scovers Education`,
          text: `Check out ${universityData.name} on Scovers Education Platform`,
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

  const handleSave = () => {
    setIsSaved(!isSaved)
    setSaved(prev => isSaved ? prev - 1 : prev + 1)
    toast.success(isSaved ? 'Removed from saved' : 'Added to saved')
  }

  const handleLike = () => {
    setLikes(prev => {
      const newLikes = isLiked ? prev - 1 : prev + 1
      setIsLiked(!isLiked)
      return newLikes
    })
  }

  const handleCompare = () => {
    toast.success('Added to comparison list')
    // In production: Add to comparison context/state
  }

  const handleApply = () => {
    router.push(`/universities/${params.id}/apply`)
  }

  const handleBookConsultation = () => {
    router.push('/consultation')
  }

  const handleViewCourses = () => {
    setActiveTab('programs')
    document.getElementById('programs-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Header with University Image */}
      <div className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10" />
        
        {/* University Initials in Background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10">
          <div className="h-full flex items-center justify-center">
            <div className="text-[300px] font-black leading-none">S</div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Navigation */}
          <Link
            href="/universities"
            className="inline-flex items-center gap-2 text-red-200 hover:text-white mb-6 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Universities
          </Link>

          {/* Main Header Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              {/* University Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                  <Trophy size={16} />
                  <span className="font-bold">#{universityData.rankings.world}</span>
                  <span className="ml-1">World Ranking</span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                  <GlobeIcon size={16} />
                  <span className="font-bold">{universityData.location.country}</span>
                  <span>{universityData.location.flag}</span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-bold">{universityData.overview.type}</span>
                </div>
              </div>

              {/* University Name */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                {universityData.name}
              </h1>

              {/* Location and Basic Info */}
              <div className="flex flex-wrap items-center gap-6 text-red-200 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={22} className="text-red-300" />
                  <span className="text-lg">
                    {universityData.location.city}, {universityData.location.state}, {universityData.location.country}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={22} className="text-red-300" />
                  <span className="text-lg">Est. {universityData.overview.established}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={22} className="text-red-300" />
                  <span className="text-lg">{formatNumber(universityData.students.total)} students</span>
                </div>
              </div>

              {/* University Description */}
              <p className="text-xl text-red-100 max-w-3xl leading-relaxed mb-8">
                {universityData.overview.description}
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleApply}
                  className="px-8 py-3 bg-white text-red-700 rounded-lg hover:bg-red-50 font-bold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleBookConsultation}
                  className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 font-bold text-lg transition-colors"
                >
                  Book Consultation
                </button>
                <button
                  onClick={handleViewCourses}
                  className="px-8 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 font-bold text-lg transition-colors flex items-center gap-2"
                >
                  View Programs
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            {/* Action Buttons Column */}
            <div className="flex items-center gap-4 lg:flex-col lg:items-end">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSave}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors group relative"
                  aria-label={isSaved ? 'Remove from saved' : 'Save university'}
                >
                  <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-white' : ''}`} />
                  {isSaved && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  aria-label="Share university"
                >
                  <Share2 className="w-6 h-6" />
                </button>
                <button
                  onClick={handleLike}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  aria-label="Like university"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
              <button
                onClick={handleFollow}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  isFollowing
                    ? 'bg-white text-red-700 hover:bg-red-50'
                    : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105'
                }`}
              >
                {isFollowing ? '✓ Following' : 'Follow University'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { 
              icon: Target, 
              label: 'Acceptance Rate', 
              value: universityData.students.acceptanceRate, 
              color: 'from-red-500 to-orange-500',
              trend: universityData.rankings.rankingTrend
            },
            { 
              icon: Users, 
              label: 'International Students', 
              value: `${Math.round((universityData.students.international / universityData.students.total) * 100)}%`, 
              color: 'from-blue-500 to-cyan-500',
              trend: 'up'
            },
            { 
              icon: GraduationCap, 
              label: 'Graduation Rate', 
              value: universityData.students.graduationRate['6-year'], 
              color: 'from-green-500 to-emerald-500',
              trend: 'up'
            },
            { 
              icon: Briefcase, 
              label: 'Employment Rate', 
              value: universityData.career.employmentRate, 
              color: 'from-amber-500 to-yellow-500',
              trend: 'up'
            },
            { 
              icon: DollarSign, 
              label: 'Avg. Salary', 
              value: universityData.career.averageSalary, 
              color: 'from-purple-500 to-pink-500',
              trend: 'up'
            }
          ].map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-xl p-6 text-center group hover:shadow-2xl transition-all hover:-translate-y-1">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon className="text-white" size={28} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.trend === 'up' && (
                  <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    <TrendingUp size={12} />
                    Trending
                  </div>
                )}
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
            <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-8 py-4 whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? 'bg-red-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={22} />
                      <span className="font-semibold">{tab.label}</span>
                      {tab.id === 'programs' && (
                        <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                          {universityData.programs.undergraduate + universityData.programs.graduate}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  {/* University Highlights */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">University Highlights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[
                          { icon: Shield, label: 'Type', value: universityData.overview.type },
                          { icon: Calendar, label: 'Established', value: universityData.overview.established },
                          { icon: Layers, label: 'Campus Size', value: universityData.campus.size },
                          { icon: Trophy, label: 'Endowment', value: universityData.overview.endowment }
                        ].map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <highlight.icon className="text-red-600" size={24} />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">{highlight.label}</div>
                              <div className="text-lg font-semibold text-gray-900">{highlight.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        {[
                          { icon: Users2, label: 'Student Population', value: formatNumber(universityData.students.total) },
                          { icon: Globe, label: 'Countries Represented', value: universityData.students.countriesRepresented },
                          { icon: Zap, label: 'Student-Faculty Ratio', value: universityData.academics.faculty.studentFacultyRatio },
                          { icon: TrendingUp, label: 'Ranking Trend', value: `#${universityData.rankings.world} Worldwide` }
                        ].map((highlight, idx) => (
                          <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="p-3 bg-white rounded-lg shadow-sm">
                              <highlight.icon className="text-red-600" size={24} />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">{highlight.label}</div>
                              <div className="text-lg font-semibold text-gray-900">{highlight.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Subject Rankings */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Subject Rankings</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(universityData.rankings.subjectRankings).map(([subject, data]) => (
                        <div key={subject} className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:border-red-300 transition-colors group">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-gray-900 group-hover:text-red-600">{subject}</span>
                            <div className="flex items-center gap-1">
                              <Star className="fill-amber-400 text-amber-400" size={16} />
                              <span className="font-bold">{data.score}</span>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-gray-900">#{data.ranking}</div>
                          <div className="text-sm text-gray-600 mt-2">World Ranking</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Facts */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Book className="text-red-600" size={24} />
                          </div>
                          <div>
                            <div className="text-sm text-red-600">Libraries</div>
                            <div className="text-2xl font-bold text-gray-900">{universityData.campus.libraries}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">9.5M+ volumes across campus</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Users2 className="text-blue-600" size={24} />
                          </div>
                          <div>
                            <div className="text-sm text-blue-600">Nobel Laureates</div>
                            <div className="text-2xl font-bold text-gray-900">{universityData.academics.faculty.nobelLaureates}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">Among faculty and alumni</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 bg-white rounded-lg shadow-sm">
                            <Briefcase className="text-green-600" size={24} />
                          </div>
                          <div>
                            <div className="text-sm text-green-600">Patents</div>
                            <div className="text-2xl font-bold text-gray-900">{universityData.academics.research.patents}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600">Research innovations</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Academics Tab */}
              {activeTab === 'academics' && (
                <div className="space-y-10">
                  {/* Schools & Departments */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Schools & Departments</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {universityData.academics.schools.map((school, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="p-3 bg-white rounded-lg group-hover:bg-red-50 transition-colors">
                                <GraduationCap className="text-red-600 group-hover:text-red-700" size={24} />
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-red-600">{school.name}</h4>
                                <div className="text-sm text-gray-600">Est. {school.established}</div>
                              </div>
                            </div>
                            <div className="px-3 py-1 bg-white rounded-full text-sm font-semibold">
                              {school.programs} programs
                            </div>
                          </div>
                          <button 
                            onClick={handleViewCourses}
                            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
                          >
                            View Programs
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Faculty Excellence */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Faculty Excellence</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                        <div className="text-4xl font-bold text-red-600 mb-2">{formatNumber(universityData.academics.faculty.total)}</div>
                        <div className="text-gray-700">Faculty Members</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                        <div className="text-4xl font-bold text-red-600 mb-2">{universityData.academics.faculty.nobelLaureates}</div>
                        <div className="text-gray-700">Nobel Laureates</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                        <div className="text-4xl font-bold text-red-600 mb-2">{universityData.academics.faculty.turingAwardWinners}</div>
                        <div className="text-gray-700">Turing Award Winners</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                        <div className="text-4xl font-bold text-red-600 mb-2">{universityData.academics.faculty.fieldsMedalists}</div>
                        <div className="text-gray-700">Fields Medalists</div>
                      </div>
                    </div>
                  </div>

                  {/* Research Excellence */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Research Excellence</h3>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 mb-3">
                            {universityData.academics.research.expenditure}
                          </div>
                          <div className="text-gray-700">Annual Research Expenditure</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 mb-3">
                            {universityData.academics.research.centers}
                          </div>
                          <div className="text-gray-700">Research Centers</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 mb-3">
                            {universityData.academics.research.patents}
                          </div>
                          <div className="text-gray-700">Patents Filed</div>
                        </div>
                      </div>
                      <div className="mt-8 text-center">
                        <div className="text-lg text-gray-700">
                          {universityData.academics.research.publications} publications annually
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accreditation */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Accreditation</h3>
                    <div className="flex flex-wrap gap-4">
                      {universityData.academics.accreditation.map((accred, idx) => (
                        <div key={idx} className="px-6 py-3 bg-white border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={22} />
                            <span className="font-semibold text-gray-900">{accred}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Programs Tab */}
              {activeTab === 'programs' && (
                <UniversityCourses universityId={universityData.id} />
              )}

              {/* Admissions Tab */}
              {activeTab === 'admissions' && (
                <div className="space-y-10">
                  {/* Admissions Overview */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Admissions Overview</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-red-600 mb-2">
                          {formatNumber(universityData.stats.applications)}
                        </div>
                        <div className="text-gray-700">Annual Applications</div>
                      </div>
                      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-amber-600 mb-2">
                          {formatNumber(universityData.students.total)}
                        </div>
                        <div className="text-gray-700">Total Students</div>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {universityData.students.acceptanceRate}
                        </div>
                        <div className="text-gray-700">Acceptance Rate</div>
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4">Application Deadlines</h4>
                          <div className="space-y-3">
                            {Object.entries(universityData.admissions.deadlines).map(([type, deadline]) => (
                              <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <span className="font-medium text-gray-700">
                                  {type.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="font-bold text-gray-900">{deadline}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4">Application Process</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Application Fee</span>
                              <span className="font-bold text-gray-900">{universityData.admissions.process.applicationFee}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Notification Date</span>
                              <span className="font-bold text-gray-900">{universityData.admissions.process.notification}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="font-medium text-gray-700">Response Deadline</span>
                              <span className="font-bold text-gray-900">{universityData.admissions.process.responseDeadline}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Requirements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4">Required Tests</h4>
                        <div className="space-y-3">
                          {universityData.admissions.requirements.tests.map((test, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="text-green-500" size={18} />
                              <span className="text-gray-700">{test}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4">Documents Required</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={18} />
                            <span className="text-gray-700">{universityData.admissions.requirements.essays.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={18} />
                            <span className="text-gray-700">{universityData.admissions.requirements.recommendations}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CheckCircle className="text-green-500" size={18} />
                            <span className="text-gray-700">{universityData.admissions.requirements.interviews}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Admissions Timeline</h3>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                        {[
                          { month: 'August', action: 'Application Opens' },
                          { month: 'November 1', action: 'Early Decision Deadline' },
                          { month: 'January 2', action: 'Regular Decision Deadline' },
                          { month: 'March-April', action: 'Admission Decisions Released' },
                          { month: 'May 1', action: 'Candidate Reply Deadline' }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center mb-8 last:mb-0">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold z-10 relative">
                              {idx + 1}
                            </div>
                            <div className="ml-6 flex-1">
                              <div className="font-bold text-gray-900">{item.month}</div>
                              <div className="text-gray-700">{item.action}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Campus Life Tab */}
              {activeTab === 'campus' && (
                <div className="space-y-10">
                  {/* Campus Overview */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Campus Life</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{universityData.campus.size}</div>
                        <div className="text-gray-700">Campus Size</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{universityData.campus.residentialColleges}</div>
                        <div className="text-gray-700">Residential Colleges</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{universityData.campus.athleticTeams}</div>
                        <div className="text-gray-700">Athletic Teams</div>
                      </div>
                    </div>
                  </div>

                  {/* Facilities */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Campus Facilities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {universityData.campus.facilities.map((facility, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="p-3 bg-white rounded-lg">
                            <CheckCircle className="text-green-500" size={20} />
                          </div>
                          <span className="font-medium text-gray-900">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Housing */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Housing & Accommodation</h3>
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4">On-Campus Housing</h4>
                          <div className="text-4xl font-bold text-amber-600 mb-2">
                            {universityData.campus.housing.onCampus}
                          </div>
                          <div className="text-gray-700">of undergraduates live on campus</div>
                          <div className="mt-4 text-sm text-gray-600">
                            Guaranteed housing for all four years
                          </div>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-4">Housing Types</h4>
                          <div className="space-y-3">
                            {[
                              'Residential Colleges',
                              'Theme Houses',
                              'Apartments',
                              'Cooperative Housing',
                              'Greek Housing'
                            ].map((type, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <span className="text-gray-700">{type}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tuition & Aid Tab */}
              {activeTab === 'tuition' && (
                <div className="space-y-10">
                  {/* Tuition Breakdown */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Tuition & Fees Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4">Undergraduate Costs (Annual)</h4>
                        <div className="space-y-3">
                          {Object.entries(universityData.tuition.undergraduate).map(([item, cost]) => (
                            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <span className="font-medium text-gray-700">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </span>
                              <span className="font-bold text-gray-900">{cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-4">Graduate Costs (Annual)</h4>
                        <div className="space-y-3">
                          {Object.entries(universityData.tuition.graduate).map(([item, cost]) => (
                            <div key={item} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                              <span className="font-medium text-gray-700">
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </span>
                              <span className="font-bold text-gray-900">{cost}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Aid */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Aid Overview</h3>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {universityData.tuition.financialAid.totalAwarded}
                          </div>
                          <div className="text-gray-700">Total Aid Awarded</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {universityData.tuition.financialAid.studentsReceiving}
                          </div>
                          <div className="text-gray-700">Students Receiving Aid</div>
                        </div>
                        <div className="text-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {universityData.tuition.financialAid.averagePackage}
                          </div>
                          <div className="text-gray-700">Average Aid Package</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scholarships */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Scholarship Opportunities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {universityData.scholarships.types.map((scholarship, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-amber-300 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg mb-2">{scholarship.name}</h4>
                              <div className="text-2xl font-bold text-amber-600">{scholarship.coverage}</div>
                            </div>
                            <Award className="text-amber-500" size={28} />
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="text-sm text-gray-600">
                              Deadline: {scholarship.deadline}
                            </div>
                            <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-semibold">
                              Learn More
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Career Outcomes Tab */}
              {activeTab === 'career' && (
                <div className="space-y-10">
                  {/* Career Statistics */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Outcomes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-green-600 mb-2">
                          {universityData.career.employmentRate}
                        </div>
                        <div className="text-gray-700">Employment Rate</div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                          {universityData.career.averageSalary}
                        </div>
                        <div className="text-gray-700">Average Starting Salary</div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                        <div className="text-4xl font-bold text-purple-600 mb-2">
                          {universityData.career.alumniNetwork}
                        </div>
                        <div className="text-gray-700">Alumni Network</div>
                      </div>
                    </div>
                  </div>

                  {/* Top Employers */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Employers</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {universityData.career.topEmployers.map((employer, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors group">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                            {employer.charAt(0)}
                          </div>
                          <div className="font-semibold text-gray-900 group-hover:text-red-600">{employer}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Career Services */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {universityData.career.careerServices.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="p-3 bg-white rounded-lg">
                            <Briefcase className="text-red-600" size={20} />
                          </div>
                          <span className="font-medium text-gray-900">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Alumni Tab */}
              {activeTab === 'alumni' && (
                <div className="space-y-10">
                  {/* Notable Alumni */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Notable Alumni</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {universityData.alumni.notable.map((alum, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl">
                              {alum.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">{alum.name}</h4>
                              <div className="text-sm text-gray-600">Class of {alum.year}</div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{alum.role}</p>
                          <div className="text-xs text-red-600 font-semibold">Stanford Alumni</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alumni Achievements */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Alumni Achievements</h3>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {universityData.alumni.achievements.map((achievement, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                              {achievement.split(' ')[0]}
                            </div>
                            <div className="text-gray-700">
                              {achievement.split(' ').slice(1).join(' ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <a
                  href={universityData.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                >
                  <Globe className="text-blue-600" size={22} />
                  <div>
                    <div className="font-medium text-gray-900 group-hover:text-blue-600">Official Website</div>
                    <div className="text-sm text-gray-600 truncate">{universityData.contact.website}</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="text-red-600" size={22} />
                  <div>
                    <div className="font-medium text-gray-900">Admissions Email</div>
                    <a 
                      href={`mailto:${universityData.contact.email}`}
                      className="text-sm text-gray-600 hover:text-red-600"
                    >
                      {universityData.contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="text-red-600 mt-1 flex-shrink-0" size={22} />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-sm text-gray-600">{universityData.contact.address}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="text-red-600" size={22} />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <a 
                      href={`tel:${universityData.contact.phone}`}
                      className="text-sm text-gray-600 hover:text-red-600"
                    >
                      {universityData.contact.phone}
                    </a>
                  </div>
                </div>
                
                <button className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold transition-colors flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Contact Admissions
                </button>
              </div>
            </div>

            {/* University Stats Card */}
            <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">University Statistics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={18} />
                    <span>Profile Views</span>
                  </div>
                  <div className="font-bold">{formatNumber(views)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={18} />
                    <span>Likes</span>
                  </div>
                  <div className="font-bold">{formatNumber(likes)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bookmark size={18} />
                    <span>Saved</span>
                  </div>
                  <div className="font-bold">{formatNumber(saved)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={18} />
                    <span>Student Satisfaction</span>
                  </div>
                  <div className="font-bold">{universityData.stats.satisfaction}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users2 size={18} />
                    <span>Retention Rate</span>
                  </div>
                  <div className="font-bold">{universityData.stats.retention}</div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold transition-colors flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={handleCompare}
                  className="w-full py-3 border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <BarChart3 size={20} />
                  Compare University
                </button>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-colors flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Brochure
                </button>
                <button
                  onClick={handleBookConsultation}
                  className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-bold transition-colors"
                >
                  Book Campus Tour
                </button>
                <Link
                  href="/consultation"
                  className="block w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 text-center font-bold transition-colors"
                >
                  Get Admissions Advice
                </Link>
              </div>
            </div>

            {/* Similar Universities */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Universities</h3>
              <div className="space-y-4">
                {[
                  { id: 'mit', name: 'MIT', ranking: 1, location: 'USA', acceptance: '7%', match: '95%' },
                  { id: 'harvard', name: 'Harvard', ranking: 2, location: 'USA', acceptance: '5%', match: '92%' },
                  { id: 'cambridge', name: 'Cambridge', ranking: 2, location: 'UK', acceptance: '21%', match: '88%' }
                ].map((uni, idx) => (
                  <Link
                    key={idx}
                    href={`/universities/${uni.id}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                        {uni.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 group-hover:text-red-600">{uni.name}</div>
                        <div className="text-sm text-gray-600">{uni.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-700">#{uni.ranking}</div>
                      <div className="text-xs text-green-600 font-semibold">{uni.match} match</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(universityData.contact.social).map(([platform, handle]) => (
                  <a
                    key={platform}
                    href={`https://${platform}.com/${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-center group"
                  >
                    <div className="font-medium text-gray-900 group-hover:text-red-600 capitalize">
                      {platform}
                    </div>
                    <div className="text-sm text-gray-600 truncate">@{handle}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}