// components/forum/ForumPost.tsx
import { 
  ChevronUp, ChevronDown, MessageSquare, Share2, 
  Bookmark, Eye, MoreVertical, Award, Zap, 
  BookOpen, Users, Target, CheckCircle, FileText
} from 'lucide-react'
import Link from 'next/link'

interface ForumPostProps {
  post: {
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
  index: number
}

export default function ForumPost({ post, index }: ForumPostProps) {
  const getTypeIcon = () => {
    switch (post.type) {
      case 'article': return <BookOpen size={16} />
      case 'question': return <MessageSquare size={16} />
      case 'discussion': return <Users size={16} />
      case 'resource': return <Zap size={16} />
    }
  }

  const getTypeColor = () => {
    switch (post.type) {
      case 'article': return 'text-purple-400 bg-purple-500/10 border-purple-500/20'
      case 'question': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
      case 'discussion': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      case 'resource': return 'text-green-400 bg-green-500/10 border-green-500/20'
    }
  }

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-cyan-500/5">
      <div className="p-6">
        {/* Post Header */}
        <div className="flex items-start gap-4">
          {/* Vote Section */}
          <div className="flex flex-col items-center w-12">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <ChevronUp size={20} className="text-gray-400 hover:text-green-400" />
            </button>
            <div className="my-2 font-bold text-white">
              {post.stats.upvotes - post.stats.downvotes > 0 ? '+' : ''}
              {post.stats.upvotes - post.stats.downvotes}
            </div>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
              <ChevronDown size={20} className="text-gray-400 hover:text-red-400" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Type & Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getTypeColor()}`}>
                {getTypeIcon()}
                {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
              </span>
              
              {post.isPinned && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/30">
                  📌 Pinned
                </span>
              )}
              
              {post.isFeatured && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30">
                  ⭐ Featured
                </span>
              )}
              
              {post.solved && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30">
                  <CheckCircle size={12} className="inline mr-1" />
                  Solved
                </span>
              )}
              
              {post.bounty && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                  <Award size={12} className="inline mr-1" />
                  ${post.bounty} Bounty
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 hover:text-cyan-300 transition-colors cursor-pointer">
              <Link href={`/forum/post/${post.id}`}>{post.title}</Link>
            </h3>

            {/* Content Preview */}
            <p className="text-gray-300 mb-4 line-clamp-2">{post.content}</p>

            {/* Attachments */}
            {post.attachments && post.attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-2 bg-gray-700/50 rounded-lg flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
                  >
                    <FileText size={14} />
                    <span>{attachment.title}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/forum/tag/${tag.toLowerCase()}`}
                  className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-700/50">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{post.author.name}</span>
                    {post.author.verified && (
                      <span className="text-xs px-1.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full">
                        ✓
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {post.author.role} • {post.author.reputation} rep
                  </div>
                </div>
                <span className="text-gray-500">•</span>
                <div className="text-sm text-gray-400">{post.timestamp}</div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <MessageSquare size={16} />
                  <span className="text-sm">{post.stats.comments}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Share2 size={16} />
                  <span className="text-sm">{post.stats.shares}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye size={16} />
                  <span className="text-sm">{post.stats.views.toLocaleString()}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <Bookmark size={16} />
                </button>
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}