import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Icon } from '@iconify/react'
import { useState } from 'react'

export default function Navbar({ userData, isLoggedOut }) {
  const [searchBarFocused, setSearchBarFocused] = useState(false)

  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-300 block' : 'block'

  return (
    <div className="navbar bg-base-100 shadow-sm top-0 sticky z-999 justify-between">
      <div className="dropdown dropdown-start">
        {!isLoggedOut && (
          <>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              {userData?.image ? (
                <div className="w-15 rounded-full">
                  <img
                    alt="profile-pic"
                    src={userData?.image}
                    referrerPolicy="no-referrer"
                  />
                </div>
              ) : (
                <div className="bg-neutral text-neutral-content w-16 rounded-full flex justify-center items-center">
                  <div className="text-3xl text-center">
                    <Icon icon="fluent:person-16-filled" />
                  </div>
                </div>
              )}
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
                <NavLink
                  to={'/dashboard/templates'}
                  className={getNavLinkClass}
                >
                  <div className="flex justify-between">
                    <div>Templates</div>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/completed'}
                  className={getNavLinkClass}
                >
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
          </>
        )}
      </div>

      {!searchBarFocused && (
        <div className="w-[150px] h-10 scale-130">
          <img
            alt="mharada logo"
            src="/logo.svg"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      {isLoggedOut ? (
        <a href="/login">
          <button className="btn btn-neutral">Log In</button>
        </a>
      ) : (
        <div
          className={`items-center ${
            searchBarFocused ? 'w-60' : 'w-12'
          } md:w-50`}
        >
          <SearchBar
            onFocus={() => setSearchBarFocused(true)}
            onBlur={() => setSearchBarFocused(false)}
          />
        </div>
      )}
    </div>
  )
}
