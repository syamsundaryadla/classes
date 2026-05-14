'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Binary, Crosshair } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const points = [
  { id: 1, text: "King", x: 80, y: 20, color: "bg-blue-500", cluster: "Royalty" },
  { id: 2, text: "Queen", x: 85, y: 25, color: "bg-blue-500", cluster: "Royalty" },
  { id: 3, text: "Prince", x: 75, y: 30, color: "bg-blue-500", cluster: "Royalty" },
  
  { id: 4, text: "Dog", x: 20, y: 80, color: "bg-green-500", cluster: "Animals" },
  { id: 5, text: "Cat", x: 25, y: 85, color: "bg-green-500", cluster: "Animals" },
  { id: 6, text: "Wolf", x: 15, y: 75, color: "bg-green-500", cluster: "Animals" },
  
  { id: 7, text: "Car", x: 80, y: 80, color: "bg-orange-500", cluster: "Vehicles" },
  { id: 8, text: "Truck", x: 85, y: 75, color: "bg-orange-500", cluster: "Vehicles" },
  { id: 9, text: "Bus", x: 75, y: 85, color: "bg-orange-500", cluster: "Vehicles" },
]

export const VectorEmbeddingVisualizer = () => {
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const [query, setQuery] = useState<{x: number, y: number} | null>(null)

  useEffect(() => {
    const runDemo = async () => {
      // Sequence: highlight clusters, then do a query
      await new Promise(r => setTimeout(r, 2000))
      
      // Query "Puppy"
      setQuery({ x: 22, y: 82 })
      await new Promise(r => setTimeout(r, 4000))
      setQuery(null)
    }
    
    runDemo()
    const int = setInterval(runDemo, 8000)
    return () => clearInterval(int)
  }, [])

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-3xl border border-primary/20 p-8 overflow-hidden backdrop-blur-md">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-primary flex items-center justify-center gap-2">
          <Binary className="h-6 w-6" />
          Semantic Vector Space (2D Projection)
        </h3>
        <p className="text-xs text-muted-foreground mt-2">Words with similar meanings are mapped closely together.</p>
      </div>

      <div className="relative flex-1 w-full max-w-lg mx-auto bg-background/50 border rounded-2xl overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10 pointer-events-none">
          {Array.from({length: 100}).map((_, i) => (
            <div key={i} className="border-[0.5px] border-primary" />
          ))}
        </div>

        {/* Query Point */}
        {query && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute flex flex-col items-center z-20"
            style={{ left: `${query.x}%`, top: `${query.y}%` }}
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" style={{ transform: 'scale(4)' }} />
            <Crosshair className="h-6 w-6 text-red-500 -translate-x-1/2 -translate-y-1/2 absolute" />
            <span className="text-xs font-bold text-red-500 absolute top-4 whitespace-nowrap bg-background px-2 py-0.5 rounded border border-red-500">Query: "Puppy"</span>
          </motion.div>
        )}

        {/* Data Points */}
        {points.map(p => {
          const isNearest = query && Math.abs(p.x - query.x) < 10 && Math.abs(p.y - query.y) < 10
          
          return (
            <motion.div
              key={p.id}
              className="absolute group z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => setActivePoint(p.id)}
              onMouseLeave={() => setActivePoint(null)}
              animate={{
                scale: activePoint === p.id || isNearest ? 1.5 : 1,
                opacity: query && !isNearest ? 0.3 : 1
              }}
            >
              <div className={`h-3 w-3 rounded-full ${p.color} -translate-x-1/2 -translate-y-1/2 cursor-pointer shadow-lg`} />
              <div className={`absolute top-2 left-2 bg-background/90 px-2 py-1 rounded text-[10px] font-bold border transition-opacity ${activePoint === p.id || isNearest ? 'opacity-100' : 'opacity-0'}`}>
                {p.text}
                <div className="text-[8px] text-muted-foreground font-mono font-normal">[{p.x / 100}, {p.y / 100}, ...]</div>
              </div>
            </motion.div>
          )
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-background/80 p-3 rounded-xl border backdrop-blur-sm">
          <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Clusters</div>
          <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-blue-500" /> Royalty</div>
          <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-green-500" /> Animals</div>
          <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-orange-500" /> Vehicles</div>
        </div>
      </div>
    </div>
  )
}
