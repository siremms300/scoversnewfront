// app/forum/post/[id]/page.tsx
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  ChevronUp, ChevronDown, MessageSquare, Share2, Bookmark,
  MoreVertical, Award, BookOpen, Users, Zap, Target,
  CheckCircle, Eye, Clock, Calendar, User, Heart,
  ThumbsUp, ThumbsDown, Send, FileText, Download,
  Link as LinkIcon, Flag, Star, Edit, Trash2, Reply,
  Copy, ExternalLink, ChevronRight, Sparkles, TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const postData = {
  id: 1,
  type: 'article',
  title: 'My Journey from Community College to Harvard: A Step-by-Step Guide',
  author: {
    id: 1,
    name: 'Alex Chen',
    role: 'Harvard Medical Student',
    reputation: 4250,
    avatar: '/api/placeholder/100/100',
    verified: true
  },
  content: `
    <p class="mb-4">Three years ago, I was a community college student with big dreams. Today, I'm at Harvard Medical School. This journey wasn't easy, but with strategic planning and persistence, it was absolutely achievable.</p>
    
    <h2 class="text-2xl font-bold text-white mt-8 mb-4">The Turning Point</h2>
    <p class="mb-4">After graduating from community college with a 3.9 GPA, I realized I needed more than just good grades to get into a top medical school. I spent months researching successful transfer students and identified key patterns in their applications.</p>
    
    <h2 class="text-2xl font-bold text-white mt-8 mb-4">My 4-Step Strategy</h2>
    
    <div class="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 pl-6 py-4 my-6">
      <h3 class="font-bold text-white mb-2">Step 1: Build a Compelling Narrative</h3>
      <p class="text-gray-300">Instead of hiding my community college background, I made it central to my story. I wrote about how the diverse student body taught me about healthcare disparities.</p>
    </div>
    
    <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500 pl-6 py-4 my-6">
      <h3 class="font-bold text-white mb-2">Step 2: Strategic Extracurriculars</h3>
      <p class="text-gray-300">I didn't just join clubs - I started a peer tutoring program that served 200+ students and partnered with a local clinic for health screenings.</p>
    </div>
    
    <h2 class="text-2xl font-bold text-white mt-8 mb-4">Resources That Helped Me</h2>
    <ul class="space-y-2 mb-6">
      <li class="flex items-start gap-2"><CheckCircle size={16} class="text-green-500 mt-1 flex-shrink-0" /><span>MCAT Study Plan Template</span></li>
      <li class="flex items-start gap-2"><CheckCircle size={16} class="text-green-500 mt-1 flex-shrink-0" /><span>Personal Statement Brainstorming Worksheet</span></li>
      <li class="flex items-start gap-2"><CheckCircle size={16} class="text-green-500 mt-1 flex-shrink-0" /><span>Medical School Application Timeline</span></li>
    </ul>
  `,
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
  solved: false,
  bounty: 500,
  attachments: [
    { type: 'pdf', url: '#', title: 'My Application Timeline', downloads: 1245, size: '2.1 MB' },
    { type: 'link', url: '#', title: 'Scholarship Resources I Used', preview: 'List of 50+ scholarships for transfer students' }
  ],
  comments: [
    {
      id: 1,
      user: {
        name: 'Maria Rodriguez',
        role: 'Community College Student',
        reputation: 1240,
        avatar: '/api/placeholder/40/40',
        verified: false
      },
      content: 'This is incredibly inspiring! I\'m currently at a community college and feel the same way you did. Could you share more about your study schedule?',
      timestamp: '2 hours ago',
      likes: 42,
      replies: 3,
      isBestAnswer: false
    },
    {
      id: 2,
      user: {
        name: 'Dr. Sarah Miller',
        role: 'Admissions Expert',
        reputation: 12800,
        avatar: '/api/placeholder/40/40',
        verified: true
      },
      content: 'Excellent breakdown of the transfer process! I\'ve reviewed thousands of applications, and this approach aligns perfectly with what top schools look for.',
      timestamp: '1 hour ago',
      likes: 89,
      replies: 1,
      isBestAnswer: true
    }
  ]
}

