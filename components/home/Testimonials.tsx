'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Computer Science, Stanford University',
    content: 'Scovers made my dream of studying at Stanford a reality. Their guidance on scholarship applications was invaluable.',
    rating: 5,
    image: '/api/placeholder/100/100',
    country: 'USA',
  },
  {
    name: 'David Chen',
    role: 'MBA, University of Cambridge',
    content: 'The personalized support I received from my education consultant was exceptional. They were with me every step of the way.',
    rating: 5,
    image: '/api/placeholder/100/100',
    country: 'UK',
  },
  {
    name: 'Aisha Mohammed',
    role: 'Medicine, University of Toronto',
    content: 'Finding the right university and securing a scholarship seemed impossible until I found Scovers. Life-changing experience!',
    rating: 5,
    image: '/api/placeholder/100/100',
    country: 'Canada',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Engineering, ETH Zurich',
    content: 'The webinar series on European education systems helped me make an informed decision. Highly recommended!',
    rating: 5,
    image: '/api/placeholder/100/100',
    country: 'Switzerland',
  },
  {
    name: 'Priya Sharma',
    role: 'Business Analytics, University of Melbourne',
    content: 'From visa processing to accommodation assistance, Scovers provided comprehensive support throughout.',
    rating: 5,
    image: '/api/placeholder/100/100',
    country: 'Australia',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const next = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 font-semibold mb-4">
            <Star className="fill-amber-500" size={16} />
            <span>Rated 4.9/5 by 2,500+ Students</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories from
            <span className="text-primary block">Our Global Community</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their lives with Scovers Education
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 -left-6 text-primary/20">
            <Quote size={120} />
          </div>
          
          {/* Testimonial Card */}
          <div className={`relative bg-white rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-500 ${
            isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-400" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">
                    {testimonials[current].name.charAt(0)}
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[current].rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                <Quote className="text-primary/30 mb-4" size={32} />
                <p className="text-2xl text-gray-700 italic mb-8 leading-relaxed">
                  "{testimonials[current].content}"
                </p>
                
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">
                        {testimonials[current].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[current].role}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-primary rounded-full text-sm font-semibold">
                        {testimonials[current].country}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        Scholarship Awarded
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prev}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:-translate-x-1"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="text-gray-700" size={24} />
            </button>
            
            {/* Indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true)
                      setCurrent(idx)
                      setTimeout(() => setIsAnimating(false), 500)
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === current
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all hover:translate-x-1"
              aria-label="Next testimonial"
            >
              <ChevronRight className="text-gray-700" size={24} />
            </button>
          </div>
        </div>

        {/* Partner Universities */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Trusted by Top Universities Worldwide
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {['Stanford', 'MIT', 'Cambridge', 'Harvard', 'Oxford', 'ETH', 'Toronto', 'Melbourne'].map((uni) => (
              <div
                key={uni}
                className="text-2xl font-bold text-gray-400 hover:text-primary transition-colors duration-300 hover:scale-110"
              >
                {uni}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}