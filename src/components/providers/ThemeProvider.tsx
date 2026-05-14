'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // During SSR and initial hydration, we render the provider as usual.
  // The suppressHydrationWarning on the <html> tag handles the flash-prevention script.
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  )
}
