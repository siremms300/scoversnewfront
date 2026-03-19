// app/experts/[id]/page.tsx - Improved Expert Profile Page
'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  User, Mail, Globe, Award, BookOpen, Users,
  MessageSquare, Share2, Calendar, MapPin, Link as LinkIcon,
  CheckCircle, Star, TrendingUp, BarChart, Clock,
  Bookmark, Heart, Target, Zap, GraduationCap, Briefcase,
  Phone, Twitter, Linkedin, Instagram, Github, Youtube,
  ChevronRight, ExternalLink, Verified, Crown, Trophy,
  Download, FileText, Video, Link as ChainLink,
  Sparkles, Eye, ThumbsUp, CalendarDays, Languages,
  Building, School, BriefcaseBusiness, Target as Bullseye
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

const expertData = {
  id: 1,
  name: 'Dr. Sarah Miller',
  role: 'Former Dean of Students, Stanford University',
  headline: 'Helping students navigate elite university admissions for 15+ years',
  bio: 'Former Stanford Dean of Students turned admissions consultant. I\'ve reviewed over 50,000 applications and helped thousands of students gain admission to top universities. Specializing in holistic application strategies, personal statement coaching, and interview preparation.',
  avatar: '/api/placeholder/200/200',
  coverImage: '/api/placeholder/1200/400',
  verified: true,
  premium: true,
  stats: {
    reputation: 12800,
    posts: 45,
    followers: 24500,
    following: 420,
    questionsAnswered: 1245,
    studentsHelped: 2800,
    successRate: '92%',
    avgResponseTime: '2.4 hours',
    engagementRate: '87%',
    communityRank: '#1'
  },
  specialties: [
    { name: 'Ivy League Admissions', icon: '🎓' },
    { name: 'Personal Statement Coaching', icon: '📝' },
    { name: 'Interview Preparation', icon: '🎤' },
    { name: 'Scholarship Strategy', icon: '💰' },
    { name: 'Holistic Applications', icon: '🌐' },
    { name: 'Career Counseling', icon: '🎯' }
  ],
  education: [
    { institution: 'Stanford University', degree: 'Ph.D. in Education', year: '2005', logo: '🎓' },
    { institution: 'Harvard University', degree: 'M.Ed. in Higher Education', year: '2002', logo: '🏛️' },
    { institution: 'University of Cambridge', degree: 'B.A. in Psychology', year: '2000', logo: '📚' }
  ],
  experience: [
    { role: 'Dean of Students', organization: 'Stanford University', duration: '2010-2022', logo: '🏫' },
    { role: 'Admissions Committee', organization: 'Harvard University', duration: '2005-2010', logo: '📊' },
    { role: 'Education Consultant', organization: 'Independent Practice', duration: '2022-Present', logo: '💼' }
  ],
  contact: {
    email: 'sarah@stanford.edu',
    website: 'www.sarahmillerconsulting.com',
    location: 'Palo Alto, California',
    languages: ['English', 'Spanish', 'Mandarin']
  },
  social: {
    twitter: '@sarah_miller_edu',
    linkedin: 'sarahmiller-edu',
    instagram: 'sarahmiller_consulting'
  },
  recentPosts: [
    { id: 1, title: 'The hidden curriculum of elite universities', likes: 2450, date: '3 days ago', views: '12.4k' },
    { id: 2, title: 'How to stand out in your Stanford application', likes: 1890, date: '1 week ago', views: '8.9k' },
    { id: 3, title: 'Scholarship strategies for international students', likes: 1560, date: '2 weeks ago', views: '15.2k' }
  ],
  achievements: [
    { title: 'Top Contributor 2023', icon: '🏆', description: 'Highest rated expert' },
    { title: 'Verified Expert', icon: '✓', description: 'Credentials verified' },
    { title: 'Community Star', icon: '⭐', description: '1000+ helpful answers' },
    { title: 'Mentor Award', icon: '👨‍🏫', description: 'Excellent mentorship' }
  ],
  availability: {
    status: 'Available for consultations',
    nextAvailable: 'Tomorrow, 2 PM EST',
    bookingLink: '/booking/sarah',
    price: '$250/hour',
    slots: 3
  },
  testimonials: [
    { student: 'Alex Chen', role: 'Harvard Medical Student', testimonial: 'Sarah helped me get into Harvard Med School. Her guidance was invaluable!', date: '2023', rating: 5 },
    { student: 'Maria Rodriguez', role: 'Stanford Graduate', testimonial: 'The best investment in my education journey. Worth every penny.', date: '2023', rating: 5 },
    { student: 'James Wilson', role: 'MIT Engineer', testimonial: 'Her insights completely changed my approach to applications.', date: '2022', rating: 5 }
  ],
  resources: [
    { title: 'Personal Statement Template', type: 'PDF', downloads: 1245, size: '2.1 MB', icon: '📄' },
    { title: 'Interview Question Bank', type: 'DOC', downloads: 892, size: '1.8 MB', icon: '📝' },
    { title: 'Scholarship Tracker', type: 'Excel', downloads: 567, size: '3.4 MB', icon: '📊' }
  ]
}

