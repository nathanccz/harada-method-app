import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'
import { useDataContext } from '../providers/DataProvider'

export default function Stats() {
  const { grids } = useDataContext()
  const activeGrids = [...grids].filter((grid) => !grid.completedAt)
  const completedGrids = [...grids].filter((grid) => grid.completedAt)

  return (
    <div className="stats shadow text-center">
      <NavLink to={'/dashboard/grids'}>
        <div className="stat hover:bg-base-200 ease-in-out duration-100 cursor-pointer">
          <div className="stat-figure text-secondary">
            <Icon icon="vaadin:grid-small-o" className="text-2xl" />
          </div>
          <div className="stat-title">Active Grids</div>
          <div className="stat-value">
            {activeGrids.length > 0 && activeGrids.length}
          </div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>
      </NavLink>

      <div className="stat text-center hover:bg-base-200 ease-in-out duration-100 cursor-pointer">
        <div className="stat-figure text-secondary">
          <Icon icon="mdi:graph-line-shimmer" className="text-2xl" />
        </div>
        <div className="stat-title">Average Progress</div>
        <div className="stat-value">22%</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <NavLink to={'/dashboard/completed'}>
        <div className="stat text-center hover:bg-base-200 ease-in-out duration-100 cursor-pointer">
          <div className="stat-figure text-secondary">
            <Icon icon="lucide:grid-2x2-check" className="text-2xl" />
          </div>
          <div className="stat-title">Completed Grids</div>
          <div className="stat-value">
            {completedGrids.length > 0 && completedGrids.length}
          </div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </NavLink>
    </div>
  )
}
