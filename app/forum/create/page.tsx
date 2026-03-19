// app/forum/create/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BookOpen, MessageSquare, Users, Zap, FileText,
  Link as LinkIcon, Image as ImageIcon, Video,
  X, Tag, Globe, Lock, Eye, Sparkles, Award,
  DollarSign, Calendar, Clock, ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'

const postTypes = [
  { id: 'question', label: 'Ask a Question', icon: <MessageSquare size={18} />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 'discussion', label: 'Start Discussion', icon: <Users size={18} />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { id: 'article', label: 'Write Article', icon: <BookOpen size={18} />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'resource', label: 'Share Resource', icon: <Zap size={18} />, color: 'text-green-400', bg: 'bg-green-500/10' }
]

const tagSuggestions = [
  'Admissions', 'Scholarships', 'International Students', 'Career Advice',
  'Study Tips', 'Visa Help', 'University Reviews', 'Essay Writing',
  'STEM', 'MBA', 'Medical School', 'Law School', 'Undergraduate',
  'Graduate', 'PhD', 'Financial Aid', 'Housing', 'Part-time Jobs'
]

export default function CreatePostPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [postType, setPostType] = useState('question')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [] as string[],
    visibility: 'public',
    attachments: [] as string[],
    isAnonymous: false,
    notifyReplies: true,
    bounty: 0,
    deadline: ''
  })
  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleNextStep = () => {
    if (step === 1 && !formData.title.trim()) {
      toast.error('Please enter a title')
      return
    }
    if (step < 3) setStep(step + 1)
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleTagSuggestion = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Post created successfully!')
      router.push('/forum')
    } catch (error) {
      toast.error('Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  const characterCount = formData.content.length
  const isContentValid = characterCount >= 50 && characterCount <= 10000

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Create a Post
          </h1>
          <p className="text-gray-400">
            Share knowledge, ask questions, or start discussions with the EduExchange community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNumber
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-24 h-1 ${step > stepNumber ? 'bg-cyan-500' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
          <div className="text-sm text-gray-400">
            Step {step} of 3
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
          {/* Step 1: Post Type */}
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Choose Post Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      postType === type.id
                        ? `${type.bg} border-${type.id === 'question' ? 'cyan' : type.id === 'discussion' ? 'amber' : type.id === 'article' ? 'purple' : 'green'}-500`
                        : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${type.bg} ${type.color}`}>
                        {type.icon}
                      </div>
                      <span className={`font-bold ${postType === type.id ? type.color : 'text-white'}`}>
                        {type.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {type.id === 'question' && 'Get answers from the community and experts'}
                      {type.id === 'discussion' && 'Start conversations and exchange ideas'}
                      {type.id === 'article' && 'Share detailed insights and experiences'}
                      {type.id === 'resource' && 'Provide helpful tools, links, or documents'}
                    </p>
                  </button>
                ))}
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={
                    postType === 'question' ? 'What would you like to ask?' :
                    postType === 'discussion' ? 'What would you like to discuss?' :
                    postType === 'article' ? 'Give your article a compelling title' :
                    'What resource are you sharing?'
                  }
                  className="w-full px-4 py-3 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none"
                />
                <div className="text-xs text-gray-500 mt-2">
                  Be specific and descriptive to get better responses
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content */}
          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Add Content</h2>
              
              {/* Content Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Content *
                </label>
                <div className="mb-3 flex gap-2">
                  <button className="p-2 bg-gray-900/50 text-gray-400 rounded hover:text-white">
                    <span className="font-bold">B</span>
                  </button>
                  <button className="p-2 bg-gray-900/50 text-gray-400 rounded hover:text-white">
                    <span className="italic">I</span>
                  </button>
                  <button className="p-2 bg-gray-900/50 text-gray-400 rounded hover:text-white">
                    <span className="underline">U</span>
                  </button>
                  <button className="p-2 bg-gray-900/50 text-gray-400 rounded hover:text-white">
                    <FileText size={16} />
                  </button>
                  <button className="p-2 bg-gray-900/50 text-gray-400 rounded hover:text-white">
                    <LinkIcon size={16} />
                  </button>
                </div>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder={
                    postType === 'question' ? 'Provide details about your question. What have you tried? What specific help do you need?' :
                    postType === 'discussion' ? 'Start the conversation. Share your perspective and ask for others\' opinions.' :
                    postType === 'article' ? 'Write your article here. Use headings, paragraphs, and formatting to make it engaging.' :
                    'Describe the resource. What does it include? How can it help others?'
                  }
                  className="w-full h-64 px-4 py-3 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none resize-none"
                />
                <div className="flex justify-between mt-2">
                  <div className={`text-xs ${isContentValid ? 'text-green-400' : 'text-red-400'}`}>
                    {characterCount} characters ({characterCount < 50 ? 'Minimum 50 characters' : characterCount > 10000 ? 'Maximum 10000 characters' : 'Good length'})
                  </div>
                  <div className="text-xs text-gray-500">
                    Markdown supported
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add tags (press Enter)"
                    className="flex-1 px-4 py-2 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
                  >
                    Add
                  </button>
                </div>
                
                {/* Selected Tags */}
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full text-sm flex items-center gap-1"
                      >
                        <Tag size={12} />
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-2 hover:text-white"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Tag Suggestions */}
                <div>
                  <div className="text-sm text-gray-400 mb-2">Suggestions:</div>
                  <div className="flex flex-wrap gap-2">
                    {tagSuggestions.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagSuggestion(tag)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.tags.includes(tag)
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-900/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Attachments (Optional)
                </label>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <button className="p-4 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-700 hover:border-cyan-500 transition-colors">
                    <div className="text-center">
                      <FileText className="mx-auto mb-2 text-gray-400" size={24} />
                      <div className="text-sm text-gray-400">Add File</div>
                    </div>
                  </button>
                  <button className="p-4 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-700 hover:border-cyan-500 transition-colors">
                    <div className="text-center">
                      <LinkIcon className="mx-auto mb-2 text-gray-400" size={24} />
                      <div className="text-sm text-gray-400">Add Link</div>
                    </div>
                  </button>
                  <button className="p-4 bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-700 hover:border-cyan-500 transition-colors">
                    <div className="text-center">
                      <ImageIcon className="mx-auto mb-2 text-gray-400" size={24} />
                      <div className="text-sm text-gray-400">Add Image</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Settings */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-white mb-6">Post Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Visibility */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Visibility
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 bg-gray-900/40 rounded-lg cursor-pointer hover:bg-gray-900/60">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          checked={formData.visibility === 'public'}
                          onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                          className="text-cyan-500"
                        />
                        <div className="flex items-center gap-2">
                          <Globe size={18} className="text-gray-400" />
                          <div>
                            <div className="font-medium text-white">Public</div>
                            <div className="text-sm text-gray-400">Visible to everyone</div>
                          </div>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 bg-gray-900/40 rounded-lg cursor-pointer hover:bg-gray-900/60">
                        <input
                          type="radio"
                          name="visibility"
                          value="members"
                          checked={formData.visibility === 'members'}
                          onChange={(e) => setFormData(prev => ({ ...prev, visibility: e.target.value }))}
                          className="text-cyan-500"
                        />
                        <div className="flex items-center gap-2">
                          <Users size={18} className="text-gray-400" />
                          <div>
                            <div className="font-medium text-white">Members Only</div>
                            <div className="text-sm text-gray-400">Visible to registered users</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-4">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.isAnonymous}
                        onChange={(e) => setFormData(prev => ({ ...prev, isAnonymous: e.target.checked }))}
                        className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500"
                      />
                      <div>
                        <div className="font-medium text-white">Post Anonymously</div>
                        <div className="text-sm text-gray-400">Your name won't be shown</div>
                      </div>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={formData.notifyReplies}
                        onChange={(e) => setFormData(prev => ({ ...prev, notifyReplies: e.target.checked }))}
                        className="rounded border-gray-700 text-cyan-500 focus:ring-cyan-500"
                      />
                      <div>
                        <div className="font-medium text-white">Notify me of replies</div>
                        <div className="text-sm text-gray-400">Get email notifications</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Bounty (for questions) */}
                  {postType === 'question' && (
                    <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 border border-amber-500/30 rounded-xl p-6">
                      <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                        <Award size={18} className="text-amber-400" />
                        Add Bounty
                      </h3>
                      <p className="text-sm text-gray-300 mb-4">
                        Offer points for the best answer to get faster and higher quality responses.
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="number"
                              min="0"
                              max="1000"
                              value={formData.bounty}
                              onChange={(e) => setFormData(prev => ({ ...prev, bounty: parseInt(e.target.value) || 0 }))}
                              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 text-white rounded-lg border border-gray-700"
                            />
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">points</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        You have 1,250 points available
                      </div>
                    </div>
                  )}

                  {/* Preview */}
                  <div className="bg-gray-900/40 rounded-xl p-6">
                    <h3 className="font-bold text-white mb-4">Preview</h3>
                    <div className="space-y-2">
                      <div className="text-lg font-medium text-white truncate">
                        {formData.title || 'Your title will appear here'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {formData.content.length > 100 
                          ? formData.content.substring(0, 100) + '...'
                          : formData.content || 'Your content preview'}
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {formData.tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-gray-800 text-gray-300 rounded text-xs">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-700">
            {step > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}
            
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !isContentValid}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  'Publish Post'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 p-6 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl border border-cyan-500/30">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <Sparkles size={18} />
            Tips for Great Posts
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Be specific and clear in your title</li>
            <li>• Provide enough context for others to help you</li>
            <li>• Use proper formatting for readability</li>
            <li>• Add relevant tags to reach the right audience</li>
            <li>• Be respectful and follow community guidelines</li>
          </ul>
        </div>
      </div>
    </div>
  )
}