'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Brain, Wrench, Search, Calculator, CloudRain, ArrowRight, CheckCircle2 } from 'lucide-react'

const tools = [
  { id: 'search', icon: Search, label: 'Web Search' },
  { id: 'calc', icon: Calculator, label: 'Calculator' },
  { id: 'weather', icon: CloudRain, label: 'Weather API' },
]

export const AgentSimulation = () => {
  const [step, setStep] = useState(0)

  // Auto-play simulation
  useEffect(() => {
    if (step < 7) {
      const timer = setTimeout(() => setStep(s => s + 1), 2500)
      return () => clearTimeout(timer)
    }
  }, [step])

  const reset = () => setStep(0)

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-3xl border border-primary/20 p-8 backdrop-blur-md cursor-pointer" onClick={reset}>
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-primary flex items-center justify-center gap-2">
          <Brain className="h-6 w-6" />
          ReAct Agent Loop
        </h3>
        <p className="text-xs text-muted-foreground mt-2">Click anywhere to restart simulation</p>
      </div>

      <div className="flex-1 relative max-w-xl mx-auto w-full">
        <AnimatePresence mode="popLayout">
          {/* User Prompt */}
          {step >= 0 && (
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-4 mb-6"
            >
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <div className="bg-muted p-4 rounded-2xl rounded-tl-none border">
                <p className="text-sm font-medium">"What is the current temperature in New York divided by 2?"</p>
              </div>
            </motion.div>
          )}

          {/* Thought 1 */}
          {step >= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-end gap-2 mb-6"
            >
              <div className="bg-primary/10 border border-primary/30 p-3 rounded-2xl rounded-tr-none w-3/4">
                <p className="text-xs font-mono text-primary mb-1 uppercase font-bold">Thought 1</p>
                <p className="text-sm">I need to find the current temperature in New York first. I will use the Weather API tool.</p>
              </div>
            </motion.div>
          )}

          {/* Action 1 */}
          {step >= 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="flex items-center gap-3 bg-card border shadow-lg p-3 rounded-xl">
                <Wrench className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-bold font-mono">Action: weather_api</span>
                <span className="text-xs text-muted-foreground">{`{"location": "New York"}`}</span>
              </div>
            </motion.div>
          )}

          {/* Observation 1 */}
          {step >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-4 mb-6"
            >
              <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-2xl rounded-tl-none w-3/4 ml-14">
                <p className="text-xs font-mono text-green-500 mb-1 uppercase font-bold">Observation 1</p>
                <p className="text-sm">The current temperature in New York is 24°C.</p>
              </div>
            </motion.div>
          )}

          {/* Thought 2 */}
          {step >= 4 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-end gap-2 mb-6"
            >
              <div className="bg-primary/10 border border-primary/30 p-3 rounded-2xl rounded-tr-none w-3/4">
                <p className="text-xs font-mono text-primary mb-1 uppercase font-bold">Thought 2</p>
                <p className="text-sm">Now I need to divide 24 by 2. I will use the Calculator tool.</p>
              </div>
            </motion.div>
          )}

          {/* Action 2 */}
          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-6"
            >
              <div className="flex items-center gap-3 bg-card border shadow-lg p-3 rounded-xl">
                <Wrench className="h-4 w-4 text-orange-500" />
                <span className="text-xs font-bold font-mono">Action: calculator</span>
                <span className="text-xs text-muted-foreground">{`{"expr": "24 / 2"}`}</span>
              </div>
            </motion.div>
          )}

          {/* Final Response */}
          {step >= 6 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center mt-8 pt-6 border-t border-primary/20"
            >
               <div className="bg-primary text-primary-foreground p-6 rounded-3xl text-center max-w-sm shadow-2xl">
                 <CheckCircle2 className="h-8 w-8 mx-auto mb-3 opacity-80" />
                 <p className="font-bold text-lg">"The current temperature in New York divided by 2 is 12."</p>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Available Tools Display */}
      <div className="flex justify-center gap-4 mt-auto pt-8">
        {tools.map(t => (
          <div key={t.id} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${
            (step === 2 && t.id === 'weather') || (step === 5 && t.id === 'calc')
            ? 'bg-orange-500/20 border-orange-500 text-orange-500 scale-110 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
            : 'bg-background text-muted-foreground'
          } transition-all duration-300`}>
            <t.icon className="h-3 w-3" />
            {t.label}
          </div>
        ))}
      </div>
    </div>
  )
}
