'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Calendar, Clock, User, Mail, Phone, Globe, Video,
  MessageCircle, PhoneCall, Award, CheckCircle, Star,
  Users, Shield, CreditCard, Zap, Target, Award as AwardIcon,
  ChevronLeft, Clock as ClockIcon, MapPin, X, ChevronRight,
  BookOpen, GraduationCap, Briefcase, DollarSign, Filter
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock data for consultants
const consultants = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Senior Admissions Consultant',
    university: 'Stanford University',
    experience: '15+ years',
    expertise: ['Ivy League Admissions', 'MBA Applications', 'Scholarship Strategy'],
    rating: 4.9,
    reviews: 128,
    availability: 'Mon-Fri, 9AM-6PM PST',
    languages: ['English', 'Spanish'],
    price: 199,
    sessionsCompleted: 1250,
    specialties: ['Top 10 Universities', 'Medical School', 'Engineering'],
    background: 'Former Stanford Admissions Officer',
    avatar: 'SJ'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'International Admissions Expert',
    university: 'MIT',
    experience: '12+ years',
    expertise: ['STEM Programs', 'International Student Visas', 'Research Proposals'],
    rating: 4.8,
    reviews: 96,
    availability: 'Tue-Sat, 10AM-7PM EST',
    languages: ['English', 'Mandarin', 'French'],
    price: 179,
    sessionsCompleted: 890,
    specialties: ['Tech/Engineering', 'PhD Applications', 'Fellowship Grants'],
    background: 'MIT Alumni & Former Faculty',
    avatar: 'MC'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    title: 'UK & Europe Admissions Specialist',
    university: 'University of Cambridge',
    experience: '10+ years',
    expertise: ['Russell Group Universities', 'Personal Statements', 'Interview Prep'],
    rating: 4.7,
    reviews: 72,
    availability: 'Mon-Thu, 8AM-5PM GMT',
    languages: ['English', 'Hindi'],
    price: 169,
    sessionsCompleted: 650,
    specialties: ['UK Universities', 'Law School', 'Humanities'],
    background: 'Cambridge Graduate & Admissions Mentor',
    avatar: 'PS'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    title: 'Business School Admissions Coach',
    university: 'Harvard Business School',
    experience: '18+ years',
    expertise: ['MBA Applications', 'Leadership Profiles', 'Career Strategy'],
    rating: 4.9,
    reviews: 156,
    availability: 'Mon-Fri, 8AM-8PM EST',
    languages: ['English', 'Portuguese'],
    price: 249,
    sessionsCompleted: 1800,
    specialties: ['Top Business Schools', 'Executive Education', 'Entrepreneurship'],
    background: 'HBS Alumni & Former Admissions Committee',
    avatar: 'DR'
  }
]

