'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Cpu, ChevronRight, MessageSquare } from 'lucide-react'

const documents = [
  { id: 1, title: 'HR_Policy_v2.pdf', content: 'Employees get 20 days of paid time off per year.' },
  { id: 2, title: 'Company_Handbook.txt', content: 'Core hours are between 10 AM and 3 PM EST.' },
  { id: 3, title: 'Benefits_2026.pdf', content: 'Health insurance covers 90% of dental procedures.' },
]

export const PromptBuilder = () => {
  const [selectedDocs, setSelectedDocs] = useState<number[]>([1])

  const toggleDoc = (id: number) => {
    setSelectedDocs(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    )
  }

  const assembledContext = selectedDocs
    .map(id => documents.find(d => d.id === id)?.content)
    .join('\n\n')

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-3xl border border-primary/20 p-6 overflow-hidden backdrop-blur-md">
       <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-primary flex items-center justify-center gap-2">
          <Cpu className="h-6 w-6" />
          Context Augmentation
        </h3>
        <p className="text-xs text-muted-foreground mt-2">Select retrieved chunks to build the final prompt.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
        {/* Retrieved Chunks Pool */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
            <Search className="h-4 w-4" /> Vector DB Results
          </h4>
          <div className="space-y-3">
            {documents.map((doc) => {
              const isSelected = selectedDocs.includes(doc.id)
              return (
                <div 
                  key={doc.id}
                  onClick={() => toggleDoc(doc.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'bg-background hover:bg-muted'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold flex items-center gap-2">
                      <FileText className="h-3 w-3 text-primary" /> {doc.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded">Similarity: {(0.95 - doc.id * 0.05).toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{doc.content}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Final Prompt Assembly */}
        <div className="flex flex-col space-y-4 h-full">
          <h4 className="text-sm font-bold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Final LLM Prompt
          </h4>
          <div className="flex-1 bg-black/80 rounded-xl border border-primary/30 p-4 font-mono text-xs overflow-hidden flex flex-col">
            <span className="text-blue-400 font-bold mb-2">// System Instruction</span>
            <span className="text-muted-foreground mb-4">You are a helpful HR assistant. Answer the user's question using ONLY the context provided below.</span>
            
            <span className="text-yellow-400 font-bold mb-2">// Injected Context (Augmentation)</span>
            <motion.div 
              className="bg-primary/10 border-l-2 border-primary pl-3 py-2 mb-4 text-primary min-h-[60px]"
              layout
            >
              <AnimatePresence mode="popLayout">
                {selectedDocs.length === 0 ? (
                  <motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-muted-foreground italic">No context selected...</motion.span>
                ) : (
                  <motion.span initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="whitespace-pre-wrap">
                    {assembledContext}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>

            <span className="text-green-400 font-bold mb-2">// User Query</span>
            <span className="text-white">"How many days off do I get?"</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Search(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
}
