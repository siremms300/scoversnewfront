'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, Users, Video, MessageCircle, Star, CheckCircle, Award, Zap, ChevronRight, User, Mail, Phone, Globe, GraduationCap } from 'lucide-react'
import toast from 'react-hot-toast'

const consultants = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    title: 'Former Stanford Admissions Officer',
    experience: '12 years',
    rating: 4.9,
    reviews: 342,
    specialization: ['USA', 'Ivy League', 'Graduate Programs'],
    availability: 'Next: Tomorrow, 2:00 PM',
    imageColor: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Scholarship & Funding Expert',
    experience: '8 years',
    rating: 4.8,
    reviews: 218,
    specialization: ['Scholarships', 'Financial Aid', 'MBA'],
    availability: 'Next: Today, 4:30 PM',
    imageColor: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    name: 'Prof. David Williams',
    title: 'UK & Europe Education Consultant',
    experience: '15 years',
    rating: 4.9,
    reviews: 456,
    specialization: ['UK', 'Europe', 'Research Programs'],
    availability: 'Next: Monday, 10:00 AM',
    imageColor: 'from-green-500 to-emerald-500'
  },
  {
    id: 4,
    name: 'Lisa Rodriguez',
    title: 'Visa & Immigration Specialist',
    experience: '10 years',
    rating: 4.7,
    reviews: 189,
    specialization: ['Visa Processing', 'Documentation', 'Post-Study Work'],
    availability: 'Next: Wednesday, 3:00 PM',
    imageColor: 'from-amber-500 to-orange-500'
  }
]

const consultationTypes = [
  {
    id: 'initial',
    title: 'Initial Consultation',
    duration: '30 min',
    price: 'Free',
    features: [
      'Profile Assessment',
      'University Shortlisting',
      'Roadmap Creation'
    ],
    recommended: false
  },
  {
    id: 'premium',
    title: 'Premium Strategy Session',
    duration: '60 min',
    price: '$99',
    features: [
      'In-depth Profile Analysis',
      'Application Strategy',
      'Essay Review Plan',
      'Scholarship Matching'
    ],
    recommended: true
  },
  {
    id: 'comprehensive',
    title: 'Comprehensive Package',
    duration: '90 min',
    price: '$199',
    features: [
      'Everything in Premium',
      'Document Review',
      'Interview Preparation',
      'Post-Session Follow-up',
      'Priority Support'
    ],
    recommended: false
  }
]

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
]

