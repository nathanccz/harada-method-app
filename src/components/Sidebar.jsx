import { NavLink } from 'react-router-dom'
import SkeletonSidebar from './SkeletonSidebar'
import NewGridButton from './NewGridButton'
import Navbar from './Navbar'
import { useModalContext } from '../providers/ModalProvider'
import { useAuthContext } from '../providers/AuthContextProvider'
import { useDataContext } from '../providers/DataProvider'
import SearchBar from './SearchBar'
import { Icon } from '@iconify/react'
import LogoutButton from './LogoutButton'

export default function Sidebar({ isMobile, isTablet, isPhone }) {
  const { openCreateModal } = useModalContext()
  const { userData, userDataLoading } = useAuthContext()
  const { grids, gridsLoading } = useDataContext()
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-gray-300 block' : 'block'

  const activeGrids = [...grids].filter(
    (grid) => !grid.completedAt && !grid.templateCategory
  )
  const completedGrids = [...grids].filter((grid) => grid.completedAt)

  return isMobile || isTablet || isPhone ? (
    <Navbar userData={userData} isTablet={isTablet} isPhone={isPhone} />
  ) : !userDataLoading && !gridsLoading ? (
    <aside className="flex flex-col min-w-[250px] mb-8 pl-8">
      <div className="flex mb-8 mt-4 mx-4">
        <div className="avatar placeholder">
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
        <div className="mt-2 ml-3">
          <h3 className="font-bold text-sm">{userData?.displayName}</h3>
        </div>
      </div>
      <div className="mb-3 w-full">
        <NewGridButton
          text={'Create a New Grid'}
          openCreateModal={openCreateModal}
        />
      </div>
      <div className="mb-5">
        <SearchBar />
      </div>
      <ul className="menu bg-base-200 rounded-box w-full gap-3 text-md font-bold mt-3">
        <li>
          <NavLink to={'/dashboard'} className={getNavLinkClass} end>
            <div className="flex gap-2 items-center">
              <Icon icon="ix:dashboard" className="text-2xl" />
              <div>Dashboard</div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/grids'} className={getNavLinkClass}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Icon icon="mingcute:grid-line" className="text-2xl" />
                <div>Active Grids</div>
              </div>
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
            <div className="flex gap-2 items-center">
              <Icon icon="fluent-mdl2:explore-content" className="text-2xl" />
              <div>Templates</div>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/completed'} className={getNavLinkClass}>
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <Icon icon="lucide:grid-2x2-check" className="text-2xl" />
                <div>Completed</div>
              </div>
              {completedGrids.length > 0 && (
                <div className="bg-white px-2 rounded-full">
                  {completedGrids.length}
                </div>
              )}
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink to={'/dashboard/support'} className={getNavLinkClass}>
            <div className="flex gap-2 items-center">
              <Icon icon="ic:baseline-contact-mail" className="text-2xl" />
              <div>Support</div>
            </div>
          </NavLink>
        </li>
      </ul>

      <div className="mt-8 w-full">
        <LogoutButton />
      </div>
    </aside>
  ) : (
    <SkeletonSidebar />
  )
}
