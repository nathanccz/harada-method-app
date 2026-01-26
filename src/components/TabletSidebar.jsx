import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

export default function TabletSidebar() {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? 'bg-accent/40 block' : 'block'
  return (
    <aside className="flex flex-col w-20">
      <ul className="menu rounded-box flex flex-col gap-3">
        <li>
          <NavLink to={'/dashboard'} className={getNavLinkClass} end>
            <div className="flex flex-col gap-1 text-center">
              <Icon icon="ix:dashboard" className="text-3xl mx-auto" />
              <span className="block text-xs">Dashboard</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/grids'} className={getNavLinkClass}>
            <div className="flex flex-col gap-1 text-center">
              <Icon icon="mingcute:grid-line" className="text-3xl mx-auto" />
              <span className="block text-xs">My Grids</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/templates'} className={getNavLinkClass}>
            <div className="flex flex-col gap-1 text-center">
              <Icon
                icon="fluent-mdl2:explore-content"
                className="text-3xl mx-auto"
              />
              <span className="block text-xs">Templates</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/completed'} className={getNavLinkClass}>
            <div className="flex flex-col gap-1 text-center">
              <Icon icon="lucide:grid-2x2-check" className="text-3xl mx-auto" />
              <span className="block text-xs">Completed</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to={'/dashboard/support'} className={getNavLinkClass}>
            <div className="flex flex-col gap-1 text-center">
              <Icon
                icon="ic:baseline-contact-mail"
                className="text-3xl mx-auto"
              />
              <span className="block text-xs">Support</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
