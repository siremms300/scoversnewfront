// app/scholarships/[id]/page.tsx
'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Award, Calendar, DollarSign, Globe, Users, Clock,
  ChevronLeft, Share2, Bookmark, Download, Target,
  GraduationCap, FileText, CheckCircle, AlertCircle,
  BarChart3, TrendingUp, Zap, Shield, ExternalLink,
  Mail, Phone, MapPin
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock detailed scholarship data
const scholarshipData = {
  id: 1,
  title: 'Fully Funded STEM Scholarship',
  provider: 'Stanford University',
  providerLogo: 'S',
  amount: '$50,000',
  deadline: '2024-03-15',
  eligibility: 'International students pursuing STEM degrees with minimum 3.5 GPA',
  description: 'This prestigious scholarship provides full tuition coverage for outstanding international students pursuing STEM degrees at Stanford University. The award includes tuition, living expenses, and research funding.',
  longDescription: `The Stanford STEM Scholarship is designed to attract the brightest minds from around the world to pursue cutting-edge research in Science, Technology, Engineering, and Mathematics. This comprehensive scholarship package not only covers tuition but also provides generous living stipends, research funding, and opportunities for professional development.

Scholarship recipients become part of an elite community of researchers and innovators, gaining access to Stanford's world-class facilities, faculty mentorship, and global network. The program emphasizes interdisciplinary collaboration and aims to develop leaders who will address global challenges through technological innovation.`,
  
  requirements: [
    'Bachelor\'s degree in a STEM field with minimum 3.5 GPA',
    'Proof of English proficiency (TOEFL 100+ or IELTS 7.0+)',
    'Two academic letters of recommendation',
    'Statement of purpose (1000 words)',
    'Research proposal (for PhD applicants)',
    'Updated CV/Resume',
    'Official transcripts from all institutions attended'
  ],
  
  benefits: [
    'Full tuition coverage for duration of program',
    'Annual living stipend of $15,000',
    'Comprehensive health insurance',
    'Research grant up to $5,000',
    'Conference travel funding',
    'Mentorship from faculty experts',
    'Access to exclusive networking events'
  ],
  
  selectionProcess: [
    'Initial application screening (2-3 weeks)',
    'Document verification',
    'Interview with selection committee',
    'Final decision and notification',
    'Award disbursement'
  ],
  
  timeline: [
    { date: '2024-01-15', event: 'Application opens' },
    { date: '2024-03-15', event: 'Application deadline' },
    { date: '2024-04-15', event: 'Interviews conducted' },
    { date: '2024-05-01', event: 'Award notification' },
    { date: '2024-09-01', event: 'Program begins' }
  ],
  
  statistics: {
    applicationsLastYear: 1250,
    awardsGiven: 25,
    successRate: '2%',
    averageGPA: 3.8,
    countriesRepresented: 45,
    genderRatio: { male: '55%', female: '45%' }
  },
  
  contact: {
    name: 'Scholarships Office',
    email: 'stem-scholarship@stanford.edu',
    phone: '+1 (650) 723-2300',
    address: '450 Serra Mall, Stanford, CA 94305',
    website: 'https://stanford.edu/scholarships'
  },
  
  tags: ['STEM', 'Full Tuition', 'International', 'Research', 'USA', 'PhD', 'Masters'],
  
  additionalInfo: [
    'Scholarship renewable annually based on academic performance',
    'Opportunity for summer research internships',
    'Participation in annual scholarship symposium required',
    'Mentoring of incoming scholars expected in subsequent years'
  ]
}

