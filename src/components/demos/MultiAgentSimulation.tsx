'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Code2, Search, CheckSquare, MessageSquare, ArrowRight, User } from 'lucide-react'

const agents = [
  { id: 'planner', name: 'Planner', icon: Brain, color: 'bg-purple-500' },
  { id: 'researcher', name: 'Researcher', icon: Search, color: 'bg-blue-500' },
  { id: 'coder', name: 'Coder', icon: Code2, color: 'bg-green-500' },
  { id: 'reviewer', name: 'Reviewer', icon: CheckSquare, color: 'bg-orange-500' },
]

export const MultiAgentSimulation = () => {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [messages, setMessages] = useState<{from: string, to: string, msg: string}[]>([])

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined
    const runSequence = async () => {
      setMessages([])
      
      // Step 1: User to Planner
      setActiveAgent('planner')
      await new Promise(r => setTimeout(r, 1000))
      
      // Step 2: Planner to Researcher
      setMessages(p => [...p, {from: 'planner', to: 'researcher', msg: 'Research latest Next.js 15 routing features.'}])
      setActiveAgent('researcher')
      await new Promise(r => setTimeout(r, 2000))
      
      // Step 3: Researcher to Planner
      setMessages(p => [...p, {from: 'researcher', to: 'planner', msg: 'Found data on Turbopack and async layouts.'}])
      setActiveAgent('planner')
      await new Promise(r => setTimeout(r, 1500))
      
      // Step 4: Planner to Coder
      setMessages(p => [...p, {from: 'planner', to: 'coder', msg: 'Write a basic Next.js 15 layout component.'}])
      setActiveAgent('coder')
      await new Promise(r => setTimeout(r, 2000))
      
      // Step 5: Coder to Reviewer
      setMessages(p => [...p, {from: 'coder', to: 'reviewer', msg: 'Here is the layout.tsx code.'}])
      setActiveAgent('reviewer')
      await new Promise(r => setTimeout(r, 2000))
      
      // Step 6: Reviewer to Coder
      setMessages(p => [...p, {from: 'reviewer', to: 'coder', msg: 'Looks good. Approved.'}])
      setActiveAgent('planner')
      await new Promise(r => setTimeout(r, 1500))
      
      // Final
      setActiveAgent(null)
    }

    runSequence()
    const interval = setInterval(runSequence, 12000)
    return () => {
      clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-3xl border border-primary/20 p-8 overflow-hidden backdrop-blur-md">
       <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-primary flex items-center justify-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Multi-Agent Orchestration
        </h3>
        <p className="text-xs text-muted-foreground mt-2">Simulating autonomous collaboration</p>
      </div>

      <div className="relative flex-1 w-full max-w-2xl mx-auto flex items-center justify-center">
        
        {/* User Node */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="h-12 w-12 rounded-full bg-background border border-muted-foreground flex items-center justify-center">
            <User className="h-6 w-6 text-muted-foreground" />
          </div>
          <span className="text-xs mt-2 font-bold text-muted-foreground">User</span>
        </div>

        {/* Agents Circle Layout */}
        <div className="relative w-64 h-64 mt-12">
          {agents.map((agent, i) => {
            const angle = (i * 90) * (Math.PI / 180)
            const x = Math.cos(angle) * 100
            const y = Math.sin(angle) * 100
            const isActive = activeAgent === agent.id

            return (
              <motion.div
                key={agent.id}
                className="absolute flex flex-col items-center"
                style={{ top: '50%', left: '50%', x: `calc(-50% + ${x}px)`, y: `calc(-50% + ${y}px)` }}
                animate={{ scale: isActive ? 1.2 : 1 }}
              >
                <div className={`h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 ${isActive ? agent.color + ' shadow-[0_0_20px_rgba(var(--primary),0.5)]' : 'bg-muted border border-border'}`}>
                  <agent.icon className={`h-8 w-8 ${isActive ? 'text-white' : 'text-muted-foreground'}`} />
                </div>
                <span className={`text-xs mt-2 font-bold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {agent.name}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Messaging Log overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-background/80 backdrop-blur-sm border rounded-xl p-4 overflow-hidden flex flex-col justify-end">
          <AnimatePresence>
            {messages.slice(-3).map((m, i) => (
              <motion.div 
                key={i + m.msg}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-xs mb-2"
              >
                <span className="font-bold uppercase text-[10px] text-muted-foreground">{m.from}</span>
                <ArrowRight className="h-3 w-3 text-primary" />
                <span className="font-bold uppercase text-[10px] text-muted-foreground mr-2">{m.to}:</span>
                <span className="text-foreground truncate">{m.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
