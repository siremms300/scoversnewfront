// components/forum/CommunityStats.tsx
import { Users, MessageSquare, Award, Zap, TrendingUp } from 'lucide-react'

export default function CommunityStats() {
  return (
    <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20">
      <h3 className="font-bold text-white mb-4">Community Stats</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Users size={20} className="text-cyan-400" />
            </div>
            <div>
              <div className="text-white font-bold">50,284</div>
              <div className="text-sm text-gray-400">Members</div>
            </div>
          </div>
          <TrendingUp size={16} className="text-green-400" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <MessageSquare size={20} className="text-purple-400" />
            </div>
            <div>
              <div className="text-white font-bold">124,567</div>
              <div className="text-sm text-gray-400">Discussions</div>
            </div>
          </div>
          <TrendingUp size={16} className="text-green-400" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Award size={20} className="text-amber-400" />
            </div>
            <div>
              <div className="text-white font-bold">12,456</div>
              <div className="text-sm text-gray-400">Solved Questions</div>
            </div>
          </div>
          <TrendingUp size={16} className="text-green-400" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Zap size={20} className="text-green-400" />
            </div>
            <div>
              <div className="text-white font-bold">8,923</div>
              <div className="text-sm text-gray-400">Resources Shared</div>
            </div>
          </div>
          <TrendingUp size={16} className="text-green-400" />
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-cyan-500/20">
        <div className="text-sm text-cyan-300 font-semibold text-center">
          Live Community Updates
        </div>
      </div>
    </div>
  )
}