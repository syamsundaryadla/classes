'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Zap, Flame } from 'lucide-react'

export const PricingTable = () => {
  const models = [
    {
      name: "GPT-4o",
      provider: "OpenAI",
      input: "$5.00",
      output: "$15.00",
      icon: <Sparkles className="h-4 w-4 text-primary" />,
      tag: "Best All-around"
    },
    {
      name: "Claude 3.5 Sonnet",
      provider: "Anthropic",
      input: "$3.00",
      output: "$15.00",
      icon: <Flame className="h-4 w-4 text-orange-500" />,
      tag: "Top Logic"
    },
    {
      name: "Gemini 1.5 Flash",
      provider: "Google",
      input: "$0.075",
      output: "$0.30",
      icon: <Zap className="h-4 w-4 text-yellow-500" />,
      tag: "Fast & Cheap"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {models.map((model, i) => (
        <Card key={i} className="bg-card/50 border-primary/10 overflow-hidden group hover:border-primary/40 transition-all hover:shadow-xl">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="p-2 rounded-lg bg-muted border">
                {model.icon}
              </div>
              <Badge variant="outline" className="text-[10px] uppercase">{model.tag}</Badge>
            </div>
            <CardTitle className="text-xl mt-4">{model.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{model.provider}</p>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Input (1M)</span>
              <span className="font-mono font-bold text-primary">{model.input}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Output (1M)</span>
              <span className="font-mono font-bold text-primary">{model.output}</span>
            </div>
            <div className="pt-4 border-t border-primary/5">
              <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: model.name.includes('Flash') ? '20%' : '80%' }} 
                />
              </div>
              <div className="flex justify-between text-[8px] uppercase mt-1 font-bold text-muted-foreground">
                <span>Cost</span>
                <span>Quality</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
