// app/blog/[id]/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  Calendar, User, Clock, Eye, Share2, Bookmark, Heart,
  MessageCircle, Tag, ChevronLeft, Facebook, Twitter,
  Linkedin, Instagram, BookOpen, ArrowRight, Printer,
  CheckCircle, Quote, ArrowUp, ThumbsUp, ThumbsDown,
  Globe, Award, GraduationCap, Users, Target, Zap,
  Download, Mail, Copy, LucideIcon
} from 'lucide-react'
import NextLink from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

// Define an interface for the Link icon to avoid conflict
const LinkIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
)

// Mock blog article data
const blogArticle = {
  id: 1,
  title: 'The Ultimate Guide to US University Applications 2024',
  author: {
    name: 'Dr. Sarah Johnson',
    role: 'Former Stanford Admissions Officer',
    bio: 'With 15+ years of experience in university admissions, Sarah has helped thousands of students gain admission to top US universities.',
    avatar: '/api/placeholder/100/100',
    articles: 24,
    followers: 12500
  },
  date: '2024-01-15',
  readTime: '8 min',
  views: 12500,
  likes: 2450,
  shares: 420,
  commentsCount: 89, // Changed from comments to commentsCount
  comments: [ // This is now the array of comment objects
    {
      id: 1,
      user: 'Alex Chen',
      avatar: '/api/placeholder/40/40',
      time: '2 days ago',
      content: 'This guide is incredibly comprehensive! The timeline section helped me realize I need to start preparing much earlier than I thought.',
      likes: 42,
      replies: 3
    },
    {
      id: 2,
      user: 'Maria Rodriguez',
      avatar: '/api/placeholder/40/40',
      time: '3 days ago',
      content: 'As a high school counselor, I recommend this article to all my students applying to US universities. Excellent resource!',
      likes: 28,
      replies: 1
    },
    {
      id: 3,
      user: 'James Wilson',
      avatar: '/api/placeholder/40/40',
      time: '1 week ago',
      content: 'The personal statement tips are gold! Could you write more about specific examples for STEM students?',
      likes: 15,
      replies: 0
    }
  ],
  category: 'Admissions',
  tags: ['USA', 'Application Tips', 'Deadlines', 'Essays', 'Standardized Tests', 'Recommendations'],
  excerpt: 'Everything you need to know about applying to US universities in 2024, from standardized tests to personal statements.',
  featuredImage: '/api/placeholder/1200/600',
  content: {
    introduction: "The US university application process can seem overwhelming, especially for international students. With thousands of universities, varying deadlines, and complex requirements, it's easy to feel lost. This comprehensive guide breaks down the entire process into manageable steps for the 2024 application cycle.",
    sections: [
      {
        title: 'Understanding the US Education System',
        content: 'The US higher education system is decentralized, with each university setting its own admission requirements. Key institutions include Ivy League schools, public state universities, private liberal arts colleges, and community colleges.',
        points: [
          'Undergraduate (Bachelor’s): Typically 4 years',
          'Graduate (Master’s): Usually 1-2 years',
          'Doctoral (PhD): 4-6 years'
        ]
      },
      {
        title: 'Key Application Components',
        content: 'A strong application requires careful preparation of several components:',
        points: [
          'Academic transcripts',
          'Standardized test scores (SAT/ACT/GRE/GMAT)',
          'English proficiency tests (TOEFL/IELTS)',
          'Personal statement or essay',
          'Letters of recommendation',
          'Extracurricular activities and achievements',
          'Portfolio (for arts programs)'
        ]
      },
      {
        title: 'Application Timeline 2024',
        content: 'Early planning is crucial. Here\'s a recommended timeline:',
        timeline: [
          { month: 'Jan-Mar 2024', task: 'Research universities, prepare for standardized tests' },
          { month: 'Apr-Jun 2024', task: 'Take standardized tests, draft personal statements' },
          { month: 'Jul-Sep 2024', task: 'Request recommendations, finalize essay' },
          { month: 'Oct-Dec 2024', task: 'Submit applications (Early Decision/Regular Decision)' },
          { month: 'Jan-Mar 2025', task: 'Interview preparation, submit FAFSA/CSS Profile' },
          { month: 'Apr-May 2025', task: 'Receive decisions, compare financial aid packages' }
        ]
      },
      {
        title: 'Crafting a Winning Personal Statement',
        content: 'The personal statement is your opportunity to stand out. Focus on storytelling rather than listing achievements.',
        tips: [
          'Show, don\'t tell: Use specific examples',
          'Be authentic: Admissions officers read thousands of essays',
          'Focus on growth: Show how experiences shaped you',
          'Proofread thoroughly: Grammar errors can be costly'
        ]
      }
    ],
    conclusion: 'Applying to US universities requires strategic planning and attention to detail. Start early, stay organized, and don\'t hesitate to seek guidance. Remember, each university looks for unique qualities, so tailor your application accordingly.',
    keyTakeaways: [
      'Begin preparations at least 18 months before application deadlines',
      'Balance your university list with reach, match, and safety schools',
      'Test scores are important but not everything - holistic review matters',
      'Financial planning is crucial - research scholarships early'
    ]
  },
  resources: [
    { title: 'Common Application Guide', type: 'PDF', size: '2.1 MB', downloads: 1200 },
    { title: 'Essay Writing Template', type: 'DOCX', size: '1.5 MB', downloads: 890 },
    { title: 'Interview Preparation Kit', type: 'ZIP', size: '3.4 MB', downloads: 560 }
  ],
  relatedArticles: [
    {
      id: 2,
      title: 'How to Write a Winning Personal Statement',
      excerpt: 'Step-by-step guide to crafting a compelling personal statement that admissions committees love.',
      date: '2023-12-10',
      readTime: '9 min',
      views: 14500
    },
    {
      id: 3,
      title: 'Scholarship Success: How to Stand Out from Thousands',
      excerpt: 'Proven strategies to make your scholarship application stand out and increase your chances of success.',
      date: '2024-01-10',
      readTime: '6 min',
      views: 8900
    },
    {
      id: 4,
      title: 'Visa Processing Times by Country 2024',
      excerpt: 'Updated visa processing times for popular study destinations and tips to avoid delays.',
      date: '2024-01-05',
      readTime: '5 min',
      views: 7500
    }
  ]
}

