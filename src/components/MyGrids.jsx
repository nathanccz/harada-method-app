import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatDate } from '../../utils/helpers'
import GridCardDropdown from './GridCardDropdown'
import { useDataContext } from '../providers/DataProvider'
import OverallProgressCircle from './OverallProgressCircle'
import FilterDropdown from './FilterDropdown'
import MyGridsSkeleton from './MyGridsSkeleton'
import { useAuthContext } from '../providers/AuthContextProvider'
import { Icon } from '@iconify/react'
import { pinGrid } from '../../services/gridService'
import { useToastContext } from '../providers/ToastProvider'

export default function MyGrids() {
  const [filterOption, setFilterOption] = useState('All Grids')
  const [isTogglingPinned, setIsTogglingPinned] = useState(false)
  const [gridHovered, setGridHovered] = useState('')
  const { userDataLoading } = useAuthContext()
  const { showToast } = useToastContext()
  const {
    grids,
    fetchGrids,
    gridsLoading,
    newlyCreatedGridId,
    setNewlyCreatedGridId,
    token,
  } = useDataContext()
  const activeGrids = grids.filter(
    (grid) => !grid.completedAt && !grid.templateCategory
  )
  const ongoingGrids = activeGrids.filter(
    (grid) => grid.gridType === 'ongoing' && !grid.pinned
  )
  const projectGrids = activeGrids.filter(
    (grid) => grid.gridType === 'project' && !grid.pinned
  )
  const pinnedProjects = activeGrids.filter((grid) => grid.pinned)

  useEffect(() => {
    if (newlyCreatedGridId) {
      setNewlyCreatedGridId(null)
    }
  }, [])

  const handleClickPinGrid = async (gridId) => {
    const grid = activeGrids.find((grid) => grid._id === gridId)
    const newPinnedState = !grid.pinned

    try {
      setIsTogglingPinned(true)

      const response = await pinGrid(gridId, newPinnedState, token)
      console.log(response)

      if (!response) {
        console.log('Something went wrong.')
      } else {
        setIsTogglingPinned(false)
        showToast(response)
        fetchGrids()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const renderGrid = (grid) => (
    <div
      key={grid._id}
      onMouseEnter={() => setGridHovered(grid._id)}
      onMouseLeave={() => setGridHovered('')}
      className={`card card-md shadow-sm border border-primary/80 hover:bg-secondary/60 hover:border-accent ease-in-out duration-100 relative pt-5`}
    >
      {grid.gridType === 'project' && (
        <div className="absolute top-1 left-1">
          <OverallProgressCircle gridsArray={grid.grids} size={'2.5rem'} />
        </div>
      )}

      <div className="absolute top-0 right-0">
        <GridCardDropdown
          gridId={grid._id}
          handleClickPinGrid={handleClickPinGrid}
          isTogglingPinned={isTogglingPinned}
        />
      </div>

      <div className="card-body mt-4">
        <h2 className="card-title">{grid.title}</h2>
        <p>{grid.description}</p>
        <span className="text-xs italic">
          Created: {formatDate(grid.createdAt)}
        </span>
        <div className="justify-end card-actions">
          <NavLink to={`/dashboard/grids/${grid._id}`}>
            <button className="btn btn-neutral">View Grid</button>
          </NavLink>
        </div>
        {grid._id === gridHovered && !grid.pinned && (
          <Icon
            icon="iconoir:pin"
            className="text-2xl absolute bottom-5 left-5 cursor-pointer"
            onClick={() => handleClickPinGrid(grid._id)}
          />
        )}
        {grid.pinned && (
          <Icon
            icon="iconoir:pin-solid"
            className="text-2xl absolute bottom-5 left-5 cursor-pointer"
            onClick={() => handleClickPinGrid(grid._id)}
          />
        )}
      </div>
    </div>
  )

  return !userDataLoading && !gridsLoading ? (
    <section className="flex flex-col gap-5 mt-5 basis-4/5 relative ">
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

          {/* PINNED GRIDS */}
          {pinnedProjects.length > 0 && filterOption === 'Pinned Grids' && (
            <section>
              <h2 className="font-bold mb-3">Pinned Grids</h2>
              <div className="grid grids-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {pinnedProjects.map(renderGrid)}
              </div>
            </section>
          )}

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
                  {pinnedProjects.map(renderGrid)}
                  {projectGrids.map(renderGrid)}
                </div>
              </section>
            )}
        </>
      )}
    </section>
  ) : (
    <MyGridsSkeleton />
  )
}