export default function ForumPostPage() {
  const params = useParams()
  const [upvoted, setUpvoted] = useState(false)
  const [downvoted, setDownvoted] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [comment, setComment] = useState('')
  const [replies, setReplies] = useState<Record<number, string>>({})

  const handleVote = (type: 'up' | 'down') => {
    if (type === 'up') {
      setUpvoted(!upvoted)
      setDownvoted(false)
      toast.success(upvoted ? 'Removed upvote' : 'Upvoted!')
    } else {
      setDownvoted(!downvoted)
      setUpvoted(false)
      toast.success(downvoted ? 'Removed downvote' : 'Downvoted')
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Removed bookmark' : 'Bookmarked!')
  }

  const postComment = () => {
    if (!comment.trim()) {
      toast.error('Please enter a comment')
      return
    }
    toast.success('Comment posted!')
    setComment('')
  }

  const postReply = (commentId: number) => {
    if (!replies[commentId]?.trim()) {
      toast.error('Please enter a reply')
      return
    }
    toast.success('Reply posted!')
    setReplies(prev => ({ ...prev, [commentId]: '' }))
  }

  const getTypeIcon = () => {
    switch (postData.type) {
      case 'article': return <BookOpen size={20} />
      case 'question': return <MessageSquare size={20} />
      case 'discussion': return <Users size={20} />
      case 'resource': return <Zap size={20} />
    }
  }

  const getTypeColor = () => {
    switch (postData.type) {
      case 'article': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'question': return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
      case 'discussion': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'resource': return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/forum" className="hover:text-white transition-colors">EduExchange</Link>
          <ChevronRight size={16} />
          <Link href="/forum?type=article" className="hover:text-white transition-colors">Articles</Link>
          <ChevronRight size={16} />
          <span className="text-cyan-300">Post</span>
        </div>

        {/* Main Post Card */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden shadow-2xl mb-8">
          {/* Post Header */}
          <div className="p-8">
            {/* Type & Status Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border flex items-center gap-2 ${getTypeColor()}`}>
                {getTypeIcon()}
                {postData.type.charAt(0).toUpperCase() + postData.type.slice(1)}
              </span>
              
              {postData.isFeatured && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-2">
                  <Sparkles size={14} />
                  Featured
                </span>
              )}
              
              {postData.bounty && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-2">
                  <Award size={14} />
                  ${postData.bounty} Bounty
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {postData.title}
            </h1>

            {/* Author & Stats */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <Link href={`/experts/${postData.author.id}`} className="group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {postData.author.name}
                        </span>
                        {postData.author.verified && (
                          <span className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full">
                            ✓
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{postData.author.role} • {postData.author.reputation} rep</div>
                    </div>
                  </div>
                </Link>
                <div className="text-gray-500 hidden md:block">•</div>
                <div className="text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{postData.timestamp}</span>
                  </div>
                </div>
              </div>

              {/* Post Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye size={18} />
                  <span>{postData.stats.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <MessageSquare size={18} />
                  <span>{postData.stats.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Share2 size={18} />
                  <span>{postData.stats.shares}</span>
                </div>
              </div>
            </div>

            {/* Vote & Action Bar */}
            <div className="flex items-center justify-between p-4 bg-gray-900/40 rounded-xl mb-8">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVote('up')}
                    className={`p-2 rounded-lg transition-all ${
                      upvoted 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'hover:bg-gray-700 text-gray-400'
                    }`}
                  >
                    <ChevronUp size={24} />
                  </button>
                  <div className="text-2xl font-bold text-white min-w-[40px] text-center">
                    {postData.stats.upvotes - postData.stats.downvotes + (upvoted ? 1 : 0) - (downvoted ? 1 : 0)}
                  </div>
                  <button
                    onClick={() => handleVote('down')}
                    className={`p-2 rounded-lg transition-all ${
                      downvoted 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'hover:bg-gray-700 text-gray-400'
                    }`}
                  >
                    <ChevronDown size={24} />
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  {postData.stats.upvotes} upvotes • {postData.stats.downvotes} downvotes
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg ${
                    bookmarked
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                  <Share2 size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-8">
            {/* Attachments */}
            {/* {postData.attachments && postData.attachments.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FileText size={20} />
                  Resources & Attachments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {postData.attachments.map((attachment, idx) => (
                    <div key={idx} className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                            <Download size={20} className="text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-bold text-white">{attachment.title}</div>
                            {'size' in attachment && (
                              <div className="text-sm text-gray-400">{attachment.size}</div>
                            )}
                            {'preview' in attachment && (
                              <div className="text-sm text-gray-400">{attachment.preview}</div>
                            )}
                          </div>
                        </div>
                        {'downloads' in attachment && (
                          <div className="text-sm text-gray-400">{attachment.downloads.toLocaleString()} downloads</div>
                        )}
                      </div>
                      <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                        {attachment.type === 'pdf' ? 'Download PDF' : 'Visit Link'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )} */}




          {postData.attachments && postData.attachments.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText size={20} />
                Resources & Attachments
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {postData.attachments.map((attachment, idx) => (
                  <div key={idx} className="bg-gray-900/40 rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
                          <Download size={20} className="text-cyan-400" />
                        </div>
                        <div>
                          <div className="font-bold text-white">{attachment.title}</div>
                          {attachment.size && (
                            <div className="text-sm text-gray-400">{attachment.size}</div>
                          )}
                          {attachment.preview && (
                            <div className="text-sm text-gray-400">{attachment.preview}</div>
                          )}
                        </div>
                      </div>
                      {attachment.downloads && (
                        <div className="text-sm text-gray-400">
                          {attachment.downloads.toLocaleString()} downloads
                        </div>
                      )}
                    </div>
                    <button className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      {attachment.type === 'pdf' ? 'Download PDF' : 'Visit Link'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}





            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {postData.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/forum/tag/${tag.toLowerCase()}`}
                  className="px-4 py-2 bg-gray-900/50 text-gray-300 rounded-full hover:bg-gray-700 hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-700/50 px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Comments ({postData.stats.comments})
              </h2>
              <div className="flex items-center gap-3">
                <select className="px-3 py-1.5 bg-gray-900/50 text-gray-300 rounded-lg border border-gray-700 outline-none">
                  <option>Sort by: Best</option>
                  <option>Newest</option>
                  <option>Most Helpful</option>
                </select>
              </div>
            </div>

            {/* Add Comment */}
            <div className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts, ask questions, or provide feedback..."
                className="w-full h-32 px-4 py-3 bg-gray-900/40 text-white rounded-xl border border-gray-700 focus:border-cyan-500 outline-none resize-none"
              />
              <div className="flex justify-end gap-3 mt-3">
                <button className="px-6 py-2 text-gray-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button
                  onClick={postComment}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                  <Send size={16} />
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {postData.comments.map((comment) => (
                <div 
                  key={comment.id} 
                  className={`bg-gray-900/30 rounded-xl p-6 ${comment.isBestAnswer ? 'border-2 border-emerald-500/30' : ''}`}
                >
                  {comment.isBestAnswer && (
                    <div className="mb-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-300 rounded-full text-sm font-semibold flex items-center gap-1 w-fit">
                        <CheckCircle size={12} />
                        Best Answer
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4">
                    <Link href={`/experts/${comment.user.verified ? '1' : 'users/' + comment.user.name}`}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                    </Link>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{comment.user.name}</span>
                            {comment.user.verified && (
                              <span className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-400">{comment.user.role} • {comment.timestamp}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-gray-400">
                            <ThumbsUp size={14} />
                            <span>{comment.likes}</span>
                          </div>
                          <button className="text-gray-400 hover:text-white">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{comment.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors">
                          <ThumbsUp size={14} />
                          <span className="text-sm">Helpful</span>
                        </button>
                        <button 
                          onClick={() => setReplies(prev => ({ ...prev, [comment.id]: prev[comment.id] || '' }))}
                          className="flex items-center gap-1 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          <Reply size={14} />
                          <span className="text-sm">Reply</span>
                        </button>
                        <button className="text-gray-400 hover:text-red-400 transition-colors">
                          <Flag size={14} />
                        </button>
                      </div>
                      
                      {/* Reply Input */}
                      {replies[comment.id] !== undefined && (
                        <div className="mt-4">
                          <textarea
                            value={replies[comment.id]}
                            onChange={(e) => setReplies(prev => ({ ...prev, [comment.id]: e.target.value }))}
                            placeholder="Write a reply..."
                            className="w-full h-24 px-3 py-2 bg-gray-900/50 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none resize-none"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button
                              onClick={() => setReplies(prev => ({ ...prev, [comment.id]: '' }))}
                              className="px-3 py-1 text-gray-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => postReply(comment.id)}
                              className="px-4 py-1 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Replies (if any) */}
                      {comment.replies > 0 && (
                        <button className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                          View {comment.replies} {comment.replies === 1 ? 'reply' : 'replies'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} />
            Related Discussions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Community College Transfer Success Stories', comments: 124, type: 'discussion' },
              { title: 'Medical School Application Timeline 2024', comments: 89, type: 'resource' },
              { title: 'How to Get Research Experience as an Undergrad', comments: 56, type: 'question' },
              { title: 'Scholarships for Non-Traditional Students', comments: 203, type: 'article' }
            ].map((post, idx) => (
              <Link
                key={idx}
                href="/forum/post/2"
                className="p-4 bg-gray-900/40 rounded-xl hover:bg-gray-900/60 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                    {post.type}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <MessageSquare size={12} />
                    <span className="text-xs">{post.comments}</span>
                  </div>
                </div>
                <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}