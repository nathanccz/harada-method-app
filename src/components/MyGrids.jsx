import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { getGrids } from '../../services/gridService'
import { formatDate } from '../../utils/helpers'
import GridCardDropdown from './GridCardDropdown'
import { useDataContext } from '../providers/DataProvider'

export default function MyGrids() {
  const { grids } = useDataContext()

  const activeGrids = grids.filter((grid) => !grid.completedAt)
  const ongoingGrids = activeGrids.filter((grid) => grid.gridType === 'ongoing')
  const projectGrids = activeGrids.filter((grid) => grid.gridType === 'project')

  const renderGrid = (grid) => (
    <div
      key={grid._id}
      className="card bg-base-100 card-md shadow-sm border border-transparent hover:bg-base-200 hover:border-accent ease-in-out duration-100 relative pt-5"
    >
      <GridCardDropdown gridId={grid._id} />
      <div className="card-body">
        <h2 className="card-title">{grid.title}</h2>
        <p>{grid.description}</p>
        <span className="text-xs italic">
          Created at: {formatDate(grid.createdAt)}
        </span>
        <div className="justify-end card-actions">
          <NavLink to={`/dashboard/grid/${grid._id}`}>
            <button className="btn btn-primary">View Grid</button>
          </NavLink>
        </div>
      </div>
    </div>
  )

  return (
    <main className="flex flex-col gap-5 mt-5 p-10 basis-4/5">
      <h1 className="text-2xl font-bold">My Grids</h1>

      <section>
        <h2 className="font-bold mb-3">Ongoing Grids</h2>
        <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {ongoingGrids.map(renderGrid)}
        </div>
      </section>
      <section>
        <h2 className="font-bold mb-3">Project-based Grids</h2>
        <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projectGrids.map(renderGrid)}
        </div>
      </section>
    </main>
  )
}
