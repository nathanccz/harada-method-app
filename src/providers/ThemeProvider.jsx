import { createContext, useContext, useEffect, useState } from 'react'

export const ThemeProviderContext = createContext(null)

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark'
  )

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDark ? 'forest' : 'fantasy'
    )
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <ThemeProviderContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeProviderContext)

  if (!context) {
    throw new Error(
      'useThemeContext must be used within a ThemeContextProvider'
    )
  }

  return context
}
