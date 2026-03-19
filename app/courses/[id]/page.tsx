'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { 
  BookOpen, Award, Globe, Clock, Users, DollarSign, Calendar, 
  GraduationCap, Star, TrendingUp, CheckCircle, MessageCircle, 
  Share2, Download, Bookmark, ChevronLeft, ExternalLink, 
  MapPin, Building, Users2, Target, Briefcase, FileText,
  Heart, Eye, ThumbsUp
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock data - in production, this would come from an API
const courseData = {
  id: 'cs-stanford',
  name: 'Computer Science',
  level: 'Undergraduate',
  degree: 'Bachelor of Science (BS)',
  duration: '4 years',
  credits: '180 credits',
  
  university: {
    id: 'stanford',
    name: 'Stanford University',
    location: 'Stanford, California, USA',
    ranking: {
      world: 3,
      national: 2,
      computerScience: 1
    },
    type: 'Private',
    established: 1885,
    studentPopulation: {
      total: 17000,
      international: 4500
    },
    acceptanceRate: '4%',
    website: 'https://stanford.edu',
    image: '/api/placeholder/1200/400'
  },
  
  department: 'School of Engineering',
  
  tuition: {
    domestic: '$56,169',
    international: '$56,169',
    perYear: true,
    additionalFees: '$2,000'
  },
  
  application: {
    deadline: '2024-12-15',
    intake: ['Fall'],
    rolling: false,
    processingTime: '8-12 weeks'
  },
  
  requirements: {
    gpa: 3.9,
    languageTests: {
      toefl: { minimum: 100, recommended: 110 },
      ielts: { minimum: 7.0, recommended: 7.5 },
      pte: { minimum: 68, recommended: 75 }
    },
    standardizedTests: {
      sat: { minimum: 1500, recommended: 1550 },
      act: { minimum: 33, recommended: 35 }
    },
    prerequisites: [
      'Advanced Mathematics',
      'Physics',
      'Computer Programming'
    ],
    documents: [
      'Official Transcripts',
      'Letters of Recommendation (2)',
      'Personal Statement',
      'Resume/CV',
      'Portfolio (if applicable)'
    ]
  },
  
  curriculum: {
    years: [
      {
        year: 1,
        courses: [
          'Introduction to Computer Science',
          'Discrete Mathematics',
          'Programming Methodology',
          'Calculus',
          'Physics for Engineers'
        ]
      },
      {
        year: 2,
        courses: [
          'Data Structures and Algorithms',
          'Computer Organization',
          'Probability and Statistics',
          'Linear Algebra',
          'Software Design'
        ]
      },
      {
        year: 3,
        courses: [
          'Operating Systems',
          'Database Systems',
          'Artificial Intelligence',
          'Computer Networks',
          'Elective Courses'
        ]
      },
      {
        year: 4,
        courses: [
          'Capstone Project',
          'Machine Learning',
          'Cybersecurity',
          'Cloud Computing',
          'Thesis'
        ]
      }
    ],
    electives: [
      'Web Development',
      'Mobile App Development',
      'Game Design',
      'Data Science',
      'Blockchain Technology',
      'Quantum Computing'
    ]
  },
  
  features: {
    accreditation: ['ABET', 'WASC'],
    faculty: 'Nobel laureates and industry leaders',
    research: 'State-of-the-art labs and facilities',
    internships: 'Guaranteed industry placements',
    studyAbroad: 'Exchange programs with 50+ universities',
    careerSupport: 'Dedicated career services'
  },
  
  careerOutcomes: [
    { role: 'Software Engineer', averageSalary: '$120,000', companies: ['Google', 'Apple', 'Microsoft'] },
    { role: 'Data Scientist', averageSalary: '$115,000', companies: ['Facebook', 'Amazon', 'Netflix'] },
    { role: 'Machine Learning Engineer', averageSalary: '$130,000', companies: ['OpenAI', 'Tesla', 'NVIDIA'] },
    { role: 'Product Manager', averageSalary: '$125,000', companies: ['Meta', 'Uber', 'Airbnb'] },
    { role: 'Cybersecurity Analyst', averageSalary: '$110,000', companies: ['Palo Alto Networks', 'CrowdStrike'] }
  ],
  
  scholarships: [
    { name: 'Stanford Merit Scholarship', amount: 'Full tuition', deadline: '2024-11-01', eligibility: 'Top 5% of applicants' },
    { name: 'Engineering Excellence Award', amount: '$25,000/year', deadline: '2024-10-15', eligibility: 'Women in STEM' },
    { name: 'International Student Grant', amount: '$15,000', deadline: '2024-09-30', eligibility: 'Need-based' }
  ],
  
  stats: {
    popularity: 95,
    satisfaction: 94,
    employmentRate: 98,
    averageSalary: '$125,000',
    applications: 12500,
    enrolled: 250
  },
  
  testimonials: [
    {
      name: 'Alex Chen',
      graduation: 'Class of 2022',
      current: 'Software Engineer at Google',
      text: 'The CS program at Stanford transformed my career. The hands-on projects and industry connections were invaluable.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      graduation: 'Class of 2021',
      current: 'AI Researcher at OpenAI',
      text: 'Outstanding faculty and research opportunities. The program prepared me perfectly for cutting-edge AI work.',
      rating: 5
    }
  ]
}

