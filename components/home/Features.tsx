'use client'

import { Search, Users, Globe, Award, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Smart University Search',
    description: 'Find your perfect match with our AI-powered search that considers your preferences, budget, and academic profile.',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Access 500+ university partners across 50+ countries with our established partnerships.',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Award,
    title: 'Scholarship Hub',
    description: 'Discover and apply for thousands of scholarship opportunities updated daily from institutions worldwide.',
    color: 'from-amber-500 to-orange-400',
  },
  {
    icon: Users,
    title: 'Expert Guidance',
    description: 'Get personalized advice from our team of experienced education consultants and alumni mentors.',
    color: 'from-emerald-500 to-green-400',
  },
  {
    icon: Shield,
    title: 'Application Support',
    description: 'End-to-end support from document preparation to visa application and pre-departure briefings.',
    color: 'from-red-500 to-rose-400',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Average application processing time reduced by 40% compared to traditional methods.',
    color: 'from-violet-500 to-purple-400',
  },
]

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-4">
            Why Choose Scovers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for Your
            <span className="text-primary block">Study Abroad Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive support at every step of your international education journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />
                </div>
                
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-primary font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Learn more</span>
                    <svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </div>
                </div>
                
                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/20 transition-all duration-500" />
              </div>
            )
          })}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center p-1 bg-gradient-to-r from-primary to-blue-400 rounded-full">
            <div className="px-8 py-4 bg-white rounded-full">
              <span className="text-gray-900 font-semibold">
                🚀 95% student satisfaction rate | ⚡ 24/7 support available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}