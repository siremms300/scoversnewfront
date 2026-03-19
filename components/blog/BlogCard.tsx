'use client'

import { Calendar, User, Clock, Eye, Heart, MessageCircle, Share2, Bookmark, Tag } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface BlogCardProps {
  post: {
    id: number
    title: string
    author: string
    authorRole: string
    date: string
    readTime: string
    views: number
    likes: number
    category: string
    tags: string[]
    excerpt: string
    featured: boolean
    image: string
  }
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(post.likes)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div
      className={`relative group animate-fade-in`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-100 overflow-hidden">
        {/* Featured badge */}
        {post.featured && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
            aria-label={isSaved ? 'Remove from saved' : 'Save article'}
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? 'fill-cyan-600 text-cyan-600' : 'text-gray-400'}`}
            />
          </button>
          <button
            className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-sm"
            aria-label="Share article"
          >
            <Share2 className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Card content */}
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Content */}
            <div className="flex-1">
              {/* Category and date */}
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-sm font-semibold rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-1 text-gray-600 text-sm">
                  <Calendar size={14} />
                  {formatDate(post.date)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors line-clamp-2">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-700 mb-6 line-clamp-3">{post.excerpt}</p>

              {/* Author info */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{post.author}</div>
                  <div className="text-sm text-gray-600">{post.authorRole}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats and actions */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span className="text-sm">{post.readTime} read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span className="text-sm">{post.views.toLocaleString()} views</span>
                  </div>
                  <button
                    onClick={handleLike}
                    className="flex items-center gap-1 hover:text-red-600 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="text-sm">{likes.toLocaleString()}</span>
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/blog/${post.id}`}
                    className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 font-semibold transition-colors"
                  >
                    Read Full Article
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="lg:w-1/3">
              <div className="relative h-48 lg:h-full rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold text-center p-4">
                    {post.title.split(' ').slice(0, 3).join(' ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover effect line */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform origin-left transition-transform duration-500 ${
          isHovered ? 'scale-x-100' : 'scale-x-0'
        }`} />

        {/* Preview on hover */}
        {isHovered && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white shadow-2xl rounded-lg p-4 z-20 animate-slide-up hidden lg:block">
            <div className="text-sm text-gray-600 mb-2">Quick Preview</div>
            <div className="text-gray-700 line-clamp-4">{post.excerpt}</div>
            <div className="mt-2 text-sm text-cyan-600 font-semibold">
              Click to read full article →
            </div>
          </div>
        )}
      </div>
    </div>
  )
}