'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import {
  ChevronLeft, CheckCircle, Upload, FileText, User, Mail, Phone,
  MapPin, Calendar, GraduationCap, Award, DollarSign, BookOpen,
  Building, Globe, Users, Target, Clock, Shield, Send, Download,
  AlertCircle, Info, Lock, Eye, EyeOff, ArrowRight, X, HelpCircle
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock data
const universityData = {
  id: 'stanford',
  name: 'Stanford University',
  location: 'Stanford, California, USA',
  applicationFee: '$90',
  processingTime: '8-12 weeks',
  
  programs: {
    'cs-bs': {
      name: 'Computer Science (BS)',
      department: 'School of Engineering',
      deadline: '2024-12-15',
      tuition: '$56,169/year'
    },
    'mba': {
      name: 'MBA',
      department: 'Graduate School of Business',
      deadline: '2024-09-05',
      tuition: '$73,440/year'
    },
    'medicine-md': {
      name: 'Medicine (MD)',
      department: 'School of Medicine',
      deadline: '2024-10-01',
      tuition: '$63,747/year'
    }
  }
}

const applicationSteps = [
  { number: 1, title: 'Program Selection', description: 'Choose your program' },
  { number: 2, title: 'Personal Information', description: 'Your details' },
  { number: 3, title: 'Academic History', description: 'Education background' },
  { number: 4, title: 'Documents', description: 'Upload required files' },
  { number: 5, title: 'Review & Submit', description: 'Final check' }
]

