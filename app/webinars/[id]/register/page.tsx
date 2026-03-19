// app/webinars/[id]/register/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Calendar, Clock, Users, Video, CheckCircle, ChevronLeft,
  User, Mail, Phone, Globe, GraduationCap, BookOpen, Target,
  DollarSign, Shield, Lock, CreditCard, Zap, AlertCircle,
  ChevronRight, Sparkles, Gift, Award, Download, Share2,
  Tag, Crown, Star, Trophy, BadgeCheck
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Types
interface WebinarData {
  id: number
  title: string
  host: string
  date: string
  duration: number
  category: string
  price: {
    type: 'free' | 'paid'
    regular: number
    earlyBird: number
    earlyBirdEnds: string
    studentDiscount: number
  }
  description: string
  features: string[]
  agenda: { time: string; topic: string }[]
  requirements: string[]
  testimonials: { name: string; university: string; review: string }[]
  isPopular?: boolean
  seatsRemaining?: number
  maxCapacity?: number
}

interface DiscountCode {
  code: string
  discount: number
  type: string
}

// Mock webinar data - includes both free and paid examples
const webinarData: WebinarData = {
  id: 1,
  title: 'How to Get into Top US Universities',
  host: 'Dr. Sarah Johnson - Stanford Admissions Officer',
  date: '2024-06-15T14:00:00Z',
  duration: 90,
  category: 'Admissions',
  price: {
    type: 'paid',
    regular: 49,
    earlyBird: 29,
    earlyBirdEnds: '2024-06-10',
    studentDiscount: 15
  },
  description: 'Learn insider tips on crafting standout applications for Ivy League and top-tier US universities.',
  features: [
    'Live Q&A session with admissions expert',
    'Comprehensive admissions strategy guide',
    'Personal statement review checklist',
    'Recording access for 30 days',
    'Bonus: Scholarship application templates',
    'Certificate of participation'
  ],
  agenda: [
    { time: '14:00 - 14:15', topic: 'Welcome & Introduction' },
    { time: '14:15 - 14:45', topic: 'Holistic Admissions Process Explained' },
    { time: '14:45 - 15:30', topic: 'Crafting Standout Essays & Personal Statements' },
    { time: '15:30 - 16:00', topic: 'Q&A Session with Dr. Sarah Johnson' },
    { time: '16:00 - 16:15', topic: 'Next Steps & Resources' }
  ],
  requirements: [
    'Stable internet connection',
    'Zoom application installed',
    'Notebook for taking notes',
    'Questions ready for Q&A'
  ],
  testimonials: [
    {
      name: 'Alex Chen',
      university: 'Admitted to Stanford',
      review: 'This webinar changed my entire approach. Got into my dream school!'
    },
    {
      name: 'Maria Rodriguez',
      university: 'Admitted to Harvard',
      review: 'Incredible insights. The host answered all my questions in detail.'
    }
  ],
  isPopular: true,
  seatsRemaining: 42,
  maxCapacity: 100
}

// Example free webinar data structure
const freeWebinarData: WebinarData = {
  id: 2,
  title: 'Introduction to College Admissions: A Free Masterclass',
  host: 'Admissions Committee Panel',
  date: '2024-06-20T18:00:00Z',
  duration: 60,
  category: 'Free Masterclass',
  price: {
    type: 'free',
    regular: 0,
    earlyBird: 0,
    earlyBirdEnds: '',
    studentDiscount: 0
  },
  description: 'Join our free masterclass to understand the fundamentals of college admissions.',
  features: [
    'Live Q&A with admissions experts',
    'Basic application strategy overview',
    'Recording available for 7 days',
    'Free resource pack download',
    'Community access'
  ],
  agenda: [
    { time: '18:00 - 18:15', topic: 'Welcome & Overview' },
    { time: '18:15 - 18:45', topic: 'Understanding Admissions Criteria' },
    { time: '18:45 - 19:00', topic: 'Q&A Session' }
  ],
  requirements: [
    'Stable internet connection',
    'Interest in college admissions'
  ],
  testimonials: [
    {
      name: 'James Wilson',
      university: 'High School Senior',
      review: 'Perfect introduction for someone just starting their admissions journey.'
    }
  ],
  seatsRemaining: 150,
  maxCapacity: 500
}

