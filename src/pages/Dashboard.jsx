import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDashboardData } from '../../services/authService'

export default function Dashboard() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex relative gap-3 px-28 max-w-[1500px] mx-auto flex-grow-2">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
