'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Flame, Zap } from 'lucide-react'

interface Player {
  id: string
  name: string
  score: number
  streak: number
}

interface LeaderboardProps {
  players: Player[]
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)
  const topScore = sortedPlayers[0]?.score || 1

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
          <Trophy className="h-8 w-8 text-yellow-500" /> Live Leaderboard
        </h2>
      </div>

      <AnimatePresence mode="popLayout">
        {sortedPlayers.slice(0, 10).map((player, index) => {
          const isTop3 = index < 3
          return (
            <motion.div
              layout
              key={player.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`relative flex items-center justify-between p-4 rounded-2xl border ${
                index === 0 ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.2)]' :
                index === 1 ? 'bg-gray-300/10 border-gray-300/50' :
                index === 2 ? 'bg-orange-500/10 border-orange-500/50' :
                'bg-card border-border'
              }`}
            >
              {/* Rank & Name */}
              <div className="flex items-center gap-4 z-10">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${
                  index === 0 ? 'bg-yellow-500 text-black' :
                  index === 1 ? 'bg-gray-300 text-black' :
                  index === 2 ? 'bg-orange-500 text-white' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {index + 1}
                </div>
                <div className="font-bold text-lg">{player.name}</div>
                {player.streak >= 3 && (
                  <div className="flex items-center gap-1 text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
                    <Flame className="h-3 w-3" /> {player.streak} Streak
                  </div>
                )}
              </div>

              {/* Score */}
              <div className="font-mono text-xl font-bold z-10">
                {player.score} pts
              </div>

              {/* Background Progress Bar */}
              <div 
                className="absolute left-0 top-0 bottom-0 bg-primary/5 rounded-2xl -z-0 transition-all duration-1000 ease-out"
                style={{ width: `${Math.max(10, (player.score / topScore) * 100)}%` }}
              />
            </motion.div>
          )
        })}
      </AnimatePresence>

      {players.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          Waiting for players to join...
        </div>
      )}
    </div>
  )
}
