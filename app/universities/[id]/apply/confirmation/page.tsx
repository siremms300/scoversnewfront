'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  CheckCircle, Download, Printer, Share2, Mail, FileText,
  Calendar, Clock, DollarSign, Building, MapPin, User,
  ChevronRight, ArrowLeft, Copy, ExternalLink, QrCode,
  Shield, Award, GraduationCap, BookOpen, Target, Globe
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock application data
const applicationData = {
  id: 'APP-2024-001234',
  status: 'submitted',
  submittedAt: '2024-01-29T14:30:00Z',
  program: {
    id: 'cs-bs',
    name: 'Computer Science (BS)',
    department: 'School of Engineering',
    intake: 'Fall 2024',
    deadline: '2024-12-15',
    tuition: '$56,169/year'
  },
  applicant: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    studentId: 'S12345678'
  },
  timeline: [
    { date: '2024-01-29', status: 'Application Submitted', description: 'Application received and under review' },
    { date: '2024-02-05', status: 'Initial Review', description: 'Documents being verified' },
    { date: '2024-02-12', status: 'Department Review', description: 'Faculty committee review' },
    { date: '2024-02-26', status: 'Decision Made', description: 'Admission decision ready' },
    { date: '2024-03-01', status: 'Notification Sent', description: 'Decision emailed to applicant' }
  ],
  nextSteps: [
    { title: 'Track Your Application', description: 'Check status updates regularly' },
    { title: 'Prepare for Interview', description: 'If required for your program' },
    { title: 'Upload Additional Documents', description: 'If requested by admissions' },
    { title: 'Financial Aid Application', description: 'Submit by March 15, 2024' }
  ]
}

