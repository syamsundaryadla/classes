'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Settings2, Thermometer, Zap, Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export const ModelTuning = () => {
  const [temp, setTemp] = useState(0.7)
  const [topP, setTopP] = useState(1.0)

  const getExampleOutput = () => {
    if (temp < 0.3) return "The capital of France is Paris. It is a major European city and a global center for art, fashion, gastronomy and culture."
    if (temp < 0.8) return "Paris is the wonderful capital of France, known as the 'City of Light' for its historic role in the Age of Enlightenment."
    return "Imagine a baguette wearing a beret on top of the Eiffel Tower while singing French opera under a neon purple moon in Paris!"
  }

  return (
    <Card className="w-full border-primary/20 bg-background/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          Model Tuning Playground
        </CardTitle>
        <CardDescription>
          Adjust parameters to see how they affect AI creativity and precision.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Temperature */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-orange-500" />
              <label className="text-sm font-semibold">Temperature</label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  Higher values make the output more random, while lower values make it more focused and deterministic.
                </TooltipContent>
              </Tooltip>
            </div>
            <Badge variant="secondary" className="font-mono">{temp.toFixed(1)}</Badge>
          </div>
          <Slider 
            value={[temp]}
            onValueChange={(val) => setTemp(Array.isArray(val) ? val[0] : val)}
            max={2.0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">
            <span>Precise</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Top P */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-blue-500" />
              <label className="text-sm font-semibold">Top P</label>
            </div>
            <Badge variant="secondary" className="font-mono">{topP.toFixed(1)}</Badge>
          </div>
          <Slider 
            value={[topP]}
            onValueChange={(val) => setTopP(Array.isArray(val) ? val[0] : val)}
            max={1.0}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Preview Output */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Example Output Preview</label>
          <div className="p-6 rounded-2xl bg-muted/50 border-2 border-dashed border-primary/20 min-h-[100px] flex items-center justify-center text-center italic text-sm text-foreground/80 leading-relaxed">
            "{getExampleOutput()}"
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
