import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getDashboardData } from '../../services/authService'

export default function Dashboard() {
  return (
    <>
      <div className="flex relative gap-3 px-28">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
