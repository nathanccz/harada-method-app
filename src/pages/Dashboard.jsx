import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <div className="flex relative max-w-[1400px] mx-auto gap-3">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
