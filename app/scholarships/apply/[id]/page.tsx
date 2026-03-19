// app/scholarships/apply/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Award, Calendar, DollarSign, Globe, User, Mail, Phone,
  GraduationCap, FileText, Upload, CheckCircle, AlertCircle,
  ArrowLeft, Shield, Clock, BookOpen, Target, ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock scholarship data
const scholarshipData = {
  id: 1,
  title: 'Fully Funded STEM Scholarship',
  provider: 'Stanford University',
  amount: '$50,000',
  deadline: '2024-03-15',
  eligibility: 'International students with 3.5+ GPA',
  description: 'Full tuition coverage for STEM programs at Stanford University for outstanding international students.',
  requirements: [
    'Minimum 3.5 GPA or equivalent',
    'Proof of English proficiency (TOEFL 100+ or IELTS 7.0+)',
    'Two letters of recommendation',
    'Personal statement (500-1000 words)',
    'Transcripts from all institutions attended',
    'CV/Resume'
  ],
  benefits: [
    'Full tuition coverage',
    'Living stipend ($15,000/year)',
    'Health insurance',
    'Research funding',
    'Conference travel grants'
  ],
  selectionCriteria: [
    'Academic excellence (40%)',
    'Research potential (30%)',
    'Leadership qualities (20%)',
    'Community involvement (10%)'
  ],
  contact: {
    email: 'scholarships@stanford.edu',
    phone: '+1 (650) 723-2300'
  }
}

