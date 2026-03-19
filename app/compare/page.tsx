'use client'

import { useState } from 'react'
import { 
  Search, Filter, X, CheckCircle, AlertCircle, BarChart3, 
  Download, Share2, Plus, Trash2, ChevronDown, Star,
  DollarSign, Calendar, Users, GraduationCap, Target
} from 'lucide-react'
import CompareTable from '@/components/compare/CompareTable'

// Sample courses for comparison
const sampleCourses = [
  {
    id: 'cs-stanford',
    name: 'Computer Science',
    university: 'Stanford University',
    location: 'Stanford, CA, USA',
    ranking: 3,
    tuition: '$56,169',
    duration: '4 years',
    level: 'Undergraduate',
    deadline: '2024-12-15',
    acceptanceRate: '4%',
    scholarships: 45,
    gpa: 3.9,
    languageTest: 'TOEFL 100+',
    employmentRate: '98%',
    avgSalary: '$125,000',
    features: ['Research Focus', 'Silicon Valley', 'Entrepreneurship']
  },
  {
    id: 'cs-mit',
    name: 'Computer Science',
    university: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA, USA',
    ranking: 1,
    tuition: '$53,790',
    duration: '4 years',
    level: 'Undergraduate',
    deadline: '2025-01-01',
    acceptanceRate: '7%',
    scholarships: 42,
    gpa: 4.0,
    languageTest: 'TOEFL 100+',
    employmentRate: '97%',
    avgSalary: '$130,000',
    features: ['Tech Innovation', 'Research Labs', 'Industry Partnerships']
  },
  {
    id: 'cs-cambridge',
    name: 'Computer Science',
    university: 'University of Cambridge',
    location: 'Cambridge, UK',
    ranking: 2,
    tuition: '£33,825',
    duration: '3 years',
    level: 'Undergraduate',
    deadline: '2024-10-15',
    acceptanceRate: '21%',
    scholarships: 52,
    gpa: 3.8,
    languageTest: 'IELTS 7.5+',
    employmentRate: '96%',
    avgSalary: '$110,000',
    features: ['Theoretical Focus', 'Research Papers', 'Academic Excellence']
  },
  {
    id: 'cs-toronto',
    name: 'Computer Science',
    university: 'University of Toronto',
    location: 'Toronto, Canada',
    ranking: 18,
    tuition: 'CAD 60,000',
    duration: '4 years',
    level: 'Undergraduate',
    deadline: '2025-01-15',
    acceptanceRate: '43%',
    scholarships: 67,
    gpa: 3.5,
    languageTest: 'TOEFL 90+',
    employmentRate: '95%',
    avgSalary: '$95,000',
    features: ['Co-op Program', 'Diverse Community', 'Industry Connections']
  }
]

const comparisonFields = [
  {
    category: 'Basic Information',
    fields: [
      { id: 'university', label: 'University', icon: GraduationCap },
      { id: 'location', label: 'Location', icon: Target },
      { id: 'ranking', label: 'World Ranking', icon: Star },
      { id: 'level', label: 'Study Level', icon: Users }
    ]
  },
  {
    category: 'Program Details',
    fields: [
      { id: 'duration', label: 'Duration', icon: Calendar },
      { id: 'tuition', label: 'Tuition Fees', icon: DollarSign },
      { id: 'deadline', label: 'Application Deadline', icon: Calendar },
      { id: 'acceptanceRate', label: 'Acceptance Rate', icon: BarChart3 }
    ]
  },
  {
    category: 'Admission Requirements',
    fields: [
      { id: 'gpa', label: 'Minimum GPA', icon: Star },
      { id: 'languageTest', label: 'Language Test', icon: GraduationCap },
      { id: 'scholarships', label: 'Scholarships', icon: DollarSign }
    ]
  },
  {
    category: 'Career Outcomes',
    fields: [
      { id: 'employmentRate', label: 'Employment Rate', icon: BarChart3 },
      { id: 'avgSalary', label: 'Average Salary', icon: DollarSign }
    ]
  }
]

