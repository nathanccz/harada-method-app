import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SpeedDial from '../components/SpeedDial'
import TabletSidebar from '../components/TabletSidebar'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [isPhone, setIsPhone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsPhone(window.innerWidth < 800)
      setIsMobile(window.innerWidth >= 800 && window.innerWidth < 1080)
      setIsTablet(window.innerWidth >= 1080 && window.innerWidth < 1300)
      setIsDesktop(window.innerWidth >= 1300)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // NOTE: Will refactor for maintainability. This works but is messy!

  return (
    <div className={`flex flex-col justify-between`}>
      <div
        className={`flex gap-3 relative w-full max-w-[1300px] mx-auto flex-grow-2 ${
          isMobile || isTablet || isPhone ? 'flex-col' : 'flex-row'
        }`}
      >
        <Sidebar
          isPhone={isPhone}
          isMobile={isMobile}
          isTablet={isTablet}
          isDesktop={isDesktop}
        />

        <main
          className={`${
            isTablet || isMobile
              ? 'flex gap-6'
              : isDesktop
                ? 'w-[80%]'
                : 'w-full'
          }`}
        >
          {(isTablet || isMobile) && <TabletSidebar />}
          <div
            className={`lg:h-screen overflow-y-auto ${isTablet ? 'w-[90%] p-3' : isDesktop || isPhone ? 'p-3 w-full' : 'p-3 w-[90%]'}`}
          >
            <Outlet context={{ isMobile, isTablet, isDesktop, isPhone }} />
          </div>
        </main>
      </div>
      {/* <Footer /> */}
      <SpeedDial />
    </div>
  )
}
