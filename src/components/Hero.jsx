import LoginField from './LoginField'
import VideoBackground from './VideoBackground'

export default function Hero({ isLogin }) {
  return (
    <>
      <VideoBackground isLogin={isLogin} />
      <div className="hero-overlay bg-opacity-50"></div>
    </>
  )
}
