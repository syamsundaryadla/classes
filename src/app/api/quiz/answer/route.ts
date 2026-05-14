import { NextResponse } from 'next/server'
import { quizStore } from '@/lib/quizStore'

export async function POST(req: Request) {
  try {
    const { playerId, answerIndex } = await req.json()

    if (!playerId) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 })
    }

    const player = quizStore.players.find(p => p.id === playerId)
    if (!player) {
      return NextResponse.json({ error: 'Player not found' }, { status: 404 })
    }

    if (quizStore.status !== 'active') {
      return NextResponse.json({ error: 'Quiz is not currently active' }, { status: 400 })
    }

    if (player.hasAnsweredCurrent) {
      return NextResponse.json({ error: 'Already answered' }, { status: 400 })
    }

    const currentQuestion = quizStore.questions[quizStore.currentQuestionIndex]
    if (!currentQuestion) {
      return NextResponse.json({ error: 'Question not found' }, { status: 400 })
    }

    const isCorrect = answerIndex === currentQuestion.correctIndex
    
    // Calculate speed bonus
    const timeElapsed = Date.now() - (quizStore.questionStartTime || Date.now())
    const timeLimitMs = currentQuestion.timeLimit * 1000
    const timeRemainingRatio = Math.max(0, 1 - (timeElapsed / timeLimitMs))
    
    if (isCorrect) {
      player.streak += 1
      const basePoints = 100
      const speedBonus = Math.floor(timeRemainingRatio * 50)
      const streakBonus = Math.min(player.streak * 10, 50) // Max 50 streak bonus
      
      player.score += basePoints + speedBonus + streakBonus
    } else {
      player.streak = 0
    }

    player.hasAnsweredCurrent = true

    // Auto-advance to leaderboard only if the timer has fully elapsed server-side.
    // This means 50+ players can all still answer before time is up.
    // The admin can also manually trigger leaderboard at any time.
    if (timeElapsed >= timeLimitMs) {
      quizStore.status = 'leaderboard'
      quizStore.questionStartTime = null
    }

    return NextResponse.json({ success: true, isCorrect, score: player.score })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
