import { getAuth, signOut } from 'firebase/auth'

export default function LogoutButton() {
  const API_BASE_URL = import.meta.env.VITE_API_URL

  const handleLogOut = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    await signOut(auth)
    window.location.href = `${API_BASE_URL}/auth/logout` // Redirect to backend Google OAuth route
  }
  return (
    <button className="btn btn-outline w-full" onClick={handleLogOut}>
      Log Out
    </button>
  )
}
