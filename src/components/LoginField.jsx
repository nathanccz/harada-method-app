import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'

export default function LoginField() {
  const [loading, setLoading] = useState(false)
  const [isResettingPassword, setIsResettingPassword] = useState(false)
  const [passwordHidden, setPasswordHidden] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const API_BASE_URL = import.meta.env.VITE_API_URL

  const GOOGLE_AUTH_URL = import.meta.env.DEV
    ? 'http://localhost:3000/auth/google'
    : 'https://myharada-app-backend.onrender.com/auth/google'

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

    if (!formData.email || !formData.password) {
      alert('Missing email and/or password')
      return
    }

    const email = formData.email.trim()
    const password = formData.password.trim()

    setLoading(true)

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
      setLoading(false)
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

  const handleClickForgotPassword = async (e) => {
    e.preventDefault()
    setIsResettingPassword(true)
    setFormData({})
  }

  const handleClickBackButton = () => {
    setFormData({})
    setIsResettingPassword(false)
  }

  const handleClickResetPassword = async (e) => {
    e.preventDefault()

    if (!formData.email) {
      alert('Please enter your email first.')
      return
    }

    try {
      await sendPasswordResetEmail(auth, formData.email)

      alert(
        'If an account exists for this email, a reset link has been sent. Please check your inbox and your spam folder.'
      )
      setIsResettingPassword(false)
      setFormData({})
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          alert('Please enter a valid email address.')
          break
        case 'auth/too-many-requests':
          alert('Too many attempts. Please try again later.')
          break
        case 'auth/user-disabled':
          alert('This account has been disabled. Contact support.')
          break
        default:
          alert('An error occurred. Please try again.')
          console.error(error.code, error.message)
      }
      setFormData({})
    }
  }

  return (
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box text-black">
      {!loading && !isResettingPassword && (
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
          <div className="relative flex items-center">
            <input
              type={!passwordHidden ? 'text' : 'password'}
              className="input"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
              required
            />
            <button
              className="absolute right-3 text-lg z-100"
              onClick={() => setPasswordHidden(!passwordHidden)}
            >
              <Icon icon={passwordHidden ? 'mdi:eye-off-outline' : 'mdi:eye'} />
            </button>
          </div>
          <button
            className="p-2 border border-gray-400 rounded mt-2 hover:bg-gray-200 duration-100 ease-in-out cursor-pointer"
            onClick={handleClickForgotPassword}
          >
            Forgot password?
          </button>
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
      )}
      {!loading && isResettingPassword && (
        <>
          <button
            className="text-left flex gap-2 items-center w-fit mb-2 border-transparent rounded p-1 hover:bg-gray-300 duration-100 ease-in-out cursor-pointer"
            onClick={handleClickBackButton}
          >
            <Icon icon="weui:back-filled" className="text-xl" /> Back
          </button>
          <h1 className="font-bold text-lg">Please Enter Your Email</h1>

          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
          />

          <button
            className="btn btn-neutral mt-4"
            onClick={handleClickResetPassword}
          >
            Reset Password
          </button>
        </>
      )}
      {loading && (
        <div className="flex justify-center items-center gap-3">
          <span className="text-xl font-bold">Logging in...</span>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      )}
    </fieldset>
  )
}