export default function BlogArticlePage() {
  const params = useParams()
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState('')
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentSection, setCurrentSection] = useState('')

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Handle like
  const handleLike = () => {
    setLiked(!liked)
    toast.success(liked ? 'Removed like' : 'Article liked!')
  }

  // Handle bookmark
  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Removed bookmark' : 'Article bookmarked!')
  }

  // Handle share
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle scroll
  const handleScroll = () => {
    setShowScrollTop(window.scrollY > 500)
    
    // Update current section based on scroll position
    const sections = document.querySelectorAll('section[id]')
    let current = ''
    
    sections.forEach(section => {
      const sectionTop = (section as HTMLElement).offsetTop
      const sectionHeight = (section as HTMLElement).clientHeight
      if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
        current = section.id
      }
    })
    
    setCurrentSection(current)
  }

  // Add scroll listener
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll)
  }

  // Table of Contents
  const tableOfContents = [
    { id: 'introduction', title: 'Introduction' },
    ...blogArticle.content.sections.map(section => ({
      id: section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: section.title
    })),
    { id: 'conclusion', title: 'Conclusion' },
    { id: 'resources', title: 'Resources' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        {/* Content Container */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-8">
            <NextLink href="/" className="hover:text-white transition-colors">Home</NextLink>
            <ChevronLeft size={16} className="rotate-180" />
            <NextLink href="/blog" className="hover:text-white transition-colors">Blog</NextLink>
            <ChevronLeft size={16} className="rotate-180" />
            <span className="text-cyan-300">{blogArticle.category}</span>
          </div>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold rounded-full">
                {blogArticle.category}
              </span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1 text-gray-300">
                <Calendar size={16} />
                <span>{formatDate(blogArticle.date)}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {blogArticle.title}
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              {blogArticle.excerpt}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Eye size={20} />
                <span>{blogArticle.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={20} />
                <span>{blogArticle.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={20} />
                <span>{blogArticle.likes.toLocaleString()} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                {/* Fixed: Using commentsCount instead of comments array */}
                <span>{blogArticle.commentsCount} comments</span>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {blogArticle.author.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold text-white mb-2">{blogArticle.author.name}</h3>
                <p className="text-cyan-300 font-medium mb-3">{blogArticle.author.role}</p>
                <p className="text-gray-300 mb-4">{blogArticle.author.bio}</p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{blogArticle.author.articles}</div>
                    <div className="text-sm text-gray-300">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{blogArticle.author.followers.toLocaleString()}</div>
                    <div className="text-sm text-gray-300">Followers</div>
                  </div>
                </div>
              </div>
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6 sticky top-24">
              {/* Table of Contents */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen size={18} />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block px-3 py-2 rounded-lg transition-all ${
                        currentSection === item.id
                          ? 'bg-cyan-100 text-cyan-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Action Buttons */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Share2 size={20} />
                    Share Article
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
                      bookmarked
                        ? 'bg-amber-100 text-amber-700 border border-amber-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                    {bookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Printer size={20} />
                    Print Article
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Article link copied!')
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <Copy size={20} />
                    Copy Link
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag size={18} />
                  Article Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blogArticle.tags.map((tag) => (
                    <NextLink
                      key={tag}
                      href={`/blog?tag=${tag}`}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </NextLink>
                  ))}
                </div>
              </div>

              {/* Share on Social */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Share on Social</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Facebook size={18} />
                    Facebook
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                    <Twitter size={18} />
                    Twitter
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    <Linkedin size={18} />
                    LinkedIn
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    <Instagram size={18} />
                    Instagram
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Featured Image */}
              <div className="relative h-64 md:h-80 bg-gradient-to-br from-cyan-500 to-blue-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="mx-auto text-white mb-4" size={64} />
                    <div className="text-white text-3xl font-bold">
                      {blogArticle.title.split(' ').slice(0, 3).join(' ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <div className="p-8">
                {/* Interactive Stats Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 ${liked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'}`}
                    >
                      <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
                      <span className="font-semibold">{blogArticle.likes + (liked ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageCircle size={24} />
                      <span className="font-semibold">{blogArticle.commentsCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Share2 size={24} />
                      <span className="font-semibold">{blogArticle.shares}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <ThumbsUp size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <ThumbsDown size={20} />
                    </button>
                  </div>
                </div>

                {/* Introduction */}
                <section id="introduction" className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {blogArticle.content.introduction}
                    </p>
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-500 pl-6 py-4 my-6">
                      <div className="flex items-start gap-3">
                        <Quote className="text-cyan-600 mt-1 flex-shrink-0" size={24} />
                        <div>
                          <p className="text-gray-800 italic">
                            "Early preparation is the key to success in US university applications. Start at least 18 months before deadlines."
                          </p>
                          <p className="text-sm text-gray-600 mt-2">— Dr. Sarah Johnson</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Content Sections */}
                {blogArticle.content.sections.map((section, index) => (
                  <section
                    key={index}
                    id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
                    className="mb-12 scroll-mt-24"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                        {index + 1}
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{section.title}</h2>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed mb-6">
                        {section.content}
                      </p>

                      {/* Points List */}
                      {section.points && (
                        <div className="bg-gray-50 rounded-xl p-6 my-6">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <CheckCircle className="text-green-500" size={20} />
                            Key Points:
                          </h4>
                          <ul className="space-y-3">
                            {section.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold mt-1 flex-shrink-0">
                                  {idx + 1}
                                </div>
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Timeline */}
                      {section.timeline && (
                        <div className="border-l-4 border-cyan-500 pl-6 my-8">
                          <h4 className="font-bold text-gray-900 mb-4">Timeline Overview:</h4>
                          <div className="space-y-6">
                            {section.timeline.map((item, idx) => (
                              <div key={idx} className="relative">
                                <div className="absolute -left-10 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                  {idx + 1}
                                </div>
                                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                                  <div className="font-bold text-cyan-700 mb-1">{item.month}</div>
                                  <p className="text-gray-700">{item.task}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tips */}
                      {section.tips && (
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 my-6">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Zap className="text-amber-500" size={20} />
                            Pro Tips:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.tips.map((tip, idx) => (
                              <div key={idx} className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
                                <Target className="text-amber-600 mt-1 flex-shrink-0" size={18} />
                                <span className="text-gray-700">{tip}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                ))}

                {/* Conclusion */}
                <section id="conclusion" className="mb-12 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {blogArticle.content.conclusion}
                    </p>
                    
                    {/* Key Takeaways */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 my-6">
                      <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Award className="text-green-600" size={24} />
                        Key Takeaways
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {blogArticle.content.keyTakeaways.map((takeaway, idx) => (
                          <div key={idx} className="bg-white rounded-lg p-4 shadow-sm">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                                {idx + 1}
                              </div>
                              <h5 className="font-bold text-gray-900">Takeaway #{idx + 1}</h5>
                            </div>
                            <p className="text-gray-700">{takeaway}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Resources */}
                <section id="resources" className="mb-12 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Downloadable Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogArticle.resources.map((resource, idx) => (
                      <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                            <Download size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{resource.title}</h4>
                            <div className="text-sm text-gray-600">{resource.type} • {resource.size}</div>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                          Download ({resource.downloads.toLocaleString()})
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Author Bio Footer */}
                <div className="border-t border-gray-200 pt-8 mt-12">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                      {blogArticle.author.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">About the Author</h4>
                      <p className="text-gray-700 mb-4">{blogArticle.author.bio}</p>
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-semibold">
                          View All Articles
                        </button>
                        <button className="px-4 py-2 border border-cyan-600 text-cyan-600 rounded-lg hover:bg-cyan-50 transition-colors font-semibold">
                          Contact Author
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-8 mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Comments ({blogArticle.commentsCount})
                  </h3>
                  
                  {/* Add Comment */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h4 className="font-bold text-gray-900 mb-4">Add your comment</h4>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts or ask a question..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none h-32"
                    />
                    <div className="flex justify-end gap-3 mt-4">
                      <button className="px-6 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                        Cancel
                      </button>
                      <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        Post Comment
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {blogArticle.comments.map((comment) => (
                      <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {comment.user.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h5 className="font-bold text-gray-900">{comment.user}</h5>
                                <div className="text-sm text-gray-600">{comment.time}</div>
                              </div>
                              <button className="text-gray-400 hover:text-gray-600">
                                <MessageCircle size={18} />
                              </button>
                            </div>
                            <p className="text-gray-700 mb-4">{comment.content}</p>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                                <Heart size={18} />
                                <span className="text-sm">{comment.likes}</span>
                              </button>
                              <button className="text-gray-600 hover:text-gray-800 text-sm font-semibold">
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <ArrowRight className="text-cyan-600" />
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {blogArticle.relatedArticles.map((article) => (
                  <NextLink
                    key={article.id}
                    href={`/blog/${article.id}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                  >
                    <div className="h-48 bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-600 group-hover:to-blue-600 transition-colors" />
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-cyan-600 transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          {article.readTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye size={14} />
                          {article.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </NextLink>
                ))}
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 text-white">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Stay Updated with Education Insights</h3>
                <p className="text-cyan-100 mb-6">
                  Get weekly articles, expert tips, and updates on international education.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                  />
                  <button className="px-6 py-3 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-cyan-50 transition-colors whitespace-nowrap">
                    Subscribe Now
                  </button>
                </form>
                <p className="text-sm text-cyan-200 mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}