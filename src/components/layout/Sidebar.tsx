'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Layout, Database, Sparkles, Shield, Rocket, X } from 'lucide-react'
import { usePresentationStore } from '@/lib/store'

const sections = [
  {
    title: "Introduction",
    icon: Layout,
    slides: [
      { id: 0, title: "RAG & Agentic AI" },
      { id: 1, title: "Evolution of AI" },
    ]
  },
  {
    title: "RAG Deep Dive",
    icon: Database,
    slides: [
      { id: 2, title: "Intro to RAG" },
      { id: 3, title: "Interactive Flow" },
      { id: 4, title: "RAG Data Pipelines" },
      { id: 5, title: "Document Chunking" },
      { id: 6, title: "Embeddings Explained" },
      { id: 7, title: "Vector Databases" },
      { id: 8, title: "Retrieval Techniques" },
      { id: 9, title: "Context Augmentation" },
      { id: 10, title: "Advanced Patterns" },
      { id: 11, title: "Graph RAG" },
      { id: 12, title: "RAG Evaluation" },
    ]
  },
  {
    title: "Agentic AI",
    icon: Sparkles,
    slides: [
      { id: 13, title: "Intro to Agents" },
      { id: 14, title: "Agent Simulation" },
      { id: 15, title: "ReAct Framework" },
      { id: 16, title: "Tool Calling" },
      { id: 17, title: "Memory Systems" },
      { id: 18, title: "Multi-Agent Systems" },
      { id: 19, title: "MCP Introduction" },
      { id: 20, title: "MCP Architecture" },
      { id: 21, title: "Building MCP Server" },
    ]
  },
  {
    title: "Security & Testing",
    icon: Shield,
    slides: [
      { id: 22, title: "Enterprise Security" },
      { id: 23, title: "Testing & Evals" },
    ]
  },
  {
    title: "Conclusion",
    icon: Rocket,
    slides: [
      { id: 24, title: "Future of AI" },
    ]
  }
]

export const Sidebar = () => {
  const { currentSlide, setSlide, isSidebarOpen, setSidebar } = usePresentationStore()

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 bottom-0 w-72 bg-card/80 backdrop-blur-xl border-r border-border z-40 flex flex-col overflow-y-auto"
        >
          <div className="p-6 pb-2 sticky top-0 bg-card/80 backdrop-blur-xl z-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <h2 className="font-bold text-lg tracking-tight">Curriculum</h2>
            </div>
            <button 
              onClick={() => setSidebar(false)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex-1 py-4 px-3 space-y-6">
            {sections.map((section, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 px-3 mb-2 text-muted-foreground">
                  <section.icon className="h-4 w-4" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">{section.title}</h3>
                </div>
                <div className="space-y-0.5">
                  {section.slides.map((slide) => {
                    const isActive = currentSlide === slide.id
                    return (
                      <button
                        key={slide.id}
                        onClick={() => setSlide(slide.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-3 transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-5 h-5 rounded-md text-[10px] ${
                          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/20 text-muted-foreground'
                        }`}>
                          {slide.id + 1}
                        </div>
                        <span className="truncate">{slide.title}</span>
                        {isActive && (
                          <motion.div layoutId="activeSlide" className="ml-auto">
                            <ChevronRight className="h-4 w-4" />
                          </motion.div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
