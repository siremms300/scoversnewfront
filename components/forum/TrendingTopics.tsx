// components/forum/TrendingTopics.tsx
import { TrendingUp, TrendingDown, Hash } from 'lucide-react'

interface TrendingTopicsProps {
  topics: {
    tag: string
    posts: number
    trend: 'up' | 'down' | 'steady'
  }[]
  selectedTags: string[]
  onTagClick: (tag: string) => void
}

export default function TrendingTopics({ topics, selectedTags, onTagClick }: TrendingTopicsProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <TrendingUp size={18} />
        Trending Topics
      </h3>
      <div className="space-y-3">
        {topics.map((topic, index) => (
          <button
            key={topic.tag}
            onClick={() => onTagClick(topic.tag)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              selectedTags.includes(topic.tag)
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30'
                : 'bg-gray-700/30 hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Hash size={14} className="text-gray-400" />
                <span className="font-medium text-white">{topic.tag}</span>
              </div>
              {topic.trend === 'up' && (
                <TrendingUp size={14} className="text-green-400" />
              )}
              {topic.trend === 'down' && (
                <TrendingDown size={14} className="text-red-400" />
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{topic.posts} discussions</span>
              <span className="text-gray-500">#{index + 1}</span>
            </div>
          </button>
        ))}
      </div>
      <button className="w-full mt-4 py-2 text-sm text-cyan-400 hover:text-cyan-300 font-semibold">
        View All Topics
      </button>
    </div>
  )
}