export default function UniversityApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [selectedProgram, setSelectedProgram] = useState('')
  const [formData, setFormData] = useState({
    // Step 1: Program Selection
    programId: '',
    intake: 'Fall 2024',
    startDate: '',
    
    // Step 2: Personal Information
    personal: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      passportNumber: '',
      passportExpiry: ''
    },
    
    // Step 2b: Contact Information
    contact: {
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      zipCode: ''
    },
    
    // Step 3: Academic History
    education: [] as Array<{
      institution: string
      degree: string
      field: string
      startDate: string
      endDate: string
      gpa: string
      location: string
    }>,
    
    // Step 3b: Test Scores
    testScores: {
      sat: '',
      act: '',
      toefl: '',
      ielts: '',
      gre: '',
      gmat: ''
    },
    
    // Step 4: Documents
    documents: {
      transcript: null as File | null,
      recommendation1: null as File | null,
      recommendation2: null as File | null,
      personalStatement: null as File | null,
      resume: null as File | null,
      passport: null as File | null,
      financialStatement: null as File | null
    },
    
    // Step 5: Additional Information
    additional: {
      workExperience: '',
      extracurricular: '',
      awards: '',
      research: '',
      publications: '',
      diversityStatement: ''
    },
    
    // Terms & Payment
    termsAccepted: false,
    feePayment: {
      method: '',
      paid: false
    }
  })

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})

  useEffect(() => {
    const programId = searchParams.get('program')
    if (programId && universityData.programs[programId as keyof typeof universityData.programs]) {
      setSelectedProgram(programId)
      setFormData(prev => ({ ...prev, programId }))
    }
  }, [searchParams])

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFileUpload = (field: string, file: File) => {
    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [field]: 0 }))
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[field] + 20
        if (newProgress >= 100) {
          clearInterval(interval)
          setFormData(prev => ({
            ...prev,
            documents: { ...prev.documents, [field]: file }
          }))
          toast.success(`${field.replace(/([A-Z])/g, ' $1')} uploaded successfully`)
          return { ...prev, [field]: 100 }
        }
        return { ...prev, [field]: newProgress }
      })
    }, 200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Application submitted successfully!')
      
      // Redirect to confirmation
      router.push(`/universities/${params.id}/apply/confirmation`)
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getProgramInfo = () => {
    if (!selectedProgram) return null
    return universityData.programs[selectedProgram as keyof typeof universityData.programs]
  }

  const programInfo = getProgramInfo()

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href={`/universities/${params.id}`}
            className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to University Profile
          </Link>
          
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Building size={24} className="text-green-300" />
                <h1 className="text-3xl font-bold">{universityData.name}</h1>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Application Portal
              </h2>
              
              <p className="text-xl text-green-100">
                Apply to your chosen program at {universityData.name}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{universityData.applicationFee}</div>
                <div className="text-green-200">Application Fee</div>
                <div className="text-sm text-green-300 mt-2">{universityData.processingTime} processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Steps & Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="flex flex-wrap justify-between mb-12">
                {applicationSteps.map((s) => (
                  <div key={s.number} className="flex flex-col items-center mb-6 md:mb-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                        step >= s.number
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-gray-300 text-gray-400'
                      } ${step === s.number ? 'scale-110 ring-4 ring-green-200' : ''}`}
                    >
                      {step > s.number ? (
                        <CheckCircle size={28} />
                      ) : (
                        <span className="font-bold text-xl">{s.number}</span>
                      )}
                    </div>
                    <span
                      className={`mt-3 text-sm font-medium text-center ${
                        step >= s.number ? 'text-green-700 font-semibold' : 'text-gray-500'
                      }`}
                    >
                      {s.title}
                      <div className="text-xs mt-1">{s.description}</div>
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                {/* Step 1: Program Selection */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Select Your Program</h3>
                    <p className="text-gray-600 mb-8">Choose the program you wish to apply for</p>
                    
                    <div className="space-y-6">
                      {Object.entries(universityData.programs).map(([id, program]) => (
                        <div
                          key={id}
                          onClick={() => {
                            setSelectedProgram(id)
                            setFormData(prev => ({ ...prev, programId: id }))
                          }}
                          className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedProgram === id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h4>
                              <div className="flex items-center gap-4 text-gray-600 mb-3">
                                <div className="flex items-center gap-2">
                                  <Building size={16} />
                                  {program.department}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar size={16} />
                                  Deadline: {program.deadline}
                                </div>
                              </div>
                              <div className="text-lg font-semibold text-gray-900">{program.tuition}</div>
                            </div>
                            {selectedProgram === id && (
                              <div className="ml-4">
                                <CheckCircle className="text-green-500" size={28} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {/* Intake Selection */}
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Intake Period</h4>
                        <select
                          value={formData.intake}
                          onChange={(e) => setFormData(prev => ({ ...prev, intake: e.target.value }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        >
                          <option value="Fall 2024">Fall 2024</option>
                          <option value="Spring 2025">Spring 2025</option>
                          <option value="Fall 2025">Fall 2025</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Personal Information */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                    <p className="text-gray-600 mb-8">Tell us about yourself</p>
                    
                    <div className="space-y-8">
                      {/* Personal Details */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Details</h4>
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
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Date of Birth *
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.personal.dateOfBirth}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                personal: { ...prev.personal, dateOfBirth: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Gender *
                            </label>
                            <select
                              required
                              value={formData.personal.gender}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                personal: { ...prev.personal, gender: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            >
                              <option value="">Select</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                              <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nationality *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.personal.nationality}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                personal: { ...prev.personal, nationality: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.contact.email}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contact: { ...prev.contact, email: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              required
                              value={formData.contact.phone}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contact: { ...prev.contact, phone: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.contact.country}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contact: { ...prev.contact, country: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.contact.city}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contact: { ...prev.contact, city: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Address *
                            </label>
                            <textarea
                              required
                              value={formData.contact.address}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                contact: { ...prev.contact, address: e.target.value }
                              }))}
                              rows={3}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Passport Information */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Passport Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Passport Number *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.personal.passportNumber}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                personal: { ...prev.personal, passportNumber: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Passport Expiry Date *
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.personal.passportExpiry}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                personal: { ...prev.personal, passportExpiry: e.target.value }
                              }))}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Academic History */}
                {step === 3 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Academic History</h3>
                    <p className="text-gray-600 mb-8">Provide your educational background</p>
                    
                    <div className="space-y-8">
                      {/* Add Education History */}
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-lg font-semibold text-gray-900">Education History</h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                education: [
                                  ...prev.education,
                                  {
                                    institution: '',
                                    degree: '',
                                    field: '',
                                    startDate: '',
                                    endDate: '',
                                    gpa: '',
                                    location: ''
                                  }
                                ]
                              }))
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                          >
                            Add Education
                          </button>
                        </div>
                        
                        <div className="space-y-6">
                          {formData.education.map((edu, index) => (
                            <div key={index} className="p-6 bg-gray-50 rounded-xl">
                              <div className="flex items-center justify-between mb-4">
                                <h5 className="font-semibold text-gray-900">Education #{index + 1}</h5>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setFormData(prev => ({
                                      ...prev,
                                      education: prev.education.filter((_, i) => i !== index)
                                    }))
                                  }}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Institution Name *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={edu.institution}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].institution = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Degree Earned *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={edu.degree}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].degree = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Field of Study *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={edu.field}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].field = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    GPA *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={edu.gpa}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].gpa = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    placeholder="e.g., 3.8/4.0"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Start Date *
                                  </label>
                                  <input
                                    type="date"
                                    required
                                    value={edu.startDate}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].startDate = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    End Date *
                                  </label>
                                  <input
                                    type="date"
                                    required
                                    value={edu.endDate}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].endDate = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                  </label>
                                  <input
                                    type="text"
                                    required
                                    value={edu.location}
                                    onChange={(e) => {
                                      const newEducation = [...formData.education]
                                      newEducation[index].location = e.target.value
                                      setFormData(prev => ({ ...prev, education: newEducation }))
                                    }}
                                    placeholder="City, Country"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {formData.education.length === 0 && (
                            <div className="text-center py-8 bg-gray-50 rounded-xl">
                              <GraduationCap className="mx-auto text-gray-400 mb-4" size={48} />
                              <p className="text-gray-600">Add your educational history to continue</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Test Scores */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Standardized Test Scores</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { id: 'sat', label: 'SAT Score', icon: Target },
                            { id: 'act', label: 'ACT Score', icon: Target },
                            { id: 'toefl', label: 'TOEFL Score', icon: Globe },
                            { id: 'ielts', label: 'IELTS Score', icon: Globe },
                            { id: 'gre', label: 'GRE Score', icon: BookOpen },
                            { id: 'gmat', label: 'GMAT Score', icon: BookOpen }
                          ].map((test) => {
                            const Icon = test.icon
                            return (
                              <div key={test.id} className="bg-white border border-gray-200 rounded-xl p-4">
                                <div className="flex items-center gap-3 mb-3">
                                  <Icon className="text-green-600" size={20} />
                                  <span className="font-medium text-gray-900">{test.label}</span>
                                </div>
                                <input
                                  type="number"
                                  value={formData.testScores[test.id as keyof typeof formData.testScores]}
                                  onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    testScores: {
                                      ...prev.testScores,
                                      [test.id]: e.target.value
                                    }
                                  }))}
                                  placeholder="Enter score"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Documents */}
                {step === 4 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Required Documents</h3>
                    <p className="text-gray-600 mb-8">Upload all required application documents</p>
                    
                    <div className="space-y-6">
                      {[
                        { id: 'transcript', label: 'Official Transcripts', required: true, description: 'PDF format, all pages' },
                        { id: 'recommendation1', label: 'Letter of Recommendation #1', required: true, description: 'From academic supervisor' },
                        { id: 'recommendation2', label: 'Letter of Recommendation #2', required: true, description: 'From professor or employer' },
                        { id: 'personalStatement', label: 'Personal Statement', required: true, description: '500-1000 words' },
                        { id: 'resume', label: 'Resume/CV', required: true, description: 'Current resume' },
                        { id: 'passport', label: 'Passport Copy', required: true, description: 'Clear scan of passport page' },
                        { id: 'financialStatement', label: 'Financial Statement', required: true, description: 'Proof of funds' }
                      ].map((doc) => {
                        const file = formData.documents[doc.id as keyof typeof formData.documents]
                        const progress = uploadProgress[doc.id] || 0
                        
                        return (
                          <div key={doc.id} className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                                  {doc.label}
                                  {doc.required && <span className="text-red-500 text-sm">* Required</span>}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                              </div>
                              <div className="text-sm text-gray-500">
                                Max: 10MB • PDF/DOC/DOCX
                              </div>
                            </div>
                            
                            {file ? (
                              <div className="bg-white rounded-lg p-4 border border-green-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <FileText className="text-green-600" size={24} />
                                    <div>
                                      <div className="font-medium text-gray-900">{file.name}</div>
                                      <div className="text-sm text-gray-600">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {progress < 100 ? (
                                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                                          style={{ width: `${progress}%` }}
                                        />
                                      </div>
                                    ) : (
                                      <CheckCircle className="text-green-500" size={24} />
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setFormData(prev => ({
                                          ...prev,
                                          documents: { ...prev.documents, [doc.id]: null }
                                        }))
                                      }}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <X size={20} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <label className="block cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                                  <Upload className="mx-auto text-gray-400 mb-4" size={32} />
                                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                                  <p className="text-sm text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                                  <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
                                        if (file.size > 10 * 1024 * 1024) {
                                          toast.error('File size must be less than 10MB')
                                          return
                                        }
                                        handleFileUpload(doc.id, file)
                                      }
                                    }}
                                    className="hidden"
                                  />
                                </div>
                              </label>
                            )}
                          </div>
                        )
                      })}
                      
                      {/* Document Checklist */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          <CheckCircle className="text-green-600" />
                          Document Checklist
                        </h4>
                        <div className="space-y-3">
                          {[
                            'All documents must be in English or accompanied by certified translations',
                            'Transcripts must be official and sealed',
                            'Recommendation letters must be on official letterhead',
                            'Personal statement must be original work',
                            'Passport must be valid for at least 6 months beyond program start date'
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                              <span className="text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Review & Submit */}
                {step === 5 && (
                  <div className="animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h3>
                    <p className="text-gray-600 mb-8">Review your application before submission</p>
                    
                    <div className="space-y-8">
                      {/* Application Summary */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Application Summary</h4>
                        
                        <div className="space-y-6">
                          {/* Program Information */}
                          {programInfo && (
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <Building size={18} />
                                Program Information
                              </h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm text-gray-600">Program</div>
                                  <div className="font-medium text-gray-900">{programInfo.name}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Department</div>
                                  <div className="font-medium text-gray-900">{programInfo.department}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Intake Period</div>
                                  <div className="font-medium text-gray-900">{formData.intake}</div>
                                </div>
                                <div>
                                  <div className="text-sm text-gray-600">Application Fee</div>
                                  <div className="font-medium text-gray-900">{universityData.applicationFee}</div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Personal Information */}
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <User size={18} />
                              Personal Information
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-gray-600">Full Name</div>
                                <div className="font-medium text-gray-900">
                                  {formData.personal.firstName} {formData.personal.lastName}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Email</div>
                                <div className="font-medium text-gray-900">{formData.contact.email}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Phone</div>
                                <div className="font-medium text-gray-900">{formData.contact.phone}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-600">Nationality</div>
                                <div className="font-medium text-gray-900">{formData.personal.nationality}</div>
                              </div>
                            </div>
                          </div>

                          {/* Document Status */}
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <FileText size={18} />
                              Document Status
                            </h5>
                            <div className="space-y-3">
                              {Object.entries(formData.documents).map(([key, file]) => (
                                <div key={key} className="flex items-center justify-between">
                                  <span className="text-gray-700 capitalize">
                                    {key.replace(/([A-Z])/g, ' $1')}
                                  </span>
                                  <span className={`font-medium ${file ? 'text-green-600' : 'text-red-600'}`}>
                                    {file ? '✓ Uploaded' : '✗ Missing'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Terms & Conditions */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="text-yellow-600 mt-1 flex-shrink-0" size={24} />
                          <div>
                            <h5 className="font-bold text-gray-900 mb-3">Important Information</h5>
                            <ul className="space-y-2 text-gray-700">
                              <li>• Application fee is non-refundable</li>
                              <li>• All information must be accurate and complete</li>
                              <li>• Submitting false information may result in rejection</li>
                              <li>• Application decisions are final</li>
                              <li>• Processing time: {universityData.processingTime}</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Payment & Terms */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start gap-3 mb-6">
                          <Shield className="text-green-600 mt-1 flex-shrink-0" size={24} />
                          <div>
                            <h5 className="font-bold text-gray-900 mb-2">Terms & Conditions</h5>
                            <p className="text-gray-700 mb-4">
                              By submitting this application, you agree to the terms and conditions of {universityData.name}'s 
                              admission process. You certify that all information provided is accurate and complete.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id="terms"
                            checked={formData.termsAccepted}
                            onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                            required
                          />
                          <label htmlFor="terms" className="text-gray-700">
                            I agree to the terms and conditions and certify that all information provided is accurate
                          </label>
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
                      onClick={handleBack}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      href={`/universities/${params.id}`}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold transition-colors"
                    >
                      Cancel
                    </Link>
                  )}
                  
                  {step < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold transition-colors flex items-center"
                      disabled={step === 1 && !selectedProgram}
                    >
                      Continue
                      <ArrowRight className="ml-2" size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!formData.termsAccepted || loading}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Submit Application
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Selected Program Card */}
            {selectedProgram && programInfo && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Selected Program</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Program</div>
                    <div className="font-bold text-gray-900">{programInfo.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Department</div>
                    <div className="font-medium text-gray-900">{programInfo.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Intake</div>
                    <div className="font-medium text-gray-900">{formData.intake}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Application Deadline</div>
                    <div className="font-medium text-gray-900">{programInfo.deadline}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Tuition</div>
                    <div className="font-bold text-emerald-700">{programInfo.tuition}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Application Fee Card */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Fee</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="text-2xl font-bold text-gray-900">{universityData.applicationFee}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Processing Time</span>
                  <span className="font-medium text-gray-900">{universityData.processingTime}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Info size={16} />
                    Fee is non-refundable once submitted
                  </div>
                </div>
              </div>
            </div>

            {/* Help & Support Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle className="text-blue-600" />
                Need Help?
              </h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Contact our admissions team if you have any questions about the application process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600" />
                    <span className="text-gray-700">admissions@{universityData.id}.edu</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-blue-600" />
                    <span className="text-gray-700">+1 (650) 723-2300</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={18} className="text-blue-600" />
                    <span className="text-gray-700">Mon-Fri, 9AM-5PM PST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Summary */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-green-600">{step * 20}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${step * 20}%` }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-3">
                  {applicationSteps.map((s, index) => (
                    <div
                      key={s.number}
                      className={`flex items-center gap-3 ${
                        step > index ? 'text-green-700' : step === index ? 'font-semibold text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step > index ? 'bg-green-100 text-green-700' : step === index ? 'bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step > index ? <CheckCircle size={14} /> : s.number}
                      </div>
                      <span className="text-sm">{s.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} {universityData.name} Admissions. All rights reserved.</p>
          <p className="mt-2">Your application is secure and encrypted. Review our privacy policy for more information.</p>
        </div>
      </div>
    </div>
  )
}