import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const AuthContext = createContext(null)

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userDataLoading, setUserDataLoading] = useState(true)
  const [userData, setUserData] = useState(null)
  const [token, setToken] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_URL
  const BLOCKED_ROUTES = ['/', '/login', '/signup']
  const REDIRECT_URL = import.meta.env.DEV
    ? 'http://localhost:5173/'
    : 'https://myharada.netlify.app/'

  async function fetchUserData(token) {
    try {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${API_BASE_URL}/auth/dashboard`, {
        method: 'GET',
        headers: headers,
        credentials: 'include',
      })

      const mongoUser = await response.json()
      if (mongoUser.error) {
        window.location.replace(REDIRECT_URL)
      }
      setUserData(mongoUser)
      setIsAuthenticated(true)
    } catch (error) {
      console.log(error)
      window.location.replace(REDIRECT_URL)
    }
  }

  useEffect(() => {
    if (BLOCKED_ROUTES.includes(window.location.pathname)) return

    setUserDataLoading(true)

    const auth = getAuth()

    // Listen for Firebase auth changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken()
        setToken(token)
        fetchUserData(token)
      } else {
        fetchUserData()
      }
    })

    return unsubscribe
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setUserDataLoading,
        userData,
        userDataLoading,
        token,
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