export default function ExpertProfilePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [following, setFollowing] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const handleFollow = () => {
    setFollowing(!following)
    toast.success(following ? 'Unfollowed expert' : 'Following expert!')
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast.success(bookmarked ? 'Removed bookmark' : 'Expert bookmarked!')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Sparkles size={18} /> },
    { id: 'posts', label: 'Posts', icon: <BookOpen size={18} /> },
    { id: 'resources', label: 'Resources', icon: <Download size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <Star size={18} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={18} /> }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 via-purple-900/40 to-blue-900/40" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069')] opacity-20" />
      </div>

      {/* Profile Header */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        {/* Main Profile Card */}
        <div className="bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Avatar & Badges */}
              <div className="relative flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 border-4 border-gray-900 shadow-2xl" />
                  {expertData.verified && (
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center border-4 border-gray-900 shadow-lg">
                      <Verified size={20} className="text-white" />
                    </div>
                  )}
                  {expertData.premium && (
                    <div className="absolute -top-2 -left-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Crown size={10} />
                      <span>PREMIUM</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-white">{expertData.name}</h1>
                      <div className="flex gap-2">
                        {expertData.stats.communityRank === '#1' && (
                          <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 rounded-full text-sm font-bold border border-amber-500/30 flex items-center gap-1">
                            <Trophy size={12} />
                            {expertData.stats.communityRank}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xl text-cyan-300 font-medium mb-3">{expertData.role}</p>
                    <p className="text-gray-300 mb-6 max-w-2xl">{expertData.headline}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-900/40 rounded-xl p-4 text-center hover:bg-gray-900/60 transition-colors">
                        <div className="text-2xl font-bold text-white">{expertData.stats.reputation.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Reputation</div>
                      </div>
                      <div className="bg-gray-900/40 rounded-xl p-4 text-center hover:bg-gray-900/60 transition-colors">
                        <div className="text-2xl font-bold text-white">{expertData.stats.followers.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Followers</div>
                      </div>
                      <div className="bg-gray-900/40 rounded-xl p-4 text-center hover:bg-gray-900/60 transition-colors">
                        <div className="text-2xl font-bold text-white">{expertData.stats.studentsHelped.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">Students Helped</div>
                      </div>
                      <div className="bg-gray-900/40 rounded-xl p-4 text-center hover:bg-gray-900/60 transition-colors">
                        <div className="text-2xl font-bold text-white">{expertData.stats.successRate}</div>
                        <div className="text-xs text-gray-400">Success Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleFollow}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        following
                          ? 'bg-gray-700 text-white border border-gray-600'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                      }`}
                    >
                      <User size={18} />
                      {following ? 'Following' : 'Follow Expert'}
                    </button>
                    <Link
                      href={expertData.availability.bookingLink}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all text-center"
                    >
                      Book Consultation
                    </Link>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => toast.success('Message feature coming soon!')}
                        className="flex-1 py-3 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/10 transition-colors"
                      >
                        <MessageSquare size={18} className="mx-auto" />
                      </button>
                      <button 
                        onClick={handleBookmark}
                        className={`flex-1 py-3 border rounded-xl transition-colors ${
                          bookmarked
                            ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                            : 'border-gray-600 text-gray-400 hover:bg-gray-700'
                        }`}
                      >
                        <Bookmark size={18} className="mx-auto" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                      <button className="flex-1 py-3 border border-gray-600 text-gray-400 rounded-xl hover:bg-gray-700 transition-colors">
                        <Share2 size={18} className="mx-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-700/50">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'text-cyan-400 border-b-2 border-cyan-400 bg-gradient-to-t from-cyan-500/5 to-transparent'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Bio Section */}
                <div className="bg-gray-900/40 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles size={20} />
                    About Me
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{expertData.bio}</p>
                </div>

                {/* Specialties Grid */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Bullseye size={20} />
                    Areas of Expertise
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {expertData.specialties.map((specialty, idx) => (
                      <div 
                        key={idx} 
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/30 transition-all hover:scale-[1.02]"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{specialty.icon}</span>
                          <div className="font-bold text-white">{specialty.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Experience */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Education */}
                  <div className="bg-gray-900/40 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <GraduationCap size={20} />
                      Education
                    </h3>
                    <div className="space-y-4">
                      {expertData.education.map((edu, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl">
                          <div className="text-3xl">{edu.logo}</div>
                          <div className="flex-1">
                            <div className="font-bold text-white">{edu.institution}</div>
                            <div className="text-cyan-400">{edu.degree}</div>
                            <div className="text-gray-500 text-sm mt-1">{edu.year}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="bg-gray-900/40 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <BriefcaseBusiness size={20} />
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {expertData.experience.map((exp, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl">
                          <div className="text-3xl">{exp.logo}</div>
                          <div className="flex-1">
                            <div className="font-bold text-white">{exp.role}</div>
                            <div className="text-cyan-400">{exp.organization}</div>
                            <div className="text-gray-500 text-sm mt-1">{exp.duration}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Award size={20} />
                    Achievements & Recognition
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {expertData.achievements.map((achievement, idx) => (
                      <div 
                        key={idx} 
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 text-center border border-gray-700/50 hover:border-amber-500/30 transition-all"
                      >
                        <div className="text-3xl mb-2">{achievement.icon}</div>
                        <div className="font-bold text-white text-sm">{achievement.title}</div>
                        <div className="text-gray-400 text-xs mt-1">{achievement.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Recent Contributions</h3>
                  <Link href={`/experts/${expertData.id}/posts`} className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold flex items-center gap-1">
                    View all <ChevronRight size={16} />
                  </Link>
                </div>
                {expertData.recentPosts.map((post) => (
                  <div key={post.id} className="bg-gray-900/40 rounded-xl p-6 hover:bg-gray-900/60 transition-colors group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-400">
                            <ThumbsUp size={14} />
                            <span>{post.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Eye size={14} />
                            <span>{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400">
                            <CalendarDays size={14} />
                            <span>{post.date}</span>
                          </div>
                        </div>
                      </div>
                      <Link 
                        href={`/forum/post/${post.id}`}
                        className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Free Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {expertData.resources.map((resource, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 hover:border-cyan-500/30 transition-all">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-3xl">{resource.icon}</div>
                        <div>
                          <h4 className="font-bold text-white">{resource.title}</h4>
                          <div className="text-sm text-gray-400">{resource.type} • {resource.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">{resource.downloads.toLocaleString()} downloads</div>
                        <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center pt-6">
                  <p className="text-gray-400 text-sm">More resources available for premium members</p>
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What Students Say</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {expertData.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="bg-gray-900/40 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500" />
                        <div>
                          <div className="font-bold text-white">{testimonial.student}</div>
                          <div className="text-sm text-gray-400">{testimonial.role}</div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic mb-4">"{testimonial.testimonial}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={`${
                                i < testimonial.rating ? 'text-amber-400 fill-current' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">{testimonial.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-8">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/40 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg">
                        <Mail className="text-cyan-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-400">Email</div>
                          <div className="text-white font-medium">{expertData.contact.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg">
                        <Globe className="text-cyan-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-400">Website</div>
                          <a href={`https://${expertData.contact.website}`} className="text-white font-medium hover:text-cyan-400 transition-colors">
                            {expertData.contact.website}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg">
                        <MapPin className="text-cyan-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-400">Location</div>
                          <div className="text-white font-medium">{expertData.contact.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg">
                        <Languages className="text-cyan-400" size={20} />
                        <div>
                          <div className="text-sm text-gray-400">Languages</div>
                          <div className="text-white font-medium">{expertData.contact.languages.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="bg-gray-900/40 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-3 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors">
                        <Twitter size={20} />
                        <span>{expertData.social.twitter}</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-blue-700/10 text-blue-400 rounded-lg hover:bg-blue-700/20 transition-colors">
                        <Linkedin size={20} />
                        <span>{expertData.social.linkedin}</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-pink-500/10 text-pink-400 rounded-lg hover:bg-pink-500/20 transition-colors">
                        <Instagram size={20} />
                        <span>{expertData.social.instagram}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Booking Section */}
                <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 border border-cyan-500/30">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">Book a Consultation</h3>
                      <p className="text-gray-300 mb-1">{expertData.availability.status}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-cyan-400">
                          <Calendar size={14} />
                          <span>Next: {expertData.availability.nextAvailable}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400">
                          <Clock size={14} />
                          <span>{expertData.availability.price}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Users size={14} />
                          <span>{expertData.availability.slots} slots left</span>
                        </div>
                      </div>
                    </div>
                    <Link
                      href={expertData.availability.bookingLink}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                  <div className="mt-6 pt-6 border-t border-cyan-500/20">
                    <p className="text-sm text-gray-400 text-center">
                      Includes detailed application review, personalized strategy, and 30-day follow-up support
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}





















// // app/experts/[id]/page.tsx - Author Profile Page
// 'use client'

// import { useState } from 'react'
// import { useParams } from 'next/navigation'
// import {
//   User, Mail, Globe, Award, BookOpen, Users,
//   MessageSquare, Share2, Calendar, MapPin, Link as LinkIcon,
//   CheckCircle, Star, TrendingUp, BarChart, Clock,
//   Bookmark, Heart, Target, Zap, GraduationCap, Briefcase,
//   Phone, Twitter, Linkedin, Instagram, Github, Youtube
// } from 'lucide-react'
// import Link from 'next/link'

// const expertData = {
//   id: 1,
//   name: 'Dr. Sarah Miller',
//   role: 'Former Dean of Students, Stanford University',
//   headline: 'Helping students navigate elite university admissions for 15+ years',
//   bio: 'Former Stanford Dean of Students turned admissions consultant. I\'ve reviewed over 50,000 applications and helped thousands of students gain admission to top universities. Specializing in holistic application strategies, personal statement coaching, and interview preparation.',
//   avatar: '/api/placeholder/200/200',
//   coverImage: '/api/placeholder/1200/300',
//   verified: true,
//   stats: {
//     reputation: 12800,
//     posts: 45,
//     followers: 24500,
//     following: 420,
//     questionsAnswered: 1245,
//     studentsHelped: 2800,
//     successRate: '92%',
//     avgResponseTime: '2.4 hours'
//   },
//   specialties: [
//     'Ivy League Admissions',
//     'Personal Statement Coaching',
//     'Interview Preparation',
//     'Holistic Application Strategy',
//     'Scholarship Guidance'
//   ],
//   education: [
//     { institution: 'Stanford University', degree: 'Ph.D. in Education', year: '2005' },
//     { institution: 'Harvard University', degree: 'M.Ed. in Higher Education', year: '2002' },
//     { institution: 'University of Cambridge', degree: 'B.A. in Psychology', year: '2000' }
//   ],
//   experience: [
//     { role: 'Dean of Students', organization: 'Stanford University', duration: '2010-2022' },
//     { role: 'Admissions Committee', organization: 'Harvard University', duration: '2005-2010' },
//     { role: 'Education Consultant', organization: 'Independent Practice', duration: '2022-Present' }
//   ],
//   contact: {
//     email: 'sarah@stanford.edu',
//     website: 'www.sarahmillerconsulting.com',
//     location: 'Palo Alto, California',
//     languages: ['English', 'Spanish', 'Mandarin']
//   },
//   social: {
//     twitter: '@sarah_miller_edu',
//     linkedin: 'sarahmiller-edu',
//     instagram: 'sarahmiller_consulting'
//   },
//   recentPosts: [
//     { id: 1, title: 'The hidden curriculum of elite universities', likes: 2450, date: '3 days ago' },
//     { id: 2, title: 'How to stand out in your Stanford application', likes: 1890, date: '1 week ago' },
//     { id: 3, title: 'Scholarship strategies for international students', likes: 1560, date: '2 weeks ago' }
//   ],
//   achievements: [
//     { title: 'Top Contributor 2023', icon: '🏆' },
//     { title: 'Verified Expert', icon: '✓' },
//     { title: 'Community Star', icon: '⭐' },
//     { title: '1000+ Solutions', icon: '💡' }
//   ],
//   availability: {
//     status: 'Available for consultations',
//     nextAvailable: 'Tomorrow, 2 PM EST',
//     bookingLink: '/booking/sarah'
//   },
//   testimonials: [
//     { student: 'Alex Chen', testimonial: 'Sarah helped me get into Harvard Med School. Her guidance was invaluable!', date: '2023' },
//     { student: 'Maria Rodriguez', testimonial: 'The best investment in my education journey. Worth every penny.', date: '2023' },
//     { student: 'James Wilson', testimonial: 'Her insights completely changed my approach to applications.', date: '2022' }
//   ]
// }

// export default function ExpertProfilePage() {
//   const params = useParams()
//   const [activeTab, setActiveTab] = useState('posts')
//   const [following, setFollowing] = useState(false)

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
//       {/* Cover Image */}
//       <div className="relative h-64 md:h-80">
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/50 via-purple-900/50 to-blue-900/50" />
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-4xl font-bold text-white mb-2">Expert Profile</div>
//             <div className="text-gray-300">Connect with verified education experts</div>
//           </div>
//         </div>
//       </div>

//       {/* Profile Header */}
//       <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
//           {/* Profile Info */}
//           <div className="p-8">
//             <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//               {/* Avatar */}
//               <div className="relative">
//                 <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-gray-900" />
//                 {expertData.verified && (
//                   <div className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-gray-900">
//                     <CheckCircle size={20} className="text-white" />
//                   </div>
//                 )}
//               </div>

//               {/* Main Info */}
//               <div className="flex-1">
//                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                   <div>
//                     <h1 className="text-3xl font-bold text-white">{expertData.name}</h1>
//                     <p className="text-xl text-cyan-300 font-medium">{expertData.role}</p>
//                     <p className="text-gray-400 mt-2">{expertData.headline}</p>
//                   </div>
//                   <div className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       onClick={() => setFollowing(!following)}
//                       className={`px-6 py-2 rounded-lg font-semibold transition-all ${
//                         following
//                           ? 'bg-gray-700 text-white border border-gray-600'
//                           : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90'
//                       }`}
//                     >
//                       {following ? 'Following' : 'Follow Expert'}
//                     </button>
//                     <button className="px-6 py-2 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition-colors">
//                       <MessageSquare size={20} />
//                     </button>
//                     <button className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors">
//                       <Share2 size={20} />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Stats */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//                   <div className="text-center p-4 bg-gray-900/50 rounded-xl">
//                     <div className="text-2xl font-bold text-white">{expertData.stats.reputation}</div>
//                     <div className="text-sm text-gray-400">Reputation</div>
//                   </div>
//                   <div className="text-center p-4 bg-gray-900/50 rounded-xl">
//                     <div className="text-2xl font-bold text-white">{expertData.stats.followers.toLocaleString()}</div>
//                     <div className="text-sm text-gray-400">Followers</div>
//                   </div>
//                   <div className="text-center p-4 bg-gray-900/50 rounded-xl">
//                     <div className="text-2xl font-bold text-white">{expertData.stats.questionsAnswered}</div>
//                     <div className="text-sm text-gray-400">Questions Answered</div>
//                   </div>
//                   <div className="text-center p-4 bg-gray-900/50 rounded-xl">
//                     <div className="text-2xl font-bold text-white">{expertData.stats.successRate}</div>
//                     <div className="text-sm text-gray-400">Success Rate</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="mt-8 border-b border-gray-700">
//               <div className="flex flex-wrap gap-2">
//                 {['posts', 'about', 'resources', 'testimonials', 'contact'].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     className={`px-6 py-3 font-medium transition-colors ${
//                       activeTab === tab
//                         ? 'text-cyan-400 border-b-2 border-cyan-400'
//                         : 'text-gray-400 hover:text-white'
//                     }`}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="p-8">
//             {activeTab === 'posts' && (
//               <div className="space-y-6">
//                 <h3 className="text-2xl font-bold text-white mb-6">Recent Contributions</h3>
//                 {expertData.recentPosts.map((post) => (
//                   <div key={post.id} className="p-6 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors">
//                     <div className="flex items-center justify-between mb-3">
//                       <h4 className="text-xl font-bold text-white">{post.title}</h4>
//                       <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-1 text-gray-400">
//                           <Heart size={16} />
//                           <span>{post.likes}</span>
//                         </div>
//                         <div className="text-sm text-gray-500">{post.date}</div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm">
//                         Admissions
//                       </span>
//                       <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
//                         Expert Advice
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {activeTab === 'about' && (
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-4">Biography</h3>
//                   <p className="text-gray-300 leading-relaxed">{expertData.bio}</p>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//                     <GraduationCap />
//                     Education
//                   </h3>
//                   <div className="space-y-4">
//                     {expertData.education.map((edu, idx) => (
//                       <div key={idx} className="p-4 bg-gray-900/30 rounded-xl">
//                         <div className="font-bold text-white">{edu.institution}</div>
//                         <div className="text-cyan-400">{edu.degree}</div>
//                         <div className="text-gray-500 text-sm">{edu.year}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//                     <Briefcase />
//                     Experience
//                   </h3>
//                   <div className="space-y-4">
//                     {expertData.experience.map((exp, idx) => (
//                       <div key={idx} className="p-4 bg-gray-900/30 rounded-xl">
//                         <div className="font-bold text-white">{exp.role}</div>
//                         <div className="text-cyan-400">{exp.organization}</div>
//                         <div className="text-gray-500 text-sm">{exp.duration}</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-4">Specialties</h3>
//                   <div className="flex flex-wrap gap-3">
//                     {expertData.specialties.map((specialty, idx) => (
//                       <span
//                         key={idx}
//                         className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 rounded-full border border-cyan-500/30"
//                       >
//                         {specialty}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'contact' && (
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="p-6 bg-gray-900/30 rounded-xl">
//                       <div className="flex items-center gap-3 mb-4">
//                         <Mail className="text-cyan-400" />
//                         <div>
//                           <div className="font-bold text-white">Email</div>
//                           <div className="text-gray-300">{expertData.contact.email}</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6 bg-gray-900/30 rounded-xl">
//                       <div className="flex items-center gap-3 mb-4">
//                         <Globe className="text-cyan-400" />
//                         <div>
//                           <div className="font-bold text-white">Website</div>
//                           <div className="text-gray-300">{expertData.contact.website}</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6 bg-gray-900/30 rounded-xl">
//                       <div className="flex items-center gap-3 mb-4">
//                         <MapPin className="text-cyan-400" />
//                         <div>
//                           <div className="font-bold text-white">Location</div>
//                           <div className="text-gray-300">{expertData.contact.location}</div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-6 bg-gray-900/30 rounded-xl">
//                       <div className="flex items-center gap-3 mb-4">
//                         <Users className="text-cyan-400" />
//                         <div>
//                           <div className="font-bold text-white">Languages</div>
//                           <div className="text-gray-300">{expertData.contact.languages.join(', ')}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-6">Social Media</h3>
//                   <div className="flex gap-4">
//                     <button className="p-3 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
//                       <Twitter size={24} />
//                     </button>
//                     <button className="p-3 bg-blue-700/20 text-blue-400 rounded-lg hover:bg-blue-700/30">
//                       <Linkedin size={24} />
//                     </button>
//                     <button className="p-3 bg-pink-500/20 text-pink-400 rounded-lg hover:bg-pink-500/30">
//                       <Instagram size={24} />
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-2xl font-bold text-white mb-6">Book a Consultation</h3>
//                   <div className="p-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-500/30">
//                     <div className="flex items-center justify-between mb-4">
//                       <div>
//                         <div className="font-bold text-white">{expertData.availability.status}</div>
//                         <div className="text-gray-300">Next available: {expertData.availability.nextAvailable}</div>
//                       </div>
//                       <Link
//                         href={expertData.availability.bookingLink}
//                         className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90"
//                       >
//                         Book Now
//                       </Link>
//                     </div>
//                     <div className="text-sm text-gray-400">
//                       60-minute consultations available for $250. Includes detailed review and personalized strategy.
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === 'testimonials' && (
//               <div>
//                 <h3 className="text-2xl font-bold text-white mb-6">Student Testimonials</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {expertData.testimonials.map((testimonial, idx) => (
//                     <div key={idx} className="p-6 bg-gray-900/30 rounded-xl">
//                       <div className="flex items-center gap-3 mb-4">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
//                         <div>
//                           <div className="font-bold text-white">{testimonial.student}</div>
//                           <div className="text-gray-500 text-sm">{testimonial.date}</div>
//                         </div>
//                       </div>
//                       <p className="text-gray-300 italic">"{testimonial.testimonial}"</p>
//                       <div className="flex mt-4">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <Star key={star} size={16} className="text-amber-400 fill-current" />
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }