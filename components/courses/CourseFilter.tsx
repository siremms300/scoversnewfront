'use client'

import { X, Filter as FilterIcon, GraduationCap, Globe, DollarSign, Award, Calendar, Clock } from 'lucide-react'

interface CourseFilterPanelProps {
  onFilterChange: (filters: any) => void
  activeFilters: any
}

export default function CourseFilterPanel({ onFilterChange, activeFilters }: CourseFilterPanelProps) {
  const levels = ['Undergraduate', 'Graduate', 'PhD', 'Diploma']
  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Switzerland']
  const durations = ['1 year', '2 years', '3 years', '4 years', '5+ years']
  const tuitionRanges = ['Under $20k', '$20k - $40k', '$40k - $60k', 'Over $60k']
  const intakes = ['Fall', 'Spring', 'Summer', 'Winter', 'Rolling']

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value }
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      level: '',
      country: '',
      duration: '',
      tuitionRange: '',
      scholarship: false,
      intake: ''
    }
    onFilterChange(clearedFilters)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FilterIcon className="text-emerald-600" size={20} />
          <h3 className="text-lg font-bold text-gray-900">Course Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
        >
          Clear all
        </button>
      </div>

      {/* Level Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Study Level</h4>
        </div>
        <div className="space-y-2">
          {levels.map((level) => (
            <label key={level} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="level"
                checked={activeFilters.level === level}
                onChange={() => handleFilterChange('level', activeFilters.level === level ? '' : level)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                activeFilters.level === level 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-gray-300 group-hover:border-emerald-500'
              }`}>
                {activeFilters.level === level && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                activeFilters.level === level ? 'text-emerald-700 font-medium' : 'text-gray-700'
              }`}>
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Country Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Globe size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Country</h4>
        </div>
        <div className="space-y-2">
          {countries.map((country) => (
            <label key={country} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="country"
                checked={activeFilters.country === country}
                onChange={() => handleFilterChange('country', activeFilters.country === country ? '' : country)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                activeFilters.country === country 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-gray-300 group-hover:border-emerald-500'
              }`}>
                {activeFilters.country === country && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                activeFilters.country === country ? 'text-emerald-700 font-medium' : 'text-gray-700'
              }`}>
                {country}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Duration</h4>
        </div>
        <div className="space-y-2">
          {durations.map((duration) => (
            <label key={duration} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="duration"
                checked={activeFilters.duration === duration}
                onChange={() => handleFilterChange('duration', activeFilters.duration === duration ? '' : duration)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                activeFilters.duration === duration 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-gray-300 group-hover:border-emerald-500'
              }`}>
                {activeFilters.duration === duration && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                activeFilters.duration === duration ? 'text-emerald-700 font-medium' : 'text-gray-700'
              }`}>
                {duration}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Tuition Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Tuition Range</h4>
        </div>
        <div className="space-y-2">
          {tuitionRanges.map((range) => (
            <label key={range} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="tuitionRange"
                checked={activeFilters.tuitionRange === range}
                onChange={() => handleFilterChange('tuitionRange', activeFilters.tuitionRange === range ? '' : range)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                activeFilters.tuitionRange === range 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-gray-300 group-hover:border-emerald-500'
              }`}>
                {activeFilters.tuitionRange === range && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                activeFilters.tuitionRange === range ? 'text-emerald-700 font-medium' : 'text-gray-700'
              }`}>
                {range}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Intake Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Intake Period</h4>
        </div>
        <div className="space-y-2">
          {intakes.map((intake) => (
            <label key={intake} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="intake"
                checked={activeFilters.intake === intake}
                onChange={() => handleFilterChange('intake', activeFilters.intake === intake ? '' : intake)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                activeFilters.intake === intake 
                  ? 'border-emerald-600 bg-emerald-600' 
                  : 'border-gray-300 group-hover:border-emerald-500'
              }`}>
                {activeFilters.intake === intake && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                activeFilters.intake === intake ? 'text-emerald-700 font-medium' : 'text-gray-700'
              }`}>
                {intake}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Scholarship Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Award size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Scholarships</h4>
        </div>
        <label className="flex items-center cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              checked={activeFilters.scholarship}
              onChange={(e) => handleFilterChange('scholarship', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              activeFilters.scholarship ? 'bg-emerald-600' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                activeFilters.scholarship ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </div>
          </div>
          <span className="ml-3 text-gray-700">Scholarships available</span>
        </label>
      </div>

      {/* Active Filters */}
      {Object.values(activeFilters).some(filter => filter !== '' && filter !== false) && (
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {activeFilters.level && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Level: {activeFilters.level}
                <button
                  onClick={() => handleFilterChange('level', '')}
                  className="hover:text-emerald-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {activeFilters.country && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Country: {activeFilters.country}
                <button
                  onClick={() => handleFilterChange('country', '')}
                  className="hover:text-emerald-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {activeFilters.scholarship && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Scholarships Available
                <button
                  onClick={() => handleFilterChange('scholarship', false)}
                  className="hover:text-emerald-800"
                >
                  <X size={14} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}