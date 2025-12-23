import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useDataContext } from '../providers/DataProvider'
import { calculateOverallProgress } from '../../utils/helpers'

export default function Stats() {
  const navigate = useNavigate()
  const { grids } = useDataContext()
  const activeGrids = [...grids].filter(
    (grid) => !grid.completedAt && !grid.templateCategory
  )
  const completedGrids = [...grids].filter((grid) => grid.completedAt)
  const projectGrids = [...activeGrids].filter(
    (grid) => grid.gridType === 'project'
  )

  const calculateAverageGridProgress = (active) => {
    const gridPercents = active.map((grid) =>
      calculateOverallProgress(grid.grids)
    )

    const average =
      gridPercents.reduce((sum, curr) => sum + curr, 0) / gridPercents.length

    return Math.ceil(average)
  }

  const handleClickActiveGrids = () => {
    navigate('/dashboard/grids')
  }

  const handleClickCompletedGrids = () => {
    navigate('/dashboard/completed')
  }

  return (
    <div
      className="stats shadow text-center stats-vertical md:stats-horizontal bg-slate-100"
      onClick={handleClickActiveGrids}
    >
      <div className="stat hover:bg-slate-200 ease-in-out duration-100 cursor-pointer">
        <div className="stat-figure text-secondary">
          <Icon icon="vaadin:grid-small-o" className="text-2xl" />
        </div>
        <div className="stat-title">Active Grids</div>
        <div className="stat-value">
          {activeGrids.length > 0 ? activeGrids.length : '0'}
        </div>
        {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
      </div>

      <div className="stat text-center hover:bg-slate-200 ease-in-out duration-100">
        <div className="stat-figure text-secondary">
          <Icon icon="mdi:graph-line-shimmer" className="text-2xl" />
        </div>
        <div className="stat-title">Average Progress</div>
        <div className="stat-value">
          {calculateAverageGridProgress(projectGrids) || '0'}%
        </div>
        {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
      </div>

      <div
        className="stat text-center hover:bg-slate-200 ease-in-out duration-100 cursor-pointer"
        onClick={handleClickCompletedGrids}
      >
        <div className="stat-figure text-secondary">
          <Icon icon="lucide:grid-2x2-check" className="text-2xl" />
        </div>
        <div className="stat-title">Completed Grids</div>
        <div className="stat-value">
          {completedGrids.length > 0 ? completedGrids.length : '0'}
        </div>
        {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
      </div>
    </div>
  )
}