// Mock data for available time slots
const availableSlots = [
  { date: '2024-01-30', day: 'Tue', slots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  { date: '2024-01-31', day: 'Wed', slots: ['9:00 AM', '11:00 AM', '3:00 PM', '5:00 PM'] },
  { date: '2024-02-01', day: 'Thu', slots: ['10:30 AM', '1:00 PM', '3:30 PM', '6:00 PM'] },
  { date: '2024-02-02', day: 'Fri', slots: ['9:30 AM', '12:00 PM', '2:30 PM', '4:00 PM'] },
  { date: '2024-02-05', day: 'Mon', slots: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'] },
  { date: '2024-02-06', day: 'Tue', slots: ['11:00 AM', '2:00 PM', '5:00 PM'] },
]

// Consultation packages
const packages = [
  {
    id: 'basic',
    name: 'Discovery Session',
    duration: '30 min',
    price: 99,
    features: [
      'Initial consultation & needs assessment',
      'University shortlisting advice',
      'Application timeline planning',
      'Basic strategy overview'
    ],
    recommended: false,
    popular: false
  },
  {
    id: 'standard',
    name: 'Comprehensive Package',
    duration: '60 min',
    price: 199,
    features: [
      'In-depth profile analysis',
      'University & program matching',
      'Application strategy development',
      'Essay & personal statement guidance',
      'Interview preparation tips',
      'Follow-up email support'
    ],
    recommended: true,
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Package',
    duration: '90 min',
    price: 299,
    features: [
      'Everything in Comprehensive Package',
      'Multi-session discounted rate',
      'Priority scheduling',
      'Document review (up to 3)',
      'Mock interview session',
      'Unlimited email support for 1 week',
      'Scholarship strategy session'
    ],
    recommended: false,
    popular: false
  }
]

// Consultation topics
const topics = [
  'University Selection & Shortlisting',
  'Application Strategy & Timeline',
  'Personal Statement & Essay Review',
  'Interview Preparation',
  'Scholarship & Financial Aid',
  'Visa & Immigration Guidance',
  'Career Planning & Advice',
  'Transfer Applications',
  'Graduate School Applications',
  'International Student Support'
]

export default function BookConsultationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedConsultant, setSelectedConsultant] = useState<typeof consultants[0] | null>(null)
  const [selectedPackage, setSelectedPackage] = useState('standard')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [consultationType, setConsultationType] = useState('video')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    educationLevel: '',
    targetUniversity: '',
    targetProgram: '',
    intakeYear: '2024',
    additionalNotes: ''
  })
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterExperience, setFilterExperience] = useState('all')
  const [filterSpecialty, setFilterSpecialty] = useState('all')

  const filteredConsultants = consultants.filter(consultant => {
    const matchesSearch = consultant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         consultant.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         consultant.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesExperience = filterExperience === 'all' || 
                            (filterExperience === '10+' && parseInt(consultant.experience) >= 10) ||
                            (filterExperience === '15+' && parseInt(consultant.experience) >= 15)
    
    const matchesSpecialty = filterExperience === 'all' || 
                           consultant.specialties.includes(filterSpecialty)
    
    return matchesSearch && matchesExperience && matchesSpecialty
  })

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    )
  }

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime('')
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleConsultantSelect = (consultant: typeof consultants[0]) => {
    setSelectedConsultant(consultant)
    handleNextStep()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!selectedConsultant || !selectedDate || !selectedTime || !formData.name || !formData.email) {
      toast.error('Please fill in all required fields')
      setLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Consultation booked successfully!')
      
      // Redirect to confirmation
      router.push('/consultation/confirmation')
    } catch (error) {
      toast.error('Failed to book consultation. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedPackageData = packages.find(p => p.id === selectedPackage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle size={28} className="text-blue-300" />
                <h1 className="text-3xl font-bold">Book Expert Consultation</h1>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Personalized Admissions Guidance
              </h2>
              
              <p className="text-xl text-blue-100 max-w-3xl">
                Connect with experienced admissions consultants from top universities worldwide. 
                Get expert advice on applications, essays, interviews, and more.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-blue-200">Success Rate</div>
                <div className="text-sm text-blue-300 mt-2">Our clients get admitted to top universities</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap justify-between mb-8">
            {[
              { number: 1, title: 'Choose Consultant', description: 'Select your expert' },
              { number: 2, title: 'Select Package', description: 'Choose consultation type' },
              { number: 3, title: 'Pick Time Slot', description: 'Schedule your session' },
              { number: 4, title: 'Your Details', description: 'Provide information' },
              { number: 5, title: 'Confirm Booking', description: 'Review & confirm' }
            ].map((s) => (
              <div key={s.number} className="flex flex-col items-center mb-4 md:mb-0">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                    step >= s.number
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  } ${step === s.number ? 'scale-110 ring-4 ring-blue-200' : ''}`}
                >
                  {step > s.number ? (
                    <CheckCircle size={28} />
                  ) : (
                    <span className="font-bold text-xl">{s.number}</span>
                  )}
                </div>
                <span
                  className={`mt-3 text-sm font-medium text-center ${
                    step >= s.number ? 'text-blue-700 font-semibold' : 'text-gray-500'
                  }`}
                >
                  {s.title}
                  <div className="text-xs mt-1">{s.description}</div>
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="max-w-6xl mx-auto">
            {/* Step 1: Choose Consultant */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Consultant</h3>
                <p className="text-gray-600 mb-8">Choose from our expert admissions consultants</p>
                
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search consultants by name, expertise, or specialty..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={filterExperience}
                      onChange={(e) => setFilterExperience(e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Experience</option>
                      <option value="10+">10+ years</option>
                      <option value="15+">15+ years</option>
                    </select>
                    <select
                      value={filterSpecialty}
                      onChange={(e) => setFilterSpecialty(e.target.value)}
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Specialties</option>
                      <option value="Ivy League Admissions">Ivy League</option>
                      <option value="STEM Programs">STEM</option>
                      <option value="MBA Applications">MBA</option>
                      <option value="UK Universities">UK Universities</option>
                    </select>
                  </div>
                </div>

                {/* Consultants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {filteredConsultants.map((consultant) => (
                    <div
                      key={consultant.id}
                      onClick={() => handleConsultantSelect(consultant)}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-400 hover:shadow-xl transition-all hover:-translate-y-1 group"
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
                            {consultant.avatar}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600">
                              {consultant.name}
                            </h4>
                            <div className="text-gray-600">{consultant.title}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <GraduationCap size={14} className="text-blue-500" />
                              <span className="text-sm text-gray-600">{consultant.university}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-1">
                            <Star className="fill-amber-400 text-amber-400" size={18} />
                            <span className="font-bold text-gray-900">{consultant.rating}</span>
                            <span className="text-gray-500 text-sm">({consultant.reviews})</span>
                          </div>
                          <div className="text-2xl font-bold text-blue-600 mt-2">${consultant.price}</div>
                          <div className="text-sm text-gray-500">/session</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <AwardIcon size={16} />
                            <span>Expertise</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {consultant.expertise.map((exp, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                {exp}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <ClockIcon size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{consultant.experience} experience</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-gray-400" />
                            <span className="text-sm text-gray-600">{consultant.languages.join(', ')}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-600">
                            <div className="font-semibold text-green-600">{consultant.sessionsCompleted.toLocaleString()}+ sessions</div>
                            <div>completed</div>
                          </div>
                          <button
                            type="button"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                          >
                            Select Consultant
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Why Choose Us */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Consultants?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      {
                        icon: Award,
                        title: 'Verified Experts',
                        description: 'All consultants are former admissions officers or alumni'
                      },
                      {
                        icon: Shield,
                        title: '100% Confidential',
                        description: 'Your information is secure and private'
                      },
                      {
                        icon: Users,
                        title: '98% Success Rate',
                        description: 'Our clients get admitted to top choices'
                      },
                      {
                        icon: Zap,
                        title: 'Immediate Value',
                        description: 'Actionable insights from first session'
                      }
                    ].map((item, idx) => {
                      const Icon = item.icon
                      return (
                        <div key={idx} className="text-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                            <Icon className="text-white" size={28} />
                          </div>
                          <h5 className="font-bold text-gray-900 mb-2">{item.title}</h5>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Select Package */}
            {step === 2 && selectedConsultant && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Consultation Package</h3>
                <p className="text-gray-600 mb-8">Choose the package that best fits your needs</p>
                
                {/* Selected Consultant Preview */}
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xl">
                        {selectedConsultant.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{selectedConsultant.name}</h4>
                        <div className="text-sm text-gray-600">{selectedConsultant.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="fill-amber-400 text-amber-400" size={20} />
                      <span className="font-bold text-gray-900">{selectedConsultant.rating}</span>
                      <span className="text-gray-500">({selectedConsultant.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Packages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`bg-white border-2 rounded-xl p-6 cursor-pointer transition-all hover:-translate-y-1 ${
                        selectedPackage === pkg.id
                          ? 'border-blue-500 shadow-xl'
                          : 'border-gray-200 hover:border-blue-300'
                      } ${pkg.popular ? 'relative overflow-hidden' : ''}`}
                    >
                      {pkg.popular && (
                        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                          MOST POPULAR
                        </div>
                      )}
                      {pkg.recommended && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-1 text-sm font-bold">
                          RECOMMENDED
                        </div>
                      )}
                      
                      <div className={`text-center mb-6 ${pkg.recommended ? 'mt-6' : ''}`}>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h4>
                        <div className="text-4xl font-bold text-blue-600 mb-2">${pkg.price}</div>
                        <div className="text-gray-600">{pkg.duration} session</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <button
                        type="button"
                        className={`w-full py-3 rounded-lg font-bold transition-colors ${
                          selectedPackage === pkg.id
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border-2 border-gray-300 text-gray-700 hover:border-blue-300'
                        }`}
                      >
                        {selectedPackage === pkg.id ? '✓ Selected' : 'Select Package'}
                      </button>
                    </div>
                  ))}
                </div>

                {/* Consultation Topics */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">What would you like to discuss?</h4>
                  <div className="flex flex-wrap gap-3">
                    {topics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleTopicToggle(topic)}
                        className={`px-4 py-3 rounded-lg transition-all ${
                          selectedTopics.includes(topic)
                            ? 'bg-blue-100 border-2 border-blue-500 text-blue-700'
                            : 'bg-gray-100 border-2 border-transparent text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consultation Type */}
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Consultation Format</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'video', icon: Video, label: 'Video Call', description: 'Face-to-face via Zoom/Meet' },
                      { id: 'phone', icon: PhoneCall, label: 'Phone Call', description: 'Audio consultation' },
                      { id: 'in-person', icon: MapPin, label: 'In-Person', description: 'At our office (select cities)' }
                    ].map((type) => {
                      const Icon = type.icon
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setConsultationType(type.id)}
                          className={`p-6 rounded-xl border-2 transition-all ${
                            consultationType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            <Icon className="text-blue-600 mb-3" size={32} />
                            <div className="font-bold text-gray-900 mb-2">{type.label}</div>
                            <div className="text-sm text-gray-600 text-center">{type.description}</div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Pick Time Slot */}
            {step === 3 && selectedConsultant && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Date & Time</h3>
                <p className="text-gray-600 mb-8">Choose a convenient time for your consultation</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Calendar Section */}
                  <div className="lg:col-span-2">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Available Dates</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                      {availableSlots.map((day) => (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => handleDateSelect(day.date)}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            selectedDate === day.date
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {new Date(day.date).getDate()}
                          </div>
                          <div className="text-gray-600">{day.day}</div>
                          <div className="text-sm text-gray-500 mt-2">
                            {new Date(day.date).toLocaleDateString('en-US', { month: 'short' })}
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Time Slots */}
                    {selectedDate && (
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4">
                          Available Times for {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {availableSlots
                            .find(d => d.date === selectedDate)
                            ?.slots.map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleTimeSelect(time)}
                                className={`p-4 rounded-xl border-2 text-center transition-all ${
                                  selectedTime === time
                                    ? 'border-blue-500 bg-blue-500 text-white'
                                    : 'border-gray-200 hover:border-blue-300'
                                }`}
                              >
                                <div className="text-lg font-bold">{time}</div>
                                <div className="text-sm opacity-75">PST</div>
                              </button>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Summary Card */}
                  <div>
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h4>
                      
                      {selectedConsultant && (
                        <div className="flex items-center gap-3 mb-6 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {selectedConsultant.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{selectedConsultant.name}</div>
                            <div className="text-sm text-gray-600">{selectedConsultant.title}</div>
                          </div>
                        </div>
                      )}
                      
                      {selectedPackageData && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700">Package:</span>
                            <span className="font-bold text-gray-900">{selectedPackageData.name}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700">Duration:</span>
                            <span className="font-bold text-gray-900">{selectedPackageData.duration}</span>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-700">Format:</span>
                            <span className="font-bold text-gray-900 capitalize">{consultationType.replace('-', ' ')}</span>
                          </div>
                        </div>
                      )}
                      
                      {selectedDate && selectedTime && (
                        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
                            <Calendar size={18} />
                            <span>Selected Time</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            {new Date(selectedDate).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="text-gray-700">{selectedTime} PST</div>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700">Consultation Fee:</span>
                          <span className="font-bold text-gray-900">${selectedPackageData?.price || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-700">Platform Fee:</span>
                          <span className="font-bold text-gray-900">$0</span>
                        </div>
                        <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                          <span>Total:</span>
                          <span>${selectedPackageData?.price || '0'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Your Details */}
            {step === 4 && selectedConsultant && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h3>
                <p className="text-gray-600 mb-8">Please provide your details for the consultation</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="space-y-6">
                      {/* Personal Information */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your phone number"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.country}
                              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter your country"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Education Background */}
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Education Background</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Education Level *
                            </label>
                            <select
                              required
                              value={formData.educationLevel}
                              onChange={(e) => setFormData(prev => ({ ...prev, educationLevel: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Select level</option>
                              <option value="high-school">High School</option>
                              <option value="undergraduate">Undergraduate</option>
                              <option value="graduate">Graduate</option>
                              <option value="working-professional">Working Professional</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Target Intake Year *
                            </label>
                            <select
                              required
                              value={formData.intakeYear}
                              onChange={(e) => setFormData(prev => ({ ...prev, intakeYear: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Target University
                            </label>
                            <input
                              type="text"
                              value={formData.targetUniversity}
                              onChange={(e) => setFormData(prev => ({ ...prev, targetUniversity: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., Stanford University"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Target Program
                            </label>
                            <input
                              type="text"
                              value={formData.targetProgram}
                              onChange={(e) => setFormData(prev => ({ ...prev, targetProgram: e.target.value }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="e.g., Computer Science, MBA"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Additional Notes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          value={formData.additionalNotes}
                          onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                          rows={4}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Tell us more about your background, goals, or specific questions you'd like to discuss..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div>
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Summary</h4>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                            {selectedConsultant.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{selectedConsultant.name}</div>
                            <div className="text-sm text-gray-600">{selectedConsultant.title}</div>
                          </div>
                        </div>
                        
                        {selectedPackageData && (
                          <>
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <div className="font-bold text-gray-900 mb-1">{selectedPackageData.name}</div>
                              <div className="text-sm text-gray-600">{selectedPackageData.duration} • {consultationType.replace('-', ' ')}</div>
                            </div>
                            
                            {selectedDate && selectedTime && (
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="text-sm text-gray-600 mb-1">Scheduled for</div>
                                <div className="font-bold text-gray-900">
                                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })} at {selectedTime}
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-700">Consultation Fee:</span>
                          <span className="font-bold text-gray-900">${selectedPackageData?.price || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-gray-700">Platform Fee:</span>
                          <span className="font-bold text-gray-900">$0</span>
                        </div>
                        <div className="flex items-center justify-between text-lg font-bold text-gray-900 pt-4 border-t border-gray-200">
                          <span>Total:</span>
                          <span>${selectedPackageData?.price || '0'}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <Shield size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Your information is secure and confidential. We never share your data.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirm Booking */}
            {step === 5 && selectedConsultant && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Confirm Your Booking</h3>
                <p className="text-gray-600 mb-8">Review your details before confirming</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Booking Details</h4>
                      
                      <div className="space-y-6">
                        {/* Consultant Info */}
                        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl">
                              {selectedConsultant.avatar}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-lg">{selectedConsultant.name}</div>
                              <div className="text-gray-600">{selectedConsultant.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                <GraduationCap size={14} className="text-blue-500" />
                                <span className="text-sm text-gray-600">{selectedConsultant.university}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 justify-end">
                              <Star className="fill-amber-400 text-amber-400" size={20} />
                              <span className="font-bold text-gray-900">{selectedConsultant.rating}</span>
                            </div>
                            <div className="text-sm text-gray-600">{selectedConsultant.reviews} reviews</div>
                          </div>
                        </div>

                        {/* Package & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3">Package Details</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Package:</span>
                                <span className="font-bold text-gray-900">{selectedPackageData?.name}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-bold text-gray-900">{selectedPackageData?.duration}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Format:</span>
                                <span className="font-bold text-gray-900 capitalize">{consultationType.replace('-', ' ')}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3">Scheduled Time</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-bold text-gray-900">
                                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-bold text-gray-900">{selectedTime} PST</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-bold text-gray-900">{selectedPackageData?.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Selected Topics */}
                        {selectedTopics.length > 0 && (
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3">Discussion Topics</h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedTopics.map((topic) => (
                                <span key={topic} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Personal Info */}
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-3">Your Information</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-600">Name</div>
                              <div className="font-medium text-gray-900">{formData.name}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Email</div>
                              <div className="font-medium text-gray-900">{formData.email}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Phone</div>
                              <div className="font-medium text-gray-900">{formData.phone}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">Country</div>
                              <div className="font-medium text-gray-900">{formData.country}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Payment Method</h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-xl">
                          <CreditCard className="text-blue-600" size={24} />
                          <div className="flex-1">
                            <div className="font-bold text-gray-900">Credit/Debit Card</div>
                            <div className="text-sm text-gray-600">Pay securely with your card</div>
                          </div>
                          <div className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm font-bold">
                            Recommended
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer">
                            <div className="font-bold text-gray-900 mb-2">PayPal</div>
                            <div className="text-sm text-gray-600">Pay with PayPal account</div>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer">
                            <div className="font-bold text-gray-900 mb-2">Bank Transfer</div>
                            <div className="text-sm text-gray-600">Direct bank transfer</div>
                          </div>
                          <div className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 cursor-pointer">
                            <div className="font-bold text-gray-900 mb-2">Other Methods</div>
                            <div className="text-sm text-gray-600">Contact for options</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <Shield className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                        <div>
                          <h5 className="font-bold text-gray-900 mb-2">Terms & Conditions</h5>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Consultation fee is non-refundable once session is confirmed</li>
                            <li>• Rescheduling requires 24-hour notice</li>
                            <li>• All consultations are confidential</li>
                            <li>• Payment is secure and encrypted</li>
                            <li>• You will receive confirmation email with joining details</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 mt-6">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="terms" className="text-gray-700">
                          I agree to the terms and conditions and confirm that all information provided is accurate
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Payment */}
                  <div>
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sticky top-6">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h4>
                      
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Consultation Fee:</span>
                          <span className="font-bold text-gray-900">${selectedPackageData?.price || '0'}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Platform Fee:</span>
                          <span className="font-bold text-gray-900">$0</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Tax:</span>
                          <span className="font-bold text-gray-900">$0</span>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                          <span>Total Amount:</span>
                          <span>${selectedPackageData?.price || '0'}</span>
                        </div>
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-center gap-2">
                              <CreditCard size={24} />
                              Pay ${selectedPackageData?.price || '0'} & Confirm Booking
                            </div>
                          </>
                        )}
                      </button>
                      
                      <div className="mt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Shield size={16} className="text-green-500" />
                          <span className="font-semibold">100% Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-xs text-gray-500">Powered by</div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-bold text-xs">
                              SSL
                            </div>
                            <div className="text-xs text-gray-600">Encrypted & Secure</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Back
                </button>
              ) : (
                <Link
                  href="/"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                >
                  Cancel
                </Link>
              )}
              
              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold transition-colors flex items-center"
                >
                  Continue
                  <ChevronRight className="ml-2" size={20} />
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
                  >
                    Edit Details
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 font-bold transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Additional Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mx-auto mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Personalized Strategy</h3>
            <p className="text-gray-600 text-center">
              Get a customized admissions strategy based on your profile and goals
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mx-auto mb-6">
              <Briefcase size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Proven Results</h3>
            <p className="text-gray-600 text-center">
              98% of our clients receive admission offers from their target universities
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mx-auto mb-6">
              <DollarSign size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 text-center mb-4">Money-Back Guarantee</h3>
            <p className="text-gray-600 text-center">
              Full refund if you're not satisfied with the quality of consultation
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}