export default function CourseDetailsPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSaved, setIsSaved] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [views, setViews] = useState(12500)
  const [likes, setLikes] = useState(2450)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
    { id: 'requirements', label: 'Requirements', icon: FileText },
    { id: 'careers', label: 'Career Outcomes', icon: Briefcase },
    { id: 'scholarships', label: 'Scholarships', icon: Award },
    { id: 'testimonials', label: 'Testimonials', icon: MessageCircle }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${courseData.name} at ${courseData.university.name}`,
          text: `Check out this ${courseData.name} program at ${courseData.university.name}`,
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

  const handleApply = () => {
    toast.success('Redirecting to application portal...')
    // In production: window.open(courseData.university.website + '/apply', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6"
          >
            <ChevronLeft size={20} />
            Back to Courses
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-blue-700 rounded-full text-sm">
                  {courseData.level}
                </span>
                <span className="px-3 py-1 bg-emerald-700 rounded-full text-sm flex items-center gap-1">
                  <Star size={12} className="fill-white" />
                  Featured Program
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {courseData.name}
              </h1>
              
              <div className="flex items-center gap-4 text-blue-200">
                <Link
                  href={`/universities/${courseData.university.id}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Building size={20} />
                  {courseData.university.name}
                </Link>
                <div className="flex items-center gap-2">
                  <MapPin size={20} />
                  {courseData.university.location}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label={isSaved ? 'Remove from saved' : 'Save course'}
              >
                <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-white' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Share course"
              >
                <Share2 className="w-6 h-6" />
              </button>
              <button
                onClick={() => {
                  setIsLiked(!isLiked)
                  setLikes(isLiked ? likes - 1 : likes + 1)
                }}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Like course"
              >
                <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:w-2/3">
            {/* Stats Bar */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {courseData.stats.popularity}%
                  </div>
                  <div className="text-sm text-gray-600">Popularity</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {courseData.stats.employmentRate}%
                  </div>
                  <div className="text-sm text-gray-600">Employment Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-2">
                    ${courseData.stats.averageSalary}
                  </div>
                  <div className="text-sm text-gray-600">Avg. Salary</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {courseData.stats.applications.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Applications</div>
                </div>
              </div>
            </div>

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
                          ? 'bg-blue-600 text-white'
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
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Program Overview</h3>
                    <p className="text-gray-700 mb-4">
                      The {courseData.name} program at {courseData.university.name} is designed to 
                      prepare students for leadership roles in technology and innovation. The curriculum 
                      combines theoretical foundations with practical applications.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Degree Awarded</h4>
                            <p className="text-gray-600">{courseData.degree}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Program Duration</h4>
                            <p className="text-gray-600">{courseData.duration} • {courseData.credits}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Department</h4>
                            <p className="text-gray-600">{courseData.department}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Accreditation</h4>
                            <p className="text-gray-600">{courseData.features.accreditation.join(', ')}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Faculty</h4>
                            <p className="text-gray-600">{courseData.features.faculty}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-gray-900">Research Facilities</h4>
                            <p className="text-gray-600">{courseData.features.research}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tuition Information */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Tuition & Fees</h4>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-sm text-gray-600 mb-2">International Students</div>
                          <div className="text-3xl font-bold text-gray-900">{courseData.tuition.international}</div>
                          <div className="text-sm text-gray-600">per academic year</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600 mb-2">Additional Fees</div>
                          <div className="text-2xl font-bold text-gray-900">{courseData.tuition.additionalFees}</div>
                          <div className="text-sm text-gray-600">health insurance, books, etc.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Application Information */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Application Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Calendar className="text-blue-600" size={24} />
                          <div>
                            <div className="text-sm text-gray-600">Application Deadline</div>
                            <div className="text-lg font-bold text-gray-900">
                              {formatDate(courseData.application.deadline)}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Processing Time</span>
                            <span className="font-medium">{courseData.application.processingTime}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Intake Periods</span>
                            <span className="font-medium">{courseData.application.intake.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Target className="text-blue-600" size={24} />
                          <div>
                            <div className="text-sm text-gray-600">Competitiveness</div>
                            <div className="text-lg font-bold text-gray-900">
                              {courseData.university.acceptanceRate} acceptance rate
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Total Applicants</span>
                            <span className="font-medium">{courseData.stats.applications.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Enrolled Students</span>
                            <span className="font-medium">{courseData.stats.enrolled}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Curriculum</h3>
                    <div className="space-y-8">
                      {courseData.curriculum.years.map((year, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-6">
                          <h4 className="text-xl font-bold text-gray-900 mb-4">Year {year.year}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {year.courses.map((course, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                                <span className="text-gray-700">{course}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Elective Courses */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Elective Courses</h4>
                    <div className="flex flex-wrap gap-3">
                      {courseData.curriculum.electives.map((elective, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors cursor-pointer"
                        >
                          {elective}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'requirements' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Admission Requirements</h3>
                    
                    {/* Academic Requirements */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Academic Requirements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="text-sm text-gray-600 mb-2">Minimum GPA</div>
                          <div className="text-3xl font-bold text-gray-900">{courseData.requirements.gpa}</div>
                          <div className="text-sm text-gray-600">on 4.0 scale</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                          <div className="text-sm text-gray-600 mb-2">Prerequisites</div>
                          <div className="space-y-2">
                            {courseData.requirements.prerequisites.map((req, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="text-green-500" size={16} />
                                <span>{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Language Requirements */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">English Language Requirements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Object.entries(courseData.requirements.languageTests).map(([test, scores]) => (
                          <div key={test} className="bg-gray-50 rounded-lg p-6">
                            <div className="text-lg font-bold text-gray-900 mb-2">{test.toUpperCase()}</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Minimum</span>
                                <span className="font-bold">{scores.minimum}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Recommended</span>
                                <span className="font-bold text-blue-600">{scores.recommended}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Standardized Tests */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Standardized Tests</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(courseData.requirements.standardizedTests).map(([test, scores]) => (
                          <div key={test} className="bg-gray-50 rounded-lg p-6">
                            <div className="text-lg font-bold text-gray-900 mb-2">{test.toUpperCase()}</div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Minimum</span>
                                <span className="font-bold">{scores.minimum}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Recommended</span>
                                <span className="font-bold text-blue-600">{scores.recommended}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-4">Required Documents</h4>
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {courseData.requirements.documents.map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <FileText className="text-blue-600" size={18} />
                              <span className="text-gray-700">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'careers' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Outcomes</h3>
                    <div className="space-y-6">
                      {courseData.careerOutcomes.map((career, idx) => (
                        <div key={idx} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{career.role}</h4>
                              <div className="text-2xl font-bold text-green-600 mb-3">
                                ${career.averageSalary}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {career.companies.map((company, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm"
                                  >
                                    {company}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600 mb-2">Hiring Rate</div>
                              <div className="text-3xl font-bold text-blue-600">95%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'scholarships' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Scholarships</h3>
                  <div className="space-y-6">
                    {courseData.scholarships.map((scholarship, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{scholarship.name}</h4>
                            <p className="text-gray-600 mt-1">{scholarship.eligibility}</p>
                          </div>
                          <div className="text-3xl font-bold text-amber-600">
                            {scholarship.amount}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                          <div className="text-sm text-gray-600">
                            Deadline: {formatDate(scholarship.deadline)}
                          </div>
                          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-semibold">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'testimonials' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Student Testimonials</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courseData.testimonials.map((testimonial, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{testimonial.name}</div>
                            <div className="text-sm text-gray-600">{testimonial.graduation}</div>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">{testimonial.current}</div>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="fill-amber-400 text-amber-400" size={16} />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* University Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">University Overview</h3>
              <div className="space-y-4">
                <Link
                  href={`/universities/${courseData.university.id}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                    {courseData.university.name.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {courseData.university.name}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={14} />
                      {courseData.university.location}
                    </div>
                  </div>
                </Link>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      #{courseData.university.ranking.world}
                    </div>
                    <div className="text-xs text-gray-600">World Ranking</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {courseData.university.acceptanceRate}
                    </div>
                    <div className="text-xs text-gray-600">Acceptance Rate</div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">Student Population</div>
                    <div className="font-medium">{courseData.university.studentPopulation.total.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <div className="text-gray-600">International Students</div>
                    <div className="font-medium">{courseData.university.studentPopulation.international.toLocaleString()}</div>
                  </div>
                </div>
                
                <Link
                  href={`/universities/${courseData.university.id}`}
                  className="block w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center font-semibold transition-colors"
                >
                  View University Profile
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={16} />
                    <span>Popularity</span>
                  </div>
                  <div className="font-bold">{courseData.stats.popularity}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ThumbsUp size={16} />
                    <span>Satisfaction</span>
                  </div>
                  <div className="font-bold">{courseData.stats.satisfaction}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>Employment Rate</span>
                  </div>
                  <div className="font-bold">{courseData.stats.employmentRate}%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>Views</span>
                  </div>
                  <div className="font-bold">{views.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Take Action</h3>
              <div className="space-y-3">
                <button
                  onClick={handleApply}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 font-semibold transition-all"
                >
                  Apply Now
                </button>
                <Link
                  href="/compare"
                  className="block w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-center font-semibold transition-colors"
                >
                  Compare Programs
                </Link>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Brochure
                </button>
                <button className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors">
                  Book Consultation
                </button>
              </div>
            </div>

            {/* Similar Programs */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Similar Programs</h3>
              <div className="space-y-4">
                {[
                  { name: 'Software Engineering', university: 'MIT', ranking: 1 },
                  { name: 'Computer Engineering', university: 'UC Berkeley', ranking: 4 },
                  { name: 'Data Science', university: 'CMU', ranking: 6 }
                ].map((program, idx) => (
                  <Link
                    key={idx}
                    href={`/courses/${program.name.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">
                        {program.name}
                      </div>
                      <div className="text-sm text-gray-600">{program.university}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-700">#{program.ranking}</div>
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