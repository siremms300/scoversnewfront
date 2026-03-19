// app/blog/page.tsx - Renamed to "EduExchange" Forum
'use client'

import { useState, useEffect } from 'react'
import { 
  Search, Filter, TrendingUp, Sparkles, Users, BookOpen, 
  MessageSquare, Zap, Award, Target, Flame, Clock, Trophy, 
  TrendingDown, ChevronUp, ChevronDown, Share2, Bookmark, 
  Eye, BarChart, Hash, MoreVertical, Plus, Tag, UserPlus,
  Zap as Lightning, TrendingUp as Rocket, Filter as Funnel
} from 'lucide-react'
import Link from 'next/link'
import ForumPost from '@/components/forum/ForumPost'
import TrendingTopics from '@/components/forum/TrendingTopics'
import AuthorSpotlight from '@/components/forum/AuthorSpotlight'
import CommunityStats from '@/components/forum/CommunityStats'

// Forum Content Types
type ForumPostType = {
  id: number
  type: 'discussion' | 'question' | 'article' | 'resource'
  title: string
  author: {
    name: string
    role: string
    reputation: number
    avatar: string
    verified: boolean
  }
  content: string
  tags: string[]
  stats: {
    upvotes: number
    downvotes: number
    comments: number
    shares: number
    views: number
    hotScore: number
  }
  timestamp: string
  isPinned?: boolean
  isFeatured?: boolean
  attachments?: {
    type: 'pdf' | 'image' | 'link' | 'video'
    url: string
    title: string
  }[]
  solved?: boolean
  bounty?: number
}

type FilterType = 'hot' | 'new' | 'rising' | 'controversial' | 'top' | 'solved'

const forumPosts: ForumPostType[] = [
  {
    id: 1,
    type: 'article',
    title: 'My Journey from Community College to Harvard: A Step-by-Step Guide',
    author: {
      name: 'Alex Chen',
      role: 'Harvard Medical Student',
      reputation: 4250,
      avatar: '/api/placeholder/100/100',
      verified: true
    },
    content: 'Three years ago, I was a community college student with big dreams. Today, I\'m at Harvard Medical School. This is exactly how I did it, with actionable steps you can follow.',
    tags: ['Harvard', 'Success Story', 'Community College', 'Transfer', 'Medical School'],
    stats: {
      upvotes: 2450,
      downvotes: 32,
      comments: 289,
      shares: 420,
      views: 15200,
      hotScore: 98.7
    },
    timestamp: '3 hours ago',
    isFeatured: true,
    attachments: [
      { type: 'pdf', url: '#', title: 'My Application Timeline' },
      { type: 'link', url: '#', title: 'Scholarship Resources I Used' }
    ]
  },
  {
    id: 2,
    type: 'question',
    title: 'International Students: Is the US worth it anymore with rising tuition costs?',
    author: {
      name: 'Priya Sharma',
      role: 'International Student Advisor',
      reputation: 3820,
      avatar: '/api/placeholder/100/100',
      verified: true
    },
    content: 'With tuition increasing 30% in the last 5 years and job opportunities tightening, should international students still consider the US? Let\'s discuss ROI and alternatives.',
    tags: ['International Students', 'Tuition', 'ROI', 'Debate'],
    stats: {
      upvotes: 1890,
      downvotes: 245,
      comments: 542,
      shares: 310,
      views: 22300,
      hotScore: 95.2
    },
    timestamp: '5 hours ago',
    isPinned: true,
    solved: false,
    bounty: 500
  },
  {
    id: 3,
    type: 'resource',
    title: 'FREE: I created an AI tool that analyzes your personal statement and suggests improvements',
    author: {
      name: 'TechEd Innovations',
      role: 'AI Education Tools',
      reputation: 8920,
      avatar: '/api/placeholder/100/100',
      verified: true
    },
    content: 'After helping 1000+ students with their essays, I built an AI tool that gives feedback on structure, tone, and impact. Free access for the first 500 users.',
    tags: ['AI Tools', 'Free Resource', 'Personal Statements', 'Essays', 'Writing'],
    stats: {
      upvotes: 5210,
      downvotes: 89,
      comments: 892,
      shares: 2450,
      views: 45200,
      hotScore: 99.8
    },
    timestamp: '1 day ago',
    attachments: [
      { type: 'link', url: '#', title: 'Access the Tool Here' },
      { type: 'video', url: '#', title: 'How to Use Tutorial' }
    ]
  },
  {
    id: 4,
    type: 'discussion',
    title: 'Is prestige really worth the debt? Ivy League vs State School with full scholarship',
    author: {
      name: 'Marcus Johnson',
      role: 'Financial Aid Consultant',
      reputation: 2950,
      avatar: '/api/placeholder/100/100',
      verified: true
    },
    content: 'My student got into Yale with $200k debt vs UC Berkeley with full ride. We\'re torn. What would you choose and why?',
    tags: ['Ivy League', 'Debt', 'Scholarships', 'Decision Making'],
    stats: {
      upvotes: 3250,
      downvotes: 420,
      comments: 1245,
      shares: 890,
      views: 58200,
      hotScore: 97.5
    },
    timestamp: '2 days ago',
    solved: true
  },
  {
    id: 5,
    type: 'article',
    title: 'The hidden curriculum: What they don\'t teach you about navigating elite universities',
    author: {
      name: 'Dr. Sarah Miller',
      role: 'Former Dean of Students, Stanford',
      reputation: 12800,
      avatar: '/api/placeholder/100/100',
      verified: true
    },
    content: 'After 15 years in admissions, I\'ve seen brilliant students fail because they didn\'t understand the unwritten rules. Here\'s everything you need to know.',
    tags: ['Elite Universities', 'Networking', 'Success Tips', 'Higher Ed'],
    stats: {
      upvotes: 8920,
      downvotes: 45,
      comments: 1250,
      shares: 3200,
      views: 189200,
      hotScore: 99.9
    },
    timestamp: '3 days ago',
    isFeatured: true,
    attachments: [
      { type: 'pdf', url: '#', title: 'Networking Guide PDF' }
    ]
  }
]

