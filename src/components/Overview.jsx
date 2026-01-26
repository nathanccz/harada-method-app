import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { useModalContext } from '../providers/ModalProvider'
import { useParams } from 'react-router-dom'
import { useAuthContext } from '../providers/AuthContextProvider'
import { editGridCell } from '../../services/gridService'
import { useDataContext } from '../providers/DataProvider'
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Overview({
  gridData,
  setGridData,
  shouldAnimate,
  setShouldAnimate,
}) {
  const [hovered, setHovered] = useState(null)
  const { id } = useParams()
  const { openEditListModal, setCurrentParams, openCompletionModal } =
    useModalContext()
  const { userDataLoading, token } = useAuthContext()
  const { fetchGrids } = useDataContext()
  const container = useRef()

  useGSAP(
    () => {
      if (!shouldAnimate || !gridData || gridData.length === 0) return

      gsap.from('.subGoal > *', {
        opacity: 0,
        y: 20,
        stagger: 0.2, // More delay between each item
        duration: 1.7, // Each item takes longer to animate
        ease: 'power2.out', // Smooth easing
      })

      setShouldAnimate(false)
    },
    { dependencies: [shouldAnimate, gridData] } // <- triggers animation when 'results' changes
  )

  const handleClickOpenEditListModal = (index) => {
    openEditListModal(index)
    setCurrentParams(id)
  }

  const handleClickCheck = async (cellId) => {
    const fallback = structuredClone(gridData)
    const updatedGrid = structuredClone(gridData)

    const gridIndex = updatedGrid.grids.findIndex((grid) =>
      grid.some((cell) => cell.id === cellId)
    )

    const taskIndex = updatedGrid.grids[gridIndex].findIndex(
      (cell) => cell.id === cellId
    )

    const isCompleted = updatedGrid.grids[gridIndex][taskIndex].completedAt

    if (!isCompleted) {
      updatedGrid.grids[gridIndex][taskIndex].completedAt =
        new Date().toISOString()
    } else {
      updatedGrid.grids[gridIndex][taskIndex].completedAt = ''
    }

    // If an item is checked off in the MAIN GOAL panel, mark off all the corresponding pillar's tasks as complete
    if (gridIndex === 4) {
      for (let i = 0; i < 9; i++) {
        const taskCompleted = updatedGrid.grids[taskIndex][i].completedAt

        if (!taskCompleted && !isCompleted) {
          updatedGrid.grids[taskIndex][i].completedAt = new Date().toISOString()
        } else if (isCompleted) {
          updatedGrid.grids[taskIndex][i].completedAt = ''
        }
      }
    }

    if (
      updatedGrid.grids[gridIndex]
        .filter((grid) => grid.slot !== 'middle-center')
        .every((cell) => cell.completedAt)
    ) {
      updatedGrid.grids[gridIndex][4].completedAt = new Date().toISOString()
      updatedGrid.grids[4][gridIndex].completedAt = new Date().toISOString()
    } else {
      updatedGrid.grids[gridIndex][4].completedAt = ''
      updatedGrid.grids[4][gridIndex].completedAt = ''
    }

    if (
      updatedGrid.grids[4]
        .filter((grid) => grid.slot !== 'middle-center')
        .every((cell) => cell.completedAt)
    ) {
      updatedGrid.grids[4][4].completedAt = new Date().toISOString()
    }

    setGridData(updatedGrid)

    if (
      updatedGrid.grids
        .flat()
        .flat()
        .every((grid) => grid.completedAt)
    ) {
      openCompletionModal(id)
    }

    try {
      const response = await editGridCell(
        updatedGrid._id,
        updatedGrid.grids,
        token
      )
      if (!response) {
        console.log('Something went wrong.')
        setGridData(fallback)
        return
      } else {
        fetchGrids()
      }
    } catch (error) {
      console.log('Error updating grid:', error)
    }
  }

  const calculateFraction = (subGrid) => {
    const completed = subGrid.filter(
      (cell) => cell.completedAt && cell.slot !== 'middle-center'
    ).length

    return `${completed}/8`
  }

  const calculatePercentage = (subGrid) => {
    const completed = subGrid.filter(
      (cell) => cell.completedAt && cell.slot !== 'middle-center'
    ).length

    return Math.floor((completed / 8) * 100)
  }

  return (
    <div
      ref={container}
      className="w-full mb-24 grid grid-cols-1 lg:grid-cols-3 gap-3 basis-4/5 lg:overflow-auto rounded-lg p-3 "
    >
      {!userDataLoading && gridData ? (
        gridData?.grids?.map((grid, ind) => (
          <ul
            className={`list ${
              grid[0].id.startsWith('main') ? 'bg-primary/60' : 'bg-base-100'
            } rounded-box shadow-md hover:bg-secondary/40 ease-in-out duration-100 border border-primary/60 hover:border-primary relative subGoal`}
            key={`grid-${ind + 1}`}
            onMouseEnter={() =>
              setHovered(grid[0].id.split('-').slice(0, 3).join('-'))
            }
            onMouseLeave={() => setHovered(null)}
          >
            <li className="p-2 pb-2 text-md opacity-80 font-bold uppercase tracking-wide flex gap-3 items-center">
              {gridData.gridType === 'project' &&
                !gridData.completedAt &&
                !gridData.templateCategory && (
                  <div
                    className="radial-progress text-secondary custom-radial-size text-[10px]"
                    style={
                      {
                        '--value': calculatePercentage(grid),
                        '--size': '2.5rem',
                      } /* as React.CSSProperties */
                    }
                    aria-valuenow={calculatePercentage(grid)}
                    role="progressbar"
                  >
                    {calculateFraction(grid)}
                  </div>
                )}
              <span>
                {ind < 4
                  ? `Pillar ${ind + 1}`
                  : ind === 4
                    ? 'Main Goal'
                    : `Pillar ${ind}`}
              </span>
            </li>
            <li className="font-bold p-2 text-left text-md">
              <span>{grid[4].text}</span>
            </li>
            {/* Skip the middle cell since it's in the list title */}
            {[...grid.slice(0, 4), ...grid.slice(5)].map((cell, ind) => (
              <li className="list-row p-2" key={cell.id}>
                <div className="text-xl font-thin opacity-80 tabular-nums">
                  {(ind + 1).toString().padStart(2, '0')}
                </div>

                <div
                  className={`list-col-grow flex items-center ${
                    cell.id.startsWith('main') && 'font-bold'
                  }`}
                >
                  <div
                    className={cell.completedAt && 'text-gray-500 line-through'}
                  >
                    {cell.text}
                  </div>
                </div>
                {gridData.gridType === 'project' &&
                  cell.text &&
                  !gridData.completedAt &&
                  !gridData.templateCategory && (
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        checked={cell.completedAt ?? false}
                        className="checkbox checkbox-success"
                        onChange={() => handleClickCheck(cell.id)}
                      />
                    </div>
                  )}
              </li>
            ))}
            {grid[0].id.startsWith(hovered) &&
              !gridData.completedAt &&
              !gridData.templateCategory && (
                <Icon
                  icon="material-symbols:edit-outline"
                  className="text-2xl cursor-pointer absolute top-1 right-1"
                  onClick={() => handleClickOpenEditListModal(ind)}
                />
              )}
          </ul>
        ))
      ) : (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <div className="skeleton h-96 w-72" key={`skeleton-${i + 1}`}></div>
          ))}
        </>
      )}
    </div>
  )
}
