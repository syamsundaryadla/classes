'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { QuizTimer } from '@/components/quiz/QuizTimer'
import { Leaderboard } from '@/components/quiz/Leaderboard'
import { Gamepad2, Brain, Loader2, Trophy, ArrowRight } from 'lucide-react'
import type { QuizState } from '@/lib/quizStore'

export default function QuizPage() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [state, setState] = useState<QuizState | null>(null)
  const [localScore, setLocalScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Poll state every 1 second
  useEffect(() => {
    if (!playerId) return

    const fetchState = async () => {
      try {
        const res = await fetch('/api/quiz/state')
        const data = await res.json()
        setState(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchState()
    const int = setInterval(fetchState, 1000)
    return () => clearInterval(int)
  }, [playerId])

  // Reset local answer state when question changes
  useEffect(() => {
    setSelectedOption(null)
    setIsCorrect(null)
  }, [state?.currentQuestionIndex])

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/quiz/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, code })
      })
      const data = await res.json()
      if (data.success) {
        setPlayerId(data.playerId)
      } else {
        alert(data.error)
      }
    } catch (err) {
      alert('Error joining quiz')
    }
  }

  const submitAnswer = async (index: number | null) => {
    if (selectedOption !== null || !playerId || !state || state.status !== 'active') return
    
    setSelectedOption(index)

    try {
      const res = await fetch('/api/quiz/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, answerIndex: index })
      })
      const data = await res.json()
      if (data.success) {
        setIsCorrect(data.isCorrect)
        setLocalScore(data.score)
      }
    } catch (err) {
      console.error('Error submitting answer')
    }
  }

  if (!playerId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 pattern-dots pointer-events-none" />
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-2xl border-primary/20 shadow-2xl relative z-10">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto bg-primary/10 p-4 rounded-3xl w-fit transform -rotate-6">
                <Gamepad2 className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight">Join Quiz</h1>
              <p className="text-muted-foreground text-sm">Enter the code provided by your instructor.</p>
            </div>
            <form onSubmit={handleJoin} className="space-y-4 pt-4">
              <Input 
                placeholder="Access Code (e.g. RAG2026)" 
                value={code} 
                onChange={e => setCode(e.target.value.toUpperCase())}
                className="text-center text-lg uppercase font-bold tracking-widest h-12"
                required 
              />
              <Input 
                placeholder="Your Name" 
                value={name} 
                onChange={e => setName(e.target.value)}
                className="text-center text-lg h-12"
                required 
              />
              <Button type="submit" size="lg" className="w-full text-lg h-14 group">
                Enter Arena <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!state) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  const currentPlayer = state.players.find(p => p.id === playerId)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-primary/20 bg-card/50 backdrop-blur flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Brain className="h-6 w-6 text-primary" /> AI Masterclass Quiz
        </div>
        <div className="flex gap-4 items-center">
          <div className="px-3 py-1 rounded-full bg-muted text-sm font-bold">{currentPlayer?.name}</div>
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono font-bold text-sm">
            {currentPlayer?.score || localScore} pts
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          
          {state.status === 'waiting' && (
            <motion.div 
              key="waiting"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -50 }}
              className="text-center space-y-6"
            >
              <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
              <h2 className="text-3xl font-bold">You're in!</h2>
              <p className="text-xl text-muted-foreground">See your name on the main screen.</p>
              <p className="text-sm">Waiting for host to start...</p>
            </motion.div>
          )}

          {state.status === 'active' && state.questionStartTime && (
            <motion.div 
              key={`q-${state.currentQuestionIndex}`}
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="w-full space-y-8 flex flex-col items-center"
            >
              <div className="flex justify-between items-end w-full">
                <div className="text-primary font-bold tracking-widest uppercase text-sm">Question {state.currentQuestionIndex + 1} of {state.questions.length}</div>
                {!currentPlayer?.hasAnsweredCurrent && (
                   <QuizTimer 
                     startTime={state.questionStartTime} 
                     timeLimit={state.questions[state.currentQuestionIndex].timeLimit} 
                     onTimeUp={() => submitAnswer(null)} 
                   />
                )}
              </div>
              
              <h2 className="text-2xl md:text-4xl font-bold text-center leading-tight">
                {state.questions[state.currentQuestionIndex].text}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-8">
                {state.questions[state.currentQuestionIndex].options.map((opt, i) => {
                  const isSelected = selectedOption === i
                  const showResult = currentPlayer?.hasAnsweredCurrent
                  const isCorrectAnswer = state.questions[state.currentQuestionIndex].correctIndex === i

                  let btnClass = "bg-card border-primary/20 hover:border-primary/50 text-foreground"
                  
                  if (showResult) {
                     if (isCorrectAnswer) btnClass = "bg-green-500 text-white border-green-600 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                     else if (isSelected) btnClass = "bg-red-500 text-white border-red-600 opacity-50"
                     else btnClass = "bg-card opacity-50"
                  } else if (isSelected) {
                     btnClass = "bg-primary text-primary-foreground border-primary"
                  }

                  return (
                    <Button 
                      key={i} 
                      onClick={() => submitAnswer(i)}
                      disabled={currentPlayer?.hasAnsweredCurrent}
                      className={`h-auto min-h-20 p-6 text-lg justify-start text-left whitespace-normal transition-all duration-300 ${btnClass}`}
                      variant="outline"
                    >
                      <span className="w-8 h-8 rounded bg-background/20 flex items-center justify-center mr-4 shrink-0 font-bold">
                        {['A', 'B', 'C', 'D'][i]}
                      </span>
                      {opt}
                    </Button>
                  )
                })}
              </div>

              {currentPlayer?.hasAnsweredCurrent && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-6 rounded-2xl w-full max-w-sm mx-auto font-bold text-xl ${isCorrect ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}
                >
                  {isCorrect ? 'Correct! + Points added' : 'Incorrect.'}
                  <div className="text-sm font-normal text-muted-foreground mt-2">Waiting for others...</div>
                </motion.div>
              )}
            </motion.div>
          )}

          {(state.status === 'leaderboard' || state.status === 'finished') && (
            <motion.div 
              key="leaderboard"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              {state.status === 'finished' && (
                <div className="mb-8 text-center animate-bounce">
                  <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-4xl font-bold text-yellow-500">Quiz Complete!</h2>
                </div>
              )}
              <Leaderboard players={state.players} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  )
}
