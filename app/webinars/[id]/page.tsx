// app/webinars/[id]/page.tsx - FIXED VERSION
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Calendar, Clock, Users, Video, Download, Share2, Bookmark,
  ChevronLeft, Play, MessageCircle, ThumbsUp, BookOpen, Award,
  Globe, Zap, TrendingUp, ExternalLink, User, Mail, Phone,
  FileText, CheckCircle, Star, X as XIcon, Maximize2, Volume2, Settings
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

// Mock webinar data with video URL
const webinarData = {
  id: 1,
  title: 'How to Get into Top US Universities',
  host: {
    name: 'Dr. Sarah Johnson',
    title: 'Former Stanford Admissions Officer',
    bio: 'With over 15 years of experience in university admissions, Sarah has reviewed thousands of applications and helped hundreds of students gain admission to top universities worldwide.',
    avatar: 'SJ',
    credentials: [
      'Stanford University - Former Admissions Officer',
      'Harvard Graduate School of Education - M.Ed',
      '15+ years admissions experience',
      'Published author on college admissions'
    ]
  },
  date: '2024-03-15T14:00:00Z',
  duration: 90,
  platform: 'zoom',
  maxParticipants: 500,
  registeredParticipants: 423,
  description: 'Learn insider tips on crafting standout applications for Ivy League and top-tier US universities. This comprehensive webinar covers everything from essay writing to interview preparation.',
  detailedDescription: `
This exclusive webinar is designed to provide you with insider knowledge and proven strategies for gaining admission to top US universities. We'll cover:

• Understanding the holistic admissions process
• Crafting compelling personal statements and essays
• Building an impressive extracurricular profile
• Securing strong letters of recommendation
• Preparing for interviews (including mock interview tips)
• Financial aid and scholarship strategies
• Timeline planning for optimal results

Led by a former Stanford admissions officer, you'll get firsthand insights into what admissions committees look for and how to make your application stand out from thousands of others.
`,
  tags: ['USA', 'Admissions', 'Ivy League', 'Strategy', 'Personal Statement', 'Interview'],
  featured: true,
  recordingAvailable: true,
  videoUrl: 'https://example.com/webinar-recording.mp4', // This would come from admin upload
  videoSize: '850 MB',
  videoDuration: '1:28:15',
  slidesUrl: 'https://example.com/webinar-slides.pdf',
  slidesSize: '15 MB',
  resources: [
    { name: 'Application Checklist', type: 'PDF', size: '2.1 MB' },
    { name: 'Essay Examples', type: 'DOC', size: '3.5 MB' },
    { name: 'Interview Questions', type: 'PDF', size: '1.8 MB' },
    { name: 'Timeline Template', type: 'XLS', size: '1.2 MB' }
  ],
  topics: [
    'Holistic Admissions Process',
    'Essay Writing Strategies',
    'Extracurricular Planning',
    'Letter of Recommendation',
    'Interview Preparation',
    'Financial Aid Navigation',
    'Timeline Management'
  ],
  testimonials: [
    { name: 'Alex Chen', review: 'This webinar changed my entire approach to applications. Got into my dream school!', rating: 5 },
    { name: 'Maria Rodriguez', review: 'Incredible insights. The host answered all my questions in detail.', rating: 5 },
    { name: 'David Kim', review: 'The resources alone were worth it. Very practical and actionable advice.', rating: 4 }
  ],
  relatedWebinars: [2, 3, 5]
}

// Mock webinars data for related webinars (moved outside component)
const webinars = [
  {
    id: 1,
    title: 'How to Get into Top US Universities',
    date: '2024-03-15T14:00:00Z'
  },
  {
    id: 2,
    title: 'Scholarship Success Secrets',
    date: '2024-03-18T10:00:00Z'
  },
  {
    id: 3,
    title: 'UK University Applications 2024',
    date: '2024-03-20T16:00:00Z'
  },
  {
    id: 4,
    title: 'Visa Processing Simplified',
    date: '2024-03-22T12:00:00Z'
  },
  {
    id: 5,
    title: 'STEM Careers in Europe',
    date: '2024-03-25T15:00:00Z'
  },
  {
    id: 6,
    title: 'MBA Admissions Masterclass',
    date: '2024-03-28T11:00:00Z'
  }
]

