import { NavLink } from 'react-router-dom'
import Drawer from './Drawer'
import SearchBar from './SearchBar'
import { Icon } from '@iconify/react'

export default function Navbar({ userData }) {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-300 block' : 'block'
  return (
    <div className="navbar bg-base-100 shadow-sm top-0 sticky z-999 justify-between">
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="btn bg-base-100 m-1">
          <Icon
            icon="typcn:th-menu"
            className="sm:text-sm mg:text-md lg:text-lg"
          />
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <NavLink to={'/dashboard'} className={getNavLinkClass} end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to={'/dashboard/grids'} className={getNavLinkClass}>
              <div className="flex justify-between">
                <div>Active Grids</div>
                {/* {activeGrids.length > 0 && (
                  <div className="bg-white px-2 rounded-full">
                    {activeGrids.length}
                  </div>
                )} */}
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
                {/* {completedGrids.length > 0 && (
                  <div className="bg-white px-2 rounded-full">
                    {completedGrids.length}
                  </div>
                )} */}
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
      </div>
      <div className="flex gap-2 items-center">
        <SearchBar />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={userData?.image} />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
