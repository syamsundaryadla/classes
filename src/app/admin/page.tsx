'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaderboard } from '@/components/quiz/Leaderboard'
import { ShieldAlert, Play, FastForward, Square, RotateCcw, Users } from 'lucide-react'
import type { QuizState } from '@/lib/quizStore'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, setState] = useState<QuizState | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@gmail.com' && password === 'admin') {
      setIsAuthenticated(true)
    } else {
      alert('Invalid credentials')
    }
  }

  // Poll state every 1 second
  useEffect(() => {
    if (!isAuthenticated) return

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
  }, [isAuthenticated])

  const sendAction = async (action: string) => {
    await fetch('/api/quiz/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md bg-card/50 backdrop-blur-xl border-primary/20">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
              <ShieldAlert className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Email</label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@gmail.com" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">Password</label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!state) return <div className="p-8">Loading state...</div>

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Quiz Control Center</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-2">
              Access Code: <span className="font-mono text-primary font-bold">{state.accessCode}</span>
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-muted border rounded-xl">
              <Users className="h-5 w-5 text-blue-500" />
              <span className="font-bold">{state.players.length} Players</span>
            </div>
            <div className="px-4 py-2 bg-muted border rounded-xl font-bold uppercase text-sm">
              Status: <span className={state.status === 'active' ? 'text-green-500' : 'text-orange-500'}>{state.status}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="col-span-1 border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex flex-col">
              <Button onClick={() => sendAction('start')} disabled={state.status === 'active'} className="w-full justify-start gap-2">
                <Play className="h-4 w-4" /> Start Quiz
              </Button>
              <Button onClick={() => sendAction('leaderboard')} disabled={state.status === 'leaderboard'} variant="secondary" className="w-full justify-start gap-2">
                <Users className="h-4 w-4" /> Show Leaderboard
              </Button>
              <Button onClick={() => sendAction('next')} disabled={state.status !== 'leaderboard'} variant="secondary" className="w-full justify-start gap-2">
                <FastForward className="h-4 w-4" /> Push Next Question
              </Button>
              <div className="h-px bg-border my-2" />
              <Button onClick={() => sendAction('end')} variant="destructive" className="w-full justify-start gap-2">
                <Square className="h-4 w-4" /> End Quiz
              </Button>
              <Button onClick={() => sendAction('reset')} variant="outline" className="w-full justify-start gap-2 text-red-500 hover:text-red-600">
                <RotateCcw className="h-4 w-4" /> Reset All Data
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-3 border-primary/20 bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Live Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {state.status === 'active' ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-xl text-primary">Q{state.currentQuestionIndex + 1}: {state.questions[state.currentQuestionIndex].text}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-xl">
                      <div className="text-sm text-muted-foreground uppercase font-bold mb-1">Answers Received</div>
                      <div className="text-3xl font-mono">{state.players.filter(p => p.hasAnsweredCurrent).length} / {state.players.length}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <Leaderboard players={state.players} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