// Discount codes (only applicable for paid webinars)
const discountCodes: DiscountCode[] = [
  { code: 'STUDENT20', discount: 20, type: 'student' },
  { code: 'EARLYBIRD25', discount: 25, type: 'early' },
  { code: 'GROUP30', discount: 30, type: 'group' }
]

export default function WebinarRegisterPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [selectedPlan, setSelectedPlan] = useState('regular')
  const [appliedDiscount, setAppliedDiscount] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [validDiscount, setValidDiscount] = useState<DiscountCode | null>(null)
  const [webinar, setWebinar] = useState<WebinarData>(webinarData)
  const [registrationType, setRegistrationType] = useState<'attend' | 'watch-replay'>('attend')
  
  const [formData, setFormData] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      timezone: 'EST'
    },
    education: {
      currentLevel: '',
      targetDegree: '',
      targetUniversities: '',
      graduationYear: ''
    },
    preferences: {
      receiveRecording: true,
      joinMailingList: false,
      receiveResources: true,
      marketingConsent: false
    },
    payment: {
      method: 'credit_card',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  })

  useEffect(() => {
    // In real app, fetch webinar data by ID from API
    // This would determine if it's free or paid
    const webinarId = params.id
    
    // Mock: Randomly set as free or paid for demonstration
    const isFree = Math.random() > 0.5
    setWebinar(isFree ? freeWebinarData : webinarData)
    
    console.log('Registering for webinar:', webinarId, isFree ? 'Free' : 'Paid')
  }, [params.id])

  const handleNextStep = () => {
    if (step < (webinar.price.type === 'free' ? 3 : 4)) {
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

  const handleApplyDiscount = () => {
    if (webinar.price.type === 'free') {
      toast.error('Discount codes are not applicable for free webinars')
      return
    }
    
    const code = discountCodes.find(dc => dc.code === discountCode.toUpperCase())
    if (code) {
      setValidDiscount(code)
      setAppliedDiscount(true)
      toast.success(`Discount applied! ${code.discount}% off`)
    } else {
      setValidDiscount(null)
      setAppliedDiscount(false)
      toast.error('Invalid discount code')
    }
  }

  const handleRemoveDiscount = () => {
    setDiscountCode('')
    setValidDiscount(null)
    setAppliedDiscount(false)
    toast.success('Discount removed')
  }

  const calculatePrice = () => {
    if (webinar.price.type === 'free') return 0
    
    let price = selectedPlan === 'earlyBird' ? webinar.price.earlyBird : webinar.price.regular
    
    if (validDiscount) {
      price = price * (1 - validDiscount.discount / 100)
    }
    
    if (formData.education.currentLevel === 'student') {
      price = price - webinar.price.studentDiscount
    }
    
    return Math.max(0, price)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isEarlyBird = webinar.price.type === 'paid' && new Date() < new Date(webinar.price.earlyBirdEnds)

  const steps = webinar.price.type === 'free' ? [
    { number: 1, title: 'Your Details', description: 'Personal information' },
    { number: 2, title: 'Registration', description: 'Complete sign-up' },
    { number: 3, title: 'Confirmation', description: 'Registration complete' }
  ] : [
    { number: 1, title: 'Select Plan', description: 'Choose your package' },
    { number: 2, title: 'Your Details', description: 'Personal information' },
    { number: 3, title: 'Payment', description: 'Secure payment' },
    { number: 4, title: 'Confirmation', description: 'Registration complete' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (webinar.price.type === 'paid' && calculatePrice() > 0) {
        // In real app, process payment here
        console.log('Processing payment of $', calculatePrice())
      }
      
      toast.success(webinar.price.type === 'free' ? 'Registration successful!' : 'Registration and payment successful!')
      handleNextStep() // Move to confirmation
      
    } catch (error) {
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = calculatePrice()
  const isStudent = formData.education.currentLevel === 'student'
  const isPaid = webinar.price.type === 'paid'
  const seatsPercentage = webinar.seatsRemaining && webinar.maxCapacity 
    ? Math.round((webinar.seatsRemaining / webinar.maxCapacity) * 100) 
    : 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className={`${isPaid ? 'bg-gradient-to-r from-purple-700 via-violet-700 to-purple-800' : 'bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700'} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <Link
                href={`/webinars/${params.id}`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 group"
              >
                <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Webinar
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                {isPaid ? (
                  <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                    Premium Webinar
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-sm flex items-center gap-1">
                    <Tag size={14} />
                    <span>Free Masterclass</span>
                  </div>
                )}
                
                {webinar.isPopular && (
                  <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full text-sm flex items-center gap-1">
                    <Star size={14} />
                    <span>Most Popular</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Register for Webinar
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
                {webinar.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar size={22} />
                  <span className="text-lg">{formatDate(webinar.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={22} />
                  <span className="text-lg">{formatTime(webinar.date)} EST</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={22} />
                  <span className="text-lg">{webinar.duration} minutes</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[200px]">
              <div className="text-center">
                {isPaid ? (
                  <>
                    <div className="text-3xl font-bold text-white mb-2">
                      {isEarlyBird ? '$' + webinar.price.earlyBird : '$' + webinar.price.regular}
                    </div>
                    <div className="text-white/80">Registration Fee</div>
                    {isEarlyBird && (
                      <div className="text-sm text-green-300 mt-2 animate-pulse">
                        ⚡ Early Bird Active!
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-4xl font-bold text-white mb-2">FREE</div>
                    <div className="text-white/80">No payment required</div>
                    <div className="text-sm text-green-300 mt-2 flex items-center justify-center gap-1">
                      <Gift size={14} />
                      <span>Complimentary Access</span>
                    </div>
                  </>
                )}
                
                {/* Seats Remaining */}
                {webinar.seatsRemaining !== undefined && webinar.maxCapacity !== undefined && (
                  <div className="mt-4">
                    <div className="text-sm text-white/80 mb-1">
                      {webinar.seatsRemaining} of {webinar.maxCapacity} seats remaining
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className={`h-full rounded-full ${seatsPercentage > 50 ? 'bg-green-400' : seatsPercentage > 20 ? 'bg-yellow-400' : 'bg-red-400'}`}
                        style={{ width: `${seatsPercentage}%` }}
                      />
                    </div>
                    {seatsPercentage < 30 && (
                      <div className="text-xs text-amber-300 mt-1 animate-pulse">
                        ⚠️ Limited seats available
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Progress Steps */}
              <div className="flex flex-wrap justify-between mb-12">
                {steps.map((s) => (
                  <div key={s.number} className="flex flex-col items-center mb-6 md:mb-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all ${
                        step >= s.number
                          ? `${isPaid ? 'bg-purple-600 border-purple-600' : 'bg-blue-600 border-blue-600'} text-white`
                          : 'border-gray-300 text-gray-400'
                      } ${step === s.number ? `scale-110 ring-4 ${isPaid ? 'ring-purple-200' : 'ring-blue-200'}` : ''}`}
                    >
                      {step > s.number ? (
                        <CheckCircle size={28} />
                      ) : (
                        <span className="font-bold text-xl">{s.number}</span>
                      )}
                    </div>
                    <span className={`mt-3 text-sm font-medium ${step >= s.number ? `${isPaid ? 'text-purple-700' : 'text-blue-700'} font-semibold` : 'text-gray-500'}`}>
                      {s.title}
                      <div className="text-xs mt-1">{s.description}</div>
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: For paid webinars - Select Plan, for free webinars - Registration Type */}
                {step === 1 && isPaid && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Choose Your Registration Plan</h3>
                    
                    {/* Plan Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Early Bird Plan */}
                      <div
                        onClick={() => setSelectedPlan('earlyBird')}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:-translate-y-1 ${
                          selectedPlan === 'earlyBird'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        } ${!isEarlyBird ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">Early Bird</h4>
                            <div className="text-sm text-gray-600">Limited time offer</div>
                          </div>
                          <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold">
                            Save 40%
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-gray-900">
                            ${webinar.price.earlyBird}
                            <span className="text-lg text-gray-500 ml-2 line-through">
                              ${webinar.price.regular}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600">One-time payment</div>
                        </div>
                        
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">All webinar features</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Gift size={16} className="text-purple-500" />
                            <span className="text-gray-700">Bonus resource pack</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Zap size={16} className="text-amber-500" />
                            <span className="text-gray-700">Priority Q&A access</span>
                          </li>
                        </ul>
                        
                        {isEarlyBird ? (
                          <div className="text-sm text-gray-600">
                            Available until {formatDate(webinar.price.earlyBirdEnds)}
                          </div>
                        ) : (
                          <div className="text-sm text-amber-600 font-semibold">
                            Early bird period has ended
                          </div>
                        )}
                      </div>

                      {/* Regular Plan */}
                      <div
                        onClick={() => setSelectedPlan('regular')}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:-translate-y-1 ${
                          selectedPlan === 'regular'
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">Standard</h4>
                            <div className="text-sm text-gray-600">Full access</div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-gray-900">
                            ${webinar.price.regular}
                          </div>
                          <div className="text-sm text-gray-600">One-time payment</div>
                        </div>
                        
                        <ul className="space-y-2 mb-6">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">All webinar features</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Video size={16} className="text-blue-500" />
                            <span className="text-gray-700">Recording access</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Download size={16} className="text-purple-500" />
                            <span className="text-gray-700">Resource downloads</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Student Discount Notice */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                      <div className="flex items-center gap-4">
                        <GraduationCap className="text-blue-600" size={32} />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Student Discount Available</h4>
                          <p className="text-gray-700">
                            Students receive an additional ${webinar.price.studentDiscount} discount. 
                            Select "Student" in the next step.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Discount Code */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Have a discount code?</h4>
                      <div className="flex gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Enter discount code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
                        >
                          Apply
                        </button>
                      </div>
                      
                      {appliedDiscount && validDiscount && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="text-green-600" size={20} />
                              <span className="font-semibold text-green-700">
                                {validDiscount.discount}% discount applied
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={handleRemoveDiscount}
                              className="text-red-600 hover:text-red-700 text-sm font-semibold"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-sm text-green-600 mt-2">
                            Code: {validDiscount.code}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 1 for Free Webinars / Step 2 for Paid Webinars */}
                {(step === (isPaid ? 2 : 1)) && (
                  <div className="space-y-8">
                    {/* Registration Type for Free Webinars */}
                    {!isPaid && (
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Registration Type</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div
                            onClick={() => setRegistrationType('attend')}
                            className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:-translate-y-1 ${
                              registrationType === 'attend'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <Video className="text-blue-600" size={24} />
                              <div>
                                <h4 className="text-xl font-bold text-gray-900">Join Live Session</h4>
                                <div className="text-sm text-gray-600">Interactive experience</div>
                              </div>
                            </div>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="text-gray-700">Live Q&A participation</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Users size={16} className="text-blue-500" />
                                <span className="text-gray-700">Networking opportunities</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Zap size={16} className="text-amber-500" />
                                <span className="text-gray-700">Real-time interaction</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div
                            onClick={() => setRegistrationType('watch-replay')}
                            className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:-translate-y-1 ${
                              registrationType === 'watch-replay'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <Clock className="text-blue-600" size={24} />
                              <div>
                                <h4 className="text-xl font-bold text-gray-900">Watch Recording</h4>
                                <div className="text-sm text-gray-600">Flexible schedule</div>
                              </div>
                            </div>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2">
                                <CheckCircle size={16} className="text-green-500" />
                                <span className="text-gray-700">Access for 7 days</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Download size={16} className="text-purple-500" />
                                <span className="text-gray-700">Download resources</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Clock size={16} className="text-blue-500" />
                                <span className="text-gray-700">Watch at your own pace</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    <h3 className={`text-2xl font-bold text-gray-900 ${!isPaid ? 'pt-4' : ''}`}>
                      Your Information
                    </h3>
                    
                    {/* Personal Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <User className={`${isPaid ? 'text-purple-600' : 'text-blue-600'}`} />
                        Personal Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.personal.firstName}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, firstName: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.personal.lastName}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, lastName: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.personal.email}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, email: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.personal.phone}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, phone: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.personal.country}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, country: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Timezone *
                          </label>
                          <select
                            required
                            value={formData.personal.timezone}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, timezone: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="EST">Eastern Time (EST)</option>
                            <option value="PST">Pacific Time (PST)</option>
                            <option value="CST">Central Time (CST)</option>
                            <option value="GMT">Greenwich Mean Time (GMT)</option>
                            <option value="CET">Central European Time (CET)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Education Information */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <GraduationCap className={`${isPaid ? 'text-purple-600' : 'text-blue-600'}`} />
                        Education Background
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Current Education Level *
                          </label>
                          <select
                            required
                            value={formData.education.currentLevel}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              education: { ...prev.education, currentLevel: e.target.value }
                            }))}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          >
                            <option value="">Select level</option>
                            <option value="high-school">High School</option>
                            <option value="undergraduate">Undergraduate</option>
                            <option value="graduate">Graduate</option>
                            <option value="working-professional">Working Professional</option>
                            <option value="student">Student</option>
                            <option value="parent">Parent</option>
                            <option value="counselor">Counselor</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Degree
                          </label>
                          <input
                            type="text"
                            value={formData.education.targetDegree}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              education: { ...prev.education, targetDegree: e.target.value }
                            }))}
                            placeholder="e.g., Bachelor of Science"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Target Universities
                          </label>
                          <input
                            type="text"
                            value={formData.education.targetUniversities}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              education: { ...prev.education, targetUniversities: e.target.value }
                            }))}
                            placeholder="e.g., Stanford, MIT, Harvard"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Graduation Year
                          </label>
                          <input
                            type="number"
                            value={formData.education.graduationYear}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              education: { ...prev.education, graduationYear: e.target.value }
                            }))}
                            min="2024"
                            max="2030"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Preferences */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h4>
                      <div className="space-y-4">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData.preferences.receiveRecording}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, receiveRecording: e.target.checked }
                            }))}
                            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">
                            Send me the recording after the webinar (recommended)
                          </span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData.preferences.joinMailingList}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, joinMailingList: e.target.checked }
                            }))}
                            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">
                            Join education tips mailing list
                          </span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData.preferences.receiveResources}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              preferences: { ...prev.preferences, receiveResources: e.target.checked }
                            }))}
                            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700">
                            Receive bonus resources and templates
                          </span>
                        </label>
                        {!isPaid && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <label className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                required
                                className="w-5 h-5 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 mt-1"
                              />
                              <span className="text-gray-700">
                                I understand this is a free webinar and may have limited features compared to premium webinars.
                              </span>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment (Paid webinars only) */}
                {step === 3 && isPaid && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Payment Details</h3>
                    
                    {/* Payment Method */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, method: 'credit_card' }
                          }))}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.payment.method === 'credit_card'
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <CreditCard className="mx-auto mb-2 text-purple-600" size={32} />
                          <div className="font-semibold">Credit Card</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, method: 'paypal' }
                          }))}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.payment.method === 'paypal'
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="text-blue-600 font-bold text-xl mb-2">PayPal</div>
                          <div className="font-semibold">PayPal Account</div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            payment: { ...prev.payment, method: 'bank_transfer' }
                          }))}
                          className={`p-4 rounded-xl border-2 text-center transition-all ${
                            formData.payment.method === 'bank_transfer'
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <DollarSign className="mx-auto mb-2 text-green-600" size={32} />
                          <div className="font-semibold">Bank Transfer</div>
                        </button>
                      </div>

                      {/* Credit Card Form */}
                      {formData.payment.method === 'credit_card' && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.payment.cardNumber}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                payment: { ...prev.payment, cardNumber: e.target.value }
                              }))}
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Expiry Date *
                              </label>
                              <input
                                type="month"
                                required
                                value={formData.payment.expiryDate}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  payment: { ...prev.payment, expiryDate: e.target.value }
                                }))}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                CVV *
                              </label>
                              <input
                                type="text"
                                required
                                value={formData.payment.cvv}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  payment: { ...prev.payment, cvv: e.target.value }
                                }))}
                                placeholder="123"
                                maxLength={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Security Notice */}
                      <div className="mt-6 flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                        <Lock className="text-green-600 mt-1 flex-shrink-0" size={20} />
                        <div className="text-sm text-gray-700">
                          <span className="font-semibold">Secure Payment:</span> Your payment information is encrypted and secure. We never store your card details.
                        </div>
                      </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="text-yellow-600 mt-1" size={24} />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3">Important Information</h4>
                          <ul className="space-y-2 text-gray-700">
                            <li>• Registration fee is non-refundable</li>
                            <li>• Webinar access link will be emailed 24 hours before the event</li>
                            <li>• Recording will be available for 30 days after the live session</li>
                            <li>• By registering, you agree to our Terms of Service</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 mt-6">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 mt-1"
                        />
                        <label htmlFor="terms" className="text-gray-700">
                          I have read and agree to the terms and conditions. I confirm that all information provided is accurate.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Final Step: Confirmation */}
                {(step === (isPaid ? 4 : 3)) && (
                  <div className="space-y-8 text-center">
                    <div className="flex justify-center mb-8">
                      <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${isPaid ? 'from-green-500 to-emerald-500' : 'from-blue-500 to-cyan-500'} flex items-center justify-center`}>
                        <CheckCircle className="text-white" size={48} />
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900">
                      {isPaid ? 'Registration Complete!' : 'Free Registration Complete!'}
                    </h3>
                    <p className="text-xl text-gray-600">
                      {isPaid ? 'Thank you for registering for' : 'You are now registered for'} "{webinar.title}"
                    </p>
                    
                    <div className={`bg-gradient-to-r ${isPaid ? 'from-green-50 to-emerald-50' : 'from-blue-50 to-cyan-50'} rounded-xl p-6 max-w-md mx-auto`}>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          Confirmation #{isPaid ? 'WEB-P-' : 'WEB-F-'}{Date.now().toString().slice(-8)}
                        </div>
                        <div className="text-gray-600">Keep this for your records</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">What Happens Next</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 bg-white border border-gray-200 rounded-xl">
                          <Mail className="mx-auto mb-3 text-blue-600" size={32} />
                          <div className="font-bold text-gray-900">Confirmation Email</div>
                          <div className="text-sm text-gray-600 mt-2">
                            Check your inbox for registration details
                          </div>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-xl">
                          <Calendar className="mx-auto mb-3 text-purple-600" size={32} />
                          <div className="font-bold text-gray-900">Calendar Invite</div>
                          <div className="text-sm text-gray-600 mt-2">
                            Add to your calendar within 1 hour
                          </div>
                        </div>
                        <div className="p-4 bg-white border border-gray-200 rounded-xl">
                          <Video className="mx-auto mb-3 text-red-600" size={32} />
                          <div className="font-bold text-gray-900">Join Link</div>
                          <div className="text-sm text-gray-600 mt-2">
                            Sent 24 hours before the webinar
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info for Free Webinars */}
                    {!isPaid && (
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <Gift className="text-blue-600" size={24} />
                          <h4 className="text-lg font-bold text-gray-900">Upgrade to Premium</h4>
                        </div>
                        <p className="text-gray-700 mb-4">
                          Enjoy this free webinar? Upgrade to our premium webinars for:
                        </p>
                        <ul className="space-y-2 text-left max-w-md mx-auto">
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">Extended recording access (30 days)</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">Personalized feedback on applications</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle size={16} className="text-green-500" />
                            <span className="text-gray-700">One-on-one consultation options</span>
                          </li>
                        </ul>
                        <Link
                          href="/webinars?category=premium"
                          className="inline-block mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                        >
                          Browse Premium Webinars
                        </Link>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                      <Link
                        href="/webinars"
                        className={`px-6 py-3 ${isPaid ? 'bg-gradient-to-r from-purple-600 to-violet-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                      >
                        Browse More Webinars
                      </Link>
                      <button
                        type="button"
                        onClick={() => router.push('/dashboard')}
                        className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Go to Dashboard
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {step < (isPaid ? 4 : 3) && (
                  <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={step === 1}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                        step === 1
                          ? 'text-gray-400 cursor-not-allowed'
                          : `${isPaid ? 'text-purple-600 hover:bg-purple-50' : 'text-blue-600 hover:bg-blue-50'}`
                      }`}
                    >
                      <ChevronLeft size={20} />
                      Previous
                    </button>
                    
                    {(isPaid && step === 3) || (!isPaid && step === 2) ? (
                      <button
                        type="submit"
                        disabled={loading}
                        className={`px-8 py-3 ${isPaid ? 'bg-gradient-to-r from-purple-600 to-violet-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} text-white rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {isPaid ? 'Processing Payment...' : 'Processing...'}
                          </>
                        ) : (
                          <>
                            {isPaid ? 'Complete Registration & Pay' : 'Complete Registration'}
                            <ChevronRight size={20} />
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className={`px-8 py-3 ${isPaid ? 'bg-gradient-to-r from-purple-600 to-violet-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} text-white rounded-lg font-semibold hover:opacity-90 transition-all flex items-center gap-2`}
                      >
                        Continue
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Order Summary */}
              <div className={`${isPaid ? 'bg-white' : 'bg-gradient-to-b from-blue-50 to-white'} rounded-2xl shadow-xl p-6`}>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Webinar:</span>
                    <span className="font-semibold text-gray-900">{webinar.title}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold text-gray-900">{formatDate(webinar.date)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-semibold text-gray-900">{formatTime(webinar.date)} EST</span>
                  </div>
                  
                  {isPaid && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {selectedPlan === 'earlyBird' ? 'Early Bird' : 'Standard'}
                      </span>
                    </div>
                  )}
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  {isPaid ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold text-gray-900">
                          ${selectedPlan === 'earlyBird' ? webinar.price.earlyBird : webinar.price.regular}
                        </span>
                      </div>
                      
                      {isStudent && (
                        <div className="flex justify-between text-green-600">
                          <span>Student Discount:</span>
                          <span>-${webinar.price.studentDiscount}</span>
                        </div>
                      )}
                      
                      {validDiscount && (
                        <div className="flex justify-between text-purple-600">
                          <span>Promo Code ({validDiscount.code}):</span>
                          <span>-{validDiscount.discount}%</span>
                        </div>
                      )}
                      
                      <div className="h-px bg-gray-200 my-4"></div>
                      
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-purple-700">${totalPrice.toFixed(2)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Registration Fee:</span>
                        <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold">
                          FREE
                        </div>
                      </div>
                      <div className="h-px bg-gray-200 my-4"></div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-700">$0.00</span>
                      </div>
                    </>
                  )}
                </div>
                
                {step < (isPaid ? 4 : 3) && (
                  <div className={`mt-8 p-4 ${isPaid ? 'bg-gradient-to-r from-purple-50 to-violet-50' : 'bg-gradient-to-r from-blue-50 to-cyan-50'} rounded-xl`}>
                    <div className="flex items-start gap-3">
                      <Shield className={`${isPaid ? 'text-purple-600' : 'text-blue-600'} mt-1 flex-shrink-0`} size={20} />
                      <div className="text-sm text-gray-700">
                        <span className="font-semibold">Secure Registration:</span> Your information is protected with 256-bit SSL encryption.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* What's Included */}
              <div className={`${isPaid ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} rounded-2xl shadow-xl p-6`}>
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className={`${isPaid ? 'text-purple-600' : 'text-blue-600'}`} size={24} />
                  <h3 className="text-xl font-bold text-gray-900">What's Included</h3>
                </div>
                <ul className="space-y-3">
                  {webinar.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle size={18} className={`${isPaid ? 'text-purple-600' : 'text-blue-600'} flex-shrink-0`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                {!isPaid && (
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <BadgeCheck size={16} className="text-blue-600" />
                      <span>For premium features, check out our paid webinars</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Support */}
              <div className="bg-gradient-to-br from-gray-50 to-slate-100 rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-600" size={20} />
                    <div>
                      <div className="font-semibold text-gray-900">Email Support</div>
                      <div className="text-sm text-gray-600">support@eduwebinars.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-600" size={20} />
                    <div>
                      <div className="font-semibold text-gray-900">Phone Support</div>
                      <div className="text-sm text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600">
                      Our team is available 24/7 to assist with your registration.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}