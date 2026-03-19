'use client'

import { X, Filter as FilterIcon, Globe, DollarSign, GraduationCap, Award } from 'lucide-react'
import { useState } from 'react'

interface FilterPanelProps {
  onFilterChange: (filters: any) => void
  activeFilters: any
}

export default function FilterPanel({ onFilterChange, activeFilters }: FilterPanelProps) {
  const [filters, setFilters] = useState(activeFilters)

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Netherlands', 'Switzerland']
  const programs = ['Computer Science', 'Business', 'Engineering', 'Medicine', 'Law', 'Arts', 'Science', 'Architecture']
  const tuitionRanges = ['Under $20k', '$20k - $40k', '$40k - $60k', 'Over $60k']

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      country: '',
      program: '',
      tuition: '',
      scholarship: false
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FilterIcon className="text-primary" size={20} />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-secondary font-medium"
        >
          Clear all
        </button>
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
                checked={filters.country === country}
                onChange={() => handleFilterChange('country', filters.country === country ? '' : country)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                filters.country === country 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300 group-hover:border-primary'
              }`}>
                {filters.country === country && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                filters.country === country ? 'text-primary font-medium' : 'text-gray-700'
              }`}>
                {country}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Program Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={18} className="text-gray-600" />
          <h4 className="font-semibold text-gray-900">Program</h4>
        </div>
        <div className="space-y-2">
          {programs.map((program) => (
            <label key={program} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="program"
                checked={filters.program === program}
                onChange={() => handleFilterChange('program', filters.program === program ? '' : program)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                filters.program === program 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300 group-hover:border-primary'
              }`}>
                {filters.program === program && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                filters.program === program ? 'text-primary font-medium' : 'text-gray-700'
              }`}>
                {program}
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
                name="tuition"
                checked={filters.tuition === range}
                onChange={() => handleFilterChange('tuition', filters.tuition === range ? '' : range)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                filters.tuition === range 
                  ? 'border-primary bg-primary' 
                  : 'border-gray-300 group-hover:border-primary'
              }`}>
                {filters.tuition === range && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <span className={`${
                filters.tuition === range ? 'text-primary font-medium' : 'text-gray-700'
              }`}>
                {range}
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
              checked={filters.scholarship}
              onChange={(e) => handleFilterChange('scholarship', e.target.checked)}
              className="sr-only"
            />
            <div className={`w-10 h-6 rounded-full transition-colors ${
              filters.scholarship ? 'bg-primary' : 'bg-gray-300'
            }`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                filters.scholarship ? 'translate-x-5' : 'translate-x-1'
              }`} />
            </div>
          </div>
          <span className="ml-3 text-gray-700">Available scholarships only</span>
        </label>
      </div>

      {/* Active Filters */}
      {(filters.country || filters.program || filters.tuition || filters.scholarship) && (
        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.country && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Country: {filters.country}
                <button
                  onClick={() => handleFilterChange('country', '')}
                  className="hover:text-secondary"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.program && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Program: {filters.program}
                <button
                  onClick={() => handleFilterChange('program', '')}
                  className="hover:text-secondary"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.tuition && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Tuition: {filters.tuition}
                <button
                  onClick={() => handleFilterChange('tuition', '')}
                  className="hover:text-secondary"
                >
                  <X size={14} />
                </button>
              </span>
            )}
            {filters.scholarship && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                Scholarships Available
                <button
                  onClick={() => handleFilterChange('scholarship', false)}
                  className="hover:text-secondary"
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