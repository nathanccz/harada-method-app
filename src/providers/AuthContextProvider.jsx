import { createContext, useContext, useEffect, useState } from 'react'
import { getDashboardData } from '../../services/authService'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userDataLoading, setUserDataLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const BLOCKED_ROUTES = ['/', '/login', '/signup']
  const REDIRECT_URL = import.meta.env.DEV
    ? 'http://localhost:5173/'
    : 'https://myharada.netlify.app/'

  useEffect(() => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/login'
    )
      return

    async function fetchUserData() {
      setUserDataLoading(true)
      try {
        const data = await getDashboardData()
        console.log(data)
        if (!data) {
          window.location.href = REDIRECT_URL
        } else {
          console.log(data)
          setUserData(data)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.log(error)
        window.location.replace(REDIRECT_URL)
      }
    }
    fetchUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setUserDataLoading,
        userData,
        userDataLoading,
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
