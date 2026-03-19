'use client'

import { MapPin, Star, Users, DollarSign, Award, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface UniversityCardProps {
  university: {
    id: number
    name: string
    location: string
    ranking: number
    tuition: string
    acceptanceRate: string
    programs: string[]
    image: string
    featured: boolean
    scholarships: number
  }
  index: number
}

export default function UniversityCard({ university, index }: UniversityCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative group animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
        {/* Featured Badge */}
        {university.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full flex items-center gap-1">
              <Star size={12} className="fill-white" />
              Featured
            </span>
          </div>
        )}

        {/* University Image */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
            {university.name.split(' ').map(word => word[0]).join('')}
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
              <Star size={14} className="fill-amber-400" />
              <span className="text-sm font-bold">#{university.ranking}</span>
            </div>
          </div>
        </div>

        {/* University Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {university.name}
              </h3>
              <div className="flex items-center text-gray-600">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{university.location}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">Tuition</span>
              </div>
              <div className="font-bold text-gray-900">{university.tuition}/year</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">Acceptance</span>
              </div>
              <div className="font-bold text-gray-900">{university.acceptanceRate}</div>
            </div>
          </div>

          {/* Programs */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-primary" />
              <span className="text-sm font-semibold text-gray-700">Popular Programs</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {university.programs.slice(0, 3).map((program, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                >
                  {program}
                </span>
              ))}
              {university.programs.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  +{university.programs.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Scholarships Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                {university.scholarships} scholarships
              </span>
            </div>
            {/* <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors group/btn">
              <span className="font-semibold">View Details</span>
              <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" size={20} />
            </button> */}
            <Link
              href={`/universities/${university.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors group/btn"
            >
              <span className="font-semibold">View Details</span>
              <ChevronRight className="group-hover/btn:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>
        </div>

        {/* Hover Effect Line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-400 transform origin-left transition-transform duration-500 ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`} />
      </div>
    </div>
  )
}