export default function ApplicationConfirmationPage() {
  const params = useParams()
  const router = useRouter()
  const [application, setApplication] = useState(applicationData)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  // In a real app, you would fetch the application data based on params
  useEffect(() => {
    // Simulate loading application data
    const timer = setTimeout(() => {
      setApplication(applicationData)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleCopyApplicationId = () => {
    navigator.clipboard.writeText(application.id)
    setCopied(true)
    toast.success('Application ID copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadReceipt = () => {
    setLoading(true)
    toast.success('Downloading receipt...')
    // Simulate download
    setTimeout(() => {
      setLoading(false)
      toast.success('Receipt downloaded successfully!')
    }, 1500)
  }

  const handlePrint = () => {
    window.print()
    toast.success('Printing...')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Application Confirmation - ${application.program.name}`,
        text: `I've applied to ${application.program.name} at Stanford University!`,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch(() => toast.error('Failed to share'))
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const calculateEstimatedDecisionDate = () => {
    const submitted = new Date(application.submittedAt)
    submitted.setDate(submitted.getDate() + 45) // 45 days average processing
    return submitted.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 via-emerald-800 to-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div>
              <Link
                href={`/universities/${params.id}`}
                className="inline-flex items-center gap-2 text-green-200 hover:text-white mb-6 group"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to University
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={32} className="text-green-300" />
                <h1 className="text-3xl font-bold">Application Submitted Successfully!</h1>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Thank You for Applying
              </h2>
              
              <p className="text-xl text-green-100">
                Your application has been received and is now under review
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">#{application.id}</div>
                <div className="text-green-200">Application ID</div>
                <div className="text-sm text-green-300 mt-2">Keep this for reference</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Confirmation Details */}
          <div className="lg:col-span-2">
            {/* Success Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 mb-8 border border-green-200">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={28} className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Application Confirmed</h3>
                      <p className="text-gray-600">Your application is now in the review process</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={18} />
                      <span>Submitted on {formatDate(application.submittedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock size={18} />
                      <span>Estimated decision date: {calculateEstimatedDecisionDate()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleCopyApplicationId}
                    className="px-4 py-2 bg-white border border-green-300 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2"
                  >
                    <Copy size={18} />
                    {copied ? 'Copied!' : 'Copy ID'}
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Application Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Program Information */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Building className="text-green-600" />
                      Program Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Program</div>
                        <div className="font-bold text-gray-900 text-lg">{application.program.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Department</div>
                        <div className="font-medium text-gray-900">{application.program.department}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Intake</div>
                          <div className="font-medium text-gray-900">{application.program.intake}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Deadline</div>
                          <div className="font-medium text-gray-900">{application.program.deadline}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Applicant Information */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="text-green-600" />
                      Applicant Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-gray-600">Name</div>
                        <div className="font-medium text-gray-900">{application.applicant.name}</div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Email</div>
                          <div className="font-medium text-gray-900">{application.applicant.email}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Phone</div>
                          <div className="font-medium text-gray-900">{application.applicant.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="text-green-600" />
                    Application Timeline
                  </h4>
                  <div className="space-y-6">
                    {application.timeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            index === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {index === 0 ? <CheckCircle size={16} /> : index + 1}
                          </div>
                          {index < application.timeline.length - 1 && (
                            <div className="w-0.5 h-12 bg-gray-200 mt-1"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="font-medium text-gray-900">{item.status}</div>
                          <div className="text-sm text-gray-600">{item.description}</div>
                          <div className="text-xs text-gray-500 mt-1">{item.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ChevronRight className="text-blue-600" />
                Next Steps
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {application.nextSteps.map((step, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-white/50 rounded-lg">
                <div className="flex items-center gap-3 text-gray-700">
                  <Shield size={20} className="text-blue-600" />
                  <span className="font-medium">Your application is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Resources */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleDownloadReceipt}
                  disabled={loading}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download size={20} />
                      Download Receipt
                    </>
                  )}
                </button>
                
                <button
                  onClick={handlePrint}
                  className="w-full px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                >
                  <Printer size={20} />
                  Print Confirmation
                </button>
                
                <Link
                  href={`/dashboard/applications/${application.id}`}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 font-medium flex items-center justify-center gap-2"
                >
                  <ExternalLink size={20} />
                  Track Application
                </Link>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="text-yellow-600" />
                Important Information
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">Application fee is non-refundable</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">Check your email regularly for updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">Keep your application ID for reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <span className="text-sm text-gray-700">Decision will be sent via email</span>
                </li>
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Mail className="text-green-600" />
                Contact Support
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Admissions Office</div>
                  <div className="font-medium text-gray-900">admissions@stanford.edu</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Phone</div>
                  <div className="font-medium text-gray-900">+1 (650) 723-2300</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Hours</div>
                  <div className="font-medium text-gray-900">Mon-Fri, 9AM-5PM PST</div>
                </div>
              </div>
            </div>

            {/* Application QR Code */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <QrCode className="text-green-600" />
                Quick Access QR Code
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode size={100} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600">Scan to track application</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Scan this code to quickly access your application status
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href={`/universities/${params.id}/financial-aid`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="text-green-600" size={24} />
                </div>
                <h4 className="font-bold text-gray-900">Financial Aid</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Apply for scholarships, grants, and student loans
              </p>
            </Link>
            
            <Link
              href={`/universities/${params.id}/campus-life`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="text-blue-600" size={24} />
                </div>
                <h4 className="font-bold text-gray-900">Campus Life</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Explore housing, clubs, and student organizations
              </p>
            </Link>
            
            <Link
              href={`/universities/${params.id}/international-students`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="text-purple-600" size={24} />
                </div>
                <h4 className="font-bold text-gray-900">International Students</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Visa information and international student support
              </p>
            </Link>
            
            <Link
              href={`/universities/${params.id}/faq`}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="text-amber-600" size={24} />
                </div>
                <h4 className="font-bold text-gray-900">FAQs</h4>
              </div>
              <p className="text-gray-600 text-sm">
                Common questions about admissions and campus life
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 border-t border-gray-200">
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Need immediate assistance? Contact our admissions team at{' '}
            <a href="mailto:admissions@stanford.edu" className="text-green-600 hover:text-green-700 font-medium">
              admissions@stanford.edu
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
            <Link href={`/universities/${params.id}/privacy`} className="hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link href={`/universities/${params.id}/terms`} className="hover:text-gray-700">
              Terms of Service
            </Link>
            <Link href={`/universities/${params.id}/disclaimer`} className="hover:text-gray-700">
              Disclaimer
            </Link>
            <Link href={`/universities/${params.id}/accessibility`} className="hover:text-gray-700">
              Accessibility
            </Link>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Stanford University Admissions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}