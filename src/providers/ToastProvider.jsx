import { createContext, useContext, useEffect, useState } from 'react'
import Toast from '../components/Toast'

export const ToastProviderContext = createContext(null)

export default function ToastProvider({ children }) {
  const [loading, setLoading] = useState(false)
  const [toastActive, setToastActive] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showToast = async (message) => {
    setToastMessage(message)
    setToastActive(true)
    await new Promise((res) => setTimeout(res, 3000))
    setToastActive(false)
    setToastMessage('')
  }

  return (
    <ToastProviderContext.Provider value={{ showToast }}>
      {children}
      {toastActive && <Toast text={toastMessage} />}
    </ToastProviderContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastProviderContext)

  if (!context) {
    throw new Error(
      'useModalContext must be used within a ToastContextProvider'
    )
  }

  return context
}
