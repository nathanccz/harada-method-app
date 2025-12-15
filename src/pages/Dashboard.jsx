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
        className={`flex relative gap-3 lg:px-28 max-w-[1700px] mx-auto flex-grow-2 ${
          isMobile && 'flex-col'
        }`}
      >
        <Sidebar isMobile={isMobile} />
        <Outlet />
      </div>
      <Footer />
      <SpeedDial />
    </div>
  )
}
