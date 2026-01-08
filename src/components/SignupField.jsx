import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export default function SignupField() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  const API_BASE_URL = import.meta.env.VITE_API_URL

  const GOOGLE_AUTH_URL = import.meta.env.DEV
    ? 'http://localhost:3000/auth/google'
    : `${API_BASE_URL}/auth/google`

  const FIREBASE_AUTH_URL = import.meta.env.DEV
    ? 'http://localhost:3000/api/auth/firebase-login'
    : `${API_BASE_URL}/api/auth/firebase-login`

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

  const onFormSubmit = async (e) => {
    e.preventDefault()

    const username = formData.username
    const email = formData.email.trim()
    const password = formData.password.trim()

    let user

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      user = userCredential.user

      await updateProfile(user, {
        displayName: username,
      })

      console.log(user)
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

  const handleClickSignupWithGoogle = () => {
    window.location.href = GOOGLE_AUTH_URL
    setLoading(true)
  }

  return (
    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box text-black">
      {!loading ? (
        <>
          <h1 className="font-bold text-lg">Create an Account</h1>
          <form
            action=""
            onSubmit={onFormSubmit}
            className="flex flex-col gap-2"
          >
            <div>
              <label className="fieldset-label">Username</label>
              <input
                type="text"
                className="input"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
                required
              />
            </div>
            <div>
              <label className="fieldset-label">Email</label>
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={formData.email}
                required
              />
            </div>
            <div>
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
            </div>
            <button className="btn btn-neutral mt-4 w-full" type="submit">
              Sign Up
            </button>
          </form>

          <p className="text-lg my-3">OR</p>

          <button
            className="btn btn-outline flex justify-center gap-5"
            onClick={handleClickSignupWithGoogle}
          >
            <Icon icon="devicon:google" className="text-2xl" />
            Sign up with Google
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
