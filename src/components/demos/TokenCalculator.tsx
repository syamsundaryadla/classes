'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Cpu, DollarSign, Zap } from 'lucide-react'

export const TokenCalculator = () => {
  const [inputText, setInputText] = useState("Hello, I'm learning AI engineering!")
  const [tokenPrice, setTokenPrice] = useState(0.01) // Price per 1k tokens

  const tokens = Math.ceil(inputText.length / 4) // Rough estimation
  const cost = (tokens / 1000) * tokenPrice

  return (
    <Card className="w-full border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-primary" />
          Token & Cost Calculator
        </CardTitle>
        <CardDescription>
          Estimate your LLM costs based on input size and model pricing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Input Text</label>
          <Input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type something..."
            className="bg-background"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Model Price ($ per 1k tokens)</label>
            <Badge variant="outline" className="font-mono">${tokenPrice.toFixed(4)}</Badge>
          </div>
          <Slider 
            value={[tokenPrice]}
            onValueChange={(val) => setTokenPrice(Array.isArray(val) ? val[0] : val)}
            max={0.06}
            step={0.0001}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-background border flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">{tokens}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Estimated Tokens</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-background border flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold font-mono">${cost.toFixed(6)}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Estimated Cost</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
