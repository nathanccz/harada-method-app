import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SpeedDial from '../components/SpeedDial'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      setIsTablet(window.innerWidth >= 1024 && window.innerWidth < 1300)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex flex-col justify-between h-screen">
      <div
        className={`flex relative gap-3 w-full max-w-[1300px] mx-auto flex-grow-2 pb-6 ${
          isMobile || isTablet ? 'flex-col' : 'flex-row'
        }`}
      >
        <Sidebar isMobile={isMobile} isTablet={isTablet} />
        <main className={`${isMobile || isTablet ? 'w-full' : 'w-[80%]'} p-5`}>
          <Outlet context={{ isMobile, isTablet }} />
        </main>
      </div>
      <Footer />
      <SpeedDial />
    </div>
  )
}
