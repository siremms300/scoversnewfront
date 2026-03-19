'use client'

import { useEffect, useState } from 'react'
import { Users, GraduationCap, Globe, Award, Clock, Star } from 'lucide-react'

const stats = [
  { icon: Users, value: 10000, label: 'Students Placed', suffix: '+', duration: 2000 },
  { icon: GraduationCap, value: 500, label: 'University Partners', suffix: '+', duration: 1500 },
  { icon: Globe, value: 50, label: 'Countries', suffix: '+', duration: 1000 },
  { icon: Award, value: 250, label: 'Scholarships Awarded', suffix: 'M+', isMoney: true, duration: 2500 },
  { icon: Clock, value: 40, label: 'Faster Processing', suffix: '%', duration: 1200 },
  { icon: Star, value: 95, label: 'Satisfaction Rate', suffix: '%', duration: 1800 },
]

export default function Stats() {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => 
        prev.map((val, idx) => {
          const target = stats[idx].value
          const increment = target / (stats[idx].duration / 30) // 30fps
          return val < target ? Math.min(val + increment, target) : target
        })
      )
    }, 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over a decade of transforming lives through education
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const displayValue = stat.isMoney 
              ? `$${Math.floor(animatedValues[index]).toLocaleString()}`
              : Math.floor(animatedValues[index]).toLocaleString()
            
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                
                <div className="relative bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <Icon size={28} />
                    </div>
                    <span className="text-sm font-semibold px-3 py-1 rounded-full bg-blue-50 text-primary">
                      {index === 3 ? 'Total Value' : 'Active'}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                      {displayValue}
                      <span className="text-primary">{stat.suffix}</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-1000"
                        style={{ width: `${(animatedValues[index] / stat.value) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 font-medium">
                    {stat.label}
                  </p>
                  
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
                        HOT
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">
                Ready to Start Your Journey?
              </h3>
              <p className="text-blue-100">
                Join thousands of successful students who transformed their lives
              </p>
            </div>
            <button className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-colors transform hover:scale-105 shadow-lg">
              Get Free Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}