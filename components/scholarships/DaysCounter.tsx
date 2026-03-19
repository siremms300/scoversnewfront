'use client'

import { Clock } from 'lucide-react'
import { useState, useEffect } from 'react'

interface DaysCounterProps {
  deadline: string
}

export default function DaysCounter({ deadline }: DaysCounterProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(deadline).getTime() - Date.now()
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60)
      }
    }

    setTimeLeft(calculateTimeLeft())
    
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [deadline])

  const getUrgencyColor = () => {
    if (timeLeft.days === 0) return 'bg-red-500'
    if (timeLeft.days <= 7) return 'bg-amber-500'
    return 'bg-green-500'
  }

  return (
    <div className="flex items-center gap-2">
      <Clock size={14} className={timeLeft.days <= 7 ? 'text-red-500' : 'text-gray-500'} />
      <div className="flex items-center gap-1">
        {timeLeft.days > 0 ? (
          <>
            <span className={`px-2 py-1 rounded ${getUrgencyColor()} text-white text-xs font-bold`}>
              {timeLeft.days}d
            </span>
            <span className="text-xs text-gray-600">
              {timeLeft.hours}h {timeLeft.minutes}m
            </span>
          </>
        ) : (
          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
            LAST DAY!
          </span>
        )}
      </div>
    </div>
  )
}