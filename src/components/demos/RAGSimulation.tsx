'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Scissors, Binary, Database, Search, Brain, MessageSquare, ArrowRight, Layers, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const steps = [
  { id: 1, title: 'Document Ingestion', icon: FileText, desc: 'PDF uploaded & parsed' },
  { id: 2, title: 'Chunking', icon: Scissors, desc: 'Split into smaller segments' },
  { id: 3, title: 'Embeddings', icon: Binary, desc: 'Convert text to vectors' },
  { id: 4, title: 'Vector DB', icon: Database, desc: 'Store high-dimensional data' },
  { id: 5, title: 'User Query', icon: MessageSquare, desc: 'User asks a question' },
  { id: 6, title: 'Semantic Search', icon: Search, desc: 'Find similar vectors' },
  { id: 7, title: 'Re-ranking', icon: Layers, desc: 'Order by relevance' },
  { id: 8, title: 'Augmentation', icon: Brain, desc: 'Inject context to prompt' },
  { id: 9, title: 'LLM Response', icon: MessageSquare, desc: 'Generate final answer' },
]

export const RAGSimulation = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length))
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1))
  const handleReset = () => setCurrentStep(1)

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-3xl border border-primary/20 overflow-hidden backdrop-blur-md">
      {/* Simulation Header */}
      <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-muted/20">
        <div className="font-bold text-lg text-primary flex items-center gap-2">
          <Database className="h-5 w-5" />
          RAG Pipeline Simulator
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={currentStep === 1}>Previous</Button>
          <Button variant="default" size="sm" onClick={handleNext} disabled={currentStep === steps.length}>Next Step</Button>
          <Button variant="ghost" size="sm" onClick={handleReset}>Reset</Button>
        </div>
      </div>

      {/* Main Visualization Area */}
      <div className="flex-1 relative p-8 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-10">
          <div className="h-1 w-full bg-muted absolute top-1/2 -translate-y-1/2 -z-10 rounded-full" />
          {steps.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center gap-2">
              <motion.div 
                className={`h-4 w-4 rounded-full ${currentStep >= step.id ? 'bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]' : 'bg-muted border border-foreground/20'}`}
                initial={false}
                animate={{ scale: currentStep === step.id ? 1.5 : 1 }}
              />
              <span className={`text-[10px] uppercase font-bold ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground opacity-50'}`}>
                {idx + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Central Visualization */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6 mt-12 w-full max-w-2xl"
          >
            {/* Step Icon & Title */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-24 w-24 rounded-3xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(var(--primary),0.2)]">
                {React.createElement(steps[currentStep - 1].icon, { size: 48, className: "animate-pulse" })}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{steps[currentStep - 1].title}</h2>
                <p className="text-lg text-muted-foreground">{steps[currentStep - 1].desc}</p>
              </div>
            </div>

            {/* Dynamic Visuals based on Step */}
            <div className="w-full h-48 bg-background/50 rounded-2xl border border-primary/10 flex items-center justify-center p-6 overflow-hidden relative">
              {currentStep === 1 && (
                 <motion.div className="flex flex-col gap-2 w-3/4" initial={{opacity:0}} animate={{opacity:1}}>
                   <div className="h-4 w-full bg-muted rounded animate-pulse" />
                   <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                   <div className="h-4 w-4/6 bg-muted rounded animate-pulse" />
                 </motion.div>
              )}
              {currentStep === 2 && (
                 <div className="flex gap-4">
                   {[1,2,3].map(i => (
                     <motion.div key={i} initial={{y: 50, opacity: 0}} animate={{y:0, opacity:1}} transition={{delay: i*0.1}} className="h-20 w-16 bg-blue-500/20 border border-blue-500/50 rounded-lg flex items-center justify-center text-xs">
                       Chunk {i}
                     </motion.div>
                   ))}
                 </div>
              )}
              {currentStep === 3 && (
                 <div className="flex flex-col gap-2 w-full max-w-md">
                   {[1,2].map(i => (
                     <motion.div key={i} className="flex items-center gap-4 w-full" initial={{opacity:0}} animate={{opacity:1}}>
                       <div className="h-8 w-1/4 bg-blue-500/20 rounded flex items-center justify-center text-[10px]">Chunk {i}</div>
                       <ArrowRight className="h-4 w-4 text-muted-foreground" />
                       <div className="flex-1 font-mono text-[10px] text-green-500 bg-black/50 p-2 rounded truncate">
                         [0.12, -0.05, 0.99, ... 1536d]
                       </div>
                     </motion.div>
                   ))}
                 </div>
              )}
              {currentStep === 4 && (
                 <motion.div className="relative h-32 w-32" initial={{rotateY: -90}} animate={{rotateY: 0}} transition={{type: "spring"}}>
                   <Database className="w-full h-full text-purple-500" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Binary className="h-8 w-8 text-white animate-pulse" />
                   </div>
                 </motion.div>
              )}
              {currentStep === 5 && (
                 <motion.div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-none max-w-xs" initial={{scale: 0}} animate={{scale:1}}>
                   "What is the company's Q3 revenue?"
                 </motion.div>
              )}
              {currentStep === 6 && (
                 <div className="flex items-center gap-8 w-full justify-center">
                   <motion.div className="font-mono text-[10px] text-green-500 bg-black/50 p-2 rounded w-1/3 truncate" initial={{x:-50, opacity:0}} animate={{x:0, opacity:1}}>Query Vector</motion.div>
                   <Search className="h-8 w-8 text-primary animate-ping" />
                   <motion.div className="font-mono text-[10px] text-blue-500 bg-black/50 p-2 rounded w-1/3" initial={{x:50, opacity:0}} animate={{x:0, opacity:1}}>
                     Top K Matches
                     <br/>1. [0.11...] (Score 0.92)
                   </motion.div>
                 </div>
              )}
              {currentStep === 7 && (
                <div className="flex flex-col gap-2 w-full max-w-sm">
                  {[
                    { c: 'Chunk 42', s: '0.92 -> 0.95', color: 'bg-green-500/20' },
                    { c: 'Chunk 12', s: '0.88 -> 0.81', color: 'bg-yellow-500/20' },
                    { c: 'Chunk 89', s: '0.85 -> 0.89', color: 'bg-orange-500/20' }
                  ].map((item, i) => (
                    <motion.div key={i} layout initial={{opacity:0}} animate={{opacity:1}} className={`flex justify-between p-2 rounded border ${item.color}`}>
                      <span className="text-xs font-bold">{item.c}</span>
                      <span className="text-xs font-mono">{item.s}</span>
                    </motion.div>
                  ))}
                </div>
              )}
              {currentStep === 8 && (
                <motion.div className="bg-muted p-4 rounded-xl border border-primary/20 w-full text-xs font-mono text-muted-foreground whitespace-pre-wrap" initial={{opacity:0}} animate={{opacity:1}}>
                  System: Answer the question using ONLY the context below.
                  <br/><br/>
                  Context: <span className="text-blue-400">"Q3 revenue reached $4.2M, up 15% YoY..."</span>
                  <br/><br/>
                  User: <span className="text-primary">"What is the company's Q3 revenue?"</span>
                </motion.div>
              )}
              {currentStep === 9 && (
                <motion.div className="bg-green-500/10 border border-green-500/30 text-green-400 p-6 rounded-2xl max-w-sm text-center" initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}}>
                  <span className="font-bold text-lg">"The company's Q3 revenue was $4.2M."</span>
                  <div className="mt-2 text-[10px] flex items-center justify-center gap-1 opacity-70">
                    <CheckCircle2 className="h-3 w-3" /> Grounded in Context
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
