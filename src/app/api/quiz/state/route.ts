import { NextResponse } from 'next/server'
import { quizStore } from '@/lib/quizStore'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Server-side timer enforcement: if question time has elapsed, auto-move to leaderboard
  if (
    quizStore.status === 'active' &&
    quizStore.questionStartTime !== null
  ) {
    const currentQuestion = quizStore.questions[quizStore.currentQuestionIndex]
    if (currentQuestion) {
      const elapsed = Date.now() - quizStore.questionStartTime
      if (elapsed >= currentQuestion.timeLimit * 1000) {
        quizStore.status = 'leaderboard'
        quizStore.questionStartTime = null
      }
    }
  }

  return NextResponse.json(quizStore)
}
