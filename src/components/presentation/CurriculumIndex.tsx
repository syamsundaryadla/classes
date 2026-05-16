'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { usePresentationStore } from '@/lib/store'
import { Sparkles, Database, Cpu, Zap, ArrowRight, Layers, Bot, Terminal, Shield, Network, Workflow } from 'lucide-react'

const topics = [
  {
    id: 'rag' as const,
    badge: 'Module 1',
    title: 'RAG & Agentic AI Masterclass',
    slidesCount: 25,
    icon: Database,
    accent: 'from-blue-500/20 via-primary/20 to-purple-500/20',
    borderAccent: 'hover:border-primary/50',
    description: 'The complete guide to modern AI systems engineering. Explore Vector Databases, Knowledge Graphs (Graph RAG), ReAct Agents, Tool Calling, Multi-Agent Orchestration, and the Model Context Protocol (MCP).',
    highlights: [
      { icon: Zap, text: 'Interactive RAG Simulation' },
      { icon: Layers, text: 'Vector Embedding Visualizer' },
      { icon: Bot, text: 'Agent Reasoning Loop Demo' },
      { icon: Workflow, text: 'Multi-Agent Collaboration' },
    ]
  },
  {
    id: 'gemini' as const,
    badge: 'Module 2 • Today\'s Topic',
    title: 'LLM APIs & Gemini Ecosystem Masterclass',
    slidesCount: 18,
    icon: Cpu,
    accent: 'from-orange-500/20 via-yellow-500/20 to-primary/20',
    borderAccent: 'hover:border-yellow-500/50',
    description: 'Deep dive into Large Language Models, Tokens & Context Windows, Gemini API Setup & SDK, Multimodal Capabilities, Gemini vs OpenAI comparison, FastAPI Backend Integration, and Real-World LLM App Architectures.',
    highlights: [
      { icon: Terminal, text: 'Token & Cost Calculator Demo' },
      { icon: Bot, text: 'Live Streaming Gemini Chatbot' },
      { icon: Network, text: 'Frontend → Backend → LLM Flows' },
      { icon: Shield, text: 'Production AI App Architecture' },
    ]
  }
]

export const CurriculumIndex = () => {
  const { setTopic, setViewMode } = usePresentationStore()

  const handleSelectTopic = (topicId: 'rag' | 'gemini') => {
    setTopic(topicId)
    setViewMode('presentation')
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 md:p-12 selection:bg-primary selection:text-primary-foreground">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 via-background to-background blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              AI ENGINEERING MASTERCLASS
            </h1>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
              Interactive Curriculum Portal
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-3 py-1 text-xs border-primary/20 bg-primary/5 text-primary font-bold tracking-wide uppercase">
            Production Ready
          </Badge>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-6xl mx-auto w-full my-12 flex-1 flex flex-col justify-center">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Select Your Masterclass Module
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a curriculum module below to launch the interactive presentation, complete with real-time architecture simulations and live demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {topics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5, type: 'spring' }}
              className="flex"
            >
              <Card className={`w-full flex flex-col justify-between bg-card/60 backdrop-blur-xl border-border/60 shadow-2xl transition-all duration-300 ${topic.borderAccent} hover:shadow-[0_10px_30px_rgba(var(--primary),0.15)] overflow-hidden group`}>
                {/* Accent Gradient Bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${topic.accent}`} />

                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="px-3 py-1 font-bold uppercase tracking-wider text-xs bg-primary/10 text-primary border border-primary/20">
                      {topic.badge}
                    </Badge>
                    <span className="text-xs font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full border">
                      {topic.slidesCount} Slides
                    </span>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-14 w-14 rounded-2xl bg-card border border-border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <topic.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
                      {topic.title}
                    </CardTitle>
                  </div>

                  <CardDescription className="text-sm md:text-base text-muted-foreground pt-2 leading-relaxed">
                    {topic.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="space-y-2 pt-4 border-t border-border/50">
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                      Module Highlights & Demos
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {topic.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50 border border-border/50 text-xs font-medium text-foreground">
                          <h.icon className="h-4 w-4 text-primary shrink-0" />
                          <span className="truncate">{h.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 pb-6 px-6 border-t border-border/50 bg-muted/10">
                  <Button 
                    onClick={() => handleSelectTopic(topic.id)}
                    className="w-full py-6 text-base font-bold shadow-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 gap-2"
                  >
                    Launch Masterclass <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center border-t border-border pt-6 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          © 2026 AI Engineering Masterclass. Built for advanced modern architectures.
        </div>
        <div className="flex gap-6 font-medium">
          <span className="hover:text-foreground transition-colors cursor-pointer">RAG Architectures</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Agentic Systems</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">MCP Protocol</span>
          <span className="hover:text-foreground transition-colors cursor-pointer">Gemini Ecosystem</span>
        </div>
      </footer>
    </div>
  )
}
