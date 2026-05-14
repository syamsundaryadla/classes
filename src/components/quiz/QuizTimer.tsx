'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface QuizTimerProps {
  startTime: number
  timeLimit: number // in seconds
  onTimeUp: () => void
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ startTime, timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000
      const remaining = Math.max(0, timeLimit - elapsed)
      setTimeLeft(Math.ceil(remaining))

      if (remaining <= 0) {
        clearInterval(interval)
        onTimeUp()
      }
    }, 100)

    return () => clearInterval(interval)
  }, [startTime, timeLimit, onTimeUp])

  const progress = timeLeft / timeLimit
  const circumference = 2 * Math.PI * 40 // r = 40

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          className="text-muted/30"
        />
        <motion.circle
          cx="48"
          cy="48"
          r="40"
          stroke="currentColor"
          strokeWidth="6"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress * circumference}
          className={`transition-all duration-100 ease-linear ${timeLeft <= 5 ? 'text-red-500' : 'text-primary'}`}
        />
      </svg>
      <div className={`absolute text-2xl font-bold font-mono ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-foreground'}`}>
        {timeLeft}
      </div>
    </div>
  )
}