export default function ConsultationPage() {
  const [step, setStep] = useState(1)
  const [selectedConsultant, setSelectedConsultant] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string>('premium')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    academicLevel: '',
    targetCountry: '',
    intendedMajor: '',
    questions: ''
  })

  const [availableDates, setAvailableDates] = useState<string[]>([])

  useEffect(() => {
    // Generate next 7 days
    const dates = []
    const today = new Date()
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    setAvailableDates(dates)
    setSelectedDate(dates[0])
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Submit booking
    try {
      const bookingData = {
        consultantId: selectedConsultant,
        consultationType: selectedType,
        date: selectedDate,
        time: selectedTime,
        ...formData
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Consultation booked successfully!')
      
      // Reset form
      setStep(1)
      setSelectedConsultant(null)
      setSelectedType('premium')
      setSelectedDate(availableDates[0])
      setSelectedTime('')
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        academicLevel: '',
        targetCountry: '',
        intendedMajor: '',
        questions: ''
      })
    } catch (error) {
      toast.error('Failed to book consultation. Please try again.')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getConsultantName = () => {
    const consultant = consultants.find(c => c.id === selectedConsultant)
    return consultant?.name || 'Not selected'
  }

  const getConsultationType = () => {
    const type = consultationTypes.find(t => t.id === selectedType)
    return type?.title || 'Not selected'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Book Your
              <span className="block text-cyan-300">Free Consultation</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-12">
              Get personalized guidance from our expert consultants. 95% of students who book consultations 
              get into their dream universities.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { icon: Users, value: '10,000+', label: 'Students Helped' },
                { icon: Star, value: '4.9/5', label: 'Satisfaction Rate' },
                { icon: Award, value: '95%', label: 'Success Rate' },
                { icon: Zap, value: '24/7', label: 'Support Available' }
              ].map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <Icon className="text-cyan-200 mx-auto mb-2" size={24} />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-cyan-200">{stat.label}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-wrap justify-between mb-12">
            {[
              { number: 1, title: 'Choose Consultant' },
              { number: 2, title: 'Select Package' },
              { number: 3, title: 'Pick Time' },
              { number: 4, title: 'Your Details' }
            ].map((s) => (
              <div key={s.number} className="flex flex-col items-center mb-4 md:mb-0">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                    step >= s.number
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  } ${step === s.number ? 'scale-110 ring-4 ring-indigo-200' : ''}`}
                >
                  {step > s.number ? (
                    <CheckCircle size={24} />
                  ) : (
                    <span className="font-bold text-lg">{s.number}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= s.number ? 'text-indigo-700 font-semibold' : 'text-gray-500'
                  }`}
                >
                  {s.title}
                </span>
                {s.number < 4 && (
                  <div className={`hidden md:block mt-6 w-24 h-1 ${
                    step > s.number ? 'bg-indigo-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Choose Consultant */}
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Your Consultant</h2>
                <p className="text-gray-600 mb-8">Choose from our team of experienced education experts</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {consultants.map((consultant) => (
                    <div
                      key={consultant.id}
                      onClick={() => setSelectedConsultant(consultant.id)}
                      className={`relative group cursor-pointer transition-all duration-300 ${
                        selectedConsultant === consultant.id
                          ? 'transform scale-[1.02]'
                          : ''
                      }`}
                    >
                      <div className={`absolute -inset-2 bg-gradient-to-r ${consultant.imageColor} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
                        selectedConsultant === consultant.id ? 'opacity-30' : ''
                      }`} />
                      
                      <div className={`relative bg-white rounded-xl p-6 border-2 transition-all ${
                        selectedConsultant === consultant.id
                          ? 'border-indigo-500'
                          : 'border-gray-200 hover:border-indigo-300'
                      }`}>
                        <div className="flex items-start gap-4">
                          {/* Consultant Avatar */}
                          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${consultant.imageColor} flex items-center justify-center text-white font-bold text-2xl`}>
                            {consultant.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">{consultant.name}</h3>
                                <p className="text-gray-600">{consultant.title}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="fill-amber-400 text-amber-400" size={18} />
                                <span className="font-bold text-gray-900">{consultant.rating}</span>
                                <span className="text-gray-500 text-sm">({consultant.reviews})</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2 text-sm">
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                                {consultant.experience} experience
                              </span>
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                {consultant.availability}
                              </span>
                            </div>
                            
                            <div className="mt-4">
                              <div className="text-sm text-gray-600 mb-2">Specialization:</div>
                              <div className="flex flex-wrap gap-2">
                                {consultant.specialization.map((spec, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                  >
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Selection indicator */}
                        {selectedConsultant === consultant.id && (
                          <div className="absolute top-4 right-4">
                            <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                              <CheckCircle className="text-white" size={16} />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Package */}
            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Consultation Type</h2>
                <p className="text-gray-600 mb-8">Select the package that best fits your needs</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {consultationTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`relative group cursor-pointer transition-all duration-300 ${
                        selectedType === type.id
                          ? 'transform scale-[1.02]'
                          : ''
                      }`}
                    >
                      {type.recommended && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
                            Most Popular
                          </span>
                        </div>
                      )}
                      
                      <div className={`relative bg-white rounded-xl p-6 border-2 transition-all h-full ${
                        selectedType === type.id
                          ? 'border-indigo-500'
                          : 'border-gray-200 hover:border-indigo-300'
                      } ${type.recommended ? 'pt-10' : ''}`}>
                        <div className="text-center mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Clock size={18} />
                            <span>{type.duration} session</span>
                          </div>
                        </div>
                        
                        <div className="text-center mb-6">
                          <div className="text-4xl font-bold text-gray-900">{type.price}</div>
                          {type.price !== 'Free' && (
                            <div className="text-sm text-gray-600">One-time payment</div>
                          )}
                        </div>
                        
                        <div className="space-y-3 mb-8">
                          {type.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          type="button"
                          className={`w-full py-3 rounded-lg font-semibold transition-all ${
                            selectedType === type.id
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                              : 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                          }`}
                        >
                          {selectedType === type.id ? '✓ Selected' : 'Select Package'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pick Time */}
            {step === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Date & Time</h2>
                <p className="text-gray-600 mb-8">Choose a convenient time for your consultation</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Date Selection */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3">
                      {availableDates.map((date) => (
                        <button
                          key={date}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedDate === date
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-sm text-gray-600">{formatDate(date).split(' ')[0]}</div>
                          <div className="text-lg font-bold text-gray-900">{formatDate(date).split(' ')[1]}</div>
                          <div className="text-sm text-gray-600">{formatDate(date).split(' ')[2]}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Times</h3>
                    <div className="space-y-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`w-full p-3 rounded-lg border transition-all ${
                            selectedTime === time
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold'
                              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Selected Time Summary */}
                {(selectedDate && selectedTime) && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-indigo-600">Selected Time</div>
                        <div className="text-xl font-bold text-gray-900">
                          {formatDate(selectedDate)} at {selectedTime}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="text-indigo-600" size={24} />
                        <span className="text-gray-700">Video Call</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Your Details */}
            {step === 4 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Information</h2>
                <p className="text-gray-600 mb-8">Tell us about yourself and your goals</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Country *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Your country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Level *
                    </label>
                    <select
                      required
                      value={formData.academicLevel}
                      onChange={(e) => setFormData({...formData, academicLevel: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select level</option>
                      <option value="high_school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="phd">PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Study Country *
                    </label>
                    <select
                      required
                      value={formData.targetCountry}
                      onChange={(e) => setFormData({...formData, targetCountry: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="">Select country</option>
                      <option value="usa">USA</option>
                      <option value="uk">UK</option>
                      <option value="canada">Canada</option>
                      <option value="australia">Australia</option>
                      <option value="germany">Germany</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Intended Major/Field *
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 text-gray-400" size={20} />
                      <input
                        type="text"
                        required
                        value={formData.intendedMajor}
                        onChange={(e) => setFormData({...formData, intendedMajor: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Computer Science, Business Administration, etc."
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Questions or Goals
                    </label>
                    <textarea
                      value={formData.questions}
                      onChange={(e) => setFormData({...formData, questions: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Tell us about your specific goals, concerns, or questions for the consultant..."
                    />
                  </div>
                </div>
                
                {/* Summary Card */}
                <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Consultant</div>
                      <div className="font-semibold text-gray-900">{getConsultantName()}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Package</div>
                      <div className="font-semibold text-gray-900">{getConsultationType()}</div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-gray-600">Date & Time</div>
                      <div className="font-semibold text-gray-900">
                        {selectedDate && selectedTime ? (
                          `${formatDate(selectedDate)} at ${selectedTime}`
                        ) : (
                          'Not selected'
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-12 flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Back
                </button>
              )}
              
              <button
                type="submit"
                className={`ml-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold flex items-center gap-2 ${
                  step === 1 ? 'w-full' : ''
                }`}
                disabled={step === 1 && !selectedConsultant}
              >
                {step === 4 ? 'Confirm Booking' : 'Continue'}
                {step < 4 && <ChevronRight size={20} />}
              </button>
            </div>
          </form>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Our Consultation Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Expert Consultants',
                description: 'All consultants are former admissions officers or education experts'
              },
              {
                icon: MessageCircle,
                title: 'Personalized Advice',
                description: 'Tailored strategies based on your unique profile and goals'
              },
              {
                icon: Clock,
                title: 'Flexible Scheduling',
                description: 'Book sessions at your convenience across different time zones'
              },
              {
                icon: Award,
                title: 'Proven Results',
                description: '95% success rate with thousands of satisfied students'
              }
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Icon className="text-indigo-600 mb-4" size={32} />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}