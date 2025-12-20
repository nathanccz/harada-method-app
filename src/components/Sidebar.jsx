import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SkeletonSidebar from './SkeletonSidebar'
import NewGridButton from './NewGridButton'
import Navbar from './Navbar'
import { useModalContext } from '../providers/ModalProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useDataContext } from '../providers/DataProvider'
import SearchBar from './SearchBar'

export default function Sidebar({ isMobile, isPhoneView }) {
  const { openCreateModal } = useModalContext()
  const { userData, loading } = useAuthContext()
  const { grids } = useDataContext()
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-300 block' : 'block'

  const handleLogOut = (e) => {
    e.preventDefault()
    window.location.href =
      'https://myharada-app-backend.onrender.com/api/logout' // Redirect to backend Google OAuth route
  }

  const activeGrids = [...grids].filter(
    (grid) => !grid.completedAt && !grid.templateCategory
  )
  const completedGrids = [...grids].filter((grid) => grid.completedAt)

  return isMobile ? (
    <Navbar userData={userData} isPhoneView={isPhoneView} />
  ) : (
    <aside className="flex flex-col min-w-[275px] mb-8 pl-8">
      <div className="flex mb-8 mt-4 mx-4">
        <div className="avatar placeholder">
          <div className="w-15 rounded-full">
            <img
              alt="profile-pic"
              src={userData?.image}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="mt-2 ml-3">
          <h3 className="font-bold">{userData?.displayName}</h3>
          <span>{userData?.email}</span>
        </div>
      </div>
      <div className="mb-3 w-full">
        <NewGridButton
          text={'Create New Grid'}
          openCreateModal={openCreateModal}
        />
      </div>
      <div className="mb-5">
        <SearchBar />
      </div>
      <ul className="menu bg-base-200 rounded-box w-full gap-3 text-lg font-bold mt-3">
        <li>
          <NavLink to={'/dashboard'} className={getNavLinkClass} end>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/grids'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div>Active Grids</div>
              {activeGrids.length > 0 && (
                <div className="bg-white px-2 rounded-full">
                  {activeGrids.length}
                </div>
              )}
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/templates'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div>Templates</div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/completed'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div>Completed</div>
              {completedGrids.length > 0 && (
                <div className="bg-white px-2 rounded-full">
                  {completedGrids.length}
                </div>
              )}
            </div>
          </NavLink>
        </li>
        {/* <li>
          <NavLink to={'/about'} className={getNavLinkClass}>
            About
          </NavLink>
        </li> */}
        <li>
          <NavLink to={'/dashboard/support'} className={getNavLinkClass}>
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
