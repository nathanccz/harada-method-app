import { createContext, useContext, useEffect, useState } from 'react'
import { getDashboardData } from '../../services/authService'

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/login'
    )
      return

    async function fetchUserData() {
      setLoading(true)
      try {
        const data = await getDashboardData()
        console.log(data)
        if (data.message === 'Not authenticated') {
          window.location.href = 'http://localhost:5173/login'
        } else {
          console.log(data)
          setUserData(data)
          setLoading(false)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.log(error)
        // window.location.replace('http://localhost:5173/login')
      }
    }
    fetchUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider')
  }
  return context
}