const trendingTopics = [
  { tag: 'International Students', posts: 1245, trend: 'up' },
  { tag: 'Scholarships 2024', posts: 892, trend: 'up' },
  { tag: 'STEM OPT', posts: 645, trend: 'steady' },
  { tag: 'Application Deadlines', posts: 2345, trend: 'up' },
  { tag: 'Financial Aid', posts: 1789, trend: 'steady' },
  { tag: 'Graduate Admissions', posts: 956, trend: 'up' },
  { tag: 'Visa Updates', posts: 678, trend: 'down' },
  { tag: 'Career Outcomes', posts: 1345, trend: 'up' }
]

const topAuthors = [
  {
    id: 1,
    name: 'Dr. Sarah Miller',
    role: 'Stanford Admissions Expert',
    reputation: 12800,
    articles: 45,
    followers: 24500,
    specialty: 'Ivy League Admissions',
    verified: true
  },
  {
    id: 2,
    name: 'Alex Chen',
    role: 'Harvard Med Student',
    reputation: 4250,
    articles: 12,
    followers: 18900,
    specialty: 'Medical School Journey',
    verified: true
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'International Student Advisor',
    reputation: 3820,
    articles: 28,
    followers: 15600,
    specialty: 'Visa & Immigration',
    verified: true
  }
]

