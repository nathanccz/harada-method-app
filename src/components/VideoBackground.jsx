import LoginField from './LoginField'
import SignupField from './SignupField'
import { useLocation } from 'react-router-dom'

export default function VideoBackground({}) {
  const location = useLocation()

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* The video element positioned as the background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* A semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Placeholder for your main content, positioned above the video */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4 text-center text-white">
        {location.pathname === '/' && (
          <div className="hero-content text-center text-white bg-gray-500/35 rounded">
            <div className="max-w-lg p-3">
              <h1 className="mb-5 text-[2.5rem] font-bold">myharada</h1>
              <p className="mb-5 text-left text-md md:text-lg lg:text-xl">
                Achieve any goal you've dreamed of with the simplicity of the
                Harada Method. Create unlimited grids, manage tasks, and track
                your progress with the myharada app. <br />
                <br />
                <span className="font-bold">It's completely free.</span>
              </p>

              <div className="flex gap-5 justify-center w-full">
                <a href="/login">
                  <button className="btn btn-success">Log In</button>
                </a>
                <a href="/signup">
                  <button className="btn btn-accent">Sign Up</button>
                </a>
              </div>
            </div>
          </div>
        )}
        {location.pathname === '/login' && (
          <div className="hero-content text-center">
            <LoginField />
          </div>
        )}
        {location.pathname === '/signup' && (
          <div className="hero-content text-center">
            <SignupField />
          </div>
        )}
      </div>
    </div>
  )
}
