import { Icon } from '@iconify/react'

export default function Stats() {
  return (
    <div className="stats shadow text-center">
      <div className="stat">
        <div className="stat-figure text-secondary">
          <Icon icon="vaadin:grid-small-o" className="text-2xl" />
        </div>
        <div className="stat-title">Active Grids</div>
        <div className="stat-value">3</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat text-center">
        <div className="stat-figure text-secondary">
          <Icon icon="mdi:graph-line-shimmer" className="text-2xl" />
        </div>
        <div className="stat-title">Average Progress</div>
        <div className="stat-value">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat text-center">
        <div className="stat-figure text-secondary">
          <Icon icon="lucide:grid-2x2-check" className="text-2xl" />
        </div>
        <div className="stat-title">Completed Grids</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  )
}
