import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SpeedDial from '../components/SpeedDial'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col justify-between h-screen">
      <div
        className={`flex relative gap-5 w-full max-w-[1300px] mx-auto flex-grow-2 pb-6 ${
          isMobile && 'flex-col'
        }`}
      >
        <Sidebar isMobile={isMobile} />
        <main className="w-full lg:w-[75%] p-6">
          <Outlet context={{ isMobile }} />
        </main>
      </div>
      <Footer />
      <SpeedDial />
    </div>
  )
}
