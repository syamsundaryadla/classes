'use client'

import React, { useEffect, useState } from 'react'
import { usePresentationStore } from '@/lib/store'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Menu, Moon, Sun, Search, Maximize2, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Sidebar } from './Sidebar'
import { Progress } from '@/components/ui/progress'

interface PresentationLayoutProps {
  children: React.ReactNode
}

export const PresentationLayout = ({ children }: PresentationLayoutProps) => {
  const { 
    currentSlide, 
    totalSlides, 
    nextSlide, 
    prevSlide, 
    toggleSidebar, 
    direction,
    setViewMode,
    currentTopicId
  } = usePresentationStore()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'Escape') toggleSidebar()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, toggleSidebar])

  const progress = ((currentSlide + 1) / totalSlides) * 100

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background font-sans">
      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setViewMode('index')} className="gap-2 border-primary/20 hover:bg-primary/10 text-primary font-bold">
            <Home className="h-4 w-4" /> Curriculum Index
          </Button>
          <div className="font-bold text-xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 hidden md:block">
            {currentTopicId === 'rag' ? 'RAG & AGENTIC AI MASTERCLASS' : 'LLM APIs & GEMINI ECOSYSTEM'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {mounted ? (
              theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
            ) : (
              <div className="h-5 w-5" /> // Placeholder to avoid hydration mismatch
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen()
            } else {
              document.exitFullscreen()
            }
          }}>
            <Maximize2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative h-full w-full">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <div key={currentSlide} className="h-full w-full">
            {children}
          </div>
        </AnimatePresence>
      </main>

      {/* Sidebar */}
      <Sidebar />

      {/* Bottom Navigation */}
      <footer className="absolute bottom-0 left-0 right-0 z-50 flex flex-col gap-2">
        <Progress value={progress} className="h-1 rounded-none bg-primary/10" />
        <div className="flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md border-t">
          <div className="text-sm text-muted-foreground font-medium">
            Slide {currentSlide + 1} of {totalSlides}
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="rounded-full h-10 w-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="rounded-full h-10 w-10"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
