import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import { signInWithEmailLink, sendSignInLinkToEmail } from 'firebase/auth'

export default function LoginField() {
  const [loading, setLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const GOOGLE_AUTH_URL = import.meta.env.DEV
    ? 'http://localhost:3000/auth/google'
    : 'https://myharada-app-backend.onrender.com/auth/google'

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleClickSignIn = async (e) => {
    e.preventDefault()
    console.log(formData)
    const email = formData.email.trim()
    const password = formData.password.trim()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

  const handleGoogleLogin = (e) => {
    e.preventDefault()
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
