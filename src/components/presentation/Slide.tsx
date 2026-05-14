'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { usePresentationStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface SlideProps {
  children: React.ReactNode
  className?: string
}

export const Slide = ({ children, className }: SlideProps) => {
  const { direction } = usePresentationStore()

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16 overflow-hidden bg-background",
        className
      )}
    >
      <div className="w-full max-w-6xl mx-auto h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  )
}

export const SlideContent = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("mt-8 flex-1", className)}>
    {children}
  </div>
)

export const SlideTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <h1 className={cn("text-4xl md:text-6xl font-bold tracking-tight text-foreground", className)}>
    {children}
  </h1>
)

export const SlideSubtitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={cn("text-xl md:text-2xl text-muted-foreground mt-4", className)}>
    {children}
  </p>
)
