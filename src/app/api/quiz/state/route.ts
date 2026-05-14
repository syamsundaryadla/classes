import { NextResponse } from 'next/server'
import { quizStore } from '@/lib/quizStore'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(quizStore)
}