export default function ScholarshipDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved' : 'Added to saved')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleApply = () => {
    router.push(`/scholarships/apply/${params.id}`)
  }

  const daysUntilDeadline = Math.ceil(
    (new Date(scholarshipData.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Award },
    { id: 'requirements', label: 'Requirements', icon: Target },
    { id: 'benefits', label: 'Benefits', icon: DollarSign },
    { id: 'process', label: 'Process', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/scholarships"
            className="inline-flex items-center gap-2 text-amber-200 hover:text-white mb-6 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Scholarships
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-2">
                  <Award size={16} className="fill-white" />
                  <span className="font-bold">Featured</span>
                </div>
                <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  <span className="font-bold">{scholarshipData.tags[0]}</span>
                </div>
                {daysUntilDeadline <= 30 && (
                  <div className="px-4 py-2 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center gap-2">
                    <Clock size={16} />
                    <span className="font-bold">{daysUntilDeadline} days left</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {scholarshipData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-amber-200 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-2xl font-bold">{scholarshipData.providerLogo}</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">{scholarshipData.provider}</div>
                    <div className="text-amber-100">Provider</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign size={24} />
                  <div>
                    <div className="text-2xl font-bold">{scholarshipData.amount}</div>
                    <div className="text-amber-100">Total Award</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={24} />
                  <div>
                    <div className="text-xl font-bold">
                      {new Date(scholarshipData.deadline).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                    <div className="text-amber-100">Deadline</div>
                  </div>
                </div>
              </div>

              <p className="text-xl text-amber-100 max-w-3xl mb-8">
                {scholarshipData.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleApply}
                  className="px-8 py-3 bg-white text-amber-700 rounded-xl hover:bg-amber-50 font-bold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold text-lg transition-colors flex items-center gap-2"
                >
                  <Bookmark className={isSaved ? 'fill-white' : ''} size={20} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold text-lg transition-colors flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Share
                </button>
                <button className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold text-lg transition-colors flex items-center gap-2">
                  <Download size={20} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-8 py-4 whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon size={22} />
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Scholarship</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {scholarshipData.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Eligibility Criteria</h4>
                    <p className="text-gray-700 mb-6">{scholarshipData.eligibility}</p>
                    
                    <div className="bg-amber-50 rounded-xl p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <AlertCircle className="text-amber-600 mt-1" size={24} />
                        <div>
                          <h5 className="font-bold text-gray-900">Important Notes</h5>
                          <ul className="mt-2 space-y-2">
                            {scholarshipData.additionalInfo.map((info, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className="text-amber-600 mr-2">•</span>
                                <span className="text-gray-700">{info}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Application Timeline</h4>
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-amber-200"></div>
                      {scholarshipData.timeline.map((item, idx) => (
                        <div key={idx} className="flex items-center mb-8 last:mb-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold z-10 relative ${
                            idx === 1 ? 'bg-red-500' : 'bg-amber-500'
                          }`}>
                            {idx + 1}
                          </div>
                          <div className="ml-6 flex-1">
                            <div className="font-bold text-gray-900">{item.event}</div>
                            <div className="text-gray-600">
                              {new Date(item.date).toLocaleDateString('en-US', { 
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements Tab */}
              {activeTab === 'requirements' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Application Requirements</h3>
                  
                  <div className="space-y-6">
                    {scholarshipData.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                        <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={24} />
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Requirement {idx + 1}</h4>
                          <p className="text-gray-700">{req}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Document Guidelines</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-white rounded-lg">
                        <div className="font-semibold text-gray-900 mb-2">Format Requirements</div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• PDF format only</li>
                          <li>• Maximum 10MB per file</li>
                          <li>• English translations required</li>
                          <li>• Clear scanned copies</li>
                        </ul>
                      </div>
                      <div className="p-4 bg-white rounded-lg">
                        <div className="font-semibold text-gray-900 mb-2">Submission Deadline</div>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• All documents by {scholarshipData.deadline}</li>
                          <li>• Late submissions not accepted</li>
                          <li>• Verify documents before upload</li>
                          <li>• Keep backup copies</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Tab */}
              {activeTab === 'benefits' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Scholarship Benefits</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {scholarshipData.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white">
                            <Award size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">Benefit {idx + 1}</h4>
                            <div className="text-amber-600 font-semibold">Included</div>
                          </div>
                        </div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">{scholarshipData.amount}</div>
                      <div className="text-gray-700">Total Financial Package</div>
                      <div className="mt-4 text-sm text-gray-600">
                        *Additional research grants may be available based on project merit
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Process Tab */}
              {activeTab === 'process' && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Selection Process</h3>
                  
                  <div className="space-y-6">
                    {scholarshipData.selectionProcess.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-6 p-6 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-amber-700">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 mb-2">Stage {idx + 1}</h4>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Statistics */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Selection Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {scholarshipData.statistics.applicationsLastYear.toLocaleString()}
                        </div>
                        <div className="text-gray-600">Applications Last Year</div>
                      </div>
                      <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {scholarshipData.statistics.awardsGiven}
                        </div>
                        <div className="text-gray-600">Awards Given</div>
                      </div>
                      <div className="text-center p-6 bg-white border border-gray-200 rounded-xl">
                        <div className="text-3xl font-bold text-gray-900 mb-2">
                          {scholarshipData.statistics.successRate}
                        </div>
                        <div className="text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Apply Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={handleApply}
                  className="px-12 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 font-bold text-lg transition-all hover:scale-105 shadow-lg"
                >
                  Start Your Application
                </button>
                <p className="text-gray-600 mt-4">
                  Application deadline: {new Date(scholarshipData.deadline).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Deadline</span>
                  <span className="font-bold text-gray-900">
                    {new Date(scholarshipData.deadline).toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-bold text-amber-600">{scholarshipData.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-bold text-gray-900">2-4 years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Study Level</span>
                  <span className="font-bold text-gray-900">Masters/PhD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-bold text-gray-900">USA</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {scholarshipData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm hover:bg-amber-200 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Contact Person</div>
                  <div className="font-bold text-gray-900">{scholarshipData.contact.name}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <a
                    href={`mailto:${scholarshipData.contact.email}`}
                    className="text-gray-700 hover:text-amber-600"
                  >
                    {scholarshipData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <a
                    href={`tel:${scholarshipData.contact.phone}`}
                    className="text-gray-700 hover:text-amber-600"
                  >
                    {scholarshipData.contact.phone}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-gray-500 mt-1" />
                  <div className="text-gray-700">{scholarshipData.contact.address}</div>
                </div>
                <a
                  href={scholarshipData.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
                >
                  <ExternalLink size={18} />
                  Official Website
                </a>
              </div>
            </div>

            {/* Similar Scholarships */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Looking for More?</h3>
              <p className="text-amber-100 mb-4">
                Browse similar scholarships in your field
              </p>
              <Link
                href="/scholarships"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-amber-700 rounded-lg font-semibold hover:bg-amber-50"
              >
                Explore More Scholarships
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}