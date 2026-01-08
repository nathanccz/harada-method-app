import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import { signInWithEmailAndPassword, getAuth, signOut } from 'firebase/auth'

export default function LoginField() {
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const API_BASE_URL = import.meta.env.VITE_API_URL

  const GOOGLE_AUTH_URL = import.meta.env.DEV
    ? 'http://localhost:3000/auth/google'
    : `${API_BASE_URL}/auth/google`

  const FIREBASE_AUTH_URL = import.meta.env.DEV
    ? 'http://localhost:3000/api/auth/firebase-login'
    : `${API_BASE_URL}/auth/firebase-login`

  const REDIRECT_URL = import.meta.env.DEV
    ? 'http://localhost:5173/dashboard'
    : 'https://myharada.netlify.app/dashboard'

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleClickSignIn = async (e) => {
    e.preventDefault()

    setLoading(true)

    const email = formData.email.trim()
    const password = formData.password.trim()
    let user

    try {
      const firebaseResponse = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      user = firebaseResponse.user
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      alert(errorMessage)
    }

    const response = await fetch(FIREBASE_AUTH_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (data) {
      window.location.replace(REDIRECT_URL)
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    await signOut(auth)
    window.location.href = GOOGLE_AUTH_URL
    setLoading(true)
  }

  return (
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box text-black">
      {!loading ? (
        <>
          <h1 className="font-bold text-lg">Welcome Back!</h1>

          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
          />

          <label className="fieldset-label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={formData.password}
            required
          />

          <button className="btn btn-neutral mt-4" onClick={handleClickSignIn}>
            Sign In
          </button>
          <p className="text-lg my-3">OR</p>

          <button
            className="btn btn-outline flex justify-center gap-5"
            onClick={handleGoogleLogin}
          >
            <Icon icon="devicon:google" className="text-2xl" />
            Continue with Google
          </button>
        </>
      ) : (
        <div className="flex justify-center items-center gap-3">
          <span className="text-xl font-bold">Logging in...</span>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      )}
    </fieldset>
  )
}
