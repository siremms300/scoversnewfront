'use client'

import { useState } from 'react'
import { Upload, FileText, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

export default function UPIRegistrationPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    email: '',
    phoneNumber: '',
    address: '',
    
    // Academic Information
    currentSchool: '',
    academicLevel: '',
    intendedMajor: '',
    targetCountries: [] as string[],
    
    // Documents
    documents: [] as File[],
    
    // Essay
    motivationEssay: '',
    
    // Financial Information
    financialReadiness: '',
    
    // Parental Information
    parentalConsent: {
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      consentGiven: false,
    }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step < 4) {
      setStep(step + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Submit form
    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'documents') {
          formData.documents.forEach((file, index) => {
            formDataToSend.append(`documents[${index}]`, file)
          })
        } else if (key === 'parentalConsent') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            formDataToSend.append(`${key}.${subKey}`, String(subValue))
          })
        } else {
          formDataToSend.append(key, String(value))
        }
      })

      const response = await fetch('/api/upi-registration', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        toast.success('Application submitted successfully!')
        // Reset form
        setStep(1)
        setFormData({
          fullName: '',
          dateOfBirth: '',
          nationality: '',
          email: '',
          phoneNumber: '',
          address: '',
          currentSchool: '',
          academicLevel: '',
          intendedMajor: '',
          targetCountries: [],
          documents: [],
          motivationEssay: '',
          financialReadiness: '',
          parentalConsent: {
            parentName: '',
            parentEmail: '',
            parentPhone: '',
            consentGiven: false,
          }
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      toast.error('Failed to submit application. Please try again.')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }))
  }

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Academic Info' },
    { number: 3, title: 'Documents' },
    { number: 4, title: 'Review & Submit' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UPI Registration
          </h1>
          <p className="text-xl text-gray-600">
            Start your international education journey with us
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between relative">
            {steps.map((s) => (
              <div key={s.number} className="flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    step >= s.number
                      ? 'bg-primary border-primary text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {step > s.number ? (
                    <CheckCircle size={24} />
                  ) : (
                    <span className="font-bold">{s.number}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm font-medium ${
                    step >= s.number ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            ))}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-300 -z-10">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Academic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current School *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.currentSchool}
                    onChange={(e) => setFormData({...formData, currentSchool: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Level *
                  </label>
                  <select
                    required
                    value={formData.academicLevel}
                    onChange={(e) => setFormData({...formData, academicLevel: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select level</option>
                    <option value="SS1">SS1</option>
                    <option value="SS2">SS2</option>
                    <option value="SS3">SS3</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intended Major *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.intendedMajor}
                    onChange={(e) => setFormData({...formData, intendedMajor: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Countries *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Other'].map((country) => (
                      <label key={country} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.targetCountries.includes(country)}
                          onChange={(e) => {
                            const newCountries = e.target.checked
                              ? [...formData.targetCountries, country]
                              : formData.targetCountries.filter(c => c !== country)
                            setFormData({...formData, targetCountries: newCountries})
                          }}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-gray-700">{country}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Documents & Essay</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Documents
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
                
                {formData.documents.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <FileText className="text-gray-400 mr-3" size={20} />
                          <span className="text-gray-700">{file.name}</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Motivation Essay *
                </label>
                <textarea
                  required
                  value={formData.motivationEssay}
                  onChange={(e) => setFormData({...formData, motivationEssay: e.target.value})}
                  rows={8}
                  minLength={200}
                  placeholder="Tell us about your motivation for studying abroad, your goals, and why you're a good candidate (minimum 200 characters)..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {formData.motivationEssay.length}/200 characters minimum
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Financial Readiness *
                </label>
                <select
                  required
                  value={formData.financialReadiness}
                  onChange={(e) => setFormData({...formData, financialReadiness: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select option</option>
                  <option value="within_7_days">Within 7 days</option>
                  <option value="within_14_days">Within 14 days</option>
                  <option value="within_30_days">Within 30 days</option>
                  <option value="need_financial_aid">Need financial aid</option>
                </select>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                    Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Full Name</span>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Date of Birth</span>
                      <p className="font-medium">{formData.dateOfBirth}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email</span>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone</span>
                      <p className="font-medium">{formData.phoneNumber}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                    Academic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Current School</span>
                      <p className="font-medium">{formData.currentSchool}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Intended Major</span>
                      <p className="font-medium">{formData.intendedMajor}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Target Countries</span>
                      <p className="font-medium">{formData.targetCountries.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Financial Readiness</span>
                      <p className="font-medium">{formData.financialReadiness.replace(/_/g, ' ')}</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">
                    Documents Uploaded
                  </h3>
                  <div className="space-y-2">
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <FileText className="mr-2" size={16} />
                        {file.name}
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label className="ml-3 text-gray-700">
                    I certify that the information provided is accurate and complete to the best of my knowledge.
                    I understand that providing false information may result in the rejection of my application.
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="mt-10 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}
            
            <button
              type="submit"
              className={`ml-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors ${
                step === 1 ? 'w-full' : ''
              }`}
            >
              {step === 4 ? 'Submit Application' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}