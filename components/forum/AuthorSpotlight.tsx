// components/forum/AuthorSpotlight.tsx
import { Award, TrendingUp, UserPlus } from 'lucide-react'
import Link from 'next/link'

interface AuthorSpotlightProps {
  authors: {
    id: number
    name: string
    role: string
    reputation: number
    articles: number
    followers: number
    specialty: string
    verified: boolean
  }[]
}

export default function AuthorSpotlight({ authors }: AuthorSpotlightProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Award size={18} className="text-amber-500" />
          Expert Spotlight
        </h3>
        <Link href="/experts" className="text-sm text-cyan-400 hover:text-cyan-300">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {authors.map((author) => (
          <Link
            key={author.id}
            href={`/experts/${author.id}`}
            className="block p-4 bg-gray-700/30 rounded-xl hover:bg-gray-700/50 transition-colors group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                {author.verified && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">✓</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {author.name}
                </h4>
                <div className="text-sm text-gray-400">{author.role}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-lg font-bold text-white">{author.reputation}</div>
                <div className="text-xs text-gray-400">Rep</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{author.articles}</div>
                <div className="text-xs text-gray-400">Posts</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white">{author.followers.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <div className="text-xs text-gray-400">Specializes in</div>
              <div className="text-sm text-cyan-400">{author.specialty}</div>
            </div>
          </Link>
        ))}
      </div>
      <button className="w-full mt-4 py-2.5 bg-gray-700/50 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
        <UserPlus size={16} />
        Follow Experts
      </button>
    </div>
  )
}