export default function ComparePage() {
  const [selectedCourses, setSelectedCourses] = useState(sampleCourses.slice(0, 3))
  const [showAddCourse, setShowAddCourse] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Basic Information'])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const addCourse = (course: any) => {
    if (selectedCourses.length >= 4) {
      alert('Maximum 4 courses can be compared at once')
      return
    }
    if (!selectedCourses.find(c => c.id === course.id)) {
      setSelectedCourses([...selectedCourses, course])
    }
    setShowAddCourse(false)
  }

  const removeCourse = (courseId: string) => {
    setSelectedCourses(selectedCourses.filter(course => course.id !== courseId))
  }

  const clearComparison = () => {
    setSelectedCourses([])
  }

  const exportComparison = () => {
    // In production, this would generate a PDF or CSV
    alert('Exporting comparison data...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Compare Programs
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Side-by-side comparison of your favorite programs. Make informed decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative">
        {/* Comparison Control Bar */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 sticky top-4 z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Selected Programs ({selectedCourses.length}/4)
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg"
                  >
                    <span className="font-medium">{course.university}</span>
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="text-purple-500 hover:text-purple-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {selectedCourses.length < 4 && (
                  <button
                    onClick={() => setShowAddCourse(!showAddCourse)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <Plus size={18} />
                    Add Program
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={clearComparison}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={exportComparison}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Export
              </button>
            </div>
          </div>

          {/* Add Course Modal */}
          {showAddCourse && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search programs to compare..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                {sampleCourses
                  .filter(course => 
                    !selectedCourses.find(c => c.id === course.id) &&
                    (course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                     course.university.toLowerCase().includes(searchTerm.toLowerCase()))
                  )
                  .map((course) => (
                    <button
                      key={course.id}
                      onClick={() => addCourse(course)}
                      className="text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-600">{course.university}</div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {selectedCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <BarChart3 className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No programs selected</h3>
            <p className="text-gray-600 mb-6">Add programs to start comparing</p>
            <button
              onClick={() => setShowAddCourse(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus size={20} />
              Add First Program
            </button>
          </div>
        ) : (
          <>
            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <CompareTable 
                courses={selectedCourses} 
                fields={comparisonFields}
                expandedCategories={expandedCategories}
                onToggleCategory={toggleCategory}
              />
            </div>

            {/* Insights & Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Key Insights */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="text-amber-500" />
                  Key Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-1">Most Affordable</div>
                    <div className="text-gray-700">
                      {selectedCourses.reduce((prev, current) => 
                        parseFloat(prev.tuition.replace(/[^0-9.]/g, '')) < parseFloat(current.tuition.replace(/[^0-9.]/g, '')) ? prev : current
                      ).university}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-900 mb-1">Highest Employment Rate</div>
                    <div className="text-gray-700">
                      {selectedCourses.reduce((prev, current) => 
                        parseFloat(prev.employmentRate) > parseFloat(current.employmentRate) ? prev : current
                      ).university} ({selectedCourses.reduce((prev, current) => 
                        parseFloat(prev.employmentRate) > parseFloat(current.employmentRate) ? prev : current
                      ).employmentRate})
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-purple-900 mb-1">Most Scholarships</div>
                    <div className="text-gray-700">
                      {selectedCourses.reduce((prev, current) => 
                        prev.scholarships > current.scholarships ? prev : current
                      ).university} ({selectedCourses.reduce((prev, current) => 
                        prev.scholarships > current.scholarships ? prev : current
                      ).scholarships} available)
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {selectedCourses
                    .sort((a, b) => parseFloat(b.employmentRate) - parseFloat(a.employmentRate))
                    .slice(0, 2)
                    .map((course, idx) => (
                      <div key={course.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold">{course.university}</div>
                          <div className="text-sm bg-white/20 px-2 py-1 rounded">
                            #{idx + 1} Recommended
                          </div>
                        </div>
                        <div className="text-sm text-purple-100">
                          Strong employment rate ({course.employmentRate}) with ${course.avgSalary} average salary
                        </div>
                      </div>
                    ))}
                  <button className="w-full py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                    Book Consultation for Guidance
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}