export default function EduExchangePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('hot')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredPosts, setFilteredPosts] = useState(forumPosts)

  useEffect(() => {
    let results = forumPosts

    // Apply search filter
    if (searchTerm) {
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply type filter
    if (selectedType !== 'all') {
      results = results.filter(post => post.type === selectedType)
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      results = results.filter(post =>
        selectedTags.some(tag => post.tags.includes(tag))
      )
    }

    // Apply sorting based on filter
    results.sort((a, b) => {
      switch (activeFilter) {
        case 'hot':
          return b.stats.hotScore - a.stats.hotScore
        case 'new':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        case 'rising':
          const aRise = (a.stats.upvotes * 0.5) + (a.stats.comments * 0.3) + (a.stats.shares * 0.2)
          const bRise = (b.stats.upvotes * 0.5) + (b.stats.comments * 0.3) + (b.stats.shares * 0.2)
          return bRise - aRise
        case 'controversial':
          return (b.stats.upvotes + b.stats.downvotes) - (a.stats.upvotes + a.stats.downvotes)
        case 'top':
          return b.stats.upvotes - a.stats.upvotes
        case 'solved':
          return (b.solved ? 1 : 0) - (a.solved ? 1 : 0)
        default:
          return b.stats.hotScore - a.stats.hotScore
      }
    })

    setFilteredPosts(results)
  }, [searchTerm, activeFilter, selectedType, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const postTypes = [
    { id: 'all', label: 'All Content', icon: <Sparkles size={16} /> },
    { id: 'article', label: 'Articles', icon: <BookOpen size={16} /> },
    { id: 'question', label: 'Questions', icon: <MessageSquare size={16} /> },
    { id: 'discussion', label: 'Discussions', icon: <Users size={16} /> },
    { id: 'resource', label: 'Resources', icon: <Zap size={16} /> }
  ]

  const filters: { id: FilterType; label: string; icon: JSX.Element }[] = [
    { id: 'hot', label: 'Hot', icon: <Flame size={16} /> },
    { id: 'new', label: 'New', icon: <Clock size={16} /> },
    { id: 'rising', label: 'Rising', icon: <TrendingUp size={16} /> },
    { id: 'controversial', label: 'Controversial', icon: <TrendingDown size={16} /> },
    { id: 'top', label: 'Top', icon: <Award size={16} /> },
    { id: 'solved', label: 'Solved', icon: <Target size={16} /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-blue-900/30">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-bold text-white mb-4">
              <Sparkles size={14} />
              Welcome to EduExchange
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Where Education
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Meets Conversation
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Join thousands of students, educators, and experts sharing knowledge, asking questions, 
              and building the future of education together.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative bg-gray-800/90 backdrop-blur-sm rounded-xl p-2 shadow-2xl">
                <div className="flex">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
                      <input
                        type="text"
                        placeholder="Search discussions, questions, resources..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 text-lg bg-transparent text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>
                  <button className="ml-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <Search size={20} />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="text-gray-400">Try:</span>
              {['scholarships', 'visa help', 'essay review', 'career advice'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setSearchTerm(suggestion)}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6 sticky top-8">
              {/* Create Post Button */}
              <Link
                href="/forum/create"
                className="block w-full p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl font-bold text-center hover:opacity-90 transition-all hover:scale-[1.02] shadow-lg shadow-cyan-500/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <Plus size={20} />
                  Create Post
                </div>
                <div className="text-sm font-normal mt-2 text-cyan-100">
                  Share knowledge, ask questions, start discussions
                </div>
              </Link>

              {/* Community Stats */}
              <CommunityStats />

              {/* Post Types */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Funnel size={18} />
                  Content Types
                </h3>
                <div className="space-y-2">
                  {postTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                        selectedType === type.id
                          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Topics */}
              <TrendingTopics 
                topics={trendingTopics} 
                selectedTags={selectedTags}
                onTagClick={toggleTag}
              />

              {/* Author Spotlight */}
              <AuthorSpotlight authors={topAuthors} />
            </div>
          </div>

          {/* Main Feed */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                        activeFilter === filter.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {filter.icon}
                      {filter.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-400">
                    {filteredPosts.length} posts
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Banner */}
            <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-600/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-purple-500/30">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <Rocket size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">Trending Discussions This Week</h3>
                  <p className="text-gray-300 text-sm">
                    Join the hottest conversations about scholarships, admissions, and career paths
                  </p>
                </div>
                <Link
                  href="/forum/trending"
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Explore
                </Link>
              </div>
            </div>

            {/* Forum Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className="group">
                  {/* Hot Post Badge */}
                  {post.stats.hotScore > 98 && (
                    <div className="flex items-center gap-2 mb-3 ml-4">
                      <div className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Flame size={10} />
                        HOT
                      </div>
                      <div className="text-sm text-amber-400">
                        {post.stats.hotScore.toFixed(1)} score
                      </div>
                    </div>
                  )}

                  <ForumPost post={post} index={index} />
                </div>
              ))}

              {filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center">
                    <Search className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No posts found</h3>
                  <p className="text-gray-400 mb-6">Try different filters or search terms</p>
                  <Link
                    href="/forum/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                  >
                    <Plus size={20} />
                    Be the first to post
                  </Link>
                </div>
              )}
            </div>

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                  Load More Discussions
                </button>
              </div>
            )}

            {/* Weekly Leaderboard */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Trophy className="text-amber-500" />
                  Weekly Top Contributors
                </h3>
                <Link href="/leaderboard" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                  View Full Leaderboard →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { rank: 1, name: 'Dr. Sarah Miller', points: 2450, role: 'Admissions Expert', change: '+12%' },
                  { rank: 2, name: 'TechEd Innovations', points: 1890, role: 'AI Tools', change: '+8%' },
                  { rank: 3, name: 'Marcus Johnson', points: 1560, role: 'Financial Advisor', change: '+15%' }
                ].map((contributor) => (
                  <div key={contributor.rank} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        contributor.rank === 1 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                        contributor.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-300' :
                        'bg-gradient-to-r from-amber-700 to-amber-600'
                      } text-white`}>
                        #{contributor.rank}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-white">{contributor.name}</h4>
                        <div className="text-sm text-gray-400">{contributor.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{contributor.points}</div>
                        <div className="text-sm text-green-400">{contributor.change}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <div className="text-gray-400">Weekly contributions</div>
                      <div className="text-cyan-400 font-semibold">View Profile</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6 sticky top-8">
              {/* Live Discussions */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Lightning size={18} className="text-amber-500" />
                    Live Discussions
                  </h3>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="space-y-4">
                  {[
                    { topic: 'Scholarship Deadlines', users: 42, category: 'Funding' },
                    { topic: 'Visa Interview Tips', users: 28, category: 'Immigration' },
                    { topic: 'STEM OPT Updates', users: 35, category: 'Career' }
                  ].map((discussion, idx) => (
                    <div key={idx} className="p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 cursor-pointer transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm font-medium text-white">{discussion.topic}</div>
                        <div className="text-xs text-cyan-400">{discussion.users} online</div>
                      </div>
                      <div className="text-xs text-gray-400">{discussion.category}</div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
                  Join a Discussion
                </button>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/20 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Community Pulse</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Active Members</div>
                    <div className="text-white font-bold">24,589</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Questions Solved</div>
                    <div className="text-white font-bold">12,456</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Resources Shared</div>
                    <div className="text-white font-bold">8,923</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-300">Success Stories</div>
                    <div className="text-white font-bold">3,245</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-cyan-500/20">
                  <div className="text-sm text-gray-400 text-center">
                    Real-time community impact metrics
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {[
                    { title: 'AMA: Stanford Admissions Officer', date: 'Tomorrow, 6 PM EST' },
                    { title: 'Scholarship Workshop', date: 'Jan 25, 3 PM EST' },
                    { title: 'Visa Q&A Session', date: 'Jan 28, 2 PM EST' }
                  ].map((event, idx) => (
                    <div key={idx} className="p-3 bg-gray-700/30 rounded-lg">
                      <div className="text-sm font-medium text-white mb-1">{event.title}</div>
                      <div className="text-xs text-cyan-400">{event.date}</div>
                      <button className="w-full mt-2 py-1.5 text-xs bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors">
                        RSVP
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/20 rounded-2xl p-6">
                <h3 className="font-bold text-white mb-3">Weekly Digest</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Get top discussions, resources, and expert insights delivered weekly.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 bg-gray-800/50 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm"
                  />
                  <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Elevate Your Education Journey?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join 50,000+ students and experts sharing knowledge, asking questions, 
              and building meaningful connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/register"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
              >
                Join EduExchange Free
              </Link>
              <Link
                href="/about"
                className="px-8 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}