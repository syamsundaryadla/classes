'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageSquare, Code2, PlayCircle, RefreshCcw, LucideIcon } from 'lucide-react'

interface Step {
  Icon: LucideIcon
  label: string
  color: string
}

export const WorkflowDiagram = () => {
  const steps: Step[] = [
    { Icon: MessageSquare, label: "Prompt", color: "bg-blue-500" },
    { Icon: Code2, label: "Generate", color: "bg-purple-500" },
    { Icon: PlayCircle, label: "Review", color: "bg-green-500" },
    { Icon: RefreshCcw, label: "Refine", color: "bg-orange-500" },
  ]

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 p-8 bg-muted/30 rounded-[2rem] border border-primary/10 w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary),0.05),transparent)] pointer-events-none" />
      
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative flex flex-col items-center gap-3 z-10"
          >
            <div className={`h-16 w-16 rounded-2xl ${step.color} shadow-lg flex items-center justify-center text-white`}>
              <step.Icon size={32} />
            </div>
            <span className="text-sm font-bold tracking-tight uppercase">{step.label}</span>
          </motion.div>
          
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 + 0.1 }}
              className="hidden md:block"
            >
              <ArrowRight className="text-muted-foreground/30" />
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