export default function ScholarshipApplyPage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationality: '',
      passportNumber: ''
    },
    academic: {
      currentInstitution: '',
      program: '',
      gpa: '',
      graduationYear: '',
      testScores: {
        toefl: '',
        ielts: '',
        gre: '',
        gmat: ''
      }
    },
    documents: {
      transcript: null as File | null,
      recommendation1: null as File | null,
      recommendation2: null as File | null,
      personalStatement: null as File | null,
      cv: null as File | null,
      passport: null as File | null
    },
    additional: {
      researchExperience: '',
      publications: '',
      awards: '',
      extracurricular: '',
      careerGoals: ''
    }
  })
  const [uploadProgress, setUploadProgress] = useState<{[key: string]: number}>({})
  const [step, setStep] = useState(1)

  useEffect(() => {
    // In real app, fetch scholarship data by ID
    console.log('Fetching scholarship:', params.id)
  }, [params.id])

  const handleNext = () => {
    if (step < 4) {
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
    setUploadProgress(prev => ({ ...prev, [field]: 0 }))
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[field] + 25
        if (newProgress >= 100) {
          clearInterval(interval)
          setFormData(prev => ({
            ...prev,
            documents: { ...prev.documents, [field]: file }
          }))
          toast.success('File uploaded successfully')
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
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Application submitted successfully!')
      router.push('/scholarships/apply/confirmation')
    } catch (error) {
      toast.error('Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Your details' },
    { number: 2, title: 'Academic Info', description: 'Education background' },
    { number: 3, title: 'Documents', description: 'Upload files' },
    { number: 4, title: 'Review & Submit', description: 'Final check' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href={`/scholarships/${params.id}`}
            className="inline-flex items-center gap-2 text-emerald-200 hover:text-white mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Scholarship
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Award size={28} className="text-emerald-300" />
                <h1 className="text-3xl font-bold">Apply Now</h1>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {scholarshipData.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-6 text-emerald-200">
                <div className="flex items-center gap-2">
                  <DollarSign size={22} />
                  <span className="text-xl font-semibold">{scholarshipData.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={22} />
                  <span className="text-lg">{scholarshipData.provider}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={22} />
                  <span className="text-lg">Deadline: {scholarshipData.deadline}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">{scholarshipData.amount}</div>
                <div className="text-emerald-200">Total Award</div>
                <div className="text-sm text-emerald-300 mt-2">
                  {Math.ceil((new Date(scholarshipData.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress & Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              {/* Progress Steps */}
              <div className="flex flex-wrap justify-between mb-12">
                {steps.map((s) => (
                  <div key={s.number} className="flex flex-col items-center mb-6 md:mb-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all ${
                        step >= s.number
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300 text-gray-400'
                      } ${step === s.number ? 'scale-110 ring-4 ring-emerald-200' : ''}`}
                    >
                      {step > s.number ? (
                        <CheckCircle size={28} />
                      ) : (
                        <span className="font-bold text-xl">{s.number}</span>
                      )}
                    </div>
                    <span className={`mt-3 text-sm font-medium ${step >= s.number ? 'text-emerald-700 font-semibold' : 'text-gray-500'}`}>
                      {s.title}
                      <div className="text-xs mt-1">{s.description}</div>
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.personal.fullName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, fullName: e.target.value }
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.personal.email}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, email: e.target.value }
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.personal.phone}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, phone: e.target.value }
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
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
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Academic Info */}
                {step === 2 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Academic Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Institution *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.academic.currentInstitution}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            academic: { ...prev.academic, currentInstitution: e.target.value }
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Program *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.academic.program}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            academic: { ...prev.academic, program: e.target.value }
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          GPA/CGPA *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.academic.gpa}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            academic: { ...prev.academic, gpa: e.target.value }
                          }))}
                          placeholder="e.g., 3.8/4.0"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expected Graduation Year *
                        </label>
                        <input
                          type="number"
                          required
                          value={formData.academic.graduationYear}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            academic: { ...prev.academic, graduationYear: e.target.value }
                          }))}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Test Scores (Optional)</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">TOEFL</label>
                          <input
                            type="number"
                            value={formData.academic.testScores.toefl}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              academic: {
                                ...prev.academic,
                                testScores: { ...prev.academic.testScores, toefl: e.target.value }
                              }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">IELTS</label>
                          <input
                            type="number"
                            step="0.5"
                            value={formData.academic.testScores.ielts}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              academic: {
                                ...prev.academic,
                                testScores: { ...prev.academic.testScores, ielts: e.target.value }
                              }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">GRE</label>
                          <input
                            type="number"
                            value={formData.academic.testScores.gre}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              academic: {
                                ...prev.academic,
                                testScores: { ...prev.academic.testScores, gre: e.target.value }
                              }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">GMAT</label>
                          <input
                            type="number"
                            value={formData.academic.testScores.gmat}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              academic: {
                                ...prev.academic,
                                testScores: { ...prev.academic.testScores, gmat: e.target.value }
                              }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {step === 3 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Required Documents</h3>
                    
                    <div className="space-y-6">
                      {[
                        { id: 'transcript', label: 'Official Transcripts', required: true },
                        { id: 'recommendation1', label: 'Letter of Recommendation #1', required: true },
                        { id: 'recommendation2', label: 'Letter of Recommendation #2', required: true },
                        { id: 'personalStatement', label: 'Personal Statement', required: true },
                        { id: 'cv', label: 'CV/Resume', required: true },
                        { id: 'passport', label: 'Passport Copy', required: true }
                      ].map((doc) => {
                        const file = formData.documents[doc.id as keyof typeof formData.documents]
                        const progress = uploadProgress[doc.id] || 0
                        
                        return (
                          <div key={doc.id} className="p-6 bg-gray-50 rounded-xl">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <FileText size={24} className="text-emerald-600" />
                                <div>
                                  <h4 className="font-semibold text-gray-900">{doc.label}</h4>
                                  <p className="text-sm text-gray-600">Max: 10MB • PDF format</p>
                                </div>
                              </div>
                              {doc.required && (
                                <span className="text-sm text-red-500 font-semibold">Required</span>
                              )}
                            </div>
                            
                            {file ? (
                              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <FileText className="text-emerald-600" size={24} />
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
                                          className="h-full bg-emerald-500 rounded-full transition-all"
                                          style={{ width: `${progress}%` }}
                                        />
                                      </div>
                                    ) : (
                                      <CheckCircle className="text-emerald-500" size={24} />
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <label className="block cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
                                  <Upload className="mx-auto text-gray-400 mb-4" size={32} />
                                  <p className="text-gray-600 mb-2">Click to upload</p>
                                  <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) {
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
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {step === 4 && (
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900">Review & Submit</h3>
                    
                    <div className="space-y-6">
                      {/* Scholarship Summary */}
                      <div className="bg-emerald-50 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4">Scholarship Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-600">Scholarship</div>
                            <div className="font-bold text-gray-900">{scholarshipData.title}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Amount</div>
                            <div className="font-bold text-emerald-700">{scholarshipData.amount}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Provider</div>
                            <div className="font-medium text-gray-900">{scholarshipData.provider}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Deadline</div>
                            <div className="font-medium text-gray-900">{scholarshipData.deadline}</div>
                          </div>
                        </div>
                      </div>

                      {/* Document Status */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-4">Document Status</h4>
                        <div className="space-y-3">
                          {Object.entries(formData.documents).map(([key, file]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1')}
                              </span>
                              <span className={`font-medium ${file ? 'text-emerald-600' : 'text-red-600'}`}>
                                {file ? '✓ Uploaded' : '✗ Missing'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Terms */}
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="text-yellow-600 mt-1" size={24} />
                          <div>
                            <h4 className="font-bold text-gray-900 mb-3">Important Information</h4>
                            <ul className="space-y-2 text-gray-700">
                              <li>• Application cannot be edited after submission</li>
                              <li>• All documents must be in English or have certified translations</li>
                              <li>• False information may lead to disqualification</li>
                              <li>• Selection results will be announced within 8-12 weeks</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Agreement */}
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="terms"
                          required
                          className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 mt-1"
                        />
                        <label htmlFor="terms" className="text-gray-700">
                          I certify that all information provided is accurate and complete. 
                          I agree to the terms and conditions of this scholarship application.
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="mt-12 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
                    >
                      Back
                    </button>
                  ) : (
                    <Link
                      href={`/scholarships/${params.id}`}
                      className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-semibold"
                    >
                      Cancel
                    </Link>
                  )}
                  
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-semibold flex items-center"
                    >
                      Continue
                      <ChevronRight className="ml-2" size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl hover:from-emerald-700 hover:to-green-700 font-bold disabled:opacity-50"
                    >
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3">
                {scholarshipData.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Benefits</h3>
              <ul className="space-y-3">
                {scholarshipData.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Award className="text-emerald-600 mt-1 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selection Criteria */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Selection Criteria</h3>
              <div className="space-y-4">
                {scholarshipData.selectionCriteria.map((criteria, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">{criteria.split('(')[0].trim()}</span>
                      <span className="font-bold text-gray-900">{criteria.split('(')[1]?.replace(')', '')}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-emerald-500 h-2 rounded-full"
                        style={{ width: criteria.split('(')[1]?.replace(')', '') || '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <a href={`mailto:${scholarshipData.contact.email}`} className="text-gray-700 hover:text-emerald-600">
                    {scholarshipData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <a href={`tel:${scholarshipData.contact.phone}`} className="text-gray-700 hover:text-emerald-600">
                    {scholarshipData.contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}