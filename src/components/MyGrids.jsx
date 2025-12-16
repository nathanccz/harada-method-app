import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../../utils/helpers'
import GridCardDropdown from './GridCardDropdown'
import { useDataContext } from '../providers/DataProvider'
import OverallProgressCircle from './OverallProgressCircle'
import FilterDropdown from './FilterDropdown'

export default function MyGrids() {
  const [filterOption, setFilterOption] = useState('All Grids')

  const { grids } = useDataContext()
  const activeGrids = grids.filter((grid) => !grid.completedAt)
  const ongoingGrids = activeGrids.filter((grid) => grid.gridType === 'ongoing')
  const projectGrids = activeGrids.filter((grid) => grid.gridType === 'project')

  const renderGrid = (grid) => (
    <div
      key={grid._id}
      className="card bg-base-100 card-md shadow-sm border border-transparent hover:bg-base-200 hover:border-accent ease-in-out duration-100 relative pt-5"
    >
      {grid.gridType === 'project' && (
        <div className="absolute top-1 left-1">
          <OverallProgressCircle gridsArray={grid.grids} size={'2.5rem'} />
        </div>
      )}
      <GridCardDropdown gridId={grid._id} />
      <div className="card-body mt-4">
        <h2 className="card-title">{grid.title}</h2>
        <p>{grid.description}</p>
        <span className="text-xs italic">
          Created at: {formatDate(grid.createdAt)}
        </span>
        <div className="justify-end card-actions">
          <NavLink to={`/dashboard/grid/${grid._id}`}>
            <button className="btn btn-neutral">View Grid</button>
          </NavLink>
        </div>
      </div>
    </div>
  )

  return (
    <section className="flex flex-col gap-5 mt-5 basis-4/5 relative">
      <h1 className="text-2xl font-bold">My Active Grids</h1>
      <div>
        {activeGrids && activeGrids.length === 0 && (
          <p>There's nothing here, yet!</p>
        )}
      </div>
      {activeGrids.length > 0 && (
        <>
          <div className="absolute top-8 right-0">
            <FilterDropdown
              filterOption={filterOption}
              setFilterOption={setFilterOption}
            />
          </div>

          {/* ONGOING GRIDS */}
          {ongoingGrids.length > 0 &&
            (filterOption === 'Ongoing Grids' ||
              filterOption === 'All Grids') && (
              <section>
                <h2 className="font-bold mb-3">Ongoing Grids</h2>
                <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ongoingGrids.map(renderGrid)}
                </div>
              </section>
            )}

          {/* DIVIDER */}
          {ongoingGrids.length > 0 &&
            projectGrids.length > 0 &&
            filterOption === 'All Grids' && <div className="divider"></div>}

          {/* PROJECT GRIDS */}
          {projectGrids.length > 0 &&
            (filterOption === 'Project Grids' ||
              filterOption === 'All Grids') && (
              <section>
                <h2 className="font-bold mb-3">Project-based Grids</h2>
                <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {projectGrids.map(renderGrid)}
                </div>
              </section>
            )}
        </>
      )}
    </section>
  )
}
