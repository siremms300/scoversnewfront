'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Globe, GraduationCap, Users } from 'lucide-react'
import Link from 'next/link'

export default function Hero() {
  const [currentStat, setCurrentStat] = useState(0)
  
  const stats = [
    { value: '10,000+', label: 'Students Placed', icon: Users },
    { value: '500+', label: 'University Partners', icon: GraduationCap },
    { value: '50+', label: 'Countries', icon: Globe },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transforming 
              <span className="text-primary block">Lives Through</span>
              <span className="text-primary">Education</span>
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 max-w-2xl">
              For over a decade, Scovers has been the trusted partner for students seeking 
              international education opportunities. We bridge dreams with reality through 
              personalized guidance and global university partnerships.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/universities"
                className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-secondary transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                Find Your University
                <ChevronRight size={20} />
              </Link>
              <Link
                href="/webinars"
                className="px-8 py-4 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
              >
                Join Webinar
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div
                    key={index}
                    className={`p-6 bg-white rounded-xl shadow-lg transition-all duration-500 ${
                      index === currentStat 
                        ? 'scale-105 border-2 border-primary' 
                        : 'scale-100'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Icon className="text-primary" size={24} />
                      <div>
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-1/2 lg:pl-12">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-400 rounded-3xl blur-xl opacity-30" />
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    University Search
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Desired Country
                      </label>
                      <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent">
                        <option>Select country</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                        <option>Australia</option>
                        <option>Germany</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Field of Study
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g., Computer Science"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Range
                      </label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Min"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                        <input 
                          type="number" 
                          placeholder="Max"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                    <button className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors">
                      Find Universities
                    </button>
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