// app/scholarships/apply/confirmation/page.tsx
'use client'

import { CheckCircle, Download, Share2, Mail, Calendar, Award } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ScholarshipConfirmationPage() {
  const [applicationId] = useState(`SCH-${Date.now().toString().slice(-8)}`)

  const handleDownload = () => {
    toast.success('Receipt downloaded successfully!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 via-emerald-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <CheckCircle size={48} className="text-green-300" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Application Submitted!
            </h1>
            
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-12">
              Your scholarship application has been received successfully. We'll notify you once it's been reviewed.
            </p>
            
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="text-2xl font-bold text-white mb-2">#{applicationId}</div>
              <div className="text-green-200">Application ID</div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-white text-green-700 rounded-xl hover:bg-green-50 font-semibold flex items-center gap-2"
              >
                <Download size={20} />
                Download Receipt
              </button>
              <button
                onClick={handleShare}
                className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-semibold flex items-center gap-2"
              >
                <Share2 size={20} />
                Share Status
              </button>
              <Link
                href="/dashboard/applications"
                className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-semibold"
              >
                Track Application
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl font-bold text-green-600">1</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Application Review</h3>
                    <p className="text-gray-700">
                      Our committee will review your application within 2-3 weeks. We'll verify all documents and check eligibility.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl font-bold text-green-600">2</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Interview Invitation</h3>
                    <p className="text-gray-700">
                      Shortlisted candidates will be invited for an interview. You'll receive an email with scheduling details.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <div className="text-2xl font-bold text-green-600">3</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Final Decision</h3>
                    <p className="text-gray-700">
                      Final decisions will be announced within 8-12 weeks from the application deadline. All applicants will be notified.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                  <Mail className="text-blue-600" size={24} />
                  <div>
                    <div className="font-bold text-gray-900">Email Support</div>
                    <div className="text-gray-600">scholarships@support.edu</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl">
                  <Calendar className="text-blue-600" size={24} />
                  <div>
                    <div className="font-bold text-gray-900">Office Hours</div>
                    <div className="text-gray-600">Mon-Fri, 9AM-6PM EST</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Application Timeline</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Application Submitted</span>
                  <span className="font-bold text-green-600">Today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Review Period</span>
                  <span className="font-bold text-gray-900">2-3 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interview Period</span>
                  <span className="font-bold text-gray-900">April 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Final Decision</span>
                  <span className="font-bold text-gray-900">May 2024</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-amber-600" size={24} />
                <h3 className="font-bold text-gray-900">Next Steps</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span className="text-gray-700">Check your email regularly for updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span className="text-gray-700">Prepare for potential interview questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span className="text-gray-700">Explore other scholarship opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span className="text-gray-700">Update your profile with new achievements</span>
                </li>
              </ul>
            </div>
            
            <Link
              href="/scholarships"
              className="block w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 text-center font-bold"
            >
              Browse More Scholarships
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}