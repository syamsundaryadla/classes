import { NextResponse } from 'next/server'
import { quizStore, resetQuiz } from '@/lib/quizStore'

export async function POST(req: Request) {
  try {
    const { action } = await req.json()

    switch (action) {
      case 'start':
        quizStore.status = 'active'
        quizStore.currentQuestionIndex = 0
        quizStore.questionStartTime = Date.now()
        // Reset player states for the new question
        quizStore.players.forEach(p => p.hasAnsweredCurrent = false)
        break
      case 'next':
        if (quizStore.currentQuestionIndex < quizStore.questions.length - 1) {
          quizStore.status = 'active'
          quizStore.currentQuestionIndex += 1
          quizStore.questionStartTime = Date.now()
          quizStore.players.forEach(p => p.hasAnsweredCurrent = false)
        } else {
          quizStore.status = 'finished'
        }
        break
      case 'leaderboard':
        quizStore.status = 'leaderboard'
        quizStore.questionStartTime = null
        break
      case 'end':
        quizStore.status = 'finished'
        break
      case 'reset':
        resetQuiz()
        break
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({ success: true, state: quizStore })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
