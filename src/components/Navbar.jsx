import { NavLink } from 'react-router-dom'
import SearchBar from './SearchBar'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import NewGridButton from './NewGridButton'
import LogoutButton from './LogoutButton'
import { useModalContext } from '../providers/ModalProvider'
import { useThemeContext } from '../providers/ThemeProvider'
import ThemeToggle from './ThemeToggle'

export default function Navbar({ userData, isPhone }) {
  const [searchBarFocused, setSearchBarFocused] = useState(false)
  const [searchBarFull, setSearchBarFull] = useState(false)
  const { openCreateModal } = useModalContext()
  const { isDark } = useThemeContext()

  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-accent/40 block' : 'block'

  const handleSearchBarFocused = () => {
    setSearchBarFocused(true)

    if (isPhone) {
      setSearchBarFull(true)
    }
  }

  const handleSearchBarBlurred = () => {
    setSearchBarFocused(false)
    setSearchBarFull(false)
  }

  return (
    <nav
      className={`navbar bg-base-100 shadow-sm top-0 sticky z-999  px-6 flex ${searchBarFull ? 'justify-center' : 'justify-between'}`}
    >
      {!searchBarFull && (
        <div className="flex gap-3">
          <div className="dropdown dropdown-start">
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="flex-none">
                  <button className="btn btn-square btn-ghost">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-5 w-5 stroke-current"
                    >
                      {' '}
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      ></path>{' '}
                    </svg>
                  </button>
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <NavLink to={'/dashboard'} end>
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

                <li>
                  <NavLink
                    to={'/dashboard/support'}
                    className={getNavLinkClass}
                  >
                    Support
                  </NavLink>
                </li>
                <li className="mt-4 mx-auto">
                  <ThemeToggle />
                </li>
                <li className="p-4">
                  <LogoutButton />
                </li>
              </ul>
            </>
          </div>
          <div className="w-[130px] h-10 scale-130">
            <NavLink to={'/dashboard'}>
              <img
                alt="myharada logo"
                src={`/logo-${isDark ? 'white' : 'dark'}.svg`}
                className="w-full h-full object-cover"
              />
            </NavLink>
          </div>
        </div>
      )}

      <div
        className={`items-center justify-center ${searchBarFull ? 'w-[60%]' : 'w-[40%]'} mx-2 md:w-70`}
      >
        <SearchBar
          onFocus={handleSearchBarFocused}
          onBlur={handleSearchBarBlurred}
          searchBarFocused={searchBarFocused}
        />
      </div>

      {!searchBarFull && (
        <div className="flex gap-3">
          {!isPhone && (
            <NewGridButton text={'Create'} openCreateModal={openCreateModal} />
          )}
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
        </div>
      )}
    </nav>
  )
}
