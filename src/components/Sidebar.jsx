import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import SkeletonSidebar from './SkeletonSidebar'
import NewGridButton from './NewGridButton'
import { useModalContext } from '../providers/ModalProvider'

export default function Sidebar() {
  const [loading, setLoading] = useState(false)
  const { openCreateModal } = useModalContext()
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-300 block' : 'block'

  return loading ? (
    <SkeletonSidebar />
  ) : (
    <aside className="flex flex-col w-[300px]">
      <div className="flex mb-8 mt-4 mx-4">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-16 rounded-full flex justify-center items-center">
            <div className="text-3xl text-center pt-3">G</div>
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
              <div className="bg-gray-200 px-2 rounded-full">3</div>
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

      <button className="btn btn-outline mt-8 mx-7 w-4/5">Log Out</button>
    </aside>
  )
}