export default function WebinarDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [isSaved, setIsSaved] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [videoProgress, setVideoProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    // In real app, fetch webinar data by ID
    console.log('Fetching webinar:', params.id)
  }, [params.id])

  const handleSave = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved' : 'Added to saved')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleDownloadVideo = async () => {
    try {
      toast.loading('Preparing video download...')
      
      // Create a mock download link for demonstration
      const link = document.createElement('a')
      link.href = webinarData.videoUrl
      link.download = `webinar-${webinarData.id}-recording.mp4`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Simulate download time
      setTimeout(() => {
        toast.dismiss()
        toast.success('Video download started!')
      }, 1500)
      
    } catch (error) {
      toast.error('Failed to download video')
    }
  }

  const handleDownloadSlides = () => {
    toast.success('Slides download started!')
  }

  const handleDownloadResource = (resourceName: string) => {
    toast.success(`Downloading ${resourceName}...`)
  }

  const handleRegister = () => {
    router.push(`/webinars/${params.id}/register`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })
  }

  const isUpcoming = new Date(webinarData.date) > new Date()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'host', label: 'Host', icon: User },
    { id: 'resources', label: 'Resources', icon: Download },
    { id: 'testimonials', label: 'Reviews', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-violet-900 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/webinars"
            className="inline-flex items-center gap-2 text-purple-200 hover:text-white mb-6 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Webinars
          </Link>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {isUpcoming ? (
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center gap-2">
                    <Zap size={16} />
                    <span className="font-bold">Upcoming</span>
                  </div>
                ) : (
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center gap-2">
                    <Video size={16} />
                    <span className="font-bold">Recording Available</span>
                  </div>
                )}
                
                {webinarData.featured && (
                  <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center gap-2">
                    <Award size={16} />
                    <span className="font-bold">Featured</span>
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {webinarData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-purple-200 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Calendar className="text-purple-300" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">{formatDate(webinarData.date)}</div>
                    <div className="text-purple-100">Date</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Clock className="text-purple-300" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">{webinarData.duration} minutes</div>
                    <div className="text-purple-100">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Users className="text-purple-300" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-xl">{webinarData.registeredParticipants} / {webinarData.maxParticipants}</div>
                    <div className="text-purple-100">Registered</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {isUpcoming ? (
                  <button
                    onClick={handleRegister}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 font-bold text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    Register Now
                  </button>
                ) : (
                  <button
                    onClick={handleDownloadVideo}
                    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 font-bold text-lg transition-all hover:scale-105 shadow-lg"
                  >
                    <Download className="inline mr-2" size={24} />
                    Download Recording
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold text-lg transition-colors flex items-center gap-2"
                >
                  <Bookmark className={isSaved ? 'fill-white' : ''} size={20} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 border-2 border-white text-white rounded-xl hover:bg-white/10 font-bold text-lg transition-colors flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video Player & Content */}
          <div className="lg:col-span-2">
            {/* Video Player */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl mb-8">
              <div className="aspect-video relative">
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform cursor-pointer"
                      onClick={() => setIsPlaying(true)}>
                      <Play className="text-white ml-2" size={48} />
                    </div>
                    <div className="text-white text-xl font-semibold">
                      {isUpcoming ? 'Webinar starts' : 'Click to watch'} {formatTime(webinarData.date)}
                    </div>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-purple-300"
                      >
                        {isPlaying ? '❚❚' : '▶'}
                      </button>
                      <div className="text-white text-sm">
                        {Math.floor(videoProgress / 60)}:{String(Math.floor(videoProgress % 60)).padStart(2, '0')} / {webinarData.videoDuration}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Volume2 size={18} className="text-white" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(parseInt(e.target.value))}
                          className="w-24 accent-purple-500"
                        />
                      </div>
                      
                      <div className="relative">
                        <button
                          onClick={() => setShowSettings(!showSettings)}
                          className="text-white hover:text-purple-300"
                        >
                          <Settings size={20} />
                        </button>
                        
                        {showSettings && (
                          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-3 min-w-[120px]">
                            <div className="text-white text-sm mb-2">Playback Speed</div>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => setPlaybackRate(rate)}
                                className={`block w-full text-left px-2 py-1 rounded text-sm ${
                                  playbackRate === rate
                                    ? 'bg-purple-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-700'
                                }`}
                              >
                                {rate}x
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <button
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-white hover:text-purple-300"
                      >
                        <Maximize2 size={20} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={videoProgress}
                      onChange={(e) => setVideoProgress(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Webinar Recording</h3>
                    <div className="flex items-center gap-4 text-gray-400 text-sm">
                      <span>{webinarData.videoDuration}</span>
                      <span>•</span>
                      <span>{webinarData.videoSize}</span>
                      <span>•</span>
                      <span>{webinarData.registeredParticipants} views</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleDownloadVideo}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-semibold flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download Video
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-gray-800 rounded-2xl shadow-xl mb-8 overflow-hidden">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-8 py-4 whitespace-nowrap transition-all ${
                        activeTab === tab.id
                          ? 'bg-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={22} />
                      <span className="font-semibold">{tab.label}</span>
                    </button>
                  )
                })}
              </div>
              
              {/* Tab Content */}
              <div className="p-8">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">About This Webinar</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {webinarData.detailedDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Topics Covered</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {webinarData.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-gray-700/50 rounded-xl">
                            <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                            <span className="text-gray-300">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Who Should Attend</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { title: 'High School Students', desc: 'Planning for undergraduate studies' },
                          { title: 'University Students', desc: 'Considering graduate school' },
                          { title: 'Parents', desc: 'Supporting children\'s education goals' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-gray-700/50 rounded-xl">
                            <div className="text-lg font-bold text-white mb-2">{item.title}</div>
                            <div className="text-gray-400 text-sm">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Host Tab */}
                {activeTab === 'host' && (
                  <div className="space-y-8">
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold">
                        {webinarData.host.avatar}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{webinarData.host.name}</h3>
                        <div className="text-purple-300 mb-4">{webinarData.host.title}</div>
                        <p className="text-gray-300">{webinarData.host.bio}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-4">Credentials</h4>
                      <div className="space-y-3">
                        {webinarData.host.credentials.map((cred, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <Award className="text-purple-400 mt-1 flex-shrink-0" size={18} />
                            <span className="text-gray-300">{cred}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources Tab */}
                {activeTab === 'resources' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6">Download Resources</h3>
                      
                      {/* Presentation Slides */}
                      <div className="mb-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <FileText className="text-blue-400" size={32} />
                            <div>
                              <h4 className="text-xl font-bold text-white">Presentation Slides</h4>
                              <div className="text-gray-400 text-sm">PDF • {webinarData.slidesSize}</div>
                            </div>
                          </div>
                          <button
                            onClick={handleDownloadSlides}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 font-semibold flex items-center gap-2"
                          >
                            <Download size={18} />
                            Download
                          </button>
                        </div>
                        <p className="text-gray-400">Complete slide deck from the webinar with all key points and examples.</p>
                      </div>

                      {/* Additional Resources */}
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4">Additional Resources</h4>
                        <div className="space-y-3">
                          {webinarData.resources.map((resource, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                              <div className="flex items-center gap-3">
                                <FileText className="text-gray-400" size={20} />
                                <div>
                                  <div className="font-medium text-white">{resource.name}</div>
                                  <div className="text-gray-400 text-sm">{resource.type} • {resource.size}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => handleDownloadResource(resource.name)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                <Download size={18} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Testimonials Tab */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {webinarData.testimonials.map((testimonial, idx) => (
                        <div key={idx} className="p-6 bg-gray-800/50 rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${
                                  i < testimonial.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-300 italic mb-4">"{testimonial.review}"</p>
                          <div className="font-bold text-white">{testimonial.name}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-8">
                      <h4 className="text-xl font-bold text-white mb-4">Average Rating: 4.8/5</h4>
                      <p className="text-gray-300">
                        Based on {webinarData.registeredParticipants} participant reviews
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action */}
            {isUpcoming ? (
              <div className="text-center">
                <button
                  onClick={handleRegister}
                  className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 font-bold text-lg transition-all hover:scale-105 shadow-lg mb-4"
                >
                  Register for Live Session
                </button>
                <p className="text-gray-400">
                  Webinar starts: {formatDate(webinarData.date)} at {formatTime(webinarData.date)}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <button
                  onClick={handleDownloadVideo}
                  className="px-12 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 font-bold text-lg transition-all hover:scale-105 shadow-lg mb-4"
                >
                  <Download className="inline mr-2" size={24} />
                  Download Full Recording
                </button>
                <p className="text-gray-400">
                  Complete recording including Q&A session
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-bold ${isUpcoming ? 'text-green-400' : 'text-blue-400'}`}>
                    {isUpcoming ? 'Upcoming' : 'Recording Available'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Date</span>
                  <span className="font-bold text-white">{formatDate(webinarData.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Time</span>
                  <span className="font-bold text-white">{formatTime(webinarData.date)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-bold text-white">{webinarData.duration} minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Platform</span>
                  <span className="font-bold text-white capitalize">{webinarData.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Spots Left</span>
                  <span className="font-bold text-white">
                    {webinarData.maxParticipants - webinarData.registeredParticipants}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {webinarData.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm hover:bg-purple-800/50 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Host Contact */}
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Contact Host</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-purple-300" />
                  <a href="#" className="text-gray-300 hover:text-white">
                    Contact via platform
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle size={18} className="text-purple-300" />
                  <a href="#" className="text-gray-300 hover:text-white">
                    Send message
                  </a>
                </div>
              </div>
            </div>

            {/* Share Options */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Share This Webinar</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-600/50 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Facebook
                </button>
                <button className="p-3 bg-blue-400/50 text-white rounded-lg hover:bg-blue-400 transition-colors">
                  Twitter
                </button>
                <button className="p-3 bg-red-500/50 text-white rounded-lg hover:bg-red-500 transition-colors">
                  WhatsApp
                </button>
                <button className="p-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Copy Link
                </button>
              </div>
            </div>

            {/* Related Webinars */}
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Related Webinars</h3>
              <div className="space-y-4">
                {webinarData.relatedWebinars.map((id) => {
                  const related = webinars.find(w => w.id === id)
                  if (!related) return null
                  
                  return (
                    <Link
                      key={id}
                      href={`/webinars/${id}`}
                      className="block p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors group"
                    >
                      <div className="font-medium text-white group-hover:text-purple-300 mb-2">
                        {related.title}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Calendar size={12} />
                        {formatDate(related.date)}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}