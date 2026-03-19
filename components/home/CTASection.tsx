'use client'

import { useState } from 'react'
import { Send, Calendar, Download, ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubscribed(true)
    setEmail('')
    
    // Reset after 3 seconds
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white mb-6">
            <Sparkles size={16} />
            <span className="font-semibold">Limited Time Offer</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Your Journey
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 block">
              Today
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join 10,000+ students who achieved their dreams with Scovers. Your future begins now.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Consultation */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-white rounded-xl p-8 h-full">
              <div className="inline-flex p-3 rounded-lg bg-cyan-100 text-cyan-600 mb-6">
                <Calendar size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Free 1:1 Consultation
              </h3>
              <p className="text-gray-600 mb-6">
                Book a personalized session with our education experts to create your roadmap.
              </p>
              <Link
                href="/consultation"
                className="inline-flex items-center justify-between w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all group-hover:shadow-lg group-hover:-translate-y-1"
              >
                <span className="font-semibold">Book Now</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Download Guide */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-white rounded-xl p-8 h-full">
              <div className="inline-flex p-3 rounded-lg bg-purple-100 text-purple-600 mb-6">
                <Download size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Free Study Abroad Guide
              </h3>
              <p className="text-gray-600 mb-6">
                Get our comprehensive 50-page guide covering everything from applications to visas.
              </p>
              <button className="inline-flex items-center justify-between w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all group-hover:shadow-lg group-hover:-translate-y-1">
                <span className="font-semibold">Download PDF</span>
                <Download className="group-hover:animate-bounce" />
              </button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="group relative lg:col-span-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-white rounded-xl p-8 h-full">
              <div className="inline-flex p-3 rounded-lg bg-amber-100 text-amber-600 mb-6">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Stay Updated
              </h3>
              <p className="text-gray-600 mb-6">
                Get weekly scholarship alerts, webinar invites, and application tips.
              </p>
              
              {subscribed ? (
                <div className="px-6 py-4 bg-green-50 text-green-700 rounded-lg text-center animate-pulse">
                  🎉 Successfully subscribed! Check your email.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-semibold group-hover:shadow-lg"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
              
              <p className="text-xs text-gray-500 mt-4">
                Join 25,000+ subscribers. No spam, unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="text-left">
              <h4 className="text-2xl font-bold text-white mb-2">
                Ready to Transform Your Future?
              </h4>
              <p className="text-gray-300">
                Take the first step towards your dream education today
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/upi-registration"
                className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: '24/7 Support', value: 'Always Available' },
            { label: 'Success Rate', value: '95%' },
            { label: 'Avg. Processing Time', value: '7 Days' },
            { label: 'Scholarship Success', value: '85%' },
          ].map((badge, idx) => (
            <div key={idx} className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
              <div className="text-3xl font-bold text-white mb-1">{badge.value}</div>
              <div className="text-sm text-gray-300">{badge.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}