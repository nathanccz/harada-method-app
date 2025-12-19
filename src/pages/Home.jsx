import Hero from '../components/Hero'
import LoginField from '../components/LoginField'
import Navbar from '../components/Navbar'
import VideoBackground from '../components/VideoBackground'

export default function Home() {
  return (
    <main>
      <Navbar isLoggedOut={true} />
      <VideoBackground />
    </main>
  )
}
