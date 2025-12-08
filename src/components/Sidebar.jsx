import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SkeletonSidebar from './SkeletonSidebar'
import NewGridButton from './NewGridButton'
import { useModalContext } from '../providers/ModalProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useDataContext } from '../providers/DataProvider'

export default function Sidebar() {
  const [loading, setLoading] = useState(false)
  const { openCreateModal } = useModalContext()
  const { userData } = useAuthContext()
  const { grids } = useDataContext()
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-300 block' : 'block'

  const handleLogOut = (e) => {
    e.preventDefault()
    window.location.href = 'http://localhost:3000/api/logout' // Redirect to backend Google OAuth route
  }

  return loading ? (
    <SkeletonSidebar />
  ) : (
    <aside className="flex flex-col min-w-[275px]">
      <div className="flex mb-8 mt-4 mx-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full flex justify-center items-center">
            <div className="text-3xl text-center pt-3">
              {userData?.firstName[0]}
            </div>
          </div>
        </div>
        <div className="mt-2 ml-3">
          <h3 className="font-bold"></h3>
          <span></span>
        </div>
      </div>
      <NewGridButton
        text={'Create New Grid'}
        openCreateModal={openCreateModal}
      />
      <ul className="menu bg-base-200 rounded-box w-full gap-3 text-lg font-bold mt-3">
        <li>
          <NavLink to={'/dashboard'} className={getNavLinkClass} end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/grids'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div>My Grids</div>
              <div className="bg-gray-200 px-2 rounded-full">
                {grids.length > 0 && grids.length}
              </div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/templates'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div>Templates</div>
              <div className="bg-gray-200 px-2 rounded-full">10</div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/completed'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div>Completed</div>

              <div className="bg-gray-200 px-2 rounded-full">10</div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/about'} className={getNavLinkClass}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/contact'} className={getNavLinkClass}>
            Support
          </NavLink>
        </li>
      </ul>

      <button
        className="btn btn-outline mt-8 mx-7 w-4/5"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </aside>
  )
}
