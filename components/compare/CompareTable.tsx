'use client'

import { ChevronDown, ChevronUp, GraduationCap, Target, Star, Users, Calendar, DollarSign, BarChart3 } from 'lucide-react'

// Define types
interface Course {
  id: string
  name: string
  university: string
  location: string
  ranking: number
  tuition: string
  duration: string
  level: string
  deadline: string
  acceptanceRate: string
  scholarships: number
  gpa: number
  languageTest: string
  employmentRate: string
  avgSalary: string
  features: string[]
}

interface Field {
  id: string
  label: string
  icon: any
}

interface FieldCategory {
  category: string
  fields: Field[]
}

interface CompareTableProps {
  courses: Course[]
  fields: FieldCategory[]
  expandedCategories: string[]
  onToggleCategory: (category: string) => void
}

export default function CompareTable({ 
  courses, 
  fields, 
  expandedCategories, 
  onToggleCategory 
}: CompareTableProps) {
  
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      'GraduationCap': GraduationCap,
      'Target': Target,
      'Star': Star,
      'Users': Users,
      'Calendar': Calendar,
      'DollarSign': DollarSign,
      'BarChart3': BarChart3
    }
    return icons[iconName] || Star
  }

  const renderCellValue = (course: Course, fieldId: string) => {
    switch (fieldId) {
      case 'ranking':
        return `#${course.ranking}`
      case 'scholarships':
        return `${course.scholarships}+`
      case 'gpa':
        return course.gpa.toFixed(1)
      case 'employmentRate':
      case 'acceptanceRate':
        return course[fieldId as keyof Course]
      case 'tuition':
      case 'avgSalary':
        return course[fieldId as keyof Course]
      case 'languageTest':
        return course.languageTest
      case 'deadline':
        return new Date(course.deadline).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      case 'university':
        return course.university
      case 'location':
        return course.location
      case 'level':
        return course.level
      case 'duration':
        return course.duration
      default:
        return course[fieldId as keyof Course] || '—'
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px]">
        {/* Header */}
        <thead>
          <tr className="bg-gradient-to-r from-purple-600 to-violet-600">
            <th className="p-4 text-left text-white font-semibold">
              Comparison Criteria
            </th>
            {courses.map((course) => (
              <th key={course.id} className="p-4 text-left text-white font-semibold min-w-[200px]">
                <div className="flex flex-col">
                  <span className="text-lg">{course.university}</span>
                  <span className="text-sm text-purple-200 font-normal">{course.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {fields.map((category) => {
            const isExpanded = expandedCategories.includes(category.category)
            
            return (
              <>
                {/* Category Header */}
                <tr 
                  key={category.category}
                  className="bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onToggleCategory(category.category)}
                >
                  <td colSpan={courses.length + 1} className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-gray-900">
                        {category.category}
                      </div>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>
                  </td>
                </tr>

                {/* Category Fields */}
                {isExpanded && category.fields.map((field) => {
                  const FieldIcon = field.icon
                  return (
                    <tr key={field.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">
                        <div className="flex items-center gap-2">
                          <FieldIcon size={16} className="text-purple-600" />
                          {field.label}
                        </div>
                      </td>
                      {courses.map((course) => (
                        <td key={`${course.id}-${field.id}`} className="p-4">
                          <div className="text-gray-900">
                            {renderCellValue(course, field.id)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </>
            )
          })}

          {/* Features Row */}
          <tr className="bg-gray-50">
            <td colSpan={courses.length + 1} className="p-3 font-semibold text-gray-900">
              Key Features
            </td>
          </tr>
          <tr className="border-b border-gray-100">
            <td className="p-4 font-medium text-gray-700">Highlights</td>
            {courses.map((course) => (
              <td key={`${course.id}-features`} className="p-4">
                <div className="space-y-2">
                  {course.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs mr-1 mb-1"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      {/* Summary Row */}
      {courses.length > 0 && (
        <div className="p-6 border-t border-gray-200">
          <h4 className="font-bold text-gray-900 mb-4">Quick Comparison Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 mb-1">Best Employment Rate</div>
              <div className="font-bold text-gray-900">
                {courses.reduce((best, current) => 
                  parseFloat(current.employmentRate) > parseFloat(best.employmentRate) ? current : best
                ).university}
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">Most Affordable</div>
              <div className="font-bold text-gray-900">
                {courses.reduce((cheapest, current) => 
                  parseFloat(current.tuition.replace(/[^0-9.]/g, '')) < parseFloat(cheapest.tuition.replace(/[^0-9.]/g, '')) ? current : cheapest
                ).university}
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-sm text-purple-600 mb-1">Most Scholarships</div>
              <div className="font-bold text-gray-900">
                {courses.reduce((most, current) => 
                  current.scholarships > most.scholarships ? current : most
                ).university}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}