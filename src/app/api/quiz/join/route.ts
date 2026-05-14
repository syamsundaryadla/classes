import { NextResponse } from 'next/server'
import { quizStore } from '@/lib/quizStore'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { name, code } = await req.json()

    if (!name || name.trim() === '') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (code !== quizStore.accessCode) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 400 })
    }

    // Check if player already exists by name
    const existingPlayer = quizStore.players.find(p => p.name.toLowerCase() === name.toLowerCase())
    if (existingPlayer) {
      return NextResponse.json({ success: true, playerId: existingPlayer.id })
    }

    const newPlayer = {
      id: crypto.randomUUID(),
      name: name.trim(),
      score: 0,
      streak: 0,
      hasAnsweredCurrent: false
    }

    quizStore.players.push(newPlayer)

    return NextResponse.json({ success: true, playerId: newPlayer.